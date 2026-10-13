#!/usr/bin/env node
/*
 * Dedupe a batch file against what's already in js/data.<lang>.js.
 *
 * Drops entries whose `id` or `palabra` (case-insensitive) already
 * exists in the dictionary, then (in --apply mode) overwrites the
 * batch file with the filtered list. The header comment is preserved
 * verbatim.
 *
 * By default this script is a dry-run: it prints the would-be counts
 * and the filtered summary, but does NOT write to the batch file.
 * Re-run with --apply to actually overwrite.
 *
 * Why dry-run by default: this script is destructive on the input
 * file. The previous, run-as-default behaviour silently truncated
 * `batch_es_corpus_nuevo.js` to `[]` during a smoke-test, losing
 * 34 in-progress entries' snapshot. The entries themselves survived
 * in js/data.es.js, but the work-in-progress artefact was gone.
 * The flag protects against that.
 *
 * The language always defaults to "es" for backward compatibility, but
 * MUST be passed explicitly for an EN batch (`en`) — until 2026-09-04
 * this script silently deduped every batch against js/data.es.js
 * regardless of the batch's actual language, which for an EN batch is
 * close to meaningless: it only "catches" a duplicate when an EN
 * candidate happens to be spelled identically to an unrelated ES
 * headword (e.g. "Hashtag", "Meme"), and misses every real EN
 * duplicate. Always pass the language explicitly for an EN batch.
 *
 * Usage:
 *   node scripts/ingest/pipeline/batch/dedupe-batch.js
 *       [path/to/batch_<lang>_<category>_<n>.js]
 *       [es|en]
 *       [--apply]
 *
 *   (defaults to scripts/ingest/batches/batch_es_corpus_nuevo.js and
 *    lang "es", dry-run unless --apply is passed.)
 *
 *   node scripts/ingest/pipeline/batch/dedupe-batch.js --help
 */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..", "..", "..", "..");

const args = process.argv.slice(2);
if (args.includes("--help") || args.includes("-h")) {
  console.log(
    "Usage:\n" +
    "  node scripts/ingest/pipeline/batch/dedupe-batch.js [batchFile.js] [es|en] [--apply]\n" +
    "\n" +
    "Default batch file: scripts/ingest/batches/batch_es_corpus_nuevo.js\n" +
    "Default language: es — pass \"en\" explicitly for an EN batch, or\n" +
    "dedupe will (mostly meaninglessly) check against js/data.es.js.\n" +
    "Default mode: dry-run (prints what would be removed, does NOT write).\n" +
    "Pass --apply to overwrite the batch file with the filtered list.\n"
  );
  process.exit(0);
}
const apply = args.includes("--apply");
const positional = args.filter((a) => !a.startsWith("--"));
const lang = positional.find((a) => a === "es" || a === "en") || "es";

const batchPath = positional.find((a) => a !== "es" && a !== "en") ||
  path.join(ROOT, "scripts", "ingest", "batches", "batch_es_corpus_nuevo.js");
const dataPath = path.join(ROOT, "js", "data." + lang + ".js");

const batch = require(batchPath);
const src = fs.readFileSync(dataPath, "utf8").replace(/window\.DICCIONARIOS/g, "global.DICCIONARIOS");
// eslint-disable-next-line no-eval
eval(src);

console.log("Idioma:", lang, "(" + dataPath.replace(ROOT + path.sep, "") + ")");
const existingIds = new Set(DICCIONARIOS[lang].map((e) => e.id));
const existingPalabras = new Set(DICCIONARIOS[lang].map((e) => e.word.toLowerCase()));

const filtered = batch.filter((b) => {
  if (existingIds.has(b.id)) return false;
  if (existingPalabras.has(b.palabra.toLowerCase())) return false;
  return true;
});

const removed = batch.length - filtered.length;
console.log("Originales:", batch.length);
console.log("Tras filtrar:", filtered.length);
console.log("Eliminadas (ya existían):", removed);

const byCat = filtered.reduce((acc, b) => {
  acc[b.situacion] = (acc[b.situacion] || 0) + 1;
  return acc;
}, {});
console.log("Por categoría:", byCat);

if (!apply) {
  console.log(
    "\nDRY RUN — no se ha escrito nada. Vuelve a ejecutar con --apply para sobrescribir:\n" +
      "  node scripts/ingest/pipeline/batch/dedupe-batch.js " + batchPath + " " + lang + " --apply"
  );
  process.exit(0);
}

// Re-escribir el archivo, preservando el comentario de cabecera.
const header = fs.readFileSync(batchPath, "utf8").split("module.exports =")[0];
const newContent = header + "module.exports = " + JSON.stringify(filtered, null, 2) + ";\n";
fs.writeFileSync(batchPath, newContent);
console.log("Archivo actualizado:", batchPath);
