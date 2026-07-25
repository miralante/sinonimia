#!/usr/bin/env node
/*
 * Sinonimia's validator. No dependencies (plain Node), so anyone can run it
 * without installing anything: node scripts/validar.js
 *
 * Checks what an editor can't: that every example sentence really contains
 * the word it claims to contain, that no pictogram is missing, that
 * interface keys exist in every language, etc. Meant to run locally before
 * a commit and in CI on every pull request.
 */

const fs = require("fs");
const path = require("path");
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

function normalize(text) {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

// --- 1. Syntax of every JS file ---
const jsFiles = ["js/i18n.js", "js/data.es.js", "js/data.en.js", "js/app.js"];
jsFiles.forEach(function (relativePath) {
  try {
    execFileSync(process.execPath, ["--check", path.join(ROOT, relativePath)]);
    ok("syntax OK: " + relativePath);
  } catch (e) {
    fail("syntax error in " + relativePath);
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
const VALID_TOPICS = ["tramites", "salud", "vida-diaria", "finanzas", "vivienda", "trabajo", "legal"];
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
  });

  ok(language + ": " + entries.length + " words, no duplicate ids and no missing pictograms");
});

// --- 5. Every t("...") key app.js uses exists in every language ---
// "tema_" is not a real key: app.js builds it as t("tema_" + situacion), so
// the static scan only sees the prefix. The full keys (tema_tramites,
// tema_salud, tema_vida-diaria) ARE checked, since they appear in full in
// js/i18n.js and in index.html.
const DYNAMIC_PREFIXES = ["tema_"];
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

// --- 7. The user-facing product never names disability ---
// PRODUCT.md's rule ("Mandatory rule: zero mentions in the user-facing
// product"): index.html and js/i18n.js are the only things the end user
// sees, and they may not mention, directly or indirectly, intellectual
// disability or occupational therapy. js/data.*.js is deliberately out of
// scope: a paperwork word like "disability certificate" could legitimately
// be a future dictionary entry.
const FORBIDDEN_TERMS = [
  "discapacidad",
  "disabilit", // disability / disabilities
  "intelectual",
  "intellectual",
  "terapia ocupacional",
  "occupational therap",
  "dificultades cognitivas",
  "cognitive difficult",
  "necesidades especiales",
  "special needs",
  "capacidades diferentes",
];
const rawI18nSrc = fs.readFileSync(path.join(ROOT, "js/i18n.js"), "utf8");

[
  { file: "index.html", content: html },
  { file: "js/i18n.js", content: rawI18nSrc },
].forEach(function (target) {
  var normalized = normalize(target.content);
  FORBIDDEN_TERMS.forEach(function (term) {
    if (normalized.indexOf(normalize(term)) !== -1) {
      fail(target.file + ": contains \"" + term + "\" — the user-facing product may not mention disability or occupational therapy (see PRODUCT.md)");
    }
  });
});
ok("index.html and js/i18n.js do not mention disability or occupational therapy");

// --- Result ---
console.log("");
if (errorCount > 0) {
  console.error(errorCount + " problem(s) found.");
  process.exit(1);
} else {
  console.log("All checks passed.");
}
