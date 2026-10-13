/*
 * scripts/ingest/pipeline/shared/record-rejection.js
 *
 * Appends words to scripts/ingest/wip/rejected-words-<lang>.txt — the
 * flat, one-word-per-line lists filters/rejected-words.js reads. This is
 * the ONLY sanctioned way to add a rejection: the editorial call itself
 * ("does this word belong?") is one of the three token-spending steps
 * README.md names, but recording that call is mechanical and must be
 * scripted like everything else in this pipeline — never hand-edit the
 * list to add a new entry (hand edits are fine for correcting/removing a
 * stale one).
 *
 * Usage:
 *   node scripts/ingest/pipeline/shared/record-rejection.js \
 *     --lang es --reason "too common" --category finanzas \
 *     palabra1 palabra2 palabra3
 *
 * --lang is required. --reason and --category are accepted for
 * backward-compatible call sites and for the caller's own benefit (put
 * the "why" in your PROGRESS.md entry when it's worth explaining) but
 * are NOT persisted — simplified 2026-09-05 (user's call) from a JSON
 * registry of `{ word, lang, reason, category, date }` records down to
 * plain word lists, since every consumer only ever filtered on the exact
 * word, never queried the reason back out. Words are taken verbatim from
 * the remaining positional args.
 *
 * Skips (with a note, not an error) a word that:
 *   - already appears in that language's rejected-words-<lang>.txt
 *     (normalized) — no duplicate entries;
 *   - is currently present in js/data.<lang>.js (checked via
 *     filters/sinonimia-coverage.js) — rejecting a word that's actually
 *     landed is almost always a stale call or a mixed-up word list, so
 *     this is surfaced instead of silently recorded.
 */
'use strict';

const fs = require('fs');
const { normalizeWord } = require('./normalize-word');
const { loadRejectedWords, listPath } = require('../filters/rejected-words');
const { loadSinonimiaCoverage, isAlreadyCovered } = require('../filters/sinonimia-coverage');

function parseArgs(argv) {
  const out = { lang: null, reason: null, category: null, words: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--lang') { out.lang = argv[++i]; continue; }
    if (a === '--reason') { out.reason = argv[++i]; continue; }
    if (a === '--category') { out.category = argv[++i]; continue; }
    out.words.push(a);
  }
  return out;
}

const args = parseArgs(process.argv.slice(2));

if (!args.lang || !['es', 'en'].includes(args.lang)) {
  console.error('Usage: record-rejection.js --lang es|en [--reason "..."] [--category <situacion>] word1 [word2 ...]');
  process.exit(1);
}
if (args.words.length === 0) {
  console.error('No words given.');
  process.exit(1);
}

const file = listPath(args.lang);
const existing = loadRejectedWords(args.lang);
const rejectedSet = existing.set;
const landed = loadSinonimiaCoverage();

let existingWords = [];
if (fs.existsSync(file)) {
  existingWords = fs.readFileSync(file, 'utf8').split(/\r?\n/).map((w) => w.trim()).filter(Boolean);
}

let added = 0, skippedDup = 0, warnedLanded = 0;

for (const word of args.words) {
  const folded = normalizeWord(word);
  if (rejectedSet.has(folded)) {
    console.log('skip (already recorded as rejected): ' + word);
    skippedDup++;
    continue;
  }
  if (isAlreadyCovered(word, landed)) {
    console.log('! WARNING: "' + word + '" is currently present in js/data.' + args.lang + '.js — recording the rejection anyway, but double-check this isn\'t a mixed-up word list.');
    warnedLanded++;
  }
  existingWords.push(word);
  rejectedSet.add(folded);
  added++;
}

existingWords.sort((a, b) => a.localeCompare(b));
fs.writeFileSync(file, existingWords.join('\n') + '\n', 'utf8');

console.log('--- record-rejection summary ---');
console.log('added        :', added);
console.log('skipped_dup  :', skippedDup);
console.log('warned_landed:', warnedLanded);
console.log('list         :', file, '(' + existingWords.length + ' total words)');
