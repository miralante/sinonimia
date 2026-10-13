#!/usr/bin/env node
/*
 * Batch ingestion helper for the /goal "reach 1000 words per language" run.
 * Takes a hand-authored batch file (array of candidate entries, full
 * lectura-fácil text already written) and:
 *   - skips anything already covered (palabra or a synonym already exists)
 *   - validates ejemplo/ejemploSinonimo substring rule (same check as
 *     scripts/check.js) before touching any file
 *   - slugifies an id, dedup-safe against existing ids
 *   - searches ARASAAC for a real pictogram (tries each pictogramTerms
 *     entry in order), downloads it into img/ if not already present
 *   - falls back to the entry's `situacion` default pictogram (see
 *     ../../../category-pictogram-defaults.js and "Category fallback when no
 *     pictogram exists" in doc/en/technical.md) when none of the terms
 *     match anything in ARASAAC, instead of skipping the entry
 *   - appends the finished { ... } block to js/data.<lang>.js
 *
 * Usage: node scripts/ingest/pipeline/batch/ingest-batch.js <batchFile.js> <es|en>
 *
 * Batch file: module.exports = [ { palabra, definicion, sinonimos,
 *   ejemplo: {palabra, texto}, ejemploSinonimo: {palabra, texto},
 *   situacion, alt, pictogramTerms: [ "term1", "term2", ... ] }, ... ]
 *
 * Typical flow (the rest of the pipeline/ scripts fit into this):
 *   1. node scripts/ingest/pipeline/batch/validate-batch-es.js
 *      scripts/ingest/batches/batch_es_finanzas_1.js
 *      # catches easy-read problems before they land in js/data.es.js
 *   2. node scripts/ingest/pipeline/batch/dedupe-batch.js
 *      scripts/ingest/batches/batch_es_finanzas_1.js
 *      # drops entries already covered (id or palabra)
 *   3. node scripts/ingest/pipeline/batch/ingest-batch.js
 *      scripts/ingest/batches/batch_es_finanzas_1.js es
 *      # appends the finished entries to js/data.es.js
 *   4. node scripts/check.js
 *      # re-runs the full validator over the merged data
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "..", "..", "..");
const CATEGORY_DEFAULTS = require(path.join(ROOT, "scripts", "category-pictogram-defaults.js"));
const { loadProperNounSet, isProperNoun } = require("../shared/proper-noun-check.js");
const batchPath = process.argv[2];
const lang = process.argv[3];

if (!batchPath || !lang) {
  console.error("Usage: node scripts/ingest/pipeline/batch/ingest-batch.js <batchFile.js> <es|en>");
  process.exit(1);
}

const ALLOWED_SITUACIONES = new Set([
  "tramites", "salud", "vida-diaria", "finanzas", "vivienda", "trabajo",
  "legal", "tecnologia", "seguridad", "educacion", "conocimiento",
]);

function normalize(text) {
  return text.toString().normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
}

function slugify(text) {
  return normalize(text).replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function loadAsGlobal(relativePath, pattern, replacement) {
  const src = fs.readFileSync(path.join(ROOT, relativePath), "utf8").split(pattern).join(replacement);
  // eslint-disable-next-line no-eval
  eval(src);
}

loadAsGlobal("js/data.es.js", "window.DICCIONARIOS", "global.DICCIONARIOS");
loadAsGlobal("js/data.en.js", "window.DICCIONARIOS", "global.DICCIONARIOS");

const existing = DICCIONARIOS[lang] || [];
// Keep the insertion guard aligned with candidate mining: an exact lexical
// form deserves its own entry even when it already appears as a synonym or
// highlighted example elsewhere.  Only an existing headword is a duplicate.
const covered = new Set();
const existingIds = new Set();
existing.forEach(function (entry) {
  covered.add(normalize(entry.word || entry.palabra));
  existingIds.add(entry.id);
});

const dataFilePath = path.join(ROOT, "js", "data." + lang + ".js");
let dataFileSrc = fs.readFileSync(dataFilePath, "utf8");
const insertMarker = "\n];";
const insertAt = dataFileSrc.lastIndexOf(insertMarker);
if (insertAt === -1) {
  console.error("Could not find closing '];' in " + dataFilePath);
  process.exit(1);
}

const batch = require(path.resolve(batchPath));

function jsStringLiteral(str) {
  return JSON.stringify(str);
}

async function searchArasaac(term) {
  const url = "https://api.arasaac.org/api/pictograms/" + encodeURIComponent(lang) +
    "/search/" + encodeURIComponent(term);
  const res = await fetch(url);
  if (res.status === 404) return [];
  if (!res.ok) throw new Error("ARASAAC search failed (HTTP " + res.status + ") for " + term);
  return res.json();
}

async function findPictogram(terms) {
  for (const term of terms) {
    let results;
    try {
      results = await searchArasaac(term);
    } catch (err) {
      console.log("    ! search error for \"" + term + "\": " + err.message);
      continue;
    }
    if (results.length) {
      const nonSchematic = results.find(function (p) { return !p.schematic; });
      return nonSchematic || results[0];
    }
  }
  return null;
}

async function downloadImage(id) {
  const dest = path.join(ROOT, "img", id + ".png");
  if (fs.existsSync(dest)) return true;
  const url = "https://static.arasaac.org/pictograms/" + id + "/" + id + "_500.png";
  const res = await fetch(url);
  if (!res.ok) return false;
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  return true;
}

function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

(async () => {
  const { set: properNouns, available: properNounFilterAvailable } = await loadProperNounSet(lang);
  if (!properNounFilterAvailable) {
    console.log("! WARNING: Kaikki proper-noun cache not found (scripts/download/kaikki-es-extract.jsonl.gz) -" +
      " proper-noun filtering is DISABLED for this run. Review every entry by hand before trusting it.");
  }

  const added = [];
  const skippedDup = [];
  const skippedName = [];
  const errors = [];
  let insertedBlocks = "";

  for (const cand of batch) {
    const label = cand.palabra;
    if (!cand.palabra || !cand.definicion || !cand.sinonimos || !cand.ejemplo || !cand.ejemploSinonimo || !cand.situacion || !cand.alt) {
      errors.push(label + ": missing required field(s) (alt is required, no fallback to palabra)");
      continue;
    }
    if (!ALLOWED_SITUACIONES.has(cand.situacion)) {
      errors.push(label + ": invalid situacion \"" + cand.situacion + "\"");
      continue;
    }
    if (isProperNoun(cand.palabra, properNouns)) {
      skippedName.push(label + " (proper noun per Wiktionary ES / Kaikki)");
      continue;
    }
    const namedSyn = (cand.sinonimos || []).find(function (s) { return isProperNoun(s, properNouns); });
    if (namedSyn) {
      skippedName.push(label + " (synonym \"" + namedSyn + "\" is a proper noun per Wiktionary ES / Kaikki)");
      continue;
    }
    const normPalabra = normalize(cand.palabra);
    if (covered.has(normPalabra)) {
      skippedDup.push(label + " (palabra already covered)");
      continue;
    }
    if (normalize(cand.ejemplo.texto).indexOf(normalize(cand.ejemplo.palabra)) === -1) {
      errors.push(label + ": ejemplo.palabra not found inside ejemplo.texto");
      continue;
    }
    if (normalize(cand.ejemploSinonimo.texto).indexOf(normalize(cand.ejemploSinonimo.palabra)) === -1) {
      errors.push(label + ": ejemploSinonimo.palabra not found inside ejemploSinonimo.texto");
      continue;
    }

    let id = slugify(cand.palabra);
    let suffix = 2;
    while (existingIds.has(id)) {
      id = slugify(cand.palabra) + "-" + suffix;
      suffix++;
    }

    const terms = cand.pictogramTerms && cand.pictogramTerms.length ? cand.pictogramTerms : [cand.palabra];
    console.log("-> " + label + " (id=" + id + ") searching pictogram: " + terms.join(", "));
    let picto;
    try {
      picto = await findPictogram(terms);
    } catch (err) {
      errors.push(label + ": pictogram search threw: " + err.message);
      continue;
    }
    let usedCategoryDefault = false;
    if (!picto) {
      const fallback = CATEGORY_DEFAULTS[cand.situacion];
      if (!fallback) {
        errors.push(label + ": NO PICTOGRAM FOUND for terms [" + terms.join(", ") + "], and no category default for situacion \"" + cand.situacion + "\"");
        continue;
      }
      picto = { _id: fallback.id, keywords: [] };
      usedCategoryDefault = true;
    }
    const ok = await downloadImage(picto._id);
    if (!ok) {
      errors.push(label + ": could not download pictogram " + picto._id);
      continue;
    }
    await sleep(150);

    const alt = cand.alt;
    const sinonimosLit = "[" + cand.sinonimos.map(jsStringLiteral).join(", ") + "]";
    const block =
      "  {\n" +
      "    id: " + jsStringLiteral(id) + ",\n" +
      "    word: " + jsStringLiteral(cand.palabra) + ",\n" +
      "    image: { id: " + picto._id + ", alt: " + jsStringLiteral(alt) + " },\n" +
      "    definition: " + jsStringLiteral(cand.definicion) + ",\n" +
      "    synonyms: " + sinonimosLit + ",\n" +
      "    example: { word: " + jsStringLiteral(cand.ejemplo.palabra) + ", text: " + jsStringLiteral(cand.ejemplo.texto) + " },\n" +
      "    exampleSynonym: { word: " + jsStringLiteral(cand.ejemploSinonimo.palabra) + ", text: " + jsStringLiteral(cand.ejemploSinonimo.texto) + " },\n" +
      "    situacion: " + jsStringLiteral(cand.situacion) + ",\n" +
      "  },\n";

    insertedBlocks += block;
    existingIds.add(id);
    covered.add(normPalabra);
    const picKeywords = (picto.keywords || []).map(function (k) { return k.keyword; }).join("/");
    added.push(
      label + " (id=" + id + ", pictogram=" + picto._id + " [" + picKeywords + "]" +
      (picto.schematic ? ", schematic" : "") +
      (usedCategoryDefault ? ", CATEGORY DEFAULT for \"" + cand.situacion + "\"" : "") +
      ")"
    );
  }

  if (insertedBlocks) {
    dataFileSrc = dataFileSrc.slice(0, insertAt) + "\n" + insertedBlocks.replace(/\n$/, "") + dataFileSrc.slice(insertAt);
    fs.writeFileSync(dataFilePath, dataFileSrc, "utf8");
  }

  console.log("\n=== Summary (" + lang + ") ===");
  console.log("Added: " + added.length);
  added.forEach(function (a) { console.log("  + " + a); });
  console.log("Skipped (duplicate): " + skippedDup.length);
  skippedDup.forEach(function (s) { console.log("  = " + s); });
  console.log("Skipped (proper noun): " + skippedName.length);
  skippedName.forEach(function (s) { console.log("  = " + s); });
  console.log("Errors: " + errors.length);
  errors.forEach(function (e) { console.log("  ! " + e); });
})();
