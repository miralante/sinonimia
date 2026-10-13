#!/usr/bin/env node
/*
 * Applies the category-default fallback ONLY to entries already
 * hand-confirmed (status "no-viable-candidate" in resustitucion-state.json,
 * set by a real per-entry review this session — see picto-review.md) to
 * have no specific ARASAAC pictogram anywhere. Deliberately scoped this
 * narrowly: an earlier, broader version of this script targeted "any
 * entry sharing a pictogram with >= 3 others" and it was WRONG — plenty
 * of those entries already had a decent, topically-specific shared image
 * (e.g. "Un hospital" for salud entries, "firmar" for signature-related
 * ones) that a blind sweep replaced with a MORE generic category icon,
 * a real regression caught in a --limit=15 dry test and reverted before
 * it touched more than that. Only entries actually confirmed empty by a
 * human/LLM search get touched here — nothing is inferred from cluster
 * membership alone.
 *
 * For each confirmed-empty entry, still gives ARASAAC one more real
 * shot first (exact, non-schematic, non-overused keyword-tag match on
 * palabra or a sinonimo, no hand-guessed extra terms) in case anything
 * changed, then falls back to the entry's `situacion` category default
 * from ../../../category-pictogram-defaults.js — always using the
 * default's OWN alt text, never the old entry's (a second bug caught in
 * the same dry test: carrying over the old alt described an image that
 * was no longer there).
 *
 * Usage: node scripts/ingest/pipeline/picto-review/close-picto-backlog.js <lang>
 */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..", "..", "..", "..");
const CATEGORY_DEFAULTS = require(path.join(ROOT, "scripts", "category-pictogram-defaults.js"));
const STATE_PATH = path.join(__dirname, "..", "..", "wip", "resustitucion-state.json");
const MIN_SHARED = 3;

const lang = process.argv[2];
if (!lang) {
  console.error("Usage: node scripts/ingest/pipeline/picto-review/close-picto-backlog.js <es|en> [--limit=N]");
  process.exit(1);
}
const limitArg = process.argv.find((a) => a.startsWith("--limit="));
const LIMIT = limitArg ? parseInt(limitArg.split("=")[1], 10) : Infinity;

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
function buildAlt(keywords) {
  const text = keywords.slice(0, 3).join(", ");
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : null;
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

(async () => {
  const dictionary = loadDictionary(lang);
  const byId = new Map(dictionary.map((e) => [e.id, e]));
  const useCount = new Map();
  dictionary.forEach((e) => useCount.set(e.imagen.id, (useCount.get(e.imagen.id) || 0) + 1));

  // Targets: ONLY entries hand-confirmed empty (see file header). Anything
  // merely "shares an id with >= MIN_SHARED others" but never reviewed is
  // left untouched — its current image may already be a reasonable fit.
  const state = fs.existsSync(STATE_PATH) ? JSON.parse(fs.readFileSync(STATE_PATH, "utf8")) : {};
  const targets = dictionary.filter((e) => state[e.id] && state[e.id].status === "no-viable-candidate");

  console.log(`[${lang}] ${targets.length} entries hand-confirmed to have no viable specific pictogram.`);
  const work = targets.slice(0, LIMIT);

  const dataPath = path.join(ROOT, "js", `data.${lang}.js`);
  let src = fs.readFileSync(dataPath, "utf8");
  let specific = 0;
  let defaulted = 0;
  let skippedNoDefault = 0;
  let processed = 0;

  let alreadyCorrect = 0;
  for (const entry of work) {
    const terms = [entry.palabra, ...(entry.sinonimos || [])];
    let picked = null;
    let selfMatch = false;
    for (const term of terms) {
      let list;
      try {
        list = await searchArasaac(term, lang);
      } catch {
        continue;
      }
      const normTerm = normalize(term);
      // Keep the entry's own current image in the candidate pool: if it's
      // the exact match, that means the entry was ALREADY correct and must
      // not fall through to the category-default branch below (a bug that
      // silently downgraded several already-correct entries — see
      // fix_*_regression_audit1.js). Only exclude other overused ids.
      const usable = list.filter(
        (r) => !r.schematic && (r.id === entry.imagen.id || (useCount.get(r.id) || 0) < MIN_SHARED) && r.keywords.some((kw) => normalize(kw) === normTerm)
      );
      if (usable.length > 0) {
        picked = usable[0];
        selfMatch = picked.id === entry.imagen.id;
        break;
      }
    }

    if (selfMatch) {
      alreadyCorrect++;
    } else if (picked) {
      const ok = await downloadImage(picked.id);
      if (ok) {
        const alt = buildAlt(picked.keywords) || entry.imagen.alt;
        const newSrc = replaceImagenField(src, entry.id, picked.id, alt);
        if (newSrc) {
          src = newSrc;
          useCount.set(picked.id, (useCount.get(picked.id) || 0) + 1);
          specific++;
        }
      }
    } else {
      const fallback = CATEGORY_DEFAULTS[entry.situacion];
      if (!fallback) {
        skippedNoDefault++;
      } else if (entry.imagen.id !== fallback.id) {
        const ok = await downloadImage(fallback.id);
        if (ok) {
          const newSrc = replaceImagenField(src, entry.id, fallback.id, fallback.alt);
          if (newSrc) {
            src = newSrc;
            useCount.set(fallback.id, (useCount.get(fallback.id) || 0) + 1);
            defaulted++;
          }
        }
      }
    }

    processed++;
    if (processed % 100 === 0) {
      fs.writeFileSync(dataPath, src, "utf8");
      console.log(`[${lang}] ${processed}/${work.length} processed (specific: ${specific}, defaulted: ${defaulted}, already correct: ${alreadyCorrect})`);
    }
  }

  fs.writeFileSync(dataPath, src, "utf8");
  console.log(`[${lang}] DONE. specific matches: ${specific}, category-defaulted: ${defaulted}, already correct: ${alreadyCorrect}, no default available: ${skippedNoDefault}`);
})();
