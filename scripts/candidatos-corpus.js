#!/usr/bin/env node
/*
 * Corpus-based candidate finder — the concrete tool for the "corpus +
 * ontología" technique documented in doc/en/SPEC.md's "Process for
 * expanding content", step 3.
 *
 * Given a domain corpus (a text file YOU curate — paste real excerpts of
 * the kind of document this category deals with: official gazettes for
 * `tramites`/`legal`, patient leaflets for `salud`, payslips or contracts
 * for `trabajo`, etc. — see doc/en/sourcing.md for a source table and a
 * ready-to-use prompt covering all nine categories), it ranks words by
 * *keyness*: how much more often a
 * word shows up in that domain text than in everyday language. A high
 * score means "common in this domain, rare outside it" — exactly the
 * profile of a word that needs a lectura-fácil definition.
 *
 * This tool does NOT pick the category or write anything — it only
 * narrows down where to look, the same way `estado-contenido.js` automates
 * the bookkeeping side of step 3 without touching the editorial part. Each
 * candidate still needs a human (or an AI agent) to check it isn't already
 * covered, that it genuinely belongs in this category (an ontology like
 * UMLS/SNOMED CT for `salud` or EuroVoc for `legal` can help here, but its
 * taxonomy doesn't map 1:1 onto Sinonimia's seven AIVD categories — see
 * doc/en/SPEC.md), and that it's worth an entry at all.
 *
 * General-language baseline: hermitdave/FrequencyWords
 * (https://github.com/hermitdave/FrequencyWords), word-frequency lists
 * built from OpenSubtitles — a large everyday-language sample, which is
 * the right contrast for "hard/technical" (the opposite of everyday). The
 * top-50k list for the chosen language is downloaded once and cached in
 * scripts/.cache/ (gitignored, not part of the site); delete that folder
 * to force a fresh download.
 *
 * Usage:
 *   node scripts/candidatos-corpus.js <archivo-corpus.txt> <es|en> [top-n]
 *
 * Example:
 *   node scripts/candidatos-corpus.js ~/textos/boe-resoluciones.txt es 40
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const CACHE_DIR = path.join(__dirname, ".cache");

// hermitdave/FrequencyWords: one language file per entry. Add a URL here
// before using a language this script doesn't know about yet.
const FREQ_LIST_URL = {
  es: "https://raw.githubusercontent.com/hermitdave/FrequencyWords/master/content/2018/es/es_50k.txt",
  en: "https://raw.githubusercontent.com/hermitdave/FrequencyWords/master/content/2018/en/en_50k.txt",
};

// Function words to ignore — none of these is ever the "hard word" a
// definition targets; keeping them would just clutter the ranking.
const STOPWORDS = {
  es: new Set([
    "de", "la", "el", "los", "las", "un", "una", "unos", "unas", "y", "o",
    "que", "en", "con", "por", "para", "del", "al", "se", "su", "sus", "no",
    "es", "son", "como", "mas", "pero", "le", "les", "lo", "este", "esta",
    "estos", "estas", "ese", "esa", "esos", "esas", "ya", "muy", "sin",
    "sobre", "entre", "tambien", "cuando", "donde", "porque", "si", "asi",
    "hay", "han", "fue", "ser", "estar", "tiene", "puede", "debe", "sera",
    "desde", "hasta", "otro", "otra", "otros", "otras", "cada", "todo",
    "toda", "todos", "todas", "cual", "cuales", "quien", "quienes", "cuyo",
    "cuya", "mismo", "misma", "dicha", "dicho", "ante", "cabe", "mediante",
    "segun",
  ]),
  en: new Set([
    "the", "and", "for", "with", "that", "this", "these", "those", "from",
    "have", "has", "had", "will", "shall", "may", "must", "can", "could",
    "would", "should", "which", "who", "whom", "whose", "each", "every",
    "other", "such", "into", "about", "between", "when", "where", "because",
    "your", "their", "shall", "than", "then", "also", "were", "been",
    "being", "under", "upon", "within", "without",
  ]),
};

const corpusPath = process.argv[2];
const lang = process.argv[3];
const topN = parseInt(process.argv[4], 10) || 30;

if (!corpusPath || !lang) {
  console.error("Usage: node scripts/candidatos-corpus.js <archivo-corpus.txt> <es|en> [top-n]");
  process.exit(1);
}
if (!FREQ_LIST_URL[lang]) {
  console.error("No general-language frequency list wired up for language '" + lang + "'.");
  console.error("Add its hermitdave/FrequencyWords URL to FREQ_LIST_URL in this script first.");
  process.exit(1);
}

function normalize(text) {
  return text.toString().normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
}

function tokenize(text) {
  return text.toLowerCase().match(/[a-zà-ÿ]+/gi) || [];
}

function loadAsGlobal(relativePath, pattern, replacement) {
  const src = fs.readFileSync(path.join(ROOT, relativePath), "utf8").split(pattern).join(replacement);
  // eslint-disable-next-line no-eval
  eval(src);
}

async function loadGeneralFrequencies() {
  const cachePath = path.join(CACHE_DIR, "freq-" + lang + ".txt");
  let raw;
  if (fs.existsSync(cachePath)) {
    raw = fs.readFileSync(cachePath, "utf8");
  } else {
    console.log("Downloading general-language frequency list for '" + lang + "' (one-time, cached afterwards)...");
    const res = await fetch(FREQ_LIST_URL[lang]);
    if (!res.ok) {
      throw new Error("could not download frequency list (HTTP " + res.status + ")");
    }
    raw = await res.text();
    fs.mkdirSync(CACHE_DIR, { recursive: true });
    fs.writeFileSync(cachePath, raw, "utf8");
  }

  const freq = new Map();
  let total = 0;
  raw.split("\n").forEach(function (line) {
    const parts = line.trim().split(/\s+/);
    if (parts.length !== 2) return;
    const word = normalize(parts[0]);
    const count = parseInt(parts[1], 10);
    if (!word || !count) return;
    // Keep the first (highest) count seen per normalized word — the list
    // is sorted by frequency descending, and normalizing can merge a couple
    // of accented/unaccented duplicates.
    if (!freq.has(word)) freq.set(word, count);
    total += count;
  });
  return { freq, total };
}

// Existing headwords + synonyms for this language, so an already-covered
// concept doesn't show up as a "new" candidate.
loadAsGlobal("js/data.es.js", "window.DICCIONARIOS", "global.DICCIONARIOS");
loadAsGlobal("js/data.en.js", "window.DICCIONARIOS", "global.DICCIONARIOS");

const covered = new Set();
(DICCIONARIOS[lang] || []).forEach(function (entry) {
  covered.add(normalize(entry.palabra));
  (entry.sinonimos || []).forEach(function (synonym) { covered.add(normalize(synonym)); });
});

const MIN_DOMAIN_COUNT = 2; // ignore one-off typos/noise in the corpus

(async () => {
  let corpusText;
  try {
    corpusText = fs.readFileSync(corpusPath, "utf8");
  } catch (err) {
    console.error("Could not read corpus file '" + corpusPath + "': " + err.message);
    process.exit(1);
  }

  let generalFreq, generalTotal;
  try {
    ({ freq: generalFreq, total: generalTotal } = await loadGeneralFrequencies());
  } catch (err) {
    console.error("Error: " + err.message);
    process.exit(1);
  }

  const domainCounts = new Map();
  let domainTotal = 0;
  tokenize(corpusText).forEach(function (rawWord) {
    const word = normalize(rawWord);
    if (word.length < 4) return;
    if (STOPWORDS[lang].has(word)) return;
    if (covered.has(word)) return;
    domainCounts.set(word, (domainCounts.get(word) || 0) + 1);
    domainTotal++;
  });

  const candidates = [];
  domainCounts.forEach(function (domainCount, word) {
    if (domainCount < MIN_DOMAIN_COUNT) return;
    const domainRel = domainCount / domainTotal;
    const generalCount = generalFreq.get(word);
    if (generalCount === undefined) {
      // Not even in the top 50k of everyday language — very domain-specific.
      candidates.push({ word: word, domainCount: domainCount, score: Infinity, inGeneralList: false });
      return;
    }
    const generalRel = generalCount / generalTotal;
    candidates.push({ word: word, domainCount: domainCount, score: domainRel / generalRel, inGeneralList: true });
  });

  candidates.sort(function (a, b) {
    if (a.score === b.score) return b.domainCount - a.domainCount;
    return b.score - a.score;
  });

  console.log(
    "=== Candidatos por keyness (" + lang + ") — " + domainCounts.size + " palabras únicas, " +
    domainTotal + " tokens válidos en el corpus de dominio ===\n"
  );

  if (!candidates.length) {
    console.log("Ningún candidato superó el umbral (MIN_DOMAIN_COUNT=" + MIN_DOMAIN_COUNT + "). Prueba con un corpus más largo.");
    return;
  }

  candidates.slice(0, topN).forEach(function (c, i) {
    const tag = c.inGeneralList
      ? (c.score.toFixed(1) + "x más frecuente que en lengua general")
      : "no aparece en el top 50k de lengua general";
    console.log((i + 1) + ". " + c.word + "  (" + c.domainCount + " veces en el corpus, " + tag + ")");
  });

  console.log(
    "\nSiguiente paso: para cada candidato que tenga sentido, confirma con\n" +
    "node scripts/estado-contenido.js --detalle que no está ya cubierto bajo\n" +
    "otro sinónimo, elige a mano en qué de las siete categorías encaja, y\n" +
    "sigue el resto del proceso de doc/en/SPEC.md (escribir la entrada,\n" +
    "buscar pictograma con buscar-pictograma.js, validar con validar.js)."
  );
})();
