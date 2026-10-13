/*
 * scripts/ingest/pipeline/candidates/es-candidates-listapalabras.js
 *
 * One script for one source: listapalabras.com. Two stages, one file
 * (used to be a separate es_list_listapalabras_filter.js — merged so
 * this source has a single entry point, per the "one script per source"
 * rule in README.md):
 *
 *   STAGE 1 — scrape. Reverse-engineered, no API:
 *     - palabras-con.php?letra=<L> lists words starting with letter <L>,
 *       truncated to ~50-60 entries, split into "Resultados Diccionario"
 *       (headwords) and "Resultados Conjugaciones" (inflected verb forms
 *       — skipped, same rationale as the form-of filter in
 *       es-candidates.js).
 *     - When the diccionario section is truncated, the page carries a
 *       `<a id="mas_resultados" href="palabras-con-<L>-lista-completa.php">`
 *       link to the untruncated page (can be 15-20 MB of HTML for common
 *       letters). Small letters (K, W, ...) never truncate.
 *     - Each headword is rendered as
 *       `<a id="palabra_resultado" ...><span>X</span>REST</a>`; word text
 *       is read from the visible span/tail, not the RAE href underneath
 *       (inconsistent scheme across pages).
 *     - Letters scraped: A-Z + CH, LL (RAE folded these into C/L in 1994,
 *       the site still exposes them separately; harmless, output is
 *       deduped). Ñ is skipped — the site's href for it has no reliable
 *       encoding; the handful of Ñ-initial words are already covered by
 *       es-candidates.js's Kaikki/freq-es.txt sources.
 *     - Raw pages are cached directly in scripts/download/ (no
 *       subdirectory — 2026-09-05, user's call: one flat download/ for
 *       the whole project) as `listapalabras_letra-<L>.html` /
 *       `listapalabras_letra-<L>-completa.html`, so a rerun doesn't
 *       re-download multi-MB pages for letters already fetched. Writes
 *       listapalabras_words_es.txt (one word per line, sorted, deduped)
 *       for inspectability, but stage 2 runs in-process on the same
 *       result — no need to re-read it back. The shared `listapalabras_`
 *       prefix is what scripts/clean-downloads.js's exclude matches on
 *       to protect all of this source's files from its sweep — losing
 *       them means re-scraping the whole site, not re-running one fetch.
 *
 *   STAGE 2 — filter into a reviewable candidate list, per
 *   doc/es/guia-crear-elementos.md §3.2 criterion 6: the editorial
 *   criterion is a word's difficulty, never a domain-category label.
 *   A word is only ever excluded here for reasons that are genuinely
 *   about the word itself, never about whether some external category
 *   API happened to tag it:
 *     - not a well-formed single word (numbers, punctuation, multi-word
 *       phrases from the scrape);
 *     - already present as a headword in Sinonimia (synonym/example-only
 *       matches stay in the review list as lexical-coverage candidates);
 *     - a proper noun (`filters/` Kaikki-backed name check below —
 *       people/place/brand names are never dictionary headwords here);
 *     - too common (`filters/common-words.js` — frequency is part of
 *       "difficulty", per criterion 2: a word nobody needs explained
 *       is not a candidate regardless of category);
 *     - already reviewed and declined (`filters/rejected-words.js`).
 *
 *   2026-09-09 (maintainer directive): this used to ALSO drop every
 *   word with no Wiktionary domain-category cross-reference hit
 *   ("method F" from guia-crear-elementos.md §3.3) — removed entirely.
 *   That filter was rejecting words purely because Wiktionary's
 *   category API didn't happen to tag them, which has nothing to do
 *   with whether the word is actually difficult — exactly the
 *   category-as-filter mistake criterion 6 already warned against, and
 *   two rounds of patches (--no-domain-gap, then --stem-discovery)
 *   only ever covered part of the resulting gap instead of fixing the
 *   root cause. There is no `wiktionary_candidates.js` cross-reference
 *   left anywhere in this file, no `--no-domain-gap` / `--stem-discovery`
 *   flags, and no dependency on `download/wiktionary_candidates.txt`.
 *
 *   What replaces it: every word that survives the five checks above
 *   is a candidate — full stop, nothing is dropped for lacking a
 *   category. `shared/domain_stems.js`'s stem list and a small set of
 *   admin/legal/labour-flavored Spanish suffixes are still applied,
 *   but purely as a **sort hint** to help a human reviewer start with
 *   the highest-signal words first — every candidate ships in the one
 *   output file, hinted or not, and the hint is never the acceptance
 *   test.
 *
 * Output: listapalabras_candidates.txt
 * (word<TAB>pista<TAB>len<TAB>freq<TAB>coverage-status)
 * in ../wip/, sorted hinted-first (grouped by hint) then everything
 * else. Never touches js/data.*.js.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const https = require('https');
const zlib = require('zlib');
const { normalizeWord } = require('../filters/sinonimia-coverage');
const {
  loadRefinedHeadwordCoverage,
  loadRefinedCoverage,
  isRefinedCovered,
} = require('../filters/refine-coverage');
const { loadCommonWords, isCommonWord } = require('../filters/common-words');
const { loadRejectedWords, isRejectedWord } = require('../filters/rejected-words');
const { STEMS_ES, matchStems } = require('../shared/domain_stems');

const SCRATCH = __dirname;
const CACHE = path.resolve(SCRATCH, '..', '..', '..', 'download');
const WIP = path.resolve(SCRATCH, '..', '..', 'wip');

const OUT_RAW = path.join(CACHE, 'listapalabras_words_es.txt');
const SRC_KAIKKI_CACHE = path.join(CACHE, 'kaikki-es-extract.jsonl.gz');
const SRC_FREQ = path.join(CACHE, 'freq-es.txt');
const OUT_CANDIDATES = path.join(WIP, 'listapalabras_candidates.txt');

// Admin/legal/labour-flavored Spanish noun suffixes — a sort hint
// alongside shared/domain_stems.js's STEMS_ES, not a filter. Narrowed
// by a length band purely to cut down on short, high-frequency false
// positives ("pasión", "cara") in the hinted-first sort; a word outside
// the band still ships in the output, it just doesn't get this
// particular hint.
// -ero/-era and -dad were tried and dropped: they're Spanish's two most
// overloaded noun suffixes (any agent/place noun, any abstract-quality
// noun) and swamped the hinted-first group with unrelated common words
// rather than admin/labour-flavored ones.
const HINT_SUFFIXES = [
  'cion', 'sion', 'miento', 'encia', 'ancia', 'aje', 'ista', 'ario', 'aria',
  'anza', 'orio', 'oria', 'tad',
];
const SUFFIX_MIN_LEN = 6;
const SUFFIX_MAX_LEN = 18;

const RE_WORD = /^[a-zñáéíóúü]+$/i;

const BASE = 'https://www.listapalabras.com/';
const LETTERS = [
  'A', 'B', 'C', 'CH', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'LL',
  'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
];
// Ñ deliberately excluded — see file header.

const REQUEST_DELAY_MS = 400;

// === Stage 1: scrape ========================================================

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; sinonimia-word-list-scraper/1.0)',
      },
    }, (res) => {
      if ([301, 302, 303, 307, 308].includes(res.statusCode)) {
        const next = new URL(res.headers.location, url).toString();
        res.resume();
        return fetchText(next).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error('HTTP ' + res.statusCode + ' for ' + url));
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchCached(url, cacheFile) {
  if (fs.existsSync(cacheFile)) {
    return fs.readFileSync(cacheFile, 'utf8');
  }
  const text = await fetchText(url);
  fs.writeFileSync(cacheFile, text, 'utf8');
  await sleep(REQUEST_DELAY_MS);
  return text;
}

function extractDiccionarioWords(html) {
  const startIdx = html.indexOf('columna_resultados_generales');
  const endMarkerIdx = html.indexOf('columna_resultados_conjugaciones');
  const section = startIdx === -1
    ? html
    : html.slice(startIdx, endMarkerIdx === -1 ? html.length : endMarkerIdx);

  const words = [];
  const re = /<a id="palabra_resultado"[^>]*>\s*<span>([^<]*)<\/span>([^<]*)<\/a>/g;
  let m;
  while ((m = re.exec(section)) !== null) {
    const word = ((m[1] || '') + (m[2] || '')).trim();
    if (word) words.push(word);
  }
  return words;
}

function findFullListHref(shortPageHtml) {
  const m = /<a id="mas_resultados" href="([^"]+)"/.exec(shortPageHtml);
  return m ? m[1] : null;
}

async function scrapeLetter(letter) {
  const shortUrl = BASE + 'palabras-con.php?letra=' + encodeURIComponent(letter);
  const shortCache = path.join(CACHE, 'listapalabras_letra-' + letter + '.html');
  const shortHtml = await fetchCached(shortUrl, shortCache);

  const fullHref = findFullListHref(shortHtml);
  let html = shortHtml;
  let source = 'short';
  if (fullHref) {
    const fullUrl = new URL(fullHref, shortUrl).toString();
    const fullCache = path.join(CACHE, 'listapalabras_letra-' + letter + '-completa.html');
    html = await fetchCached(fullUrl, fullCache);
    source = 'completa';
  }

  const words = extractDiccionarioWords(html);
  console.log('letra=' + letter + ' (' + source + '): ' + words.length + ' palabras');
  return words;
}

async function scrapeAll() {
  fs.mkdirSync(CACHE, { recursive: true });

  const all = new Set();
  const perLetterCounts = {};

  for (const letter of LETTERS) {
    try {
      const words = await scrapeLetter(letter);
      perLetterCounts[letter] = words.length;
      for (const w of words) all.add(w);
    } catch (err) {
      console.error('letra=' + letter + ': ERROR', err.message, '(skipping)');
      perLetterCounts[letter] = 0;
    }
  }

  const sorted = Array.from(all).sort((a, b) => a.localeCompare(b, 'es'));
  fs.writeFileSync(OUT_RAW, sorted.join('\n') + '\n', 'utf8');

  console.log('--- stage 1: scrape summary ---');
  for (const letter of LETTERS) console.log('  ' + letter + ': ' + perLetterCounts[letter]);
  console.log('total_raw   :', Object.values(perLetterCounts).reduce((a, b) => a + b, 0));
  console.log('unique_words:', sorted.length);
  console.log('out         :', OUT_RAW);

  return sorted;
}

// === Stage 2: filter =========================================================

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

async function loadKaikkiNameOnly() {
  if (!fs.existsSync(SRC_KAIKKI_CACHE)) {
    console.log('kaikki cache missing, skipping proper-noun filter:', SRC_KAIKKI_CACHE);
    return new Set();
  }
  console.log('kaikki: streaming es headwords for proper-noun filter...');
  const posByWord = new Map();
  await streamRecordsFromJsonlGz(SRC_KAIKKI_CACHE, (obj) => {
    if (obj.lang_code !== 'es') return;
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
  console.log('kaikki: name-only (proper noun) words to exclude:', nameOnly.size);
  return nameOnly;
}

function suffixHint(folded) {
  if (folded.length < SUFFIX_MIN_LEN || folded.length > SUFFIX_MAX_LEN) return null;
  for (const suf of HINT_SUFFIXES) {
    if (folded.length > suf.length && folded.endsWith(suf)) return suf;
  }
  return null;
}

// Words absent from the whole 50k-row freq-es.txt (OpenSubtitles-based,
// so skewed to spoken dialogue) are a WEAK POSITIVE signal here, not
// noise: admin/legal/labour nouns ("empadronamiento", "cotización") are
// exactly the register people don't say out loud in movie dialogue, so
// their absence is consistent with — not contrary to — being a genuine
// bureaucratic term. Used only to sort candidates for review, never to
// drop them.
function loadFreqSet() {
  if (!fs.existsSync(SRC_FREQ)) return null;
  const set = new Set();
  const text = fs.readFileSync(SRC_FREQ, 'utf8');
  for (const line of text.split(/\r?\n/)) {
    if (!line) continue;
    const sp = line.indexOf(' ');
    const word = sp >= 0 ? line.slice(0, sp) : line;
    if (word) set.add(normalizeWord(word));
  }
  return set;
}

async function filterAll(raw) {
  console.log('listapalabras raw headwords:', raw.length);

  const existing = loadRefinedHeadwordCoverage('es');
  const semanticCoverage = loadRefinedCoverage('es');
  console.log('existing sinonimia headwords (refined, folded words):', existing.size);

  const common = loadCommonWords();
  if (!common.available) {
    console.log('! WARNING: common-words source missing (' + path.join(CACHE, 'freq-es.txt') + ') — common-word filter is a no-op this run, results will include more noise than usual');
  } else {
    console.log('common-words filter: top', common.maxRank, 'most frequent words loaded (' + common.set.size + ' unique folded forms)');
  }

  const nameOnly = await loadKaikkiNameOnly();

  const rejected = loadRejectedWords('es');
  if (!rejected.available) {
    console.log('! WARNING: rejected-words registry missing — already-rejected filter is a no-op this run');
  } else {
    console.log('rejected-words filter:', rejected.count, 'known rejections loaded (see filters/rejected-words.js)');
  }

  const freqSet = loadFreqSet();

  let dropped = { notWordShape: 0, alreadyCovered: 0, properNoun: 0, commonWord: 0, alreadyRejected: 0 };
  const candidates = []; // { word, hint, len, inFreq, semanticCovered }

  for (const word of raw) {
    const trimmed = word.trim();
    if (!trimmed || !RE_WORD.test(trimmed)) { dropped.notWordShape++; continue; }
    const folded = normalizeWord(trimmed);
    if (isRefinedCovered(trimmed, existing)) { dropped.alreadyCovered++; continue; }
    if (nameOnly.has(folded)) { dropped.properNoun++; continue; }
    if (isCommonWord(trimmed, common.set)) { dropped.commonWord++; continue; }
    if (isRejectedWord(trimmed, rejected.set)) { dropped.alreadyRejected++; continue; }

    const stemCats = matchStems(folded, STEMS_ES);
    const suffix = suffixHint(folded);
    const hint = stemCats.length ? stemCats.join(',') : (suffix ? 'sufijo:' + suffix : '');
    const inFreq = freqSet ? freqSet.has(folded) : null;
    candidates.push({
      word: trimmed,
      hint,
      len: trimmed.length,
      inFreq,
      semanticCovered: isRefinedCovered(trimmed, semanticCoverage),
    });
  }

  // Every word that reaches here is a candidate — nothing above this
  // point was dropped for lacking a category or a stem/suffix hint.
  // The sort below only decides review ORDER: hinted words first
  // (grouped by hint, since that's the highest-signal subset), then
  // everything else, not-in-freq before in-freq (see loadFreqSet's
  // comment), alphabetical within each group.
  candidates.sort((a, b) => {
    const aHinted = a.hint !== '', bHinted = b.hint !== '';
    if (aHinted !== bHinted) return aHinted ? -1 : 1;
    if (aHinted && a.hint !== b.hint) return a.hint.localeCompare(b.hint);
    if (a.inFreq !== b.inFreq) return a.inFreq ? 1 : -1;
    return a.word.localeCompare(b.word, 'es');
  });

  const lines = candidates.map((e) => e.word + '\t' + e.hint + '\t' + e.len + '\t' + (e.inFreq === null ? 'n/a' : e.inFreq ? 'in-freq' : 'not-in-freq') + '\t' + (e.semanticCovered ? 'semantic-covered' : 'new-lexical-form'));
  fs.writeFileSync(OUT_CANDIDATES, lines.join('\n') + '\n', 'utf8');

  const hinted = candidates.filter((e) => e.hint !== '');
  const byHint = {};
  for (const e of hinted) byHint[e.hint] = (byHint[e.hint] || 0) + 1;

  console.log('--- stage 2: filter summary ---');
  console.log('dropped_not_word_shape :', dropped.notWordShape);
  console.log('dropped_existing_headword:', dropped.alreadyCovered);
  console.log('dropped_proper_noun    :', dropped.properNoun);
  console.log('dropped_common_word    :', dropped.commonWord, '(top ' + common.maxRank + ' most frequent, see filters/common-words.js)');
  console.log('dropped_already_rejected:', dropped.alreadyRejected, '(' + rejected.count + ' known rejections loaded, see filters/rejected-words.js)');
  console.log('candidates_total        :', candidates.length, '(every word above is a real candidate — none dropped for lacking a category)');
  console.log('  hinted (review first) :', hinted.length);
  console.log('  no hint (review after):', candidates.length - hinted.length);
  console.log('by hint                 :', JSON.stringify(byHint));
  console.log('out                     :', OUT_CANDIDATES);
}

// === Main ====================================================================

(async () => {
  const fromCache = process.argv.includes('--from-cache');
  let raw;
  if (fromCache && fs.existsSync(OUT_RAW)) {
    raw = fs.readFileSync(OUT_RAW, 'utf8').split(/\r?\n/).filter(Boolean);
    console.log('--from-cache: reusing', OUT_RAW, '(' + raw.length + ' words), skipping stage 1 scrape');
  } else {
    raw = await scrapeAll();
  }
  await filterAll(raw);
})().catch((err) => {
  console.error('FATAL:', err);
  process.exit(1);
});
