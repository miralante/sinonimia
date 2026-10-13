/*
 * scripts/ingest/pipeline/filters/refine-coverage.js
 *
 * Third "consult before analysis" pre-filter, applied AFTER
 * sinonimia-coverage.js + common-words.js, not instead of them. Extracted
 * and generalized from en-candidates-kaikki-cefrlex.js's plural/singular variant
 * expansion — a candidate matching the plural or singular of an existing
 * word is covered too ("auditor" covers "auditors"; "acción" covers
 * "acciones"). Simple regular-rule based per language, not linguistically
 * complete (irregular plurals slip through) — cheap recall, not a
 * grammar engine.
 *
 * en-candidates-kaikki-cefrlex.js originally also scanned `definicion` text (a word
 * used to explain another entry counts as "covered" too) — deliberately
 * dropped when this was generalized: real-data testing on the ES side
 * showed it false-matches ordinary connective words that merely appear
 * inside some unrelated entry's prose (e.g. "forma"/"cosa"/"causa" —
 * words guia-crear-elementos.md's own editorial history already
 * confirms are NOT covered — matched via phrases like "de esta forma",
 * "forma parte de"). It happened to look harmless on the English side
 * only because en-candidates-kaikki-cefrlex.js's separate CEFRLex A1/A2 filter already
 * caught most of the same words for an unrelated reason, masking the
 * false-positive rate. Do not re-add a definicion-text scan here without
 * re-running that same audit.
 *
 * Usage: loadRefinedCoverage('es' | 'en') returns a Set<foldedWord> a
 * caller checks directly (isRefinedCovered), already seeded from
 * filters/sinonimia-coverage.js's cross-language base set.
 */
'use strict';

const {
  loadSinonimiaCoverage,
  loadSinonimiaHeadwords,
  normalizeWord,
} = require('./sinonimia-coverage');

// Simple regular "-s" plural rules. Not complete (irregular plurals,
// e.g. English "children" or Spanish stress-shifting "régimen"/
// "regímenes", slip through) — same tradeoff en-candidates-kaikki-cefrlex.js already
// accepted for English.
function pluralVariantsEn(w) {
  const out = [w];
  if (w.endsWith('ies') && w.length > 4) out.push(w.slice(0, -3) + 'y');
  else if (w.endsWith('es') && w.length > 4) out.push(w.slice(0, -2));
  else if (w.endsWith('s') && w.length > 4) out.push(w.slice(0, -1));
  else {
    out.push(w + 's');
    if (/[sxz]$|[cs]h$/.test(w)) out.push(w + 'es');
    if (w.endsWith('y')) out.push(w.slice(0, -1) + 'ies');
  }
  return out;
}

// Spanish regular plural rules: vowel-ending -> +s, consonant-ending ->
// +es, -z -> -ces (luz/luces). Tries both directions (assume the word is
// singular and derive its plural, and vice versa) the same way
// pluralVariantsEn does.
function pluralVariantsEs(w) {
  const out = [w];
  if (w.endsWith('ces') && w.length > 5) out.push(w.slice(0, -3) + 'z');
  else if (w.endsWith('es') && w.length > 4) out.push(w.slice(0, -2));
  else if (w.endsWith('s') && w.length > 3) out.push(w.slice(0, -1));
  else if (w.endsWith('z')) out.push(w.slice(0, -1) + 'ces');
  else if (/[aeiouáéíóú]$/.test(w)) out.push(w + 's');
  else out.push(w + 'es');
  return out;
}

const PLURAL_VARIANTS = { es: pluralVariantsEs, en: pluralVariantsEn };

// Returns a Set<foldedWord>: the cross-language base coverage set from
// filters/sinonimia-coverage.js, expanded with `lang`'s plural variants.
// `lang` must be 'es' or 'en'.
function expandCoverage(lang, words) {
  const pluralVariants = PLURAL_VARIANTS[lang];
  if (!pluralVariants) throw new Error('loadRefinedCoverage: unsupported lang "' + lang + '"');

  const refined = new Set();
  for (const w of words) {
    for (const variant of pluralVariants(normalizeWord(w))) refined.add(variant);
  }
  return refined;
}

function loadRefinedCoverage(lang) {
  return expandCoverage(lang, loadSinonimiaCoverage());
}

// Candidate mining deliberately uses headwords-only coverage. A word that
// is merely a synonym or highlighted example is still surfaced for editorial
// review, because the project may want a standalone entry for that lexical
// form even when its concept already has an explanation.
function loadRefinedHeadwordCoverage(lang) {
  return expandCoverage(lang, loadSinonimiaHeadwords());
}

function isRefinedCovered(word, refinedSet) {
  return refinedSet.has(normalizeWord(word));
}

module.exports = {
  loadRefinedCoverage,
  loadRefinedHeadwordCoverage,
  isRefinedCovered,
};
