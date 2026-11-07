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

const ROOT = path.join(__dirname, "..");
const jsDir = path.join(ROOT, "js");
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

require("./checks/source-files.js").run({ ROOT: ROOT, fail: fail, ok: ok });

// --- 3. Load the dictionaries and the interface texts without a browser ---
function loadAsGlobal(relativePath, pattern, replacement) {
  const src = fs.readFileSync(path.join(ROOT, relativePath), "utf8").split(pattern).join(replacement);
  // eslint-disable-next-line no-eval
  eval(src);
}

loadAsGlobal(
  "js/dictionary-manifest.js",
  "window.SINONIMIA_DICTIONARY_SHARDS",
  "global.SINONIMIA_DICTIONARY_SHARDS"
);

function manifestDataFiles() {
  const manifest = global.SINONIMIA_DICTIONARY_SHARDS;
  if (!manifest || typeof manifest !== "object") {
    fail("js/dictionary-manifest.js did not define a shard manifest");
    return [];
  }

  const files = [];
  const seen = new Set();
  Object.keys(manifest).forEach(function (language) {
    const shards = manifest[language];
    if (!Array.isArray(shards) || shards.length === 0) {
      fail("dictionary manifest: " + language + " has no shards");
      return;
    }
    shards.forEach(function (shard) {
      if (!shard || typeof shard.file !== "string" || typeof shard.src !== "string") {
        fail("dictionary manifest: invalid shard in " + language);
        return;
      }
      if (seen.has(shard.file)) {
        fail("dictionary manifest: shard listed twice: " + shard.file);
        return;
      }
      if (shard.src.split("?v=")[0] !== shard.file) {
        fail("dictionary manifest: file and src disagree for " + shard.file);
        return;
      }
      if (!/^js\/data\.[a-z0-9-]+(?:\.[a-z0-9-]+)*\.js$/.test(shard.file) ||
          !/^js\/data\.[a-z0-9-]+(?:\.[a-z0-9-]+)*\.js\?v=[a-f0-9]{10}$/.test(shard.src)) {
        fail("dictionary manifest: invalid shard path or URL for " + shard.file);
        return;
      }
      if (!fs.existsSync(path.join(ROOT, shard.file))) {
        fail("dictionary manifest: missing file " + shard.file);
        return;
      }
      seen.add(shard.file);
      files.push(shard.file);
    });
  });

  // A data file that exists on disk but is absent from the manifest would
  // look valid in a Node-only check and still be invisible in the browser.
  // Fail that drift explicitly so every future shard is wired into the boot
  // sequence.
  fs.readdirSync(jsDir).filter(function (file) {
    return /^data\.[a-z0-9-]+(?:\.[a-z0-9-]+)*\.js$/.test(file);
  }).forEach(function (file) {
    const relativePath = "js/" + file;
    if (!seen.has(relativePath)) {
      fail("dictionary manifest: data file is not listed: " + relativePath);
    }
  });
  return files;
}

const dictionaryFiles = manifestDataFiles();
dictionaryFiles.forEach(function (relativePath) {
  loadAsGlobal(relativePath, "window.DICCIONARIOS", "global.DICCIONARIOS");
});

// The service worker keeps two caches (see sw.js): the shell (FILES, tied to
// VERSION) and a data cache for the generated dictionary files, whose list it
// reads from js/dictionary-data.js via importScripts. The shell must carry the
// manifest and the loader, must NOT list the (large, content-hashed) dictionary
// files, and must import the manifest.
const swPath = path.join(ROOT, "sw.js");
if (fs.existsSync(swPath)) {
  const swSource = fs.readFileSync(swPath, "utf8");
  const filesMatch = swSource.match(/(?:FILES|ARCHIVOS)\s*=\s*\[([\s\S]*?)\]/);
  const cachedFiles = filesMatch
    ? Array.from(filesMatch[1].matchAll(/["']\.\/([^"']+)["']/g)).map(function (match) { return match[1]; })
    : [];
  ["js/dictionary-data.js", "js/dictionary-loader.js"].forEach(function (relativePath) {
    if (cachedFiles.indexOf(relativePath) === -1) {
      fail("sw.js: dictionary asset is missing from FILES: " + relativePath);
    }
  });
  cachedFiles.filter(function (file) { return /^js\/(?:dict|data)\./.test(file); }).forEach(function (file) {
    fail("sw.js: " + file + " must not be in FILES — dictionary files live in the data cache (DATA_CACHE)");
  });
  if (!/importScripts\(\s*['"]\.\/js\/dictionary-data\.js['"]\s*\)/.test(swSource)) {
    fail("sw.js: must importScripts('./js/dictionary-data.js') to know which dictionary files to store offline");
  }
  if (!/DATA_CACHE/.test(swSource) || !/warm-dictionary/.test(swSource)) {
    fail("sw.js: the offline dictionary copy (DATA_CACHE / warm-dictionary) is missing");
  }
  if (!/IMG_CACHE/.test(swSource) || !/warm-images/.test(swSource)) {
    fail("sw.js: the offline pictogram copy (IMG_CACHE / warm-images) is missing");
  }
  ok("sw.js shell cache and dictionary data cache contract checked");
}
loadAsGlobal("js/i18n.js", "const I18N", "global.I18N");

const languages = Object.keys(DICCIONARIOS);
ok("languages found: " + languages.join(", "));

// --- 4. Every entry: unique id, image present, well-formed example ---
// The regenerated dictionary introduced seven topics (arte, comida, historia,
// naturaleza, deportes, juegos, sociedad). This list lagged behind it and
// reported 41 entries as invalid. app.js renders the topic with
// t("topic_" + situacion), so a topic missing here is also a topic missing
// from js/i18n.js — keep the two in sync. Measured over all 116,396 entries.
const VALID_TOPICS = ["tramites", "salud", "vida-diaria", "finanzas", "vivienda", "trabajo", "legal", "tecnologia", "seguridad", "educacion", "conocimiento",
  "arte", "comida", "historia", "naturaleza", "deportes", "juegos", "sociedad"];
const imgDir = path.join(ROOT, "img");
const imagesOnDisk = fs.readdirSync(imgDir);

languages.forEach(function (language) {
  const entries = DICCIONARIOS[language];
  const seenIds = Object.create(null);

  entries.forEach(function (entry) {
    if (seenIds[entry.id]) {
      fail(language + ": duplicate id \"" + entry.id + "\"");
    }
    seenIds[entry.id] = true;

    if (VALID_TOPICS.indexOf(entry.situacion) === -1) {
      fail(language + "/" + entry.id + ": situacion \"" + entry.situacion + "\" is not a valid key");
    }

    if (!entry.image || !entry.image.id || !entry.image.alt) {
      fail(language + "/" + entry.id + ": missing image.id or image.alt");
    } else if (imagesOnDisk.indexOf(entry.image.id + ".png") === -1) {
      fail(language + "/" + entry.id + ": img/" + entry.image.id + ".png does not exist");
    }

    [
      ["example", entry.example],
      ["exampleSynonym", entry.exampleSynonym],
    ].forEach(function (pair) {
      var fieldName = pair[0], value = pair[1];
      if (!value || !value.text || !value.word) {
        fail(language + "/" + entry.id + ": missing text or word in " + fieldName);
        return;
      }
      var idx = normalize(value.text).indexOf(normalize(value.word));
      if (idx === -1) {
        fail(language + "/" + entry.id + ": \"" + value.word + "\" does not appear inside " + fieldName + ".text");
      }
    });

    // `translation` is an OPTIONAL field — entries that resolve to their
    // counterpart by the shared-pictogram rule don't need it. When it IS
    // set, validate the shape: object keyed by language code, values are
    // either a single id string or an array of id strings, every id must
    // exist in the referenced language's dictionary and must not be the
    // entry's own id. Self-references would produce an obvious "see this
    // word in the other language" loop; an unknown id would produce a
    // broken link.
    if (entry.translation) {
      if (typeof entry.translation !== "object" || Array.isArray(entry.translation)) {
        fail(language + "/" + entry.id + ": translation must be an object keyed by language code, got " + typeof entry.translation);
      } else {
        Object.keys(entry.translation).forEach(function (targetLang) {
          if (targetLang === language) {
            fail(language + "/" + entry.id + ": translation must not reference the entry's own language \"" + targetLang + "\"");
            return;
          }
          if (!DICCIONARIOS[targetLang]) {
            fail(language + "/" + entry.id + ": translation references unknown language \"" + targetLang + "\"");
            return;
          }
          var raw = entry.translation[targetLang];
          var ids = Array.isArray(raw) ? raw : [raw];
          ids.forEach(function (otherId) {
            if (typeof otherId !== "string") {
              fail(language + "/" + entry.id + ": translation." + targetLang + " must be a string id or array of ids");
              return;
            }
            // We allow `otherId === entry.id` — that's a legitimate link
            // when the same id exists in both languages (e.g. "edema",
            // "cl@ve", "nif"). js/app.js never renders a link to the
            // entry itself because language switches route to a different
            // language, not the same id.
            if (!DICCIONARIOS[targetLang].some(function (e) { return e.id === otherId; })) {
              fail(language + "/" + entry.id + ": translation." + targetLang + " references unknown id \"" + otherId + "\"");
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

// --- 6c. Dictionary shard manifest and cache-busting ---
// _headers caches /js/data.* as `public, max-age=31536000, immutable`. Every
// shard therefore carries its own content hash in the manifest. The manifest
// is the single source of truth for both pages and for the Node-side loaders;
// adding data.es.3.js (or a named shard) requires no code change elsewhere.
function contentHash(relativePath) {
  const content = fs.readFileSync(path.join(ROOT, relativePath));
  return crypto.createHash("sha256").update(content).digest("hex").slice(0, 10);
}

const html404Path = path.join(ROOT, "404.html");
const htmlPages = [{ file: "index.html", content: html }];
if (fs.existsSync(html404Path)) {
  htmlPages.push({ file: "404.html", content: fs.readFileSync(html404Path, "utf8") });
}

htmlPages.forEach(function (page) {
  if (!/<script src="js\/dictionary-data\.js"><\/script>/.test(page.content)) {
    fail(page.file + ": missing dictionary-data.js script tag");
  }
  // Only index.html loads dictionary content; 404.html just needs the language list.
  if (page.file === "index.html" && !/<script src="js\/dictionary-loader\.js"><\/script>/.test(page.content)) {
    fail(page.file + ": missing dictionary-loader.js script tag");
  }
  if (/js\/dictionary-manifest\.js/.test(page.content)) {
    fail(page.file + ": must not load js/dictionary-manifest.js (source manifest, tooling only)");
  }
});

Object.keys(global.SINONIMIA_DICTIONARY_SHARDS || {}).forEach(function (language) {
  (global.SINONIMIA_DICTIONARY_SHARDS[language] || []).forEach(function (shard) {
    const expected = contentHash(shard.file);
    const expectedSrc = shard.file + "?v=" + expected;
    if (shard.src !== expectedSrc) {
      fail(
        "js/dictionary-manifest.js: " + shard.file + " uses \"" + shard.src +
        "\" but the file hash requires \"" + expectedSrc + "\" — run: node scripts/build-dictionary-data.js"
      );
    }
  });
});
ok("dictionary source manifest and cache-busting checked (" + dictionaryFiles.length + " shard(s))");

// --- 6d. Generated runtime dictionary (index + detail chunks) ---
// The browser and the service worker only ever load js/dict.* and
// js/dictionary-data.js. They are derived from the source shards by
// scripts/build-dictionary-data.js, so this check regenerates them in memory
// and fails on ANY difference: a stale file, a missing file, a leftover file
// or a hand edit. Fix: node scripts/build-dictionary-data.js
(function () {
  const builder = require("./build-dictionary-data.js");
  const { applySynonymMerges } = require("./ingest/pipeline/shared/apply-synonym-merges");
  let built;
  try {
    // Match the production builder: the runtime files omit editorially
    // excluded entries and apply confirmed synonym merges before hashing.
    built = builder.build(applySynonymMerges(DICCIONARIOS));
  } catch (e) {
    fail("scripts/build-dictionary-data.js: " + e.message);
    return;
  }

  let stale = 0;
  const expectedFiles = new Set();
  built.files.forEach(function (file) {
    expectedFiles.add(file.path);
    const target = path.join(ROOT, file.path);
    if (!fs.existsSync(target)) {
      fail(file.path + ": missing — run: node scripts/build-dictionary-data.js");
      stale++;
    } else if (fs.readFileSync(target, "utf8") !== file.content) {
      fail(file.path + ": out of date — run: node scripts/build-dictionary-data.js");
      stale++;
    }
  });
  fs.readdirSync(jsDir).filter(function (f) { return /^dict\..+\.js$/.test(f); }).forEach(function (f) {
    if (!expectedFiles.has("js/" + f)) {
      fail("js/" + f + ": not produced by the dictionary build (stale) — run: node scripts/build-dictionary-data.js");
      stale++;
    }
  });

  const manifestPath = path.join(ROOT, "js/dictionary-data.js");
  if (!fs.existsSync(manifestPath) || fs.readFileSync(manifestPath, "utf8") !== built.manifestSource) {
    fail("js/dictionary-data.js: out of date — run: node scripts/build-dictionary-data.js");
    stale++;
  }

  // Every src in the manifest carries the hash of the file's real content.
  const listed = {};
  Object.keys(built.manifest.languages).forEach(function (lang) {
    ["index", "detail"].forEach(function (kind) {
      built.manifest.languages[lang][kind].forEach(function (shard) {
        if (listed[shard.file]) fail("js/dictionary-data.js: file listed twice: " + shard.file);
        listed[shard.file] = true;
        if (fs.existsSync(path.join(ROOT, shard.file)) &&
            shard.src !== shard.file + "?v=" + contentHash(shard.file)) {
          fail("js/dictionary-data.js: hash of " + shard.file + " does not match its content");
        }
      });
    });
  });

  // The loader and the builder must pick the same detail chunk for every id,
  // or the app would ask for a chunk that does not hold the entry.
  const vm = require("vm");
  const loaderCtx = { document: {} };
  loaderCtx.window = loaderCtx;
  loaderCtx.globalThis = loaderCtx;
  vm.createContext(loaderCtx);
  vm.runInContext(fs.readFileSync(manifestPath, "utf8"), loaderCtx);
  vm.runInContext(fs.readFileSync(path.join(ROOT, "js/dictionary-loader.js"), "utf8"), loaderCtx);
  let chunkMismatch = 0;
  Object.keys(DICCIONARIOS).forEach(function (lang) {
    DICCIONARIOS[lang].forEach(function (entry) {
      if (loaderCtx.SinonimiaDictionary.chunkOf(entry.id) !== builder.chunkOf(entry.id, builder.DETAIL_CHUNKS)) {
        chunkMismatch++;
      }
    });
  });
  if (chunkMismatch) {
    fail("js/dictionary-loader.js chunkOf disagrees with scripts/build-dictionary-data.js for " + chunkMismatch + " id(s)");
  }

  if (stale === 0 && chunkMismatch === 0) {
    ok("generated dictionary data is up to date (" + built.files.length + " files, " +
      Object.keys(built.manifest.languages).join("+") + ")");
  }
})();


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

require("./checks/project-policies.js").run({ ROOT: ROOT, fail: fail, ok: ok });

// --- Result ---
console.log("");
if (errorCount > 0) {
  console.error(errorCount + " problem(s) found.");
  process.exit(1);
} else {
  console.log("All checks passed.");
}
