#!/usr/bin/env node
/*
 * Read-only: for each entry+term-list in a decisions file, finds ARASAAC
 * candidates whose own keyword tags exactly match the term (same rule as
 * apply-picto-decisions.js) and prints the candidate's FULL keyword list
 * (not just the matched tag) plus its id, for a human/LLM to sanity-check
 * before anything is written. This exists because exact-tag matching
 * alone still lets Spanish/English homographs through — e.g. "hacienda"
 * (tax authority) exact-matched a rural-house pictogram whose full tag
 * list was "casa rural, turismo rural, hacienda" (hacienda = country
 * estate there, not Ministerio de Hacienda). The extra keywords are the
 * tell; this script surfaces them instead of hiding them.
 *
 * Never writes anything. Output is meant to be read, then a confirmed
 * subset turned into a fixes/*.js file for apply-picto-fixes.js.
 *
 * Usage: node scripts/ingest/pipeline/picto-review/propose-picto-candidates.js <lang> <decisionsFile.json>
 */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..", "..", "..", "..");

const lang = process.argv[2];
const decisionsPath = process.argv[3];
const MIN_SHARED = 3;
const decisions = JSON.parse(fs.readFileSync(path.resolve(decisionsPath), "utf8"));

function normalize(s) {
  return String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
}
function loadDictionary(l) {
  const src = fs.readFileSync(path.join(ROOT, "js", `data.${l}.js`), "utf8").replace(/window\.DICCIONARIOS/g, "global.DICCIONARIOS");
  // eslint-disable-next-line no-eval
  eval(src);
  return DICCIONARIOS[l];
}
async function searchArasaac(term, locale) {
  const url = "https://api.arasaac.org/api/pictograms/" + encodeURIComponent(locale) + "/search/" + encodeURIComponent(term);
  const res = await fetch(url);
  if (res.status === 404) return [];
  if (!res.ok) throw new Error("ARASAAC search HTTP " + res.status);
  const results = await res.json();
  return results.map((p) => ({ id: p._id, schematic: !!p.schematic, keywords: (p.keywords || []).map((k) => k.keyword) }));
}

(async () => {
  const dictionary = loadDictionary(lang);
  const byId = new Map(dictionary.map((e) => [e.id, e]));
  const useCount = new Map();
  dictionary.forEach((e) => useCount.set(e.imagen.id, (useCount.get(e.imagen.id) || 0) + 1));

  for (const [entryId, terms] of Object.entries(decisions)) {
    const entry = byId.get(entryId);
    if (!entry) {
      console.log(`${entryId} | NOT IN DICTIONARY`);
      continue;
    }
    const foundForEntry = [];
    for (const term of terms) {
      let list;
      try {
        list = await searchArasaac(term, lang);
      } catch {
        continue;
      }
      const normTerm = normalize(term);
      const matches = list.filter(
        (r) => !r.schematic && r.id !== entry.imagen.id && r.keywords.some((kw) => normalize(kw) === normTerm)
      );
      for (const m of matches) {
        foundForEntry.push({ term, id: m.id, keywords: m.keywords, overused: (useCount.get(m.id) || 0) >= MIN_SHARED });
      }
    }
    if (foundForEntry.length === 0) {
      console.log(`${entryId} | "${entry.palabra}" (${entry.definicion.slice(0, 70)}) | NO EXACT-TAG CANDIDATE`);
    } else {
      console.log(`${entryId} | "${entry.palabra}" (${entry.definicion.slice(0, 70)})`);
      const seen = new Set();
      for (const c of foundForEntry) {
        if (seen.has(c.id)) continue;
        seen.add(c.id);
        console.log(`    id:${c.id}${c.overused ? " [OVERUSED]" : ""} via "${c.term}" | keywords: ${c.keywords.join(", ")}`);
      }
    }
  }
})();
