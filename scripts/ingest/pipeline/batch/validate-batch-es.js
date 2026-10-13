#!/usr/bin/env node
// One-shot helper: valida las reglas de lectura fácil sobre el batch.
// No es parte de scripts/validar.js — solo comprueba el batch concreto.
// Uso: node scripts/ingest/pipeline/batch/validate-batch-es.js
//      [path/to/batch_<lang>_<category>_<n>.js]
//      (defaults to scripts/ingest/batches/batch_es_corpus_nuevo.js)

const batch = require(process.argv[2] || "../batches/batch_es_corpus_nuevo.js");

function norm(s) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function replaceAll(str, find, repl) {
  const escaped = find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return str.replace(new RegExp(escaped, "g"), repl);
}

let problems = 0;
batch.forEach((b) => {
  const required = ["id", "palabra", "imagen", "definicion", "sinonimos", "ejemplo", "ejemploSinonimo", "situacion"];
  required.forEach((k) => {
    if (!(k in b)) {
      console.log(`FALTA ${k} en ${b.id}`);
      problems++;
    }
  });
  if (b.ejemplo && b.ejemplo.palabra && b.ejemplo.texto) {
    if (!norm(b.ejemplo.texto).includes(norm(b.ejemplo.palabra))) {
      console.log(`ejemplo.palabra NO es subcadena de ejemplo.texto: ${b.id}`);
      problems++;
    }
  }
  if (b.ejemploSinonimo && b.ejemploSinonimo.palabra && b.ejemploSinonimo.texto) {
    if (!norm(b.ejemploSinonimo.texto).includes(norm(b.ejemploSinonimo.palabra))) {
      console.log(`ejemploSinonimo.palabra NO es subcadena de ejemploSinonimo.texto: ${b.id}`);
      problems++;
    }
  }
  if (b.ejemplo && b.ejemploSinonimo) {
    const t1 = replaceAll(b.ejemplo.texto, b.ejemplo.palabra, b.ejemploSinonimo.palabra);
    if (t1 !== b.ejemploSinonimo.texto) {
      console.log(`ejemplo y ejemploSinonimo NO son la misma frase al sustituir: ${b.id}`);
      console.log(`  ejemplo: "${b.ejemplo.texto}"`);
      console.log(`  sin pal: "${t1}"`);
      console.log(`  sinonim: "${b.ejemploSinonimo.texto}"`);
      problems++;
    }
  }
});

console.log(`Total: ${batch.length}, Problemas: ${problems}`);
process.exit(problems > 0 ? 1 : 0);