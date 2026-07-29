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
 * before adding words:
 *
 *   1. Which categories are thin and should be grown first.
 *   2. What headwords and synonyms already exist per category, so a
 *      newly proposed word doesn't duplicate a concept that's already
 *      covered under a different headword.
 *   3. Whether the two languages have drifted far apart in size.
 *
 * Usage:
 *   node scripts/estado-contenido.js            # summary + gaps
 *   node scripts/estado-contenido.js --detalle   # + full word/synonym list per category
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const MIN_WORDS_PER_TOPIC = 8; // matches doc/en/SPEC.md's "un puñado de palabras reales"
const detailed = process.argv.includes("--detalle") || process.argv.includes("--detail");

function loadAsGlobal(relativePath, pattern, replacement) {
  const src = fs.readFileSync(path.join(ROOT, relativePath), "utf8").split(pattern).join(replacement);
  // eslint-disable-next-line no-eval
  eval(src);
}

loadAsGlobal("js/data.es.js", "window.DICCIONARIOS", "global.DICCIONARIOS");
loadAsGlobal("js/data.en.js", "window.DICCIONARIOS", "global.DICCIONARIOS");
loadAsGlobal("js/i18n.js", "const I18N", "global.I18N");

const languages = Object.keys(DICCIONARIOS);

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
      if (k.indexOf("tema_") === 0) keys.add(k.slice("tema_".length));
    });
  });
  return Array.from(keys).sort();
}

console.log("=== Sinonimia — content-gap report ===\n");

const topics = allTopicKeys();

languages.forEach(function (lang) {
  const entries = DICCIONARIOS[lang];
  const grouped = groupByTopic(entries);

  console.log("--- " + lang + " (" + entries.length + " words total) ---");
  topics.forEach(function (topic) {
    const list = grouped[topic] || [];
    const label = I18N[lang]["tema_" + topic] || topic;
    const flag = list.length < MIN_WORDS_PER_TOPIC ? "  <- needs more words" : "";
    console.log("  " + topic.padEnd(16) + label.padEnd(16) + list.length + flag);

    if (detailed && list.length) {
      list.forEach(function (entry) {
        const synonyms = entry.sinonimos.join(", ");
        console.log("      - " + entry.palabra + " (" + entry.id + "): " + synonyms);
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
  "(see \"Process for expanding content\" in doc/en/SPEC.md), check the\n" +
  "headwords/synonyms already listed with --detalle so you don't duplicate\n" +
  "a concept, write each entry following the lectura-fácil rules, find its\n" +
  "pictogram with scripts/buscar-pictograma.js, then run scripts/validar.js."
);
