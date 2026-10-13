#!/usr/bin/env node
// Inserta las entradas del batch al final del fichero activo del diccionario
// español (el shard de continuación, si existe), en formato
// JS limpio (no JSON.stringify). Pensado para ejecutarse una sola vez.
// Uso: node scripts/ingest/pipeline/batch/insert-batch-es.js
//      [path/to/batch_<lang>_<category>_<n>.js] ["comment for the header line"]
//      (defaults to scripts/ingest/batches/batch_es_corpus_nuevo.js)
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "..", "..", "..");
const { loadProperNounSet, isProperNoun } = require("../shared/proper-noun-check.js");
const batch = require(process.argv[2] || "../batches/batch_es_corpus_nuevo.js");
const headerComment = process.argv[3] || "AIVD: contratos / servicios / registro de la propiedad (batch corpus-nuevo)";
const mainDataPath = path.join(ROOT, "js", "data.es.js");
const shardDataPath = path.join(ROOT, "js", "data.es.2.js");
const dataPath = fs.existsSync(shardDataPath) ? shardDataPath : mainDataPath;
const usingShard = dataPath === shardDataPath;

let src = fs.readFileSync(dataPath, "utf8");

function formatEntry(b) {
  const lines = [];
  const q = (value) => JSON.stringify(String(value));
  lines.push("  {");
  lines.push(`    id: ${q(b.id)},`);
  lines.push(`    word: ${q(b.palabra)},`);
  lines.push(`    image: { id: ${b.imagen.id}, alt: ${q(b.imagen.alt)} },`);
  lines.push(`    definition: ${q(b.definicion)},`);
  lines.push(`    synonyms: ${JSON.stringify(b.sinonimos)},`);
  lines.push(`    example: { word: ${q(b.ejemplo.palabra)}, text: ${q(b.ejemplo.texto)} },`);
  lines.push(`    exampleSynonym: { word: ${q(b.ejemploSinonimo.palabra)}, text: ${q(b.ejemploSinonimo.texto)} },`);
  lines.push(`    situacion: ${q(b.situacion)},`);
  if (b.traduccion) {
    const tradStr = Object.entries(b.traduccion)
      .map(([k, v]) => `${k}: ${q(v)}`)
      .join(", ");
    lines.push(`    /*traduccion-start*/translation: { ${tradStr} },/*traduccion-end*/`);
  }
  lines.push("  },");
  return lines.join("\n");
}

(async () => {
  const { set: properNouns, available } = await loadProperNounSet();
  if (!available) {
    console.log("! WARNING: Kaikki proper-noun cache not found - proper-noun filtering is DISABLED for this run.");
  }
  const named = batch.filter((b) => isProperNoun(b.palabra, properNouns) ||
    (b.sinonimos || []).some((s) => isProperNoun(s, properNouns)));
  if (named.length) {
    console.error("ABORTED: proper noun(s) found in batch, remove before inserting:");
    named.forEach((b) => console.error("  ! " + b.palabra));
    process.exit(1);
  }

  const formatted = batch.map(formatEntry).join("\n");

  const closingIdx = usingShard ? src.lastIndexOf("]);") : src.lastIndexOf("];");
  if (closingIdx < 0) throw new Error("No se encontró el cierre del diccionario activo");
  const before = src.slice(0, closingIdx).replace(/,\s*$/, "");
  const newSrc = usingShard
    ? before + ",\n" + formatted + "\n]);\n"
    : before + ",\n\n" + "  // --- " + headerComment + " ---\n" + formatted + "\n];\n";

  fs.writeFileSync(dataPath, newSrc);
  console.log("Insertadas:", batch.length, "nuevas entradas en", dataPath);
  console.log("Tamaño:", src.length, "->", newSrc.length);
})();
