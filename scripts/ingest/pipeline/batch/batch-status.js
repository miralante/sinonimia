#!/usr/bin/env node
/*
 * Batch-status report for scripts/ingest/batches/*.js.
 *
 * The batches/ directory is meant to be transient (see
 * scripts/ingest/README.md: "you can delete them freely after a batch
 * lands in the data files"), but nothing enforced that, so it has
 * accumulated hundreds of files and nobody can tell at a glance which
 * ones already landed in js/data.<lang>.js, which are half-landed
 * (dedupe/insert ran partway, or the batch was edited after landing),
 * and which were never run through the pipeline at all.
 *
 * This reuses the exact matching rule scripts/ingest/pipeline/batch/dedupe-batch.js
 * already uses (id or palabra, case-insensitive) but sweeps every batch
 * file instead of one, and only reports — it never writes.
 *
 * Usage:
 *   node scripts/ingest/pipeline/batch/batch-status.js            # summary
 *   node scripts/ingest/pipeline/batch/batch-status.js --detalle   # + per-file word lists
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "..", "..", "..");
const BATCHES_DIR = path.join(__dirname, "..", "..", "batches");
const detailed = process.argv.includes("--detalle") || process.argv.includes("--detail");

function loadDictionary(lang) {
  const dataPath = path.join(ROOT, "js", `data.${lang}.js`);
  const src = fs.readFileSync(dataPath, "utf8").replace(/window\.DICCIONARIOS/g, "global.DICCIONARIOS");
  // eslint-disable-next-line no-eval
  eval(src);
  return DICCIONARIOS[lang];
}

const dictionaries = { es: loadDictionary("es"), en: loadDictionary("en") };
const existingIds = {
  es: new Set(dictionaries.es.map((e) => e.id)),
  en: new Set(dictionaries.en.map((e) => e.id)),
};
const existingPalabras = {
  es: new Set(dictionaries.es.map((e) => e.word.toLowerCase())),
  en: new Set(dictionaries.en.map((e) => e.word.toLowerCase())),
};

function landed(entry, lang) {
  if (entry.id && existingIds[lang].has(entry.id)) return true;
  return existingPalabras[lang].has(String(entry.palabra).toLowerCase());
}

function detectLang(filename) {
  if (filename.startsWith("batch_es_")) return "es";
  if (filename.startsWith("batch_en_")) return "en";
  return null;
}

const files = fs
  .readdirSync(BATCHES_DIR)
  .filter((f) => f.endsWith(".js"))
  .sort();

const rows = [];
for (const file of files) {
  const lang = detectLang(file);
  if (!lang) {
    rows.push({ file, lang: "?", total: 0, done: 0, status: "SKIP (unrecognized filename pattern)" });
    continue;
  }
  let batch;
  try {
    batch = require(path.join(BATCHES_DIR, file));
  } catch (err) {
    rows.push({ file, lang, total: 0, done: 0, status: "ERROR (" + err.message + ")" });
    continue;
  }
  if (!Array.isArray(batch) || batch.length === 0) {
    rows.push({ file, lang, total: 0, done: 0, status: "EMPTY" });
    continue;
  }
  const doneEntries = batch.filter((e) => landed(e, lang));
  const done = doneEntries.length;
  const total = batch.length;
  let status;
  if (done === total) status = "LANDED (safe to delete)";
  else if (done === 0) status = "PENDING (not run through pipeline)";
  else status = "PARTIAL (needs attention)";
  rows.push({ file, lang, total, done, status, pending: batch.filter((e) => !landed(e, lang)) });
}

const order = { "PARTIAL (needs attention)": 0, "PENDING (not run through pipeline)": 1, "LANDED (safe to delete)": 2, "EMPTY": 3 };
rows.sort((a, b) => (order[a.status] ?? 4) - (order[b.status] ?? 4) || a.file.localeCompare(b.file));

console.log(`Batches en ${BATCHES_DIR}: ${files.length}\n`);

const byStatus = {};
for (const r of rows) {
  byStatus[r.status] = (byStatus[r.status] || 0) + 1;
  const counts = r.status.startsWith("SKIP") || r.status === "EMPTY" || r.status.startsWith("ERROR") ? "" : ` (${r.done}/${r.total})`;
  console.log(`${r.status.padEnd(38)} ${r.lang.padEnd(3)} ${r.file}${counts}`);
  if (detailed && r.pending && r.pending.length > 0 && r.status !== "LANDED (safe to delete)") {
    for (const e of r.pending) console.log(`    - ${e.palabra}`);
  }
}

console.log("\nResumen:");
for (const [status, count] of Object.entries(byStatus)) {
  console.log(`  ${status}: ${count}`);
}
