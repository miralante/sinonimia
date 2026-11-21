#!/usr/bin/env node
/*
 * Production smoke test: catches drift between what's deployed and what's
 * cached at the edge/in visitors' browsers — the class of bug
 * scripts/check.js structurally cannot see, because check.js only
 * checks the source tree, not what a real visitor is actually served.
 *
 * Concretely: fetches the live index.html, follows the exact
 * `<script src="js/i18n.js?v=...">` URL it points at (so this test is
 * fooled by the same stale cache a real visitor would be), loads the live
 * translation files it points at, and checks that every `data-i18n*` key
 * index.html uses exists in every language of the site. If `js/i18n.js` is
 * ever cached longer than `index.html` again and the two drift, this fails
 * instead of only being noticed by a user staring at "searchLabel" on screen.
 *
 * The engine is a browser script, so it runs here inside a `vm` context with
 * a minimal browser around it (window, document, location, localStorage,
 * navigator). Two engines are understood:
 *   - the current one (window.App.i18n, js/strings.<locale>.js per language);
 *   - the old one (a global `I18N` object with every language inside).
 *
 * Run manually: node scripts/smoke-prod.js
 * Run against a different deploy: PROD_URL=https://... node scripts/smoke-prod.js
 */

const vm = require('node:vm');

const PROD_URL = (process.env.PROD_URL || "https://sinonimia.miralante.workers.dev").replace(/\/$/, "");

function fail(message) {
  console.error("✗ " + message);
  process.exitCode = 1;
}

function ok(message) {
  console.log("✓ " + message);
}

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("HTTP " + res.status + " fetching " + url);
  return res.text();
}

/* A browser small enough to run the engine and nothing else. The engine only
   needs to read the document, the URL and the storage: it never draws. */
function browser(locale) {
  const context = {
    console: { log() {}, warn() {}, error() {} },
    URLSearchParams,
    setTimeout,
    clearTimeout,
  };
  context.window = context;
  context.globalThis = context;
  context.location = { hash: "#/" + locale + "/", search: "", reload() {} };
  context.localStorage = { getItem: () => null, setItem() {} };
  context.navigator = { languages: [locale], language: locale };
  context.document = {
    readyState: "complete",
    title: "",
    documentElement: { lang: locale, getAttribute: () => null },
    addEventListener() {},
    querySelectorAll: () => [],
    querySelector: () => null,
  };
  vm.createContext(context);
  return context;
}

/* The engine falls back to its default language when a key is missing in the
   current one, which would hide a key that only exists in English. Pointing
   the default at a language that does not exist turns that fallback off, so
   every language is checked strictly. */
function strict(src, filename) {
  return src.replace(/var DEFAULT_LOCALE = "[^"]*";/, 'var DEFAULT_LOCALE = "__ninguno__";');
}

function scriptTags(html, pattern) {
  const found = [];
  const re = new RegExp('<script[^>]*src="(' + pattern + ')"', "g");
  let m;
  while ((m = re.exec(html))) found.push(m[1]);
  return found;
}

(async function main() {
  const html = await fetchText(PROD_URL + "/");
  ok("fetched " + PROD_URL + "/");

  const engineMatch = html.match(/<script src="(js\/i18n\.js[^"]*)">/);
  if (!engineMatch) {
    fail("could not find <script src=\"js/i18n.js...\"> in the live index.html");
    return;
  }
  const engineUrl = PROD_URL + "/" + engineMatch[1];
  const engineSrc = await fetchText(engineUrl);
  ok("fetched " + engineUrl);

  /* The keys the live page uses. */
  const htmlI18nKeys = new Set();
  const htmlI18nRe = /data-i18n(?:-html|-placeholder|-aria-label)?="([^"]+)"/g;
  let m;
  while ((m = htmlI18nRe.exec(html))) htmlI18nKeys.add(m[1]);

  /* The translation files the live page loads, one per language. */
  const stringsScripts = scriptTags(html, 'js/strings\\.[a-z-]+\\.js[^"]*');
  const stringsByLocale = new Map();
  for (const src of stringsScripts) {
    const locale = (src.match(/strings\.([a-z-]+)\.js/) || [])[1];
    if (locale) stringsByLocale.set(locale, src);
  }

  const isCurrentEngine = /App\.i18n/.test(engineSrc);

  if (!isCurrentEngine) {
    /* Old engine: one global object with every language inside. */
    let I18N;
    // eslint-disable-next-line no-eval
    eval(engineSrc.split("const I18N").join("global.__I18N"));
    I18N = global.__I18N;
    if (!I18N || typeof I18N !== "object") {
      fail(engineUrl + " did not define an I18N object");
      return;
    }
    const languages = Object.keys(I18N);
    ok("languages found in live i18n.js: " + languages.join(", "));
    languages.forEach(function (language) {
      htmlI18nKeys.forEach(function (key) {
        if (!(key in I18N[language])) {
          fail(
            "live index.html uses data-i18n key \"" + key + "\" that is missing from live " +
            engineUrl + " (language \"" + language + "\") — a visitor would see the literal key " +
            "instead of translated text. This is exactly the stale-cache bug from " +
            "_headers' js/i18n.js Cache-Control policy; check it hasn't regressed to " +
            "`immutable`."
          );
        }
      });
    });
    if (!process.exitCode) {
      ok("live index.html data-i18n keys checked (" + htmlI18nKeys.size + ") against live i18n.js across " + languages.join(", "));
    }
  } else {
    /* Current engine: the dictionaries live in js/strings.<locale>.js and are
       registered with App.i18n. Each language is loaded on its own, so a key
       that only exists in one of them is caught. */
    const context = browser("es");
    vm.runInContext(strict(engineSrc, "i18n.js"), context, { filename: "live-i18n.js" });
    const i18n = context.App && context.App.i18n;
    if (!i18n || typeof i18n.t !== "function") {
      fail(engineUrl + " did not define window.App.i18n");
      return;
    }
    const languages = i18n.SUPPORTED.slice();
    ok("languages declared by the live i18n.js: " + languages.join(", "));

    for (const language of languages) {
      const script = stringsByLocale.get(language);
      if (!script) {
        fail(
          "the live index.html does not load a translation file for \"" + language +
          "\" (js/strings." + language + ".js): every language it offers needs one"
        );
        continue;
      }
      const stringsUrl = PROD_URL + "/" + script;
      const stringsSrc = await fetchText(stringsUrl);
      ok("fetched " + stringsUrl);

      const lang = browser(language);
      vm.runInContext(strict(engineSrc, "i18n.js"), lang, { filename: "live-i18n.js" });
      vm.runInContext(stringsSrc, lang, { filename: "live-strings.js" });
      const engine = lang.App && lang.App.i18n;
      if (!engine || typeof engine.t !== "function") {
        fail("the live translation file " + stringsUrl + " did not register with App.i18n");
        continue;
      }
      if (engine.locale() !== language) {
        fail("the live engine answered in \"" + engine.locale() + "\" when asked for \"" + language + "\"");
        continue;
      }
      htmlI18nKeys.forEach(function (key) {
        if (!engine.t(key)) {
          fail(
            "live index.html uses data-i18n key \"" + key + "\" that is missing from the live " +
            "translation file of \"" + language + "\" — a visitor would see an empty label " +
            "instead of translated text. This is exactly the stale-cache bug from " +
            "_headers' js/i18n.js Cache-Control policy; check it hasn't regressed to " +
            "`immutable`."
          );
        }
      });
    }
    if (!process.exitCode) {
      ok("live index.html data-i18n keys checked (" + htmlI18nKeys.size + ") against the live translation files across " + languages.join(", "));
    }
  }

  if (process.exitCode) {
    console.error("\nFAILED: production is serving mismatched index.html / js/i18n.js.");
  } else {
    console.log("\nAll production smoke checks passed.");
  }
})().catch(function (e) {
  fail(e.message);
  process.exit(1);
});
