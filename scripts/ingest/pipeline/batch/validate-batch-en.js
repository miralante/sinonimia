#!/usr/bin/env node
// Valida el batch EN: reglas de lectura fácil y conflictos con data.en.js.
// Uso: node scripts/ingest/pipeline/batch/validate-batch-en.js
//      [path/to/batch_<lang>_<category>_<n>.js]
//      (defaults to scripts/ingest/batches/batch_en_corpus_nuevo.js)
const { loadDict } = require("../shared/load-dict.js");
const { findSynonymOverlaps } = require("../shared/find-synonym-overlaps.js");

const batch = require(process.argv[2] || "../batches/batch_en_corpus_nuevo.js");
const dictionaries = loadDict("js/data.en.js");
const { validateBatchContent } = require("./validate-batch-content.js");
const DICCIONARIOS = {
  en: dictionaries.en || [],
  es: dictionaries.es || [],
};
const contentValidation = validateBatchContent(batch);
contentValidation.messages.forEach((message) => console.log(message));
let problems = contentValidation.count;
findSynonymOverlaps(batch, DICCIONARIOS.en).forEach((overlap) => {
  console.log(`REVIEW possible same sense: ${overlap.candidate} ↔ ${overlap.existing} (${overlap.relation})`);
});

// Conflictos con data.en.js
const existingIds = new Set(DICCIONARIOS.en.map((e) => e.id));
const existingPalabras = new Set(DICCIONARIOS.en.map((e) => e.word.toLowerCase()));
const spanishById = new Map(DICCIONARIOS.es.map((e) => [e.id, e]));
const labelsByWord = new Map();
batch.forEach((b) => {
  const key = b.palabra.toLowerCase();
  if (!labelsByWord.has(key)) labelsByWord.set(key, []);
  labelsByWord.get(key).push(b.senseLabel);
});
const validSenseLabels = new Set();
for (const [word, labels] of labelsByWord) {
  if (labels.length > 1 || existingPalabras.has(word)) {
    const allUnique = labels.every((label) => typeof label === "string" && label.trim()) &&
      new Set(labels).size === labels.length;
    if (allUnique) validSenseLabels.add(word);
    else if (labels.length > 1) {
      console.log(`senseLabel ausente o repetido para acepciones duplicadas: ${word}`);
      problems++;
    }
  }
}
batch.forEach((b) => {
  if (existingIds.has(b.id)) {
    console.log(`ID ya existe en data.en.js: ${b.id}`);
    problems++;
  }
  const spanishTarget = b.traduccion && b.traduccion.es ? spanishById.get(b.traduccion.es) : null;
  const isNewSpanishSense = spanishTarget && !(spanishTarget.translation && spanishTarget.translation.en);
  const hasReciprocalSenseLink = spanishTarget && spanishTarget.translation && spanishTarget.translation.en === b.id;
  if (existingPalabras.has(b.palabra.toLowerCase()) && !isNewSpanishSense && !hasReciprocalSenseLink && !validSenseLabels.has(b.palabra.toLowerCase())) {
    console.log(`Palabra ya existe en data.en.js: ${b.palabra}`);
    problems++;
  }
});

// Validar que cada traduccion.es apunte a un id existente en data.es.js
batch.forEach((b) => {
  if (b.traduccion && b.traduccion.es) {
    const target = b.traduccion.es;
    const exists = DICCIONARIOS.es.some((e) => e.id === target);
    if (!exists) {
      console.log(`traduccion.es="${target}" no existe en data.es.js (id: ${b.id})`);
      problems++;
    }
  }
});

console.log(`Total: ${batch.length}, Problemas: ${problems}`);
process.exit(problems > 0 ? 1 : 0);
