#!/usr/bin/env node
/*
 * For EN entries that are the translation of an existing ES headword,
 * reuse that ES entry's CURRENT imagen.id directly instead of searching
 * ARASAAC again — the ES side has already been hand-vetted (exact tag
 * match or situacion default), so no new ARASAAC lookup or homograph
 * check is needed, only a correct translation pairing.
 *
 * Input: a JSON object { "<en-entry-id>": "<es headword to match>", ... }
 * The ES headword is matched case/accent-insensitively against
 * js/data.es.js palabra fields. On a match, the EN entry's imagen field
 * is set to the ES entry's current { id, alt } (alt translated to
 * English by the caller isn't required — the ES alt is descriptive
 * enough and this repo doesn't require alt text to be per-language
 * translated verbatim, same as any two entries already sharing an id).
 *
 * Usage: node scripts/ingest/pipeline/picto-review/reuse-es-pictogram.js <pairsFile.json>
 */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..", "..", "..", "..");

const pairsPath = process.argv[2];
if (!pairsPath) {
  console.error("Usage: node scripts/ingest/pipeline/picto-review/reuse-es-pictogram.js <pairsFile.json>");
  process.exit(1);
}
const pairs = JSON.parse(fs.readFileSync(path.resolve(pairsPath), "utf8"));

function normalize(s) {
  return String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
}
function loadDictionary(lang) {
  const src = fs.readFileSync(path.join(ROOT, "js", `data.${lang}.js`), "utf8").replace(/window\.DICCIONARIOS/g, "global.DICCIONARIOS");
  // eslint-disable-next-line no-eval
  eval(src);
  return DICCIONARIOS[lang];
}
const IMAGEN_FIELD_RE = /imagen: \{ id: \d+, alt: "(?:[^"\\]|\\.)*" \},/y;
function replaceImagenField(src, entryId, newImagenId, newAlt) {
  const idAnchor = 'id: "' + entryId + '",';
  const anchorPos = src.indexOf(idAnchor);
  if (anchorPos === -1) return null;
  const imgStart = src.indexOf("imagen: {", anchorPos);
  if (imgStart === -1) return null;
  IMAGEN_FIELD_RE.lastIndex = imgStart;
  const match = IMAGEN_FIELD_RE.exec(src);
  if (!match || match.index !== imgStart) return null;
  const newField = "imagen: { id: " + newImagenId + ", alt: " + JSON.stringify(newAlt) + " },";
  return src.slice(0, imgStart) + newField + src.slice(imgStart + match[0].length);
}

const esDict = loadDictionary("es");
const enDict = loadDictionary("en");
const esByPalabra = new Map(esDict.map((e) => [normalize(e.palabra), e]));
const enById = new Map(enDict.map((e) => [e.id, e]));

const enPath = path.join(ROOT, "js", "data.en.js");
let src = fs.readFileSync(enPath, "utf8");

const applied = [];
const notFound = [];
for (const [enId, esWord] of Object.entries(pairs)) {
  const enEntry = enById.get(enId);
  if (!enEntry) {
    notFound.push({ enId, reason: "en entry not found" });
    continue;
  }
  const esEntry = esByPalabra.get(normalize(esWord));
  if (!esEntry) {
    notFound.push({ enId, esWord, reason: "no es headword match" });
    continue;
  }
  if (enEntry.imagen.id === esEntry.imagen.id) {
    notFound.push({ enId, esWord, reason: "already matches" });
    continue;
  }
  const newSrc = replaceImagenField(src, enId, esEntry.imagen.id, esEntry.imagen.alt);
  if (!newSrc) {
    notFound.push({ enId, esWord, reason: "could not anchor in data file" });
    continue;
  }
  src = newSrc;
  applied.push({ enId, esWord: esEntry.palabra, imgId: esEntry.imagen.id });
}

fs.writeFileSync(enPath, src, "utf8");
console.log(`Applied: ${applied.length}`);
applied.forEach((a) => console.log(`  + ${a.enId} <- "${a.esWord}" (img ${a.imgId})`));
console.log(`Not found / skipped: ${notFound.length}`);
notFound.forEach((n) => console.log(`  ! ${n.enId}${n.esWord ? " (" + n.esWord + ")" : ""}: ${n.reason}`));
