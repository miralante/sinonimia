'use strict';

const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..', '..', '..');

function normalizeWord(value) {
  return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/\s+/g, ' ').trim();
}

function loadEditorialExclusions(lang) {
  if (!['es', 'en'].includes(lang)) throw new Error(`Unknown editorial-exclusion language: ${lang}`);
  const file = path.join(ROOT, 'scripts', 'ingest', 'pipeline', 'decisions', `editorial-exclusions-${lang}.json`);
  if (!fs.existsSync(file)) return { words: new Set(), decisions: [] };
  const decisions = JSON.parse(fs.readFileSync(file, 'utf8'));
  const words = new Set();
  const ids = new Set();
  for (const decision of decisions) {
    const word = normalizeWord(decision.word);
    if (!decision.id || !word || !decision.reason || ids.has(decision.id)) {
      throw new Error(`${lang}: invalid or duplicate editorial exclusion ${decision.id || '(missing id)'}`);
    }
    ids.add(decision.id);
    words.add(word);
  }
  return { words, decisions };
}

module.exports = { loadEditorialExclusions, normalizeWord };
