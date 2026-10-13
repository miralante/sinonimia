#!/usr/bin/env node
// Valida el batch EN: reglas de lectura fácil y conflictos con data.en.js.
// Uso: node scripts/ingest/pipeline/batch/validate-batch-en.js
//      [path/to/batch_<lang>_<category>_<n>.js]
//      (defaults to scripts/ingest/batches/batch_en_corpus_nuevo.js)
const { loadDict } = require("../shared/load-dict.js");

const batch = require(process.argv[2] || "../batches/batch_en_corpus_nuevo.js");
const DICCIONARIOS = {
  en: loadDict("js/data.en.js").en || [],
  es: loadDict("js/data.es.js").es || [],
};
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

// Conflictos con data.en.js
const existingIds = new Set(DICCIONARIOS.en.map((e) => e.id));
const existingPalabras = new Set(DICCIONARIOS.en.map((e) => e.word.toLowerCase()));
const spanishById = new Map(DICCIONARIOS.es.map((e) => [e.id, e]));
batch.forEach((b) => {
  if (existingIds.has(b.id)) {
    console.log(`ID ya existe en data.en.js: ${b.id}`);
    problems++;
  }
  const spanishTarget = b.traduccion && b.traduccion.es ? spanishById.get(b.traduccion.es) : null;
  const isNewSpanishSense = spanishTarget && !(spanishTarget.translation && spanishTarget.translation.en);
  if (existingPalabras.has(b.palabra.toLowerCase()) && !isNewSpanishSense) {
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
