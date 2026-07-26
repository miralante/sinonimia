#!/usr/bin/env node
/*
 * Search for a pictogram candidate. Tries OpenSymbols.org first (it
 * aggregates several open-licensed symbol banks — ARASAAC, Sclera,
 * Mulberry, and others — behind one API, searchable in Spanish via
 * `locale=es`), and automatically falls back to ARASAAC's own public API
 * (no key needed) whenever OpenSymbols isn't usable:
 *   - OPENSYMBOLS_SECRET isn't set
 *   - the token or search request fails (bad secret, network error, rate
 *     limit, OpenSymbols is down)
 *   - OpenSymbols returns zero results for the term
 *
 * This tool only searches and lists results for a human to review — it does
 * NOT download or pick automatically, since results can come from banks
 * with different licenses (see "Licensing" below).
 *
 * Setup for the OpenSymbols path (optional — the ARASAAC fallback works
 * with no setup at all):
 *   1. Request a "shared secret" at https://www.opensymbols.org/api — the
 *      form asks for an organization name, an email, and what you'll use it
 *      for. The script exchanges that secret for a short-lived access
 *      token on every run.
 *   2. NEVER commit that secret or put it in any file under version
 *      control. Pass it only as an environment variable at run time.
 *
 *   If you already have a short-lived access token (the JSON the secret
 *   exchange returns, e.g. {"access_token": "temp::...", "expires": "..."}),
 *   pass it as OPENSYMBOLS_TOKEN instead — the script will skip the
 *   exchange step and use it directly. Useful when the token was
 *   generated ahead of time by another tool.
 *
 * Usage:
 *   node scripts/buscar-pictograma.js <term> [locale]
 *   OPENSYMBOLS_SECRET=xxxx node scripts/buscar-pictograma.js <term> [locale]
 *   OPENSYMBOLS_TOKEN=temp::... node scripts/buscar-pictograma.js <term> [locale]
 *
 * Examples:
 *   node scripts/buscar-pictograma.js "corregir un error" es
 *   OPENSYMBOLS_SECRET=xxxx node scripts/buscar-pictograma.js "corregir un error" es
 *   OPENSYMBOLS_TOKEN=temp::... node scripts/buscar-pictograma.js "corregir un error" es
 *
 * Licensing: unlike querying ARASAAC alone (always CC BY-NC-SA), an
 * OpenSymbols result can come from a bank with a *different* license (e.g.
 * Sclera is CC BY-NC, Mulberry is CC BY-SA — check each result's
 * "license"/"author" fields). Whatever you pick, if it isn't from ARASAAC,
 * the footer's current blanket "pictograms are from ARASAAC" credit
 * (js/i18n.js's `pieCreditosHtml` key) needs updating in the same change
 * to credit that bank too. See doc/en/technical.md's "Pictograms" section.
 */

const secret = process.env.OPENSYMBOLS_SECRET;
const presetToken = process.env.OPENSYMBOLS_TOKEN;
const term = process.argv[2];
const locale = process.argv[3] || "es";

if (!term) {
  console.error("Usage: node scripts/buscar-pictograma.js <term> [locale]");
  process.exit(1);
}

async function getOpenSymbolsToken() {
  const url = "https://www.opensymbols.org/api/v2/token?secret=" + encodeURIComponent(secret);
  const res = await fetch(url, { method: "POST" });
  if (!res.ok) {
    throw new Error("could not get an access token (HTTP " + res.status + ")");
  }
  const data = await res.json();
  if (!data.access_token) {
    throw new Error("token response had no access_token");
  }
  return data.access_token;
}

async function searchOpenSymbols() {
  const accessToken = presetToken || (await getOpenSymbolsToken());
  const url = "https://www.opensymbols.org/api/v2/symbols" +
    "?q=" + encodeURIComponent(term) +
    "&locale=" + encodeURIComponent(locale) +
    "&access_token=" + encodeURIComponent(accessToken);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("search failed (HTTP " + res.status + ")");
  }
  const results = await res.json();
  return results.map(function (r) {
    return {
      name: r.name,
      bank: r.repo_key,
      license: r.license,
      author: r.author,
      imageUrl: r.image_url,
    };
  });
}

// Fallback: ARASAAC's own public API. No key required, always CC BY-NC-SA,
// author Sergio Palao. Used whenever OpenSymbols isn't available or has
// nothing for this term.
async function searchArasaac() {
  const url = "https://api.arasaac.org/api/pictograms/" + encodeURIComponent(locale) +
    "/search/" + encodeURIComponent(term);
  const res = await fetch(url);
  if (res.status === 404) {
    return []; // ARASAAC returns 404 (not an empty array) when nothing matches
  }
  if (!res.ok) {
    throw new Error("ARASAAC search failed (HTTP " + res.status + ")");
  }
  const results = await res.json();
  return results.slice(0, 10).map(function (p) {
    const keywords = p.keywords.map(function (k) { return k.keyword; }).join(", ");
    return {
      name: keywords + (p.schematic ? "  (schematic)" : ""),
      bank: "arasaac",
      license: "CC BY-NC-SA",
      author: "Sergio Palao",
      imageUrl: "https://static.arasaac.org/pictograms/" + p._id + "/" + p._id + "_500.png",
    };
  });
}

function printResults(sourceLabel, results) {
  console.log(
    sourceLabel + ' — ' + results.length + ' result(s) for "' + term + '" (locale ' + locale + "):\n"
  );
  results.forEach(function (r, i) {
    console.log(
      (i + 1) + ". " + r.name +
      "  [bank: " + r.bank + ", license: " + r.license + ", author: " + r.author + "]"
    );
    console.log("   " + r.imageUrl);
  });
  console.log(
    "\nDownload the one you pick into img/ by hand (see CONTRIBUTING.md's " +
    '"Añadir una palabra" section for the naming convention), and record ' +
    "its license/author if it isn't from ARASAAC."
  );
}

(async () => {
  let results = [];
  let usedFallback = false;

  if (!secret && !presetToken) {
    console.log("No OPENSYMBOLS_SECRET or OPENSYMBOLS_TOKEN set — searching ARASAAC directly.\n");
    usedFallback = true;
  } else {
    try {
      results = await searchOpenSymbols();
      if (!results.length) {
        console.log('OpenSymbols had no results for "' + term + '" — trying ARASAAC directly.\n');
        usedFallback = true;
      }
    } catch (err) {
      console.log("OpenSymbols search failed (" + err.message + ") — falling back to ARASAAC directly.\n");
      usedFallback = true;
    }
  }

  if (usedFallback) {
    try {
      results = await searchArasaac();
    } catch (err) {
      console.error("Error: " + err.message);
      process.exitCode = 1;
      return;
    }
  }

  if (!results.length) {
    console.log('No results for "' + term + '" (locale ' + locale + ") in OpenSymbols or ARASAAC.");
    return;
  }

  printResults(usedFallback ? "ARASAAC (fallback)" : "OpenSymbols", results);
})();
