'use strict';

const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..', '..', '..');
const MERGE_FILE = path.join(ROOT, 'scripts', 'ingest', 'pipeline', 'decisions', 'synonym-merges-');
const { loadEditorialExclusions, normalizeWord: normalizeExclusionWord } = require('./editorial-exclusions');

function normalize(value) {
  return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/\s+/g, ' ').trim();
}

function applySynonymMerges(dictionaries) {
  const redirects = {};
  for (const lang of Object.keys(dictionaries)) {
    const file = MERGE_FILE + lang + '.json';
    const decisions = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : [];
    redirects[lang] = new Map();
    for (const decision of decisions) {
      for (const aliasId of decision.aliases || [decision.alias]) {
        redirects[lang].set(aliasId, decision.canonical);
      }
    }
  }

  for (const lang of Object.keys(dictionaries)) {
    const file = MERGE_FILE + lang + '.json';
    if (!fs.existsSync(file)) continue;
    const decisions = JSON.parse(fs.readFileSync(file, 'utf8'));
    const entries = dictionaries[lang];
    const byId = new Map(entries.map(entry => [entry.id, entry]));
    const removed = new Set();

    for (const decision of decisions) {
      const canonical = byId.get(decision.canonical);
      const aliasIds = decision.aliases || [decision.alias];
      if (!canonical || !aliasIds.length) {
        throw new Error(`${lang}: invalid synonym merge for ${decision.canonical}`);
      }
      if (removed.has(canonical.id)) {
        throw new Error(`${lang}: canonical entry ${canonical.id} was also removed`);
      }

      canonical.synonyms = canonical.synonyms || [];
      const existing = new Set(canonical.synonyms.map(normalize));
      for (const aliasId of aliasIds) {
        const alias = byId.get(aliasId);
        if (!alias || alias === canonical || removed.has(alias.id)) {
          throw new Error(`${lang}: invalid or overlapping synonym merge ${canonical.id} <- ${aliasId}`);
        }
        for (const word of [alias.word, ...(alias.synonyms || [])]) {
          const key = normalize(word);
          if (key && key !== normalize(canonical.word) && !existing.has(key)) {
            canonical.synonyms.push(word);
            existing.add(key);
          }
        }

        if (alias.translation) {
          canonical.translation = canonical.translation || {};
          for (const [otherLanguage, value] of Object.entries(alias.translation)) {
            const current = canonical.translation[otherLanguage];
            const merged = [...new Set([...(Array.isArray(current) ? current : current ? [current] : []), ...(Array.isArray(value) ? value : [value])])];
            if (merged.length) canonical.translation[otherLanguage] = merged.length === 1 ? merged[0] : merged;
          }
        }
        removed.add(alias.id);
      }
    }

    dictionaries[lang] = entries.filter(entry => !removed.has(entry.id));

    const correctionFile = path.join(ROOT, 'scripts', 'ingest', 'pipeline', 'decisions', `synonym-corrections-${lang}.json`);
    if (fs.existsSync(correctionFile)) {
      for (const correction of JSON.parse(fs.readFileSync(correctionFile, 'utf8'))) {
        const entry = dictionaries[lang].find(candidate => candidate.id === correction.entry);
        if (!entry) throw new Error(`${lang}: synonym correction references missing entry ${correction.entry}`);
        const toRemove = new Set(correction.remove.map(normalize));
        const before = entry.synonyms || [];
        entry.synonyms = before.filter(synonym => !toRemove.has(normalize(synonym)));
        const removedCount = before.length - entry.synonyms.length;
        if (removedCount !== toRemove.size) {
          throw new Error(`${lang}/${entry.id}: expected to remove ${toRemove.size} listed synonym(s), found ${removedCount}`);
        }
        if (correction.set) Object.assign(entry, correction.set);
      }
    }

    // Editorial exclusions are explicit, reviewable decisions for entries
    // that do not meet the product's acceptance criteria. Keep them separate
    // from synonym merges: an excluded word is removed, not redirected.
    const { decisions: exclusions } = loadEditorialExclusions(lang);
    if (exclusions.length) {
      const excludedIds = new Set();
      for (const exclusion of exclusions) {
        const entry = byId.get(exclusion.id);
        if (!entry || removed.has(exclusion.id)) {
          throw new Error(`${lang}: editorial exclusion references missing or merged entry ${exclusion.id}`);
        }
        if (normalizeExclusionWord(entry.word || entry.palabra) !== normalizeExclusionWord(exclusion.word)) {
          throw new Error(`${lang}: editorial exclusion word does not match entry ${exclusion.id}`);
        }
        excludedIds.add(exclusion.id);
      }
      dictionaries[lang] = dictionaries[lang].filter(entry => !excludedIds.has(entry.id));
    }
  }

  for (const entries of Object.values(dictionaries)) {
    for (const entry of entries) {
      if (!entry.translation) continue;
      for (const [otherLanguage, value] of Object.entries(entry.translation)) {
        const redirectsForLanguage = redirects[otherLanguage];
        if (!redirectsForLanguage) continue;
        const values = Array.isArray(value) ? value : [value];
        const mapped = [...new Set(values.map(id => redirectsForLanguage.get(id) || id))];
        entry.translation[otherLanguage] = mapped.length === 1 && !Array.isArray(value) ? mapped[0] : mapped;
      }
    }
  }
  return dictionaries;
}

module.exports = { applySynonymMerges, normalize };

