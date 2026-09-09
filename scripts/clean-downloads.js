#!/usr/bin/env node
/*
 * scripts/clean-downloads.js — housekeeping for Sinonimia's local cache dir.
 *
 * Sinonimia has one regenerable cache that grows over time, scripts/download/:
 * frequency-word lists downloaded by scripts/corpus-candidates.js, Kaikki
 * extracts and other pipeline input caches used by
 * scripts/ingest/pipeline/candidates/*.js, and a few downloaded-but-
 * expensive-to-redo source dumps (see `exclude` below). Used to be split
 * across two directories (scripts/download/ and scripts/ingest/download/)
 * until 2026-09-05, when they were merged into this one (user's call —
 * one download/ for the whole project; see PROGRESS.md). Everything in
 * it is re-downloaded on the next run of its owning script, so it's safe
 * to remove — except the names in `exclude` below (a slow, rate-limited
 * scrape/crawl instead of a quick single-URL fetch), which this script
 * always leaves in place.
 *
 * This script intentionally does NOT touch scripts/ingest/ beyond the
 * download/ cache above:
 *   - scripts/ingest/wip/   — active review state (resustitucion-state.json,
 *     review-batches/).
 *   - scripts/ingest/pipeline/  — the batch-ingestion pipeline, including
 *     pipeline/filters/rejected-words-es.txt/rejected-words-en.txt (hand-
 *     curated filter state, not a download).
 *   - scripts/ingest/explore/, scripts/ingest/batches/, scripts/ingest/fixes/
 *     — don't exist on disk between sessions/batches; only created with
 *     `mkdir` when something is actually in flight. Nothing to clean.
 * Deleting any of those is worse than letting them grow, so this script
 * leaves them alone. They're already in .gitignore.
 *
 * Usage:
 *   node scripts/clean-downloads.js            # dry-run (default): shows what would be removed
 *   node scripts/clean-downloads.js --apply    # actually removes the files
 *   node scripts/clean-downloads.js --help
 *
 * Why a dry-run by default: deleting things is irreversible, and a
 * maintainer who runs this from muscle memory shouldn't have to think
 * twice. Same pattern as `git clean`'s default.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const TARGETS = [
  {
    dir: path.join(__dirname, "download"),
    note: "shared cache: frequency lists (scripts/corpus-candidates.js), Kaikki extracts (proper-noun safety net for every batch insertion, and es-candidates-listapalabras.js's own filters), listapalabras.com's scraped pages",
    // - listapalabras.com has no API — every `listapalabras_*` file (the
    //   word list plus one `listapalabras_letra-<L>[-completa].html` per
    //   scraped letter, 27+ files) is a slow, reverse-engineered
    //   per-letter scrape (some pages 15-20 MB), not a single-URL download
    //   like the rest of this cache. Losing them means re-scraping the
    //   whole site, not re-running one fetch — hence the prefix match
    //   (a trailing "*") rather than naming each letter's file.
    // Everything else here is a plain single-URL/API fetch, safe to lose.
    // (2026-09-09: the Wiktionary/Wikipedia/Kaikki-general/Wikimedia/
    // CEFRLex/wordfreq candidate sources this exclude list used to also
    // cover are closed and their scripts + cached dumps removed — see
    // scripts/ingest/PROGRESS.md's Sources table.)
    exclude: [
      "listapalabras_*",
    ],
  },
];

function bytesHuman(n) {
  if (n < 1024) return n + " B";
  if (n < 1024 * 1024) return (n / 1024).toFixed(1) + " KiB";
  return (n / (1024 * 1024)).toFixed(2) + " MiB";
}

// `excludeNames` matches by name at the TOP LEVEL of `dir` only, and
// matches a plain file just as well as a subdirectory — it does not
// recurse into an excluded directory looking for more exclusions. An
// entry ending in "*" (e.g. "listapalabras_*") is a prefix match, for a
// source that caches a variable/unbounded set of filenames (one per
// scraped letter, in that case) rather than one fixed name.
function makeMatcher(excludeNames) {
  const exact = new Set();
  const prefixes = [];
  for (const name of excludeNames || []) {
    if (name.endsWith("*")) prefixes.push(name.slice(0, -1));
    else exact.add(name);
  }
  return (name) => exact.has(name) || prefixes.some((p) => name.startsWith(p));
}

function listDirRecursive(dir, excludeNames) {
  const isExcluded = makeMatcher(excludeNames);
  const out = [];
  if (!fs.existsSync(dir)) return out;
  function walk(d, isRoot) {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      if (isRoot && isExcluded(entry.name)) continue;
      const full = path.join(d, entry.name);
      if (entry.isDirectory()) walk(full, false);
      else if (entry.isFile()) out.push(full);
    }
  }
  walk(dir, true);
  return out;
}

function emptyDir(dir, excludeNames) {
  const isExcluded = makeMatcher(excludeNames);
  if (!fs.existsSync(dir)) return;
  let hasExcluded = false;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (isExcluded(entry.name)) {
      hasExcluded = true;
      continue;
    }
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      emptyDir(full);
      fs.rmdirSync(full);
    } else if (entry.isFile()) {
      fs.unlinkSync(full);
    }
  }
  // Also remove the root itself so the directory disappears entirely,
  // unless an excluded subdirectory survives inside it. The next run
  // recreates it via mkdirSync({ recursive: true }).
  if (!hasExcluded) fs.rmdirSync(dir);
}

const args = process.argv.slice(2);
if (args.includes("--help") || args.includes("-h")) {
  console.log(
    "Usage:\n" +
    "  node scripts/clean-downloads.js            # dry-run (default): shows what would be removed\n" +
    "  node scripts/clean-downloads.js --apply    # actually removes the files\n" +
    "  node scripts/clean-downloads.js --help\n"
  );
  process.exit(0);
}
const apply = args.includes("--apply");

let totalFiles = 0;
let totalBytes = 0;
const summary = [];

for (const target of TARGETS) {
  const files = listDirRecursive(target.dir, target.exclude);
  const bytes = files.reduce((sum, f) => sum + fs.statSync(f).size, 0);
  totalFiles += files.length;
  totalBytes += bytes;
  summary.push({ dir: target.dir, note: target.note, exclude: target.exclude, files: files, bytes: bytes });
}

console.log("=== Sinonimia — cache cleanup ===\n");
console.log("Note: scripts/ingest/ is intentionally NOT touched beyond download/ —");
console.log("      it holds the batch pipeline, active review state, and any");
console.log("      in-flight batch/fix data.\n");

if (totalFiles === 0) {
  console.log("Nothing to remove. All listed directories are already empty or absent.");
  process.exit(0);
}

for (const s of summary) {
  const rel = path.relative(ROOT, s.dir);
  console.log(rel + "  (" + s.files.length + " file(s), " + bytesHuman(s.bytes) + ")");
  console.log("  " + s.note);
  if (s.exclude && s.exclude.length) {
    console.log("  kept (not regenerable on a single fetch): " + s.exclude.join(", "));
  }
  if (s.files.length && apply) {
    s.files.forEach((f) => console.log("  - " + path.relative(ROOT, f)));
  }
  console.log("");
}

if (!apply) {
  console.log(
    "DRY RUN — no files were removed. Re-run with --apply to actually delete them.\n" +
    "Total: " + totalFiles + " file(s), " + bytesHuman(totalBytes) + "."
  );
  process.exit(0);
}

for (const s of summary) {
  emptyDir(s.dir, s.exclude);
}

console.log(
  "Removed " + totalFiles + " file(s) (" + bytesHuman(totalBytes) + ").\n" +
  "scripts/download/ will be rebuilt automatically on the next\n" +
  "node scripts/corpus-candidates.js run."
);
