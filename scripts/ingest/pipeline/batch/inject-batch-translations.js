#!/usr/bin/env node
// Inyecta `traduccion: { en: "<id-en>" }` en las entradas ES del batch
// corpus-nuevo. Sigue el mismo formato que scripts/inject-translations.js
// (marcadores /*traduccion-start*/ /*traduccion-end*/) para ser idempotente.
//
// Uso: node scripts/ingest/pipeline/batch/inject-batch-translations.js
//      [path/to/batch_en_<category>_<n>.js]
//      (defaults to scripts/ingest/batches/batch_en_corpus_nuevo.js)
//
// SAFETY (fixed 2026-09-05, see PROGRESS.md): this script used to strip
// EVERY /*traduccion-start*/.../*traduccion-end*/ line in the whole file
// before re-injecting, then only re-added the mappings present in
// whatever batch file was passed. That's only safe if the batch passed
// is the single ever-growing "corpus_nuevo" file the tool was designed
// around; running it with a small one-off per-source batch (e.g. one
// mined-source's EN batch) silently wiped out every OTHER already-landed
// entry's translation link — 239 of them, the one time this happened.
// Now it only strips/replaces the marker line for the ES ids this run's
// own batch targets, leaving every other id's existing link untouched.
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "..", "..", "..");
const FILE = path.join(ROOT, "js", "data.es.js");

// Construye el mapa { es-id -> en-id } desde el batch EN.
const batchEn = require(process.argv[2] || "../batches/batch_en_corpus_nuevo.js");
const ES_TO_EN = {};
batchEn.forEach((b) => {
  if (b.traduccion && b.traduccion.es) {
    ES_TO_EN[b.traduccion.es] = b.id;
  }
});
console.log("Traducciones a inyectar:", Object.keys(ES_TO_EN).length);

const rawBytes = fs.readFileSync(FILE);
const isCrlf = rawBytes.includes(0x0d);
let src = rawBytes.toString("utf8").replace(/\r\n/g, "\n");

const MARKER_OPEN = "/*traduccion-start*/";
const MARKER_CLOSE = "/*traduccion-end*/";

let injected = 0;
const notFound = [];
for (const [esId, enId] of Object.entries(ES_TO_EN)) {
  const traduccionLine = `    ${MARKER_OPEN}translation: { en: "${enId}" },${MARKER_CLOSE}\n`;

  const escapedId = esId.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&");
  const idLineRe = new RegExp(
    "(^    id: \"" + escapedId + "\",\\n(?:    [^\\n]*\\n)*?    situacion: \"[^\"]*\",\\n)",
    "m",
  );
  const m = idLineRe.exec(src);
  if (!m) {
    notFound.push(esId);
    continue;
  }
  const insertAt = m.index + m[0].length;
  // Idempotent per-id: if this exact id already has a traduccion line
  // right after its situacion line (marker or plain format, from a
  // previous run or a hand-added link), replace just that one line
  // instead of leaving a duplicate — never touch any OTHER id's line.
  const existingRe = /^ {4}(?:\/\*traduccion-start\*\/)?(?:traduccion|translation):[^\n]*\n/;
  const rest = src.slice(insertAt);
  const existingMatch = existingRe.exec(rest);
  const tail = existingMatch ? rest.slice(existingMatch[0].length) : rest;
  src = src.slice(0, insertAt) + traduccionLine + tail;
  injected++;
}

if (notFound.length > 0) {
  console.error(`No se localizaron estos ES ids en ${FILE}: ${notFound.join(", ")}`);
  process.exit(1);
}

fs.writeFileSync(FILE, isCrlf ? src.replace(/\n/g, "\r\n") : src, "utf8");
console.log(`Inyectadas ${injected} traducciones en ${FILE} (line endings: ${isCrlf ? "CRLF" : "LF"})`);