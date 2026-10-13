'use strict';

const { normalize } = require('./apply-synonym-merges');

function findSynonymOverlaps(batch, existingEntries) {
  const existingByWord = new Map();
  const existingBySynonym = new Map();
  for (const entry of existingEntries) {
    const key = normalize(entry.word);
    if (!existingByWord.has(key)) existingByWord.set(key, []);
    existingByWord.get(key).push(entry);
    for (const synonym of entry.synonyms || []) {
      const synonymKey = normalize(synonym);
      if (!existingBySynonym.has(synonymKey)) existingBySynonym.set(synonymKey, []);
      existingBySynonym.get(synonymKey).push(entry);
    }
  }

  const overlaps = new Map();
  function addOverlap(candidate, entry, relation) {
    const key = `${candidate.id}|${entry.id}`;
    const overlap = overlaps.get(key) || {
      candidate: candidate.palabra,
      existing: entry.word,
      existingId: entry.id,
      relations: [],
    };
    if (!overlap.relations.includes(relation)) overlap.relations.push(relation);
    overlaps.set(key, overlap);
  }

  for (const candidate of batch) {
    const candidateWord = normalize(candidate.palabra);
    const candidateSynonyms = (candidate.sinonimos || []).map(normalize);
    for (const synonym of candidateSynonyms) {
      for (const entry of existingByWord.get(synonym) || []) {
        addOverlap(candidate, entry, 'candidate synonym matches existing headword');
      }
    }
    for (const entry of existingBySynonym.get(candidateWord) || []) {
      addOverlap(candidate, entry, 'existing synonym matches candidate headword');
    }
  }
  return [...overlaps.values()].map(overlap => ({
    candidate: overlap.candidate,
    existing: overlap.existing,
    existingId: overlap.existingId,
    relation: overlap.relations.join('; '),
  }));
}

module.exports = { findSynonymOverlaps };
