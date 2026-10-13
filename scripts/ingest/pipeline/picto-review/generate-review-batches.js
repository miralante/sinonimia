#!/usr/bin/env node
/*
 * Gathers a richer ARASAAC candidate pool for every entry still sitting in
 * "reviewed" state (resolve-shared-pictograms.js couldn't find an exact-keyword
 * non-schematic match for palabra + 2 synonyms alone). This casts a wider
 * net — every synonym, plus the individual significant words of a
 * multi-word palabra — and does NOT filter by exact match: it dumps
 * everything (schematic flag included) so a human (or an agent reading the
 * output) can judge fit semantically, the way ARASAAC's own fuzzy search
 * can't be trusted to (see the "radar fijo" / "hotel.png for casa" cases
 * already found in this project's picto-review.md).
 *
 * Output: scripts/ingest/wip/review-batches/batch-<lang>-<n>.json,
 * ~40 entries per file, each entry shaped:
 *   { entryId, lang, palabra, definicion, sinonimos, situacion,
 *     currentImagenId, sharedCount, candidates: [{id, schematic, keywords, matchedVia}] }
 *
 * Usage: node scripts/ingest/pipeline/picto-review/generate-review-batches.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "..", "..", "..");
const STATE_PATH = path.join(__dirname, "..", "..", "wip", "resustitucion-state.json");
const OUT_DIR = path.join(__dirname, "..", "..", "wip", "review-batches");
const BATCH_SIZE = 40;
const CONCURRENCY = 6;
const MAX_CANDIDATES = 10;

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const STOPWORDS = new Set([
  "de", "la", "el", "los", "las", "un", "una", "unos", "unas", "y", "a", "en", "del", "al", "con", "por", "para", "que", "su", "sus",
  "the", "of", "and", "in", "on", "for", "to", "with", "or", "an", "a", "is",
]);

function loadDictionary(lang) {
  const dataPath = path.join(ROOT, "js", `data.${lang}.js`);
  const src = fs.readFileSync(dataPath, "utf8").replace(/window\.DICCIONARIOS/g, "global.DICCIONARIOS");
  // eslint-disable-next-line no-eval
  eval(src);
  return DICCIONARIOS[lang];
}

function significantWords(phrase) {
  return phrase
    .split(/\s+/)
    .map((w) => w.replace(/[^\p{L}]/gu, ""))
    .filter((w) => w.length >= 4 && !STOPWORDS.has(w.toLowerCase()));
}

async function searchArasaac(term, locale) {
  const url = "https://api.arasaac.org/api/pictograms/" + encodeURIComponent(locale) + "/search/" + encodeURIComponent(term);
  const res = await fetch(url);
  if (res.status === 404) return [];
  if (!res.ok) throw new Error("ARASAAC search HTTP " + res.status);
  const results = await res.json();
  return results.map((p) => ({
    id: p._id,
    schematic: !!p.schematic,
    keywords: (p.keywords || []).map((k) => k.keyword).filter(Boolean),
  }));
}

async function gatherCandidates(entry, locale) {
  const terms = [entry.palabra, ...(entry.sinonimos || []), ...significantWords(entry.palabra)];
  const seen = new Map(); // id -> {..., matchedVia}
  for (const term of terms) {
    if (seen.size >= MAX_CANDIDATES) break;
    let results;
    try {
      results = await searchArasaac(term, locale);
    } catch {
      continue;
    }
    for (const r of results) {
      if (r.id === entry.imagen.id) continue;
      if (!seen.has(r.id)) seen.set(r.id, { ...r, matchedVia: term });
      if (seen.size >= MAX_CANDIDATES) break;
    }
  }
  // non-schematic first, keep insertion order otherwise
  return [...seen.values()].sort((a, b) => Number(a.schematic) - Number(b.schematic));
}

(async () => {
  const state = JSON.parse(fs.readFileSync(STATE_PATH, "utf8"));
  const dictionaries = { es: loadDictionary("es"), en: loadDictionary("en") };
  const entryById = { es: {}, en: {} };
  dictionaries.es.forEach((e) => (entryById.es[e.id] = e));
  dictionaries.en.forEach((e) => (entryById.en[e.id] = e));

  const targets = [];
  for (const [entryId, s] of Object.entries(state)) {
    if (s.status !== "reviewed") continue;
    const lang = entryById.es[entryId] ? "es" : entryById.en[entryId] ? "en" : null;
    if (!lang) continue;
    targets.push({ entryId, lang, entry: entryById[lang][entryId], sharedCount: s.sharedCount });
  }
  console.log(`${targets.length} entries to gather candidates for.`);

  const results = [];
  let processed = 0;
  async function handleOne(t) {
    const candidates = await gatherCandidates(t.entry, t.lang);
    results.push({
      entryId: t.entryId,
      lang: t.lang,
      palabra: t.entry.palabra,
      definicion: t.entry.definicion,
      sinonimos: t.entry.sinonimos,
      situacion: t.entry.situacion,
      currentImagenId: t.entry.imagen.id,
      sharedCount: t.sharedCount,
      candidates,
    });
  }

  for (let i = 0; i < targets.length; i += CONCURRENCY) {
    const chunk = targets.slice(i, i + CONCURRENCY);
    await Promise.all(chunk.map(handleOne));
    processed += chunk.length;
    if (processed % 100 < CONCURRENCY) console.log(`  ...${processed}/${targets.length}`);
  }

  // stable order: es then en, by entryId
  results.sort((a, b) => (a.lang === b.lang ? a.entryId.localeCompare(b.entryId) : a.lang.localeCompare(b.lang)));

  for (let i = 0; i < results.length; i += BATCH_SIZE) {
    const batch = results.slice(i, i + BATCH_SIZE);
    const n = String(Math.floor(i / BATCH_SIZE) + 1).padStart(3, "0");
    const lang = batch[0].lang;
    const outPath = path.join(OUT_DIR, `batch-${lang}-${n}.json`);
    fs.writeFileSync(outPath, JSON.stringify(batch, null, 2));
  }
  console.log(`Done. ${results.length} entries written to ${OUT_DIR} in batches of ${BATCH_SIZE}.`);
})();
