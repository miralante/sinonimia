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
 * download/ cache above and the bulky per-round audit dumps in wip/:
 *   - scripts/ingest/wip/   — active review state (resustitucion-state.json,
 *     review-batches/) plus the per-round audit dumps listed below. Only the
 *     dumps are removed; the state, the small per-round scripts and the
 *     hand-kept files stay.
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
 *
 * Automatic runs: a Windows scheduled task ("Sinonimia cache cleanup") runs
 * `--apply` every 30 minutes, because the ingestion pipeline writes ~50 MB of
 * per-round audit dumps into scripts/ingest/wip/ and never removed them —
 * that alone reached 26 GB in two weeks before this script learned to prune
 * them. The task runs with absolute paths (node and the script) because the
 * Task Scheduler's PATH does not include the Node install directory:
 *
 *   schtasks /create /tn "Sinonimia cache cleanup" /sc minute /mo 30 /f \
 *     /tr '"D:\apps\nodejs\node.exe" "<repo>\scripts\clean-downloads.js" --apply >> "<log>" 2>&1'
 *
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
      // The frequency list is read by scripts/ingest/pipeline/filters/
      // common-words.js on every build, and scripts/corpus-candidates.js
      // honours a gzipped freq-es.txt.gz when one is present (a plain
      // fetch, but re-downloading it is pure noise).
      "freq-es*",
    ],
  },
  {
    dir: path.join(__dirname, "ingest", "wip"),
    note: "per-round audit dumps the ingestion pipeline leaves behind in wip/ (round<N>-audit-<lang>.json, round<N>-synonym-audit-<lang>.json, round<N>-duplicates-<lang>.json, round<N>-synonyms-<lang>.json)",
    // Each round writes a full dictionary dump to disk: ~19 MB for es plus
    // ~29 MB for en, and every round supersedes the previous one. Nothing
    // reads them back after the round that wrote them (the pipeline's
    // decisions live in pipeline/decisions/ and in the per-round audit
    // summary), but they were never removed — 1 068 of them reached 26 GB
    // in two weeks (2026-10-21 → 2026-11-05).
    //
    // Only the bulky dumps go: `only` restricts the rule to files whose name
    // matches the per-round dump pattern, `minSize` skips the small
    // per-round scripts and state files, and `keepNewest` keeps the most
    // recent rounds so the in-flight round can still be inspected against
    // its predecessor. Everything else in wip/ (including the hand-kept
    // .keep/ files) is left untouched.
    only: /^(round\d+-(audit|synonym-audit|duplicates|synonyms)-|audit-round\d+-|(check|round\d+-check)(-final)?\.log$)/,
    minSize: 1024 * 1024,
    keepNewest: { count: 2 },
    // wip/ itself holds live review state — never remove the directory.
    keepRoot: true,
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

// The `only` rule restricts a target to the files whose name matches the
// pattern — everything else in the directory is left alone, including
// hand-kept files that are larger than `minSize`.
//
// The `keepNewest` rule keeps the N most recently modified files among those
// candidates, so the round in flight can still be compared with the
// previous one while the rest of the pile goes.
function collectKeepNewest(dir, spec, only) {
  const keep = new Set();
  if (!spec || !fs.existsSync(dir)) return keep;
  const candidates = [];
  (function walk(d) {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile() && (!only || only.test(entry.name))) {
        candidates.push({ full: full, mtime: fs.statSync(full).mtimeMs });
      }
    }
  })(dir);
  candidates.sort((a, b) => b.mtime - a.mtime);
  for (const c of candidates.slice(0, spec.count)) keep.add(c.full);
  return keep;
}

// A file is a removal candidate when it matches `only` (if the target
// declares one), is bigger than `minSize`, and is not in `keepPaths`.
function isRemovable(full, options) {
  if (options.only && !options.only.test(path.basename(full))) return false;
  if (options.keepPaths && options.keepPaths.has(full)) return false;
  if (options.minSize && fs.statSync(full).size <= options.minSize) return false;
  return true;
}

function listDirRecursive(dir, excludeNames, opts) {
  const options = opts || {};
  const isExcluded = makeMatcher(excludeNames);
  const out = [];
  if (!fs.existsSync(dir)) return out;
  function walk(d, isRoot) {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      if (isRoot && isExcluded(entry.name)) continue;
      const full = path.join(d, entry.name);
      if (entry.isDirectory()) walk(full, false);
      else if (entry.isFile() && isRemovable(full, options)) out.push(full);
    }
  }
  walk(dir, true);
  return out;
}

function emptyDir(dir, excludeNames, opts) {
  const options = opts || {};
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
      emptyDir(full, excludeNames, options);
      if (fs.readdirSync(full).length === 0) fs.rmdirSync(full);
    } else if (entry.isFile()) {
      if (isRemovable(full, options)) fs.unlinkSync(full);
    }
  }
  // Also remove the root itself so the directory disappears entirely,
  // unless an excluded subdirectory survives inside it. The next run
  // recreates it via mkdirSync({ recursive: true }). `keepRoot` opts out
  // of that for directories holding live state.
  if (!hasExcluded && !options.keepRoot) {
    try {
      fs.rmdirSync(dir);
    } catch (err) {
      // Directory not empty — something is still in there, leave it.
    }
  }
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
  const keepPaths = collectKeepNewest(target.dir, target.keepNewest, target.only);
  const files = listDirRecursive(target.dir, target.exclude, {
    keepPaths: keepPaths,
    minSize: target.minSize,
    only: target.only,
  });
  const bytes = files.reduce((sum, f) => sum + fs.statSync(f).size, 0);
  totalFiles += files.length;
  totalBytes += bytes;
  summary.push({
    dir: target.dir,
    note: target.note,
    exclude: target.exclude,
    files: files,
    bytes: bytes,
    keepPaths: keepPaths,
    minSize: target.minSize,
    only: target.only,
    keepRoot: target.keepRoot,
    keptNewest: keepPaths.size,
  });
}

console.log("=== Sinonimia — cache cleanup ===\n");
console.log("Note: scripts/ingest/ is NOT touched beyond download/ and the");
console.log("      bulky per-round audit dumps in ingest/wip/ — it holds the");
console.log("      batch pipeline, active review state, and any in-flight");
console.log("      batch/fix data.\n");

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
  if (s.keptNewest) {
    console.log("  kept (most recent matching rounds): " + s.keptNewest + " file(s)");
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
  emptyDir(s.dir, s.exclude, {
    keepPaths: s.keepPaths,
    minSize: s.minSize,
    only: s.only,
    keepRoot: s.keepRoot,
  });
}

console.log(
  "Removed " + totalFiles + " file(s) (" + bytesHuman(totalBytes) + ").\n" +
  "scripts/download/ will be rebuilt automatically on the next\n" +
  "node scripts/corpus-candidates.js run."
);
