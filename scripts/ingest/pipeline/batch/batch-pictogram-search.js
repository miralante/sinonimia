#!/usr/bin/env node
/*
 * Batch pictogram search helper (pipeline — see scripts/ingest/README.md).
 * Queries ARASAAC's public search API for a list of terms and prints the
 * first few non-schematic candidates for each, so many words can be
 * reviewed in one pass instead of one search-pictogram.js call per word.
 *
 * Usage: node scripts/ingest/pipeline/batch/batch-pictogram-search.js <lang> term1|term2|term3...
 *   lang: es or en
 */
const https = require("https");

const lang = process.argv[2];
const terms = process.argv.slice(3);

function search(term) {
  return new Promise((resolve) => {
    https
      .get(`https://api.arasaac.org/api/pictograms/${lang}/search/${encodeURIComponent(term)}`, (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            resolve([]);
          }
        });
      })
      .on("error", () => resolve([]));
  });
}

(async () => {
  for (const term of terms) {
    const results = await search(term);
    const top = results.slice(0, 6).map((r) => {
      const kw = (r.keywords && r.keywords[0] && r.keywords[0].keyword) || "?";
      return `${r._id}:${kw}${r.schematic ? "[schematic]" : ""}`;
    });
    console.log(term + " => " + (top.length ? top.join(", ") : "NO RESULTS"));
  }
})();
