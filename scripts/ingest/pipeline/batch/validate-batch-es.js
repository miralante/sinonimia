#!/usr/bin/env node
// One-shot helper: valida las reglas de lectura fácil sobre el batch.
// No es parte de scripts/validar.js — solo comprueba el batch concreto.
// Uso: node scripts/ingest/pipeline/batch/validate-batch-es.js
//      [path/to/batch_<lang>_<category>_<n>.js]
//      (defaults to scripts/ingest/batches/batch_es_corpus_nuevo.js)

const batch = require(process.argv[2] || "../batches/batch_es_corpus_nuevo.js");
const { loadDict } = require("../shared/load-dict.js");
const { findSynonymOverlaps } = require("../shared/find-synonym-overlaps.js");
const { validateBatchContent } = require("./validate-batch-content.js");

const contentValidation = validateBatchContent(batch);
contentValidation.messages.forEach((message) => console.log(message));
let problems = contentValidation.count;

const overlaps = findSynonymOverlaps(batch, loadDict("js/data.es.js").es || []);
overlaps.forEach((overlap) => {
  console.log(`REVISAR posible misma acepción: ${overlap.candidate} ↔ ${overlap.existing} (${overlap.relation})`);
});

console.log(`Total: ${batch.length}, Problemas: ${problems}`);
process.exit(problems > 0 ? 1 : 0);
