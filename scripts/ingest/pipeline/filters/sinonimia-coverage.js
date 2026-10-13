/*
 * scripts/ingest/pipeline/filters/sinonimia-coverage.js
 *
 * Shared "already in Sinonimia" guard for the candidate-sourcing pipeline
 * (used by es-candidates.js and es_list_listapalabras_filter.js).
 *
 * A word counts as "already covered" if it appears anywhere a candidate
 * could collide with existing content, not just as a headword: a
 * dictionary entry's `sinonimos[]`, and the highlighted word inside
 * `ejemplo.palabra` / `ejemploSinonimo.palabra`, are just as real a
 * duplicate as `palabra` itself (see scripts/check.js's own substring
 * checks on those same fields, and doc/es/guia-crear-elementos.md §3.2
 * criterion 5).
 *
 * This is the first of the two "consult before analysis" pre-filters
 * (see filters/common-words.js for the second). It is intentionally the
 * cheaper, unambiguous one: an exact (accent-insensitive) string match
 * is never a false positive the way a frequency-based guess can be, so
 * this filter's result is safe to treat as a hard drop.
 */
'use strict';

const { loadDict } = require('../shared/load-dict');
const { normalizeWord } = require('../shared/normalize-word');

function forEachDictionaryEntry(callback) {
  const dicts = loadDict('js/data.es.js');
  let enDict = {};
  try { enDict = loadDict('js/data.en.js'); } catch (_) { /* optional */ }

  for (const list of [dicts.es || [], enDict.en || []]) {
    for (const entry of list) {
      // Hand-maintained/generated dictionary files can contain a sparse
      // slot after an append/compaction. It is not a dictionary entry.
      if (entry) callback(entry);
    }
  }
}

// Returns a Set<foldedWord> covering every word that is findable in the
// app: each entry's `word`, every `synonyms[]` entry, and the highlighted
// word inside `example.word` / `exampleSynonym.word`. This remains the
// broad coverage view used when checking whether a search term already
// returns an explanation.
function loadSinonimiaCoverage() {
  const existing = new Set();
  const addWord = (w) => { if (typeof w === 'string' && w) existing.add(normalizeWord(w)); };
  forEachDictionaryEntry((e) => {
    addWord(e.word);
    if (e.synonyms) for (const s of e.synonyms) addWord(s);
    if (e.example && e.example.word) addWord(e.example.word);
    if (e.exampleSynonym && e.exampleSynonym.word) addWord(e.exampleSynonym.word);
  });
  return existing;
}

// Returns only headwords. Candidate mining uses this narrower view so an
// independent lexical form is not silently discarded merely because a
// different entry already mentions it as a synonym. The editorial reviewer
// can then decide whether the form deserves its own entry, a synonym link,
// or rejection. This distinction matters for forms such as
// `tetrapléjico` vs. `cuadripléjico`.
function loadSinonimiaHeadwords() {
  const existing = new Set();
  forEachDictionaryEntry((e) => {
    if (typeof e.word === 'string' && e.word) existing.add(normalizeWord(e.word));
  });
  return existing;
}

function isAlreadyCovered(word, coverageSet) {
  return coverageSet.has(normalizeWord(word));
}

module.exports = {
  loadSinonimiaCoverage,
  loadSinonimiaHeadwords,
  isAlreadyCovered,
  normalizeWord,
};
