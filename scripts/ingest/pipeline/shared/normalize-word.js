/*
 * scripts/ingest/pipeline/shared/normalize-word.js
 *
 * Canonicalizes a word for comparison: Unicode NFD normalize + strip
 * combining marks (accent-insensitive fold) + lowercase + trim. Same
 * semantics as scripts/check.js's own word comparisons.
 *
 * Extracted 2026-09-04: this exact function existed as 8 separate,
 * independently-typed copies across filters/sinonimia-coverage.js,
 * filters/common-words.js, shared/proper-noun-check.js, and five
 * candidates/ scripts, in three different (functionally equivalent)
 * styles — the same "each script grows its own slightly different
 * copy" problem filters/ itself exists to prevent, just one level lower
 * (this primitive, which every one of those higher-level checks is
 * built on, was never itself shared). One of the five candidates/
 * copies used a literal Unicode combining-mark character range typed
 * directly into the regex source instead of an escape sequence —
 * functionally correct there, but fragile: a literal combining
 * character in source text depends on the file being read back with
 * the exact same encoding every time, whereas `̀`-style escapes
 * can't be corrupted by a lossy copy/paste or an editor that
 * normalizes Unicode on save.
 *
 * Uses `\p{M}` (Unicode property escape for "Mark", the general
 * category combining marks belong to) rather than the older
 * `[̀-ͯ]` range some of the duplicates used — matches every
 * combining mark, not just the Latin "Combining Diacritical Marks"
 * block, at no behavior difference for the ES/EN data this project
 * handles (verified: `̀-ͯ` is fully inside `\p{M}` here).
 */

'use strict';

function normalizeWord(w) {
  return w.toString().normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().trim();
}

module.exports = { normalizeWord };
