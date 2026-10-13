#!/usr/bin/env node
/*
 * Bulk re-pictogramming pass.
 *
 * Before OpenSymbols was wired into scripts/search-pictogram.js, batches
 * were pictured with a plain ARASAAC keyword search, and an exact-term
 * miss (very common — see SPEC.md's "Ejemplo real de una pasada completa")
 * silently fell back to whatever the picker had on hand, so lots of
 * unrelated entries ended up sharing one generic ARASAAC pictogram. This
 * script finds every entry whose `imagen.id` is shared by more than 2
 * entries, and tries to find that entry its own, better pictogram.
 *
 * Search: OpenSymbols first (aggregates ARASAAC + other banks), ARASAAC
 * direct as fallback — same order scripts/search-pictogram.js already
 * uses. Auto-apply only happens for a **direct ARASAAC** result that is
 * **not schematic** and differs from the id already in use — OpenSymbols'
 * aggregated results don't expose the `schematic` flag, so they can't be
 * safely auto-applied; a good OpenSymbols hit (ARASAAC or not) instead
 * goes into the review file for a human to apply by hand with
 * apply-picto-fixes.js. This mirrors search-pictogram.js's own rule that a
 * multi-bank result needs a human before it's trusted.
 *
 * If the entry's own `palabra` finds nothing usable, it retries with up
 * to 2 of the entry's `sinonimos` (the same trick SPEC.md documents for
 * manual pictogram search: try a synonym before giving up).
 *
 * Resumable: progress is written to wip/resustitucion-state.json
 * after every entry, keyed by entry id. Re-running skips entries already
 * marked "applied" or "reviewed" (no qualifying candidate found) unless
 * --retry is passed, which also retries "error" entries even without
 * the flag (transient failures are always worth one more try).
 *
 * Usage:
 *   OPENSYMBOLS_SECRET=xxxx node scripts/ingest/pipeline/picto-review/resolve-shared-pictograms.js [es|en|all] [--retry] [--min-shared=3]
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "..", "..", "..");
const ONE_OFF_DIR = path.join(__dirname, "..", "..", "wip");
const STATE_PATH = path.join(ONE_OFF_DIR, "resustitucion-state.json");
const REVIEW_PATH = path.join(ONE_OFF_DIR, "picto-review.md");
if (!fs.existsSync(ONE_OFF_DIR)) fs.mkdirSync(ONE_OFF_DIR, { recursive: true });

function loadDotEnv() {
  const envPath = path.join(ROOT, ".env");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/.exec(line);
    if (!m) continue;
    const key = m[1];
    const value = m[2].replace(/^["']|["']$/, "");
    if (!(key in process.env)) process.env[key] = value;
  }
}
loadDotEnv();

const args = process.argv.slice(2);
const langArg = args.find((a) => !a.startsWith("--")) || "all";
const retry = args.includes("--retry");
const dryRun = args.includes("--dry-run");
const minSharedArg = args.find((a) => a.startsWith("--min-shared="));
const MIN_SHARED = minSharedArg ? parseInt(minSharedArg.split("=")[1], 10) : 3;
const limitArg = args.find((a) => a.startsWith("--limit="));
const LIMIT = limitArg ? parseInt(limitArg.split("=")[1], 10) : Infinity;
const CONCURRENCY = 5;

const secret = process.env.OPENSYMBOLS_SECRET;
const presetToken = process.env.OPENSYMBOLS_TOKEN;
let openSymbolsToken = presetToken || null;

function loadState() {
  if (!fs.existsSync(STATE_PATH)) return {};
  try {
    return JSON.parse(fs.readFileSync(STATE_PATH, "utf8"));
  } catch {
    return {};
  }
}
function saveState(state) {
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2));
}

function loadDictionary(lang) {
  const dataPath = path.join(ROOT, "js", `data.${lang}.js`);
  const src = fs.readFileSync(dataPath, "utf8").replace(/window\.DICCIONARIOS/g, "global.DICCIONARIOS");
  // eslint-disable-next-line no-eval
  eval(src);
  return DICCIONARIOS[lang];
}

async function getOpenSymbolsToken() {
  if (openSymbolsToken) return openSymbolsToken;
  if (!secret) return null;
  const url = "https://www.opensymbols.org/api/v2/token?secret=" + encodeURIComponent(secret);
  const res = await fetch(url, { method: "POST" });
  if (!res.ok) throw new Error("token HTTP " + res.status);
  const data = await res.json();
  if (!data.access_token) throw new Error("no access_token in response");
  openSymbolsToken = data.access_token;
  return openSymbolsToken;
}

async function searchOpenSymbols(term, locale) {
  const token = await getOpenSymbolsToken();
  if (!token) return [];
  const url =
    "https://www.opensymbols.org/api/v2/symbols?q=" +
    encodeURIComponent(term) +
    "&locale=" +
    encodeURIComponent(locale) +
    "&access_token=" +
    encodeURIComponent(token);
  const res = await fetch(url);
  if (res.status === 401 || res.status === 403) {
    openSymbolsToken = null; // force a re-exchange on next call
    return [];
  }
  if (!res.ok) throw new Error("OpenSymbols search HTTP " + res.status);
  const results = await res.json();
  return results.map((r) => ({
    name: r.name,
    bank: r.repo_key,
    license: r.license,
    author: r.author,
    imageUrl: r.image_url,
  }));
}

async function searchArasaac(term, locale) {
  const url = "https://api.arasaac.org/api/pictograms/" + encodeURIComponent(locale) + "/search/" + encodeURIComponent(term);
  const res = await fetch(url);
  if (res.status === 404) return [];
  if (!res.ok) throw new Error("ARASAAC search HTTP " + res.status);
  const results = await res.json();
  return results.map((p) => ({
    id: p._id,
    schematic: !!p.schematic,
    keywords: (p.keywords || []).map((k) => k.keyword).filter(Boolean),
  }));
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
  if (!text) return null;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// ARASAAC's own search is a fuzzy match against individual keywords, not
// the whole phrase — searching "Hipoteca a tipo fijo" can return a pictogram
// tagged only "radar fijo" (matched on "fijo" alone). A first-non-schematic
// pick on that basis produces confidently wrong pictograms (verified by a
// dry run: "Diferencial hipotecario" -> a wrench, "Catastral" -> a fetal
// heart monitor, "usufruct" -> "New Year's Eve"). So auto-apply requires an
// EXACT match (accent/case-insensitive) between the search term and one of
// the candidate's own keyword tags — not just appearing in the results list.
// Multi-word technical terms usually have no ARASAAC keyword tagged exactly
// that way, so this correctly yields nothing for them instead of guessing;
// those fall through to the review file.
function normalize(s) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

// Finds the best ARASAAC-direct, non-schematic, exact-keyword candidate
// across `palabra` and up to 2 synonyms; also returns the first OpenSymbols
// hit found (any bank) so the review file has something to point at even on
// failure.
async function findCandidate(entry, locale, excludeId) {
  const terms = [entry.palabra, ...(entry.sinonimos || []).slice(0, 2)];
  let openSymbolsHit = null;
  for (const term of terms) {
    try {
      const arasaacResults = await searchArasaac(term, locale);
      const normTerm = normalize(term);
      const usable = arasaacResults.filter(
        (r) => !r.schematic && r.id !== excludeId && r.keywords.some((kw) => normalize(kw) === normTerm)
      );
      if (usable.length > 0) {
        return { auto: usable[0], term, openSymbolsHit };
      }
    } catch (err) {
      // keep trying other terms / OpenSymbols; recorded as error only if everything fails
    }
    if (!openSymbolsHit && secret) {
      try {
        const osResults = await searchOpenSymbols(term, locale);
        if (osResults.length > 0) openSymbolsHit = { ...osResults[0], term };
      } catch (err) {
        // OpenSymbols is best-effort for the review file only
      }
    }
  }
  return { auto: null, term: null, openSymbolsHit };
}

// Matches exactly the `imagen: { id: <n>, alt: "<escaped text>" },` shape
// every entry in js/data.<lang>.js uses (verified against both files: 100%
// single-line, no exceptions). Anchored with the sticky flag so it only
// matches starting exactly at imgStart — never searches for a trailing
// "\n" to find the end of the field, because this repo's data files use
// CRLF line endings and an "\n"-only search silently returns -1 there,
// which previously turned a targeted field replace into "keep almost the
// entire rest of the file" on every single call (see incident note in
// STATUS.md / commit history: it inflated js/data.*.js from ~1.1MB to
// ~540MB in one run). Returning null on no-match is deliberate: a failed
// anchor must surface as a per-entry error, never silently fall back to a
// byte-offset guess.
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

async function processLang(lang, state) {
  const dictionary = loadDictionary(lang);
  const byId = {};
  dictionary.forEach((e) => {
    (byId[e.imagen.id] = byId[e.imagen.id] || []).push(e);
  });
  const targets = [];
  Object.values(byId).forEach((entries) => {
    if (entries.length >= MIN_SHARED) targets.push(...entries);
  });

  const pending = targets
    .filter((e) => {
      const s = state[e.id];
      if (!s) return true;
      if (s.status === "error") return true; // always worth one retry
      if (retry) return true;
      return false;
    })
    .slice(0, LIMIT);

  console.log(
    `[${lang}] ${targets.length} entries share a pictogram with >= ${MIN_SHARED} others; ${pending.length} to process this run${dryRun ? " (DRY RUN — no writes)" : ""}.`
  );

  const dataPath = path.join(ROOT, "js", `data.${lang}.js`);
  let src = fs.readFileSync(dataPath, "utf8");
  let applied = 0;
  let processed = 0;

  async function handleOne(entry) {
    try {
      const result = await findCandidate(entry, lang, entry.imagen.id);
      if (result.auto) {
        const alt = buildAlt(result.auto.keywords) || entry.imagen.alt;
        if (dryRun) {
          applied++;
          console.log(`[${lang}] DRY: ${entry.id} (${entry.palabra}) ${entry.imagen.id} -> ${result.auto.id} "${alt}" (matched "${result.term}")`);
          return; // don't touch state — a real run should still process this entry
        }
        const ok = await downloadImage(result.auto.id);
        if (!ok) {
          state[entry.id] = { status: "error", message: "image download failed for " + result.auto.id, at: new Date().toISOString() };
          return;
        }
        const newSrc = replaceImagenField(src, entry.id, result.auto.id, alt);
        if (!newSrc) {
          state[entry.id] = { status: "error", message: "could not locate entry in data file", at: new Date().toISOString() };
          return;
        }
        src = newSrc;
        applied++;
        state[entry.id] = {
          status: "applied",
          oldImagenId: entry.imagen.id,
          newImagenId: result.auto.id,
          matchedTerm: result.term,
          at: new Date().toISOString(),
        };
      } else if (dryRun) {
        console.log(`[${lang}] DRY: ${entry.id} (${entry.palabra}) — no qualifying candidate${result.openSymbolsHit ? " (OpenSymbols has: " + result.openSymbolsHit.name + ")" : ""}`);
      } else {
        state[entry.id] = {
          status: "reviewed",
          palabra: entry.palabra,
          imagenId: entry.imagen.id,
          sharedCount: byId[entry.imagen.id].length,
          openSymbolsHit: result.openSymbolsHit,
          at: new Date().toISOString(),
        };
      }
    } catch (err) {
      state[entry.id] = { status: "error", message: err.message, at: new Date().toISOString() };
    }
  }

  for (let i = 0; i < pending.length; i += CONCURRENCY) {
    const chunk = pending.slice(i, i + CONCURRENCY);
    await Promise.all(chunk.map(handleOne));
    processed += chunk.length;
    if (!dryRun) {
      fs.writeFileSync(dataPath, src, "utf8"); // checkpoint after every chunk
      saveState(state);
    }
    if (processed % 50 < CONCURRENCY) {
      console.log(`[${lang}] ${processed}/${pending.length} processed, ${applied} applied so far`);
    }
  }

  console.log(`[${lang}] done: ${applied} applied out of ${pending.length} processed.`);
}

function writeReviewFile(state) {
  const entries = Object.entries(state).filter(([, s]) => s.status === "reviewed" || s.status === "error");
  const lines = ["# Picto review — entries not auto-replaced", "", "Generated by resolve-shared-pictograms.js. Apply chosen fixes with apply-picto-fixes.js.", ""];
  entries
    .sort((a, b) => (b[1].sharedCount || 0) - (a[1].sharedCount || 0))
    .forEach(([entryId, s]) => {
      if (s.status === "error") {
        lines.push(`- **${entryId}** — ERROR: ${s.message}`);
      } else {
        const os = s.openSymbolsHit;
        const osText = os ? `OpenSymbols candidate: "${os.name}" [${os.bank}, ${os.license}, ${os.author}] ${os.imageUrl} (matched "${os.term}")` : "no OpenSymbols candidate either";
        lines.push(`- **${entryId}** (${s.palabra}) — shares imagen.id ${s.imagenId} with ${s.sharedCount} entries. ${osText}`);
      }
    });
  fs.writeFileSync(REVIEW_PATH, lines.join("\n") + "\n");
  console.log(`Review file: ${REVIEW_PATH} (${entries.length} entries)`);
}

(async () => {
  const state = loadState();
  const langs = langArg === "all" ? ["es", "en"] : [langArg];
  for (const lang of langs) {
    await processLang(lang, state);
  }
  writeReviewFile(state);
})();
