#!/usr/bin/env node
// Inserta las entradas del batch EN al final del último shard EN disponible.
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "..", "..", "..");
const MAX_SHARD_BYTES = 23_500_000;
const { loadProperNounSet, isProperNoun } = require("../shared/proper-noun-check.js");
const batch = require(process.argv[2] || "../batches/batch_en_corpus_nuevo.js");
const headerComment = process.argv[3] || "AIVD: contratos / servicios / registro de la propiedad (batch corpus-nuevo)";

function shardPaths() {
  const jsDir = path.join(ROOT, "js");
  return fs.readdirSync(jsDir)
    .filter((name) => /^data\.en(?:\.\d+)?\.js$/.test(name))
    .sort((a, b) => {
      const aNum = a === "data.en.js" ? 0 : Number(a.match(/\.(\d+)\.js$/)[1]);
      const bNum = b === "data.en.js" ? 0 : Number(b.match(/\.(\d+)\.js$/)[1]);
      return aNum - bNum;
    })
    .map((name) => path.join(jsDir, name));
}

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
    const tradStr = Object.entries(b.traduccion).map(([k, v]) => `${q(k)}: ${q(v)}`).join(", ");
    lines.push(`    translation: { ${tradStr} },`);
  }
  lines.push("  },");
  return lines.join("\n");
}

function formatContinuation(entries, number) {
  return `/* English dictionary continuation shard ${number}. Load after data.en.js. */\n` +
    "window.DICCIONARIOS = window.DICCIONARIOS || {};\n" +
    "DICCIONARIOS.en = DICCIONARIOS.en.concat([\n" +
    entries.map(formatEntry).join("\n") +
    "\n]);\n";
}

(async () => {
  const { set: properNouns, available } = await loadProperNounSet("en");
  if (!available) console.log("! WARNING: Kaikki EN proper-noun cache not found - proper-noun filtering is DISABLED for this run.");
  const named = batch.filter((b) => isProperNoun(b.palabra, properNouns) || (b.sinonimos || []).some((s) => isProperNoun(s, properNouns)));
  if (named.length) {
    console.error("ABORTED: proper noun(s) found in batch, remove before inserting:");
    named.forEach((b) => console.error("  ! " + b.palabra));
    process.exit(1);
  }

  const paths = shardPaths();
  if (!paths.length) throw new Error("No existe js/data.en.js");
  const lastPath = paths[paths.length - 1];
  const src = fs.readFileSync(lastPath, "utf8");
  const formatted = batch.map(formatEntry).join("\n");
  const isContinuation = /\.concat\(\[/.test(src);
  const closingMarker = isContinuation ? "]);" : "];";
  const closingIdx = src.lastIndexOf(closingMarker);
  if (closingIdx < 0) throw new Error(`No se encontró el cierre del shard ${lastPath}`);
  const before = src.slice(0, closingIdx).replace(/,\s*$/, "");
  const newSrc = before + ",\n\n  // --- " + headerComment + " ---\n" + formatted + (isContinuation ? "\n]);\n" : "\n];\n");
  const targetBytes = Buffer.byteLength(newSrc, "utf8");

  if (targetBytes <= MAX_SHARD_BYTES) {
    fs.writeFileSync(lastPath, newSrc);
    console.log("Insertadas:", batch.length, "nuevas entradas en", lastPath);
    console.log("Tamaño:", Buffer.byteLength(src, "utf8"), "->", targetBytes);
    return;
  }

  const nextNumber = lastPath.endsWith("data.en.js") ? 2 : Number(lastPath.match(/\.(\d+)\.js$/)[1]) + 1;
  const nextPath = path.join(ROOT, "js", `data.en.${nextNumber}.js`);
  const continuation = formatContinuation(batch, nextNumber);
  if (Buffer.byteLength(continuation, "utf8") > MAX_SHARD_BYTES) throw new Error("El batch completo supera el límite de un shard EN");
  fs.writeFileSync(nextPath, continuation);
  console.log("Insertadas:", batch.length, "nuevas entradas en nuevo shard", nextPath);
  console.log("Shard anterior conservado en", lastPath, "con", Buffer.byteLength(src, "utf8"), "bytes");
})();
