#!/usr/bin/env node
// Inyecta enlaces EN -> ES en entradas españolas formateadas o compactadas,
// tanto en data.es.js como en data.es.2.js. Es idempotente por entrada.
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "..", "..", "..");
const batch = require(process.argv[2] || "../batches/batch_en_corpus_nuevo.js");
const files = ["js/data.es.js", "js/data.es.2.js"]
  .map((relative) => path.join(ROOT, relative))
  .filter((file) => fs.existsSync(file));
const mappings = {};
batch.forEach((entry) => {
  if (entry.traduccion && entry.traduccion.es) mappings[entry.traduccion.es] = entry.id;
});

const markerOpen = "/*traduccion-start*/";
const markerClose = "/*traduccion-end*/";
const sources = files.map((file) => {
  const bytes = fs.readFileSync(file);
  return { file, crlf: bytes.includes(0x0d), src: bytes.toString("utf8").replace(/\r\n/g, "\n") };
});

function locate(src, escapedId) {
  const formatted = new RegExp(
    `(^    id: "${escapedId}",\\n(?:    [^\\n]*\\n)*?    situacion: "[^"]*",\\n)`,
    "m",
  ).exec(src);
  if (formatted) return { style: "formatted", index: formatted.index, length: formatted[0].length };
  const compact = new RegExp(
    `(\\{"id":"${escapedId}",[\\s\\S]*?,"situacion":"[^"]*")`,
    "m",
  ).exec(src);
  if (compact) return { style: "compact", index: compact.index, length: compact[0].length };
  return null;
}

let injected = 0;
const notFound = [];
for (const [esId, enId] of Object.entries(mappings)) {
  const escapedId = esId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const target = sources.find((item) => locate(item.src, escapedId));
  if (!target) {
    notFound.push(esId);
    continue;
  }
  const found = locate(target.src, escapedId);
  const insertAt = found.index + found.length;
  if (found.style === "formatted") {
    const line = `    ${markerOpen}translation: { en: "${enId}" },${markerClose}\n`;
    const rest = target.src.slice(insertAt);
    const existingRe = /^ {4}(?:\/\*traduccion-start\*\/)?(?:traduccion|translation):[^\n]*\n/;
    const existing = existingRe.exec(rest);
    target.src = target.src.slice(0, insertAt) + line + (existing ? rest.slice(existing[0].length) : rest);
  } else {
    const property = `,"translation":{"en":"${enId}"}`;
    const rest = target.src.slice(insertAt);
    const existingRe = /^,"translation":\{[^}]*\}/;
    const existing = existingRe.exec(rest);
    target.src = target.src.slice(0, insertAt) + property + (existing ? rest.slice(existing[0].length) : rest);
  }
  injected++;
}

if (notFound.length) {
  console.error("No se localizaron estos ES ids: " + notFound.join(", "));
  process.exit(1);
}
sources.forEach((item) => fs.writeFileSync(item.file, item.crlf ? item.src.replace(/\n/g, "\r\n") : item.src, "utf8"));
console.log(`Inyectadas ${injected} traducciones en ${sources.length} fichero(s) español(es).`);
