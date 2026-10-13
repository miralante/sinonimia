/*
 * scripts/ingest/pipeline/shared/proper-noun-check.js
 *
 * Shared proper-noun guard for the ingestion pipeline. Loads the same
 * Kaikki.org <lang>-extract.jsonl.gz used by es-candidates.js /
 * en-candidates-kaikki-cefrlex.js and flags any word whose only genuine (non-form-of)
 * Wiktionary sense has part-of-speech "name" (given names, surnames,
 * place names, brands).
 *
 * This exists because the candidate-sourcing scripts only filter proper
 * nouns out of the *candidate shortlist* — a hand-edited batch file can
 * still slip a name past that stage. ingest-batch.js and
 * insert-batch-es.js / insert-batch-en.js call loadProperNounSet()
 * once and isProperNoun() per entry so a name can never reach
 * js/data.<lang>.js regardless of how the batch was produced.
 *
 * If the Kaikki cache is missing, this degrades to a no-op set (every
 * check returns false) rather than blocking ingestion — callers must
 * print a visible warning in that case so the gap is never silent.
 *
 * Both languages' Kaikki caches live in the same scripts/download/,
 * shared with the tracked scripts/corpus-candidates.js — there used to
 * be a second, ingest-only scripts/ingest/download/ that the EN cache
 * lived under instead (a real bug, fixed 2026-09-04, lived here: both
 * languages pointed at scripts/download/ while kaikki-en-extract.jsonl.gz
 * actually only ever downloaded to scripts/ingest/download/, so
 * loadProperNounSet('en') always silently no-opped). That second
 * directory was merged away entirely 2026-09-05 (user's call — one
 * download/ for the whole project, see PROGRESS.md), which is what
 * actually closes the gap that bug fix could only patch around: there's
 * now only one place either language's Kaikki cache can be.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { normalizeWord } = require('./normalize-word');

const CACHE = path.resolve(__dirname, '..', '..', '..', 'download');
const KAIKKI_CACHE_BY_LANG = {
  es: path.join(CACHE, 'kaikki-es-extract.jsonl.gz'),
  en: path.join(CACHE, 'kaikki-en-extract.jsonl.gz'),
};

function streamRecordsFromJsonlGz(filePath, onRecord) {
  return new Promise((resolve, reject) => {
    const gunzip = zlib.createGunzip();
    const read = fs.createReadStream(filePath);
    let buf = '';
    read.on('error', reject);
    gunzip.on('error', reject);
    gunzip.on('data', (chunk) => {
      buf += chunk.toString('utf8');
      let nl;
      while ((nl = buf.indexOf('\n')) >= 0) {
        const line = buf.slice(0, nl);
        buf = buf.slice(nl + 1);
        if (!line.trim()) continue;
        try {
          const obj = JSON.parse(line);
          if (obj && typeof obj.word === 'string') onRecord(obj);
        } catch (_) { /* skip malformed line */ }
      }
    });
    gunzip.on('end', () => resolve());
    read.pipe(gunzip);
  });
}

// Returns { set: Set<foldedWord>, available: boolean }. `available: false`
// means the Kaikki cache for this language is missing and the set is empty
// (no-op) — callers MUST surface this to the operator, never treat it as
// "no proper nouns". `lang` defaults to 'es' (Spanish, the common case for
// this pipeline); pass 'en' for the English Kaikki extract.
async function loadProperNounSet(lang) {
  lang = lang || 'es';
  const kaikkiCache = KAIKKI_CACHE_BY_LANG[lang];
  if (!kaikkiCache || !fs.existsSync(kaikkiCache)) {
    return { set: new Set(), available: false };
  }
  const posByWord = new Map();
  const wordSet = new Set();
  await streamRecordsFromJsonlGz(kaikkiCache, (obj) => {
    if (obj.lang_code !== lang) return;
    wordSet.add(normalizeWord(obj.word));
    const isFormOf = Array.isArray(obj.senses) &&
      obj.senses.some((s) => Array.isArray(s.tags) && s.tags.includes('form-of'));
    if (isFormOf) return;
    const folded = normalizeWord(obj.word);
    let set = posByWord.get(folded);
    if (!set) { set = new Set(); posByWord.set(folded, set); }
    if (obj.pos) set.add(obj.pos);
  });
  const nameOnly = new Set();
  for (const [word, posSet] of posByWord) {
    if (posSet.size === 1 && posSet.has('name')) nameOnly.add(word);
  }
  return { set: nameOnly, words: wordSet, available: true };
}

function isProperNoun(word, nameOnlySet) {
  // Kaikki can misclassify a lower-case DLE common noun as name-only when
  // its small Wiktionary sample contains only a named sense. Keep explicit
  // editorial overrides here for verified dictionary headwords.
  const folded = normalizeWord(word);
  const verifiedCommonHeadwords = new Set([
    'behaismo', 'espadarte', 'bahaismo', 'pez espada', 'gossip', 'roll',
    // Kaikki's current sample marks these lexical common nouns as name-only.
    // They are doctrine/religion names or a prehistoric-period adjective,
    // not personal names, places, or brands.
    'zoroastrianism', 'mazdeism', 'socinianism', 'mandaeism', 'sikhism',
    'neolithic', 'kantianism', 'orphism',
    // Fixed calendar names are lexicalized common nouns, not proper names.
    "new year's eve",
    // English calendar months are capitalized but are ordinary dictionary words.
    'january', 'february', 'december',
    // These names identify a religious movement and a weapon type, not a person.
    'scientology', 'kris', 'icu',
  ]);
  return !verifiedCommonHeadwords.has(folded) && nameOnlySet.has(folded);
}

module.exports = { loadProperNounSet, isProperNoun, normalizeWord };
