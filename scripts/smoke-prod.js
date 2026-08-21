#!/usr/bin/env node
/*
 * Production smoke test: catches drift between what's deployed and what's
 * cached at the edge/in visitors' browsers — the class of bug
 * scripts/check.js structurally cannot see, because check.js only
 * checks the source tree, not what a real visitor is actually served.
 *
 * Concretely: fetches the live index.html, follows the exact
 * `<script src="js/i18n.js?v=...">` URL it points at (so this test is
 * fooled by the same stale cache a real visitor would be), and checks
 * that every `data-i18n*` key index.html uses exists in every language
 * of the i18n.js it actually got back. If `js/i18n.js` is ever cached
 * longer than `index.html` again and the two drift, this fails instead
 * of only being noticed by a user staring at "searchLabel" on screen.
 *
 * Run manually: node scripts/smoke-prod.js
 * Run against a different deploy: PROD_URL=https://... node scripts/smoke-prod.js
 */

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

(async function main() {
  const html = await fetchText(PROD_URL + "/");
  ok("fetched " + PROD_URL + "/");

  const i18nSrcMatch = html.match(/<script src="(js\/i18n\.js[^"]*)">/);
  if (!i18nSrcMatch) {
    fail("could not find <script src=\"js/i18n.js...\"> in the live index.html");
    return;
  }
  const i18nUrl = PROD_URL + "/" + i18nSrcMatch[1];
  const i18nSrc = await fetchText(i18nUrl);
  ok("fetched " + i18nUrl);

  let I18N;
  // eslint-disable-next-line no-eval
  eval(i18nSrc.split("const I18N").join("global.__I18N"));
  I18N = global.__I18N;
  if (!I18N || typeof I18N !== "object") {
    fail(i18nUrl + " did not define an I18N object");
    return;
  }
  const languages = Object.keys(I18N);
  ok("languages found in live i18n.js: " + languages.join(", "));

  const htmlI18nKeys = new Set();
  const htmlI18nRe = /data-i18n(?:-html|-placeholder|-aria-label)?="([^"]+)"/g;
  let m;
  while ((m = htmlI18nRe.exec(html))) htmlI18nKeys.add(m[1]);

  languages.forEach(function (language) {
    htmlI18nKeys.forEach(function (key) {
      if (!(key in I18N[language])) {
        fail(
          "live index.html uses data-i18n key \"" + key + "\" that is missing from live " +
          i18nUrl + " (language \"" + language + "\") — a visitor would see the literal key " +
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

  if (process.exitCode) {
    console.error("\nFAILED: production is serving mismatched index.html / js/i18n.js.");
  } else {
    console.log("\nAll production smoke checks passed.");
  }
})().catch(function (e) {
  fail(e.message);
  process.exit(1);
});
