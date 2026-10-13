#!/usr/bin/env node
/*
 * Executes a hand-picked term list per entry (semantic judgment already
 * done by a human/LLM — this script never chooses the search term on its
 * own). For each entry, tries each of its terms in order against ARASAAC
 * directly.
 *
 * CRITICAL SAFETY RULE (learned the hard way — see git history of this
 * file): ARASAAC's own search endpoint is a fuzzy match, not an exact
 * one. Taking "the first non-schematic result" for even a carefully
 * hand-picked term produced real damage on a first attempt — e.g.
 * "Tasa" -> a pictogram of Baltasar (one of the Three Wise Men, no
 * relation), "Pago de tasa" -> "Galápago europeo" (matched the substring
 * "pago" inside "Galápago", a turtle), "Seguridad Social" -> a cemetery.
 * So a candidate is only ever accepted when one of ITS OWN keyword tags
 * is an exact (accent/case-insensitive) match for the search term — the
 * same rule scripts/ingest/pipeline/picto-review/resolve-shared-pictograms.js already uses
 * for its safe auto-apply path. This yields far fewer hits per term, but
 * every hit is verifiably grounded in ARASAAC's own tagging, not a fuzzy
 * ranking. Also skips any candidate id already used by >= MIN_SHARED
 * entries in the current data file (so a fix can't quietly recreate a
 * new overused fallback).
 *
 * Usage: node scripts/ingest/pipeline/picto-review/apply-picto-decisions.js <lang> <decisionsFile.json>
 */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..", "..", "..", "..");

const lang = process.argv[2];
const decisionsPath = process.argv[3];
if (!lang || !decisionsPath) {
  console.error("Usage: node scripts/ingest/pipeline/picto-review/apply-picto-decisions.js <lang> <decisionsFile.json>");
  process.exit(1);
}
const MIN_SHARED = 3;
const decisions = JSON.parse(fs.readFileSync(path.resolve(decisionsPath), "utf8"));

function normalize(s) {
  return String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
}

function loadDictionary(l) {
  const src = fs.readFileSync(path.join(ROOT, "js", `data.${l}.js`), "utf8").replace(/window\.DICCIONARIOS/g, "global.DICCIONARIOS");
  // eslint-disable-next-line no-eval
  eval(src);
  return DICCIONARIOS[l];
}

async function searchArasaac(term, locale) {
  const url = "https://api.arasaac.org/api/pictograms/" + encodeURIComponent(locale) + "/search/" + encodeURIComponent(term);
  const res = await fetch(url);
  if (res.status === 404) return [];
  if (!res.ok) throw new Error("ARASAAC search HTTP " + res.status);
  const results = await res.json();
  return results.map((p) => ({ id: p._id, schematic: !!p.schematic, keywords: (p.keywords || []).map((k) => k.keyword) }));
}

async function downloadImage(id) {
  const dest = path.join(ROOT, "img", id + ".png");
  if (fs.existsSync(dest)) return true;
  const url = "https://static.arasaac.org/pictograms/" + id + "/" + id + "_500.png";
  const res = await fetch(url);
  if (!res.ok) return false;
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  return true;
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

function buildAlt(keywords) {
  const text = keywords.slice(0, 3).join(", ");
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : null;
}

(async () => {
  const dictionary = loadDictionary(lang);
  const byId = new Map(dictionary.map((e) => [e.id, e]));
  const useCount = new Map();
  dictionary.forEach((e) => useCount.set(e.imagen.id, (useCount.get(e.imagen.id) || 0) + 1));

  const dataPath = path.join(ROOT, "js", `data.${lang}.js`);
  let src = fs.readFileSync(dataPath, "utf8");

  const results = { applied: [], notFound: [], skippedOverused: [] };

  for (const [entryId, terms] of Object.entries(decisions)) {
    const entry = byId.get(entryId);
    if (!entry) {
      results.notFound.push({ id: entryId, reason: "entry not in dictionary" });
      continue;
    }
    let picked = null;
    let pickedTerm = null;
    let overusedCandidates = [];
    for (const term of terms) {
      let list;
      try {
        list = await searchArasaac(term, lang);
      } catch {
        continue;
      }
      const normTerm = normalize(term);
      const exactTagMatch = list.filter(
        (r) => !r.schematic && r.id !== entry.imagen.id && r.keywords.some((kw) => normalize(kw) === normTerm)
      );
      const usable = exactTagMatch.filter((r) => (useCount.get(r.id) || 0) < MIN_SHARED);
      if (usable.length > 0) {
        picked = usable[0];
        pickedTerm = term;
        break;
      }
      overusedCandidates.push(...exactTagMatch.filter((r) => (useCount.get(r.id) || 0) >= MIN_SHARED).map((r) => r.id));
    }
    if (!picked) {
      if (overusedCandidates.length > 0) {
        results.skippedOverused.push({ id: entryId, palabra: entry.palabra, candidates: [...new Set(overusedCandidates)] });
      } else {
        results.notFound.push({ id: entryId, palabra: entry.palabra, triedTerms: terms });
      }
      continue;
    }
    const ok = await downloadImage(picked.id);
    if (!ok) {
      results.notFound.push({ id: entryId, palabra: entry.palabra, reason: "download failed for " + picked.id });
      continue;
    }
    const alt = buildAlt(picked.keywords) || entry.imagen.alt;
    const newSrc = replaceImagenField(src, entryId, picked.id, alt);
    if (!newSrc) {
      results.notFound.push({ id: entryId, palabra: entry.palabra, reason: "could not anchor entry in data file" });
      continue;
    }
    src = newSrc;
    useCount.set(picked.id, (useCount.get(picked.id) || 0) + 1);
    results.applied.push({ id: entryId, palabra: entry.palabra, oldImagenId: entry.imagen.id, newImagenId: picked.id, term: pickedTerm, alt });
  }

  fs.writeFileSync(dataPath, src, "utf8");
  console.log(JSON.stringify(results, null, 2));
})();
