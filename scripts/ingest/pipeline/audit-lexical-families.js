#!/usr/bin/env node
'use strict';

/*
 * Find dictionary headwords with likely shared morphological roots.
 * This is a review report only: a shared root does not prove shared meaning.
 * Usage: node scripts/ingest/pipeline/audit-lexical-families.js [es|en]
 *        [--word headword] [--same-definition] [--min-size 2] [--out path.json] [--summary]
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const args = process.argv.slice(2);
const lang = args.find(arg => arg === 'es' || arg === 'en') || 'es';
const minIndex = args.indexOf('--min-size');
const minSize = minIndex >= 0 ? Number(args[minIndex + 1]) : 2;
if (!Number.isInteger(minSize) || minSize < 2) throw new Error('--min-size must be an integer >= 2');
const wordIndex = args.indexOf('--word');
const requestedWord = wordIndex >= 0 ? String(args[wordIndex + 1] || '').trim() : '';
if (wordIndex >= 0 && !requestedWord) throw new Error('--word requires a headword');
const sameDefinitionOnly = args.includes('--same-definition');

const SUFFIXES = {
  es: [
    'amientos', 'imientos', 'amiento', 'imiento', 'aciones', 'iciones', 'uciones',
    'adores', 'adoras', 'ancias', 'encias', 'amente', 'aciones', 'idades', 'ismos',
    'istas', 'ables', 'ibles', 'anzas', 'anzas', 'antes', 'iente', 'ientes',
    'ador', 'adora', 'ante', 'ancia', 'encia', 'mente', 'idad', 'ismo', 'ista',
    'able', 'ible', 'anza', 'ción', 'sión', 'ando', 'iendo', 'ados', 'adas',
    'idos', 'idas', 'ado', 'ada', 'ido', 'ida', 'ar', 'er', 'ir'
  ],
  en: [
    'ational', 'tional', 'fulness', 'ousness', 'iveness', 'ability', 'ibility',
    'ments', 'ment', 'ation', 'ition', 'sion', 'tion', 'ingly', 'edly', 'iness',
    'ness', 'ously', 'ively', 'able', 'ible', 'ally', 'ated', 'ing', 'ers', 'ies',
    'ed', 'er', 'ly', 's'
  ]
};

function normalize(value) {
  return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function rootsOf(word) {
  const normalized = normalize(word);
  const roots = new Set();
  for (const token of normalized.split(' ')) {
    if (token.length < 5) continue;
    for (const suffix of SUFFIXES[lang]) {
      if (token.length - suffix.length >= 4 && token.endsWith(suffix)) {
        roots.add(token.slice(0, -suffix.length));
      }
    }
  }
  return [...roots];
}

// Use the generated index that the browser actually searches. Loading every
// source batch through the ingestion pipeline is much slower and unnecessary
// for a headword-family audit.
const runtime = { SinonimiaDictionary: { defineIndex(language, number, rows) {
  if (!this.rows) this.rows = {};
  (this.rows[language] ||= []).push(...rows);
} } };
runtime.globalThis = runtime;
vm.createContext(runtime);
vm.runInContext(fs.readFileSync(path.resolve('js/dictionary-data.js'), 'utf8'), runtime,
  { filename: 'js/dictionary-data.js' });
for (const shard of runtime.SINONIMIA_DICTIONARY_DATA.languages[lang].index) {
  vm.runInContext(fs.readFileSync(path.resolve(shard.file), 'utf8'), runtime, { filename: shard.file });
}
const rows = runtime.SinonimiaDictionary.rows[lang] || [];
const entries = rows.map(row => ({ id: row[0], word: row[1], definition: row[2], topic: row[5] }));
const families = new Map();
for (const entry of entries) {
  for (const root of rootsOf(entry.word)) {
    if (!families.has(root)) families.set(root, []);
    families.get(root).push({ id: entry.id, word: entry.word, definition: entry.definition, topic: entry.topic });
  }
}
for (const entry of entries) {
  for (const token of normalize(entry.word).split(' ')) {
    const members = families.get(token);
    if (members && !members.some(member => member.id === entry.id)) {
      members.push({ id: entry.id, word: entry.word, definition: entry.definition, topic: entry.topic });
    }
  }
}

let candidates = [...families.entries()]
  .filter(([, members]) => members.length >= minSize)
  .map(([root, members]) => ({ root, members }))
  .sort((a, b) => b.members.length - a.members.length || a.root.localeCompare(b.root, lang));
if (requestedWord) {
  const query = normalize(requestedWord);
  candidates = candidates.filter(family => family.root === query ||
    family.members.some(member => normalize(member.word) === query));
}
if (sameDefinitionOnly) {
  candidates = candidates.filter(family => {
    const definitions = new Set(family.members.map(member => normalize(member.definition)));
    const topics = new Set(family.members.map(member => member.topic));
    return definitions.size === 1 && topics.size === 1;
  });
}

const output = {
  language: lang,
  entryCount: entries.length,
  candidateFamilyCount: candidates.length,
  ...(requestedWord ? { requestedWord } : {}),
  ...(sameDefinitionOnly ? { sameDefinitionOnly: true } : {}),
  rule: 'Suffix-based morphological hint only. Every family requires editorial review.',
  candidates
};

const outIndex = args.indexOf('--out');
if (outIndex >= 0) {
  if (!args[outIndex + 1]) throw new Error('--out requires a file path');
  const file = path.resolve(args[outIndex + 1]);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(output, null, 2) + '\n');
  console.log(`Wrote ${candidates.length} candidate families to ${file}`);
}
if (args.includes('--summary')) {
  console.log(JSON.stringify({
    language: lang,
    entryCount: entries.length,
    candidateFamilyCount: candidates.length,
    reviewedAutomatically: false
  }, null, 2));
} else if (outIndex < 0) {
  process.stdout.write(JSON.stringify({ ...output, candidates: candidates.slice(0, 40) }, null, 2) + '\n');
  if (candidates.length > 40) console.error(`Showing 40 of ${candidates.length}; use --out or --summary.`);
}
