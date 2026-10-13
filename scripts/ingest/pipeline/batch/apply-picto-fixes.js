#!/usr/bin/env node
// One-off: fix mismatched pictogram id/alt for specific entries in a data file.
// Usage: node scripts/ingest/pipeline/batch/apply-picto-fixes.js <es|en> <fixesFile.js>
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..", "..", "..", "..");

const lang = process.argv[2];
const fixesPath = process.argv[3];
if (!lang || !fixesPath) {
  console.error("Usage: node scripts/ingest/pipeline/batch/apply-picto-fixes.js <es|en> <fixesFile.js>");
  process.exit(1);
}
const fixes = require(path.resolve(fixesPath)); // [{ id, imgId, alt }]

const filePath = path.join(ROOT, "js", "data." + lang + ".js");
let src = fs.readFileSync(filePath, "utf8");

async function downloadImage(id) {
  const dest = path.join(ROOT, "img", id + ".png");
  if (fs.existsSync(dest)) return true;
  const url = "https://static.arasaac.org/pictograms/" + id + "/" + id + "_500.png";
  const res = await fetch(url);
  if (!res.ok) return false;
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  return true;
}

// Matches exactly the `imagen: { id: <n>, alt: "<escaped text>" },` shape
// every entry uses. Anchored with the sticky flag to match starting right
// at imgLineStart. Deliberately does NOT search for a trailing "\n" to
// find the end of the field: this repo's data files use CRLF line endings,
// and an "\n"-only search returns -1 there, which used to turn a targeted
// field replace into "keep almost the entire rest of the file" on every
// call — it inflated js/data.*.js from ~1.1MB to ~540MB in one run before
// this was caught. A failed anchor now surfaces as a skipped entry, never
// a silent byte-offset guess.
const IMAGEN_FIELD_RE = /imagen: \{ id: \d+, alt: "(?:[^"\\]|\\.)*" \},/y;

(async () => {
  for (const fix of fixes) {
    const idAnchor = 'id: "' + fix.id + '",';
    const anchorPos = src.indexOf(idAnchor);
    if (anchorPos === -1) {
      console.log("! entry id not found: " + fix.id);
      continue;
    }
    const imgLineStart = src.indexOf("imagen: {", anchorPos);
    IMAGEN_FIELD_RE.lastIndex = imgLineStart;
    const match = imgLineStart === -1 ? null : IMAGEN_FIELD_RE.exec(src);
    if (!match || match.index !== imgLineStart) {
      console.log("! could not match imagen field for: " + fix.id);
      continue;
    }
    const newLine = "imagen: { id: " + fix.imgId + ", alt: " + JSON.stringify(fix.alt) + " },";
    src = src.slice(0, imgLineStart) + newLine + src.slice(imgLineStart + match[0].length);
    const ok = await downloadImage(fix.imgId);
    console.log((ok ? "OK " : "FAIL ") + fix.id + " -> img " + fix.imgId + (ok ? "" : " (download failed)"));
  }
  fs.writeFileSync(filePath, src, "utf8");
})();
