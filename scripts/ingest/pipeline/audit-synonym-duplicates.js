#!/usr/bin/env node
'use strict';

/*
 * Find possible duplicate concepts where a synonym points to another
 * dictionary headword. This is a review report, never an automatic merger.
 * Usage: node scripts/ingest/pipeline/audit-synonym-duplicates.js [es|en]
 *        [--all] [--summary] [--out path.json]
 */
const fs = require('fs');
const path = require('path');
const { loadDict } = require('./shared/load-dict');
const args = process.argv.slice(2);
const lang = args.find(arg => arg === 'es' || arg === 'en') || 'es';
const entries = loadDict(`js/data.${lang}.js`)[lang] || [];
const normalize = value => String(value || '').normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();
const byWord = new Map();
for (const entry of entries) {
  const key = normalize(entry.word);
  if (!byWord.has(key)) byWord.set(key, []);
  byWord.get(key).push(entry);
}
const pairs = new Map();
for (const entry of entries) {
  for (const synonym of entry.synonyms || []) {
    for (const target of byWord.get(normalize(synonym)) || []) {
      if (target.id === entry.id) continue;
      const ids = [entry.id, target.id].sort();
      const key = ids.join('|');
      const pair = pairs.get(key) || { entries: [entry, target], refs: [] };
      pair.refs.push({ from: entry.id, synonym });
      pairs.set(key, pair);
    }
  }
}

const report = [...pairs.values()].map(({ entries: [a, b], refs }) => {
  const reciprocal = refs.some(ref => ref.from === a.id) && refs.some(ref => ref.from === b.id);
  const definitionA = normalize(a.definition);
  const definitionB = normalize(b.definition);
  const exactDefinition = !!definitionA && definitionA === definitionB;
  return {
    confidence: reciprocal && exactDefinition ? 'high-review-priority' : reciprocal ? 'review' : 'weak-signal',
    reciprocal,
    exactDefinition,
    sameTopic: a.situacion === b.situacion,
    entries: [
      { id: a.id, word: a.word, definition: a.definition, topic: a.situacion },
      { id: b.id, word: b.word, definition: b.definition, topic: b.situacion },
    ],
    matchedSynonyms: refs.map(ref => ref.synonym),
  };
}).sort((a, b) => {
  const priority = { 'high-review-priority': 0, review: 1, 'weak-signal': 2 };
  return priority[a.confidence] - priority[b.confidence] ||
    a.entries[0].word.localeCompare(b.entries[0].word, lang);
});

const counts = report.reduce((out, row) => {
  out[row.confidence] = (out[row.confidence] || 0) + 1;
  return out;
}, {});
const output = { language: lang, entryCount: entries.length, counts, candidates: report };
const outIndex = args.indexOf('--out');
if (outIndex >= 0) {
  if (!args[outIndex + 1]) throw new Error('--out requires a file path');
  const file = path.resolve(args[outIndex + 1]);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(output, null, 2) + '\n');
  console.log(`Wrote ${report.length} candidate pairs to ${file}`);
}
if (args.includes('--summary')) {
  console.log(JSON.stringify({ language: lang, entryCount: entries.length, counts }, null, 2));
} else if (args.includes('--all')) {
  process.stdout.write(JSON.stringify(output, null, 2) + '\n');
} else {
  console.log(JSON.stringify({
    language: lang,
    entryCount: entries.length,
    counts,
    topCandidates: report.slice(0, 40),
    omitted: Math.max(0, report.length - 40),
    hint: 'Use --out path.json to save the complete report or --all to print it.',
  }, null, 2));
}
