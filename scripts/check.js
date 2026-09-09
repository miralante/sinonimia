#!/usr/bin/env node
/*
 * Sinonimia's check script. No dependencies (plain Node), so anyone can run
 * it without installing anything: node scripts/check.js
 *
 * Checks what an editor can't: that every example sentence really contains
 * the word it claims to contain, that no pictogram is missing, that
 * interface keys exist in every language, etc. Meant to run locally before
 * a commit and in CI on every pull request.
 *
 * Also enforces three Cloudflare Pages limits (per
 * https://developers.cloudflare.com/pages/limits/ and the matching pages
 * for _headers and _redirects):
 *
 *   - _redirects: max 2 000 static redirects + 100 dynamic (placeholder)
 *     redirects per file (2 100 total). If absent the check is skipped,
 *     which is sinonimia's current state.
 *   - _headers: max 100 rule lines (path-globs + Key: value lines) per
 *     file. Counting both kinds matches the wording in Cloudflare's
 *     pages/configuration/headers/ docs.
 *   - No shipped file may exceed 25 MB. The walker excludes .git/,
 *     node_modules/, .claude/, graphify-out*, and scripts/ingest/
 *     (sinonimia's batch content pipeline - multi-MB plaintext
 *     wordlists and ARASAAC cache files, never uploaded). 20 MB warns,
 *     25 MB fails.
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
let errorCount = 0;

function fail(message) {
  console.error("✗ " + message);
  errorCount++;
}

function ok(message) {
  console.log("✓ " + message);
}

// Explicit Unicode escapes, not literal combining marks — same reason as
// in js/app.js (Safari's regex engine mis-parses the literal range).
function normalize(text) {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

// --- 1. Syntax of every JS file ---
// Three files are required (loaded by index.html in this exact order);
// any extra js/*.js that happens to exist is checked too, so adding
// bootstrap-i18n.js or similar helpers in the future can't silently
// ship broken.
const jsDir = path.join(ROOT, "js");
const requiredJs = ["js/i18n.js", "js/data.es.js", "js/data.en.js", "js/app.js"];
requiredJs.forEach(function (relativePath) {
  try {
    execFileSync(process.execPath, ["--check", path.join(ROOT, relativePath)]);
    ok("syntax OK: " + relativePath);
  } catch (e) {
    fail("syntax error in " + relativePath);
  }
});
fs.readdirSync(jsDir).filter(function (f) {
  return f.endsWith(".js") && requiredJs.indexOf("js/" + f) === -1;
}).forEach(function (f) {
  try {
    execFileSync(process.execPath, ["--check", path.join(jsDir, f)]);
    ok("syntax OK: js/" + f + " (extras)");
  } catch (e) {
    fail("syntax error in js/" + f);
  }
});

// --- 2. Balanced braces in the CSS (no CSS linter is configured) ---
const css = fs.readFileSync(path.join(ROOT, "css/styles.css"), "utf8");
const openBraces = (css.match(/{/g) || []).length;
const closeBraces = (css.match(/}/g) || []).length;
if (openBraces === closeBraces) {
  ok("css/styles.css: balanced braces (" + openBraces + ")");
} else {
  fail("css/styles.css: unbalanced braces (" + openBraces + " open, " + closeBraces + " closed)");
}

// --- 3. Load the dictionaries and the interface texts without a browser ---
function loadAsGlobal(relativePath, pattern, replacement) {
  const src = fs.readFileSync(path.join(ROOT, relativePath), "utf8").split(pattern).join(replacement);
  // eslint-disable-next-line no-eval
  eval(src);
}

loadAsGlobal("js/data.es.js", "window.DICCIONARIOS", "global.DICCIONARIOS");
loadAsGlobal("js/data.en.js", "window.DICCIONARIOS", "global.DICCIONARIOS");
loadAsGlobal("js/i18n.js", "const I18N", "global.I18N");

const languages = Object.keys(DICCIONARIOS);
ok("languages found: " + languages.join(", "));

// --- 4. Every entry: unique id, image present, well-formed example ---
const VALID_TOPICS = ["tramites", "salud", "vida-diaria", "finanzas", "vivienda", "trabajo", "legal", "tecnologia", "seguridad", "educacion", "conocimiento"];
const imgDir = path.join(ROOT, "img");
const imagesOnDisk = fs.readdirSync(imgDir);

languages.forEach(function (language) {
  const entries = DICCIONARIOS[language];
  const seenIds = {};

  entries.forEach(function (entry) {
    if (seenIds[entry.id]) {
      fail(language + ": duplicate id \"" + entry.id + "\"");
    }
    seenIds[entry.id] = true;

    if (VALID_TOPICS.indexOf(entry.situacion) === -1) {
      fail(language + "/" + entry.id + ": situacion \"" + entry.situacion + "\" is not a valid key");
    }

    if (!entry.imagen || !entry.imagen.id || !entry.imagen.alt) {
      fail(language + "/" + entry.id + ": missing imagen.id or imagen.alt");
    } else if (imagesOnDisk.indexOf(entry.imagen.id + ".png") === -1) {
      fail(language + "/" + entry.id + ": img/" + entry.imagen.id + ".png does not exist");
    }

    [
      ["ejemplo", entry.ejemplo],
      ["ejemploSinonimo", entry.ejemploSinonimo],
    ].forEach(function (pair) {
      var fieldName = pair[0], value = pair[1];
      if (!value || !value.texto || !value.palabra) {
        fail(language + "/" + entry.id + ": missing texto or palabra in " + fieldName);
        return;
      }
      var idx = normalize(value.texto).indexOf(normalize(value.palabra));
      if (idx === -1) {
        fail(language + "/" + entry.id + ": \"" + value.palabra + "\" does not appear inside " + fieldName + ".texto");
      }
    });

    // `traduccion` is an OPTIONAL field — entries that resolve to their
    // counterpart by the shared-pictogram rule don't need it. When it IS
    // set, validate the shape: object keyed by language code, values are
    // either a single id string or an array of id strings, every id must
    // exist in the referenced language's dictionary and must not be the
    // entry's own id. Self-references would produce an obvious "see this
    // word in the other language" loop; an unknown id would produce a
    // broken link.
    if (entry.traduccion) {
      if (typeof entry.traduccion !== "object" || Array.isArray(entry.traduccion)) {
        fail(language + "/" + entry.id + ": traduccion must be an object keyed by language code, got " + typeof entry.traduccion);
      } else {
        Object.keys(entry.traduccion).forEach(function (targetLang) {
          if (targetLang === language) {
            fail(language + "/" + entry.id + ": traduccion must not reference the entry's own language \"" + targetLang + "\"");
            return;
          }
          if (!DICCIONARIOS[targetLang]) {
            fail(language + "/" + entry.id + ": traduccion references unknown language \"" + targetLang + "\"");
            return;
          }
          var raw = entry.traduccion[targetLang];
          var ids = Array.isArray(raw) ? raw : [raw];
          ids.forEach(function (otherId) {
            if (typeof otherId !== "string") {
              fail(language + "/" + entry.id + ": traduccion." + targetLang + " must be a string id or array of ids");
              return;
            }
            // We allow `otherId === entry.id` — that's a legitimate link
            // when the same id exists in both languages (e.g. "edema",
            // "cl@ve", "nif"). js/app.js never renders a link to the
            // entry itself because language switches route to a different
            // language, not the same id.
            if (!DICCIONARIOS[targetLang].some(function (e) { return e.id === otherId; })) {
              fail(language + "/" + entry.id + ": traduccion." + targetLang + " references unknown id \"" + otherId + "\"");
            }
          });
        });
      }
    }
  });

  ok(language + ": " + entries.length + " words, no duplicate ids and no missing pictograms");
});

// --- 5. Every t("...") key app.js uses exists in every language ---
// "topic_" and "languageName_" aren't real keys: app.js builds them as
// t("topic_" + situacion) / t("languageName_" + lang), so the static scan
// only sees the prefix. The full keys (topic_tramites, languageName_es, ...)
// ARE checked, since they appear in full in js/i18n.js and in index.html.
const DYNAMIC_PREFIXES = ["topic_", "languageName_"];
const appSrc = fs.readFileSync(path.join(ROOT, "js/app.js"), "utf8");
const usedKeys = new Set();
const keyRe = /\bt\(\s*["']([a-zA-Z0-9_-]+)["']/g;
let m;
while ((m = keyRe.exec(appSrc))) {
  if (DYNAMIC_PREFIXES.indexOf(m[1]) === -1) usedKeys.add(m[1]);
}

languages.forEach(function (language) {
  usedKeys.forEach(function (key) {
    if (!(key in I18N[language])) {
      fail("js/i18n.js: missing key \"" + key + "\" for language \"" + language + "\"");
    }
  });
});
ok("interface keys checked (" + usedKeys.size + ") across " + languages.join(", "));

// --- 6. Every id app.js looks up with getElementById exists in index.html ---
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const usedIds = new Set();
const idRe = /getElementById\(["']([^"']+)["']\)/g;
while ((m = idRe.exec(appSrc))) usedIds.add(m[1]);

usedIds.forEach(function (id) {
  if (html.indexOf('id="' + id + '"') === -1) {
    fail("index.html: missing element with id=\"" + id + "\" (used in js/app.js)");
  }
});
ok("DOM ids checked (" + usedIds.size + ")");

// --- 6b. Every data-i18n* key index.html uses exists in every language ---
// Unlike the literal t("...") calls checked in step 5, these keys are read
// dynamically at runtime (js/app.js: el.getAttribute("data-i18n[-html|
// -placeholder|-aria-label]")), so that static scan can't see them. A typo'd
// or missing key here doesn't throw — translate() falls back to returning
// the raw key (js/i18n.js#translate) — so the only symptom is literal key
// names (e.g. "searchLabel") rendered on the page instead of real text.
const htmlI18nKeys = new Set();
const htmlI18nRe = /data-i18n(?:-html|-placeholder|-aria-label)?="([^"]+)"/g;
while ((m = htmlI18nRe.exec(html))) htmlI18nKeys.add(m[1]);

languages.forEach(function (language) {
  htmlI18nKeys.forEach(function (key) {
    if (!(key in I18N[language])) {
      fail("index.html: missing key \"" + key + "\" for language \"" + language + "\" (used via data-i18n*)");
    }
  });
});
ok("index.html data-i18n keys checked (" + htmlI18nKeys.size + ") across " + languages.join(", "));

// --- 6c. js/data.*.js cache-busting: ?v= must be a hash of the file it names ---
// _headers caches /js/data.* as `public, max-age=31536000, immutable` on
// purpose (the dictionaries are big and change rarely) — but that means the
// ONLY way a returning visitor ever sees new/edited entries is if the
// <script src="js/data.es.js?v=..."> query string changes, since `immutable`
// tells the browser to never even revalidate. A date-string version relied
// on every editor remembering to bump it by hand on every content change;
// this is exactly the bug already fixed once for js/i18n.js (see 52e46b7)
// but that fix only moved i18n.js to a short cache — js/data.*.js kept the
// manual-bump footgun and re-triggered the same failure mode (dictionary
// expansion shipped, ?v= left stale, returning visitors never saw the new
// words). Hashing the actual file content removes the human-memory step:
// the query string is either right or CI fails with the exact value to
// paste in.
function contentHash(relativePath) {
  const content = fs.readFileSync(path.join(ROOT, relativePath));
  return crypto.createHash("sha256").update(content).digest("hex").slice(0, 10);
}

// 404.html carries its own copy of these <script> tags (it's a standalone
// page, not routed through index.html), so it's just as exposed to the
// stale-immutable-cache bug and gets the same check.
const html404Path = path.join(ROOT, "404.html");
const htmlPages = [{ file: "index.html", content: html }];
if (fs.existsSync(html404Path)) {
  htmlPages.push({ file: "404.html", content: fs.readFileSync(html404Path, "utf8") });
}

htmlPages.forEach(function (page) {
  ["es", "en"].forEach(function (language) {
    const relativePath = "js/data." + language + ".js";
    const tagRe = new RegExp('<script src="js/data\\.' + language + '\\.js(?:\\?v=([^"]*))?">');
    const tagMatch = page.content.match(tagRe);
    if (!tagMatch) return; // this page doesn't load the dictionary at all
    const expected = contentHash(relativePath);
    if (tagMatch[1] !== expected) {
      fail(
        page.file + ": " + relativePath + " query string is \"" + (tagMatch[1] || "(none)") +
        "\" but the file's content hash is \"" + expected + "\" — bump it to " +
        "?v=" + expected + " or returning visitors keep the immutable-cached stale " +
        "dictionary (see _headers' js/data.* Cache-Control policy)"
      );
    }
  });
});
ok("js/data.*.js cache-busting query strings checked (es: " + contentHash("js/data.es.js") + ", en: " + contentHash("js/data.en.js") + ")");

// --- 7. The user-facing product never names disability or minors ---
// doc/en/spec.md's rule ("Mandatory rule: zero mentions in the user-facing
// product"): every page a visitor can actually reach — index.html,
// js/i18n.js, and anything under about/ (it's deployed, unauthenticated,
// and listed in sitemap.xml, so "noindex" and "not linked" don't make it
// private) — may not mention, directly or indirectly, intellectual
// disability, occupational therapy, minors, or equivalent expressions.
// js/data.*.js is deliberately out of scope: a paperwork word like
// "disability certificate" could legitimately be a future dictionary entry.
//
// `match` distinguishes substring terms (Spanish phrases and unambiguous
// English stems like "occupational therap", "disabilit", "special needs")
// from word-boundary terms (the English words "minor", "underage",
// "children" — too ambiguous as substrings, e.g. "minor annoyance").
const FORBIDDEN_TERMS = [
  { term: "discapacidad", match: "substring" },
  { term: "disabilit", match: "substring" }, // disability / disabilities
  { term: "intelectual", match: "substring" },
  { term: "intellectual", match: "substring" },
  { term: "terapia ocupacional", match: "substring" },
  { term: "occupational therap", match: "substring" },
  { term: "dificultades cognitivas", match: "substring" },
  { term: "cognitive difficult", match: "substring" },
  { term: "necesidades especiales", match: "substring" },
  { term: "special needs", match: "substring" },
  { term: "capacidades diferentes", match: "substring" },
  { term: "menor de edad", match: "substring" },
  { term: "menores de edad", match: "substring" },
  { term: "personas menores", match: "substring" },
  { term: "minor", match: "word" }, // minor / minors
  { term: "underage", match: "word" },
  { term: "children", match: "word" },
];
const rawI18nSrc = fs.readFileSync(path.join(ROOT, "js/i18n.js"), "utf8");
const aboutDir = path.join(ROOT, "about");
// Only `about/privacidad.html` is user-facing for the purpose of this
// rule. `about/index.html` is the project presentation — it tells the
// project's origin and internal context, the same way the §2 "Audience"
// section of every sibling's SPEC does, and the same exemption applies.
const aboutTargets = fs.existsSync(aboutDir)
  ? fs
      .readdirSync(aboutDir)
      .filter(function (f) { return f === "privacidad.html"; })
      .map(function (f) {
        return {
          file: "about/" + f,
          content: fs.readFileSync(path.join(aboutDir, f), "utf8"),
        };
      })
  : [];

[
  { file: "index.html", content: html },
  { file: "js/i18n.js", content: rawI18nSrc },
].concat(aboutTargets).forEach(function (target) {
  var normalized = normalize(target.content);
  FORBIDDEN_TERMS.forEach(function (entry) {
    var term = entry.term;
    var hit;
    if (entry.match === "word") {
      hit = new RegExp("\\b" + term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b").test(normalized);
    } else {
      hit = normalized.indexOf(normalize(term)) !== -1;
    }
    if (hit) {
      fail(target.file + ": contains \"" + term + "\" — no page a visitor can reach may mention disability, occupational therapy, or minors (see doc/en/spec.md)");
    }
  });
});
ok("index.html, js/i18n.js, and about/*.html do not mention disability, occupational therapy, or minors");

// --- _headers: CSP source-expression quoting ---
// Every quoted Content-Security-Policy source expression (e.g. 'self')
// must have exactly one leading and one trailing quote — catches
// malformed quoting like ''self'' that browsers silently drop, turning
// a directive into "block everything". This bit the sibling teclatlon
// project in production; see its CLOUDFLARE.md for the story.
(function () {
  var headersContent = fs.readFileSync(path.join(ROOT, "_headers"), "utf8");
  var malformed = [];
  headersContent.split("\n").filter(function (line) {
    return /^\s*Content-Security-Policy:/i.test(line);
  }).forEach(function (line) {
    var value = line.replace(/^\s*Content-Security-Policy:/i, "");
    value.split(";").forEach(function (directive) {
      directive.trim().split(/\s+/).filter(Boolean).forEach(function (token) {
        var quoteCount = (token.match(/'/g) || []).length;
        if (quoteCount === 0) return;
        var wellFormed = quoteCount === 2 && token[0] === "'" && token[token.length - 1] === "'";
        if (!wellFormed) malformed.push(token);
      });
    });
  });
  if (malformed.length) {
    fail("_headers: malformed CSP source expression(s): " + malformed.join(", ") +
      " — quotes should wrap the keyword exactly once (e.g. 'self', not ''self'')");
  } else {
    ok("_headers: CSP source expressions are quoted correctly");
  }
})();

// --- _redirects: stays within Cloudflare's per-file limits
// (https://developers.cloudflare.com/pages/configuration/redirects/):
// a maximum of 2 000 static redirects and 100 dynamic (placeholder)
// redirects per file — 2 100 in total. If the file is absent (the
// common case for projects that have no redirects at all) the check
// is skipped: zero is valid. Sinonimia currently has no _redirects,
// so this branch is the active one in CI.
(function () {
  const redirectsFile = path.join(ROOT, "_redirects");
  if (!fs.existsSync(redirectsFile)) {
    ok("_redirects: absent, OK (zero redirects is valid)");
    return;
  }
  const lines = fs.readFileSync(redirectsFile, "utf8").split("\n");
  let staticCount = 0;
  let dynamicCount = 0;
  lines.forEach(function (line) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.charAt(0) === "#") return;
    const isStatic = /\s(?:200|301|302|303|307|308)\s*$/.test(trimmed) && !/:\w+\$/.test(trimmed);
    const isDynamic = /:\w+\$/.test(trimmed);
    if (isStatic) staticCount += 1;
    else if (isDynamic) dynamicCount += 1;
  });
  const STATIC_LIMIT = 2000;
  const DYNAMIC_LIMIT = 100;
  if (staticCount > STATIC_LIMIT) {
    fail("_redirects: " + staticCount + " static redirects, max is " + STATIC_LIMIT +
      " (Cloudflare Pages rejects the file)");
  }
  if (dynamicCount > DYNAMIC_LIMIT) {
    fail("_redirects: " + dynamicCount + " dynamic redirects, max is " + DYNAMIC_LIMIT +
      " (Cloudflare Pages rejects the file)");
  }
  if (staticCount <= STATIC_LIMIT && dynamicCount <= DYNAMIC_LIMIT) {
    ok("_redirects: " + staticCount + " static, " + dynamicCount + " dynamic (within Cloudflare limits)");
  }
})();

// --- _headers: stays within Cloudflare's per-file limit of 100
// header rules per file
// (https://developers.cloudflare.com/pages/configuration/headers/).
// Both path-glob lines and individual Key: value lines are counted,
// because Cloudflare's published limit of 100 applies to the total
// number of lines in `_headers`, per the wording at the URL above.
// The 7 currently shipped suites all stay well under 100 either way.
(function () {
  const headersFile = path.join(ROOT, "_headers");
  if (!fs.existsSync(headersFile)) {
    ok("_headers: absent, OK");
    return;
  }
  const lines = fs.readFileSync(headersFile, "utf8").split("\n");
  let ruleCount = 0;
  for (let i = 0; i < lines.length; i++) {
    const hLine = lines[i];
    const hTrim = hLine.trim();
    if (!hTrim || hTrim.charAt(0) === "#") continue;
    if (hLine.charAt(0) === "/" && !/^\/.*:/.test(hLine)) {
      ruleCount += 1;
      continue;
    }
    if (/^[A-Za-z][\w-]*:\s/.test(hLine)) ruleCount += 1;
  }
  const HEADERS_RULE_LIMIT = 100;
  if (ruleCount > HEADERS_RULE_LIMIT) {
    fail("_headers: " + ruleCount + " rule lines (path-globs + headers), max is " +
      HEADERS_RULE_LIMIT + " (Cloudflare Pages rejects the file)");
  } else {
    ok("_headers: " + ruleCount + " rule lines (within Cloudflare limit)");
  }
})();

// --- 25 MB per-file limit (Cloudflare Pages):
// https://developers.cloudflare.com/pages/limits/. Warns at 20 MB
// (legal but worth a nudge before the next content commit pushes it
// over) and fails at 25 MB (Cloudflare will reject the deploy). Only
// walks files that actually deploy: .git/, node_modules/, .claude/
// (graphify skill + agent settings, never uploaded), graphify-out*
// (build artifacts), scripts/ingest/ (sinonimia's batch content
// pipeline, contains multi-megabyte plaintext wordlists and ARASAAC
// cache files — never shipped), and scripts/download/ (downloaded
// source caches like the ~500 MB Kaikki EN extract, gitignored, never
// shipped either — one shared download/ for the whole project since
// 2026-09-05, see PROGRESS.md). This check cares about what Cloudflare
// serves, not the maintainer's working area.
const FILE_SIZE_WARN_MB = 20;
const FILE_SIZE_FAIL_MB = 25;
const sizeExcluded = new Set([".git", "node_modules", ".claude", "graphify-out", "graphify-out-meta", "ingest", "download"]);
const largeFileWarnings = [];
(function walkForLargeFiles(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir, { withFileTypes: true }).forEach(function (entry) {
    if (sizeExcluded.has(entry.name)) return;
    const full = path.join(dir, entry.name);
    // scripts/ingest is the batch content pipeline; exclude both the
    // top-level and any sub-folder inside it.
    if (full.indexOf(path.sep + "scripts" + path.sep + "ingest") !== -1) return;
    if (entry.isDirectory()) {
      walkForLargeFiles(full);
    } else if (entry.isFile()) {
      const size = fs.statSync(full).size;
      const sizeMb = size / (1024 * 1024);
      if (sizeMb >= FILE_SIZE_FAIL_MB) {
        fail(path.relative(ROOT, full).split(path.sep).join("/") + ": " +
          sizeMb.toFixed(2) + " MB, max per file is " + FILE_SIZE_FAIL_MB +
          " MB (Cloudflare Pages rejects the deploy)");
      } else if (sizeMb >= FILE_SIZE_WARN_MB) {
        largeFileWarnings.push(path.relative(ROOT, full).split(path.sep).join("/") +
          ": " + sizeMb.toFixed(2) + " MB (warning: still legal, getting close)");
      }
    }
  });
})(ROOT);
if (largeFileWarnings.length) {
  console.log("");
  console.warn("WARNINGS (" + largeFileWarnings.length + ") - non-blocking, see https://developers.cloudflare.com/pages/limits/ (25 MB per-file limit):");
  largeFileWarnings.forEach(function (w) { console.warn("  - " + w); });
}

// --- Result ---
console.log("");
if (errorCount > 0) {
  console.error(errorCount + " problem(s) found.");
  process.exit(1);
} else {
  console.log("All checks passed.");
}
