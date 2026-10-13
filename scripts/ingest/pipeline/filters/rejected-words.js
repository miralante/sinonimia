/*
 * scripts/ingest/pipeline/filters/rejected-words.js
 *
 * Fourth "consult before analysis" pre-filter, run alongside
 * filters/sinonimia-coverage.js (words already LANDED) and
 * filters/common-words.js (too-frequent words) — this one covers the gap
 * neither closes: a word a maintainer already reviewed and DECLINED for
 * an editorial reason (redundant with an existing entry under a
 * different wording, archaic, out-of-scope jargon, a Wiktionary
 * false-positive domain tag, etc.). Before this filter existed, that
 * decision only lived as prose in PROGRESS.md — real, findable, but not
 * something a script could consult, so the same word could resurface in
 * a later mining pass of the same source (or a different source hitting
 * the same word) and cost a second editorial review for a decision
 * already made. See PROGRESS.md's "listapalabras.com" delta-review
 * section for a case where this happened before this filter existed.
 *
 * Backed by two flat, one-word-per-line files living right alongside
 * this module — rejected-words-es.txt and rejected-words-en.txt —
 * append-only in practice (see pipeline/shared/record-rejection.js, the
 * script that appends to them — never hand-edit these files for a *new*
 * rejection, only to correct or remove a stale one). Simplified
 * 2026-09-05 from a JSON registry of `{ word, lang, reason, category,
 * date }` records down to plain word lists (user's call): the exact
 * word is what every consumer here actually needed to filter on; the
 * reason/category/date were explanatory metadata useful in the moment
 * a rejection was made (and still belong in PROGRESS.md's prose when a
 * rejection is notable enough to explain), not something any filter
 * ever queried back out. Moved out of wip/ into this directory the same
 * day (user's call) — unlike everything else `filters/` consults
 * (a frequency list, a Kaikki extract, the dictionary itself), this data
 * has no source it's regenerated FROM: it's the filter's own hand-curated
 * state, so it belongs with the module that defines the filter, not in
 * a review-state or cache bucket. Gitignored like the rest of
 * scripts/ingest/, so it's local per-maintainer-machine state.
 *
 * Degrades to a no-op (available: false, empty set) if a language's file
 * is missing — callers MUST warn visibly, same contract as
 * common-words.js's freq-es.txt guard and proper-noun-check.js's
 * Kaikki-cache guard.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { normalizeWord } = require('../shared/normalize-word');

function listPath(lang) {
  return path.join(__dirname, 'rejected-words-' + lang + '.txt');
}

// Returns { set: Set<foldedWord>, available: boolean, count: number }.
// `lang` must be 'es' or 'en' — only that language's list is read (a
// word rejected in one language's editorial context is not
// automatically the same call in the other).
function loadRejectedWords(lang) {
  const file = listPath(lang);
  if (!fs.existsSync(file)) {
    console.log('! WARNING: ' + file + ' not found — rejected-word filter is a no-op this run');
    return { set: new Set(), available: false, count: 0 };
  }
  const set = new Set();
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const word = line.trim();
    if (word) set.add(normalizeWord(word));
  }
  return { set, available: true, count: set.size };
}

function isRejectedWord(word, rejectedSet) {
  return rejectedSet.has(normalizeWord(word));
}

module.exports = { loadRejectedWords, isRejectedWord, listPath };
