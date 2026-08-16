#!/usr/bin/env node
/*
 * Content-gap report for Sinonimia. Zero dependencies, run locally:
 *   node scripts/estado-contenido.js
 *
 * This is the first step of the content-growth process documented in
 * doc/en/SPEC.md ("Process for expanding content"). It does NOT write or
 * suggest definitions — writing a lectura-fácil definition needs editorial
 * judgment (see doc/en/SPEC.md's writing rules) and can't be templated safely.
 * What it CAN automate is the bookkeeping a human (or an AI agent) needs
 * before adding words, without ever having to open the raw
 * js/data.<lang>.js files (over a megabyte each, tens of thousands of
 * lines) to get it:
 *
 *   1. Which categories are thin and should be grown first.
 *   2. What headwords and synonyms already exist per category, so a
 *      newly proposed word doesn't duplicate a concept that's already
 *      covered under a different headword.
 *   3. With --detalle, also each entry's definicion and ejemplo, so a new
 *      entry doesn't just avoid the same headword but also avoids
 *      recycling the same illustrative scenario/angle across a category
 *      (the same "varied repetition, not redundancy" concern
 *      CLAUDE.md documents for Memofun's deck series, one level down).
 *   4. Whether the two languages have drifted far apart in size.
 *
 * Usage:
 *   node scripts/estado-contenido.js                     # summary + gaps
 *   node scripts/estado-contenido.js --detalle            # + word/synonym/definicion/ejemplo per category
 *   node scripts/estado-contenido.js --detalle --categoria salud --lang es
 *                                                          # scoped to one category+language — the
 *                                                          # right-sized digest before writing a batch,
 *                                                          # see "Process for expanding content" step 1
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const MIN_WORDS_PER_TOPIC = 8; // matches doc/en/SPEC.md's "un puñado de palabras reales"
const detailed = process.argv.includes("--detalle") || process.argv.includes("--detail");

function argValue(flag) {
  const withEquals = process.argv.find(function (a) { return a.indexOf(flag + "=") === 0; });
  if (withEquals) return withEquals.slice(flag.length + 1);
  const idx = process.argv.indexOf(flag);
  if (idx !== -1 && process.argv[idx + 1] && process.argv[idx + 1].indexOf("--") !== 0) {
    return process.argv[idx + 1];
  }
  return null;
}

const categoriaFilter = argValue("--categoria");
const langFilter = argValue("--lang");

function loadAsGlobal(relativePath, pattern, replacement) {
  const src = fs.readFileSync(path.join(ROOT, relativePath), "utf8").split(pattern).join(replacement);
  // eslint-disable-next-line no-eval
  eval(src);
}

loadAsGlobal("js/data.es.js", "window.DICCIONARIOS", "global.DICCIONARIOS");
loadAsGlobal("js/data.en.js", "window.DICCIONARIOS", "global.DICCIONARIOS");
loadAsGlobal("js/i18n.js", "const I18N", "global.I18N");

let languages = Object.keys(DICCIONARIOS);
if (langFilter) {
  if (languages.indexOf(langFilter) === -1) {
    console.error("Unknown --lang \"" + langFilter + "\" — known languages: " + languages.join(", "));
    process.exit(1);
  }
  languages = [langFilter];
}

function groupByTopic(entries) {
  const groups = {};
  entries.forEach(function (entry) {
    if (!groups[entry.situacion]) groups[entry.situacion] = [];
    groups[entry.situacion].push(entry);
  });
  return groups;
}

// Union of every topic key that appears in any language's I18N block or
// any dictionary, so a topic with zero words in one language still shows up.
function allTopicKeys() {
  const keys = new Set();
  languages.forEach(function (lang) {
    Object.keys(I18N[lang]).forEach(function (k) {
      if (k.indexOf("topic_") === 0) keys.add(k.slice("topic_".length));
    });
  });
  return Array.from(keys).sort();
}

console.log("=== Sinonimia — content-gap report ===\n");

let topics = allTopicKeys();
if (categoriaFilter) {
  if (topics.indexOf(categoriaFilter) === -1) {
    console.error("Unknown --categoria \"" + categoriaFilter + "\" — known categories: " + topics.join(", "));
    process.exit(1);
  }
  topics = [categoriaFilter];
}

languages.forEach(function (lang) {
  const entries = DICCIONARIOS[lang];
  const grouped = groupByTopic(entries);

  console.log("--- " + lang + " (" + entries.length + " words total) ---");
  topics.forEach(function (topic) {
    const list = grouped[topic] || [];
    const label = I18N[lang]["topic_" + topic] || topic;
    const flag = list.length < MIN_WORDS_PER_TOPIC ? "  <- needs more words" : "";
    console.log("  " + topic.padEnd(16) + label.padEnd(16) + list.length + flag);

    if (detailed && list.length) {
      list.forEach(function (entry) {
        const synonyms = entry.sinonimos.join(", ");
        console.log(
          "      - " + entry.palabra + " (" + entry.id + "): " + synonyms +
          " | " + entry.definicion +
          " | ej: " + entry.ejemplo.texto
        );
      });
    }
  });
  console.log("");
});

// Flag categories where the two languages have drifted far apart in size —
// useful to know before adding a batch of words in only one language.
if (languages.length > 1) {
  console.log("--- Balance across languages ---");
  topics.forEach(function (topic) {
    const counts = languages.map(function (lang) {
      return (groupByTopic(DICCIONARIOS[lang])[topic] || []).length;
    });
    const max = Math.max.apply(null, counts);
    const min = Math.min.apply(null, counts);
    if (max - min >= 4) {
      console.log(
        "  " + topic + ": " +
        languages.map(function (lang, i) { return lang + "=" + counts[i]; }).join(", ") +
        "  <- uneven"
      );
    }
  });
  console.log("");
}

console.log(
  "Next step: pick a topic flagged above, research candidate words for it\n" +
  "(see \"Process for expanding content\" in doc/en/SPEC.md). Re-run scoped\n" +
  "to it — e.g. node scripts/estado-contenido.js --detalle --categoria " +
  (categoriaFilter || "<topic>") + " --lang " + (langFilter || "<es|en>") + " —\n" +
  "to see existing headwords, synonyms, definiciones and ejemplos so you\n" +
  "don't duplicate a concept or recycle the same illustrative scenario.\n" +
  "Write each entry following the lectura-fácil rules, find its pictogram\n" +
  "with scripts/buscar-pictograma.js, then run scripts/validar.js."
);
