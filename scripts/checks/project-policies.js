"use strict";

const fs = require("fs");
const path = require("path");
function run(options) {
  const ROOT = options.ROOT;
  const fail = options.fail;
  const ok = options.ok;
  // --- _headers: CSP source-expression quoting ---
  // Every quoted Content-Security-Policy source expression (e.g. 'self')
  // must have exactly one leading and one trailing quote — catches
  // malformed quoting like ''self'' that browsers silently drop, turning
  // a directive into "block everything". This bit the sibling teclatlon
  // project in production; see its CLOUDFLARE.md for the story.
  (function () {
    var headersContent = fs.readFileSync(path.join(ROOT, "_headers"), "utf8");
    var malformed = [];
    headersContent.split("\n").filter(function (line) {
      return /^\s*Content-Security-Policy:/i.test(line);
    }).forEach(function (line) {
      var value = line.replace(/^\s*Content-Security-Policy:/i, "");
      value.split(";").forEach(function (directive) {
        directive.trim().split(/\s+/).filter(Boolean).forEach(function (token) {
          var quoteCount = (token.match(/'/g) || []).length;
          if (quoteCount === 0) return;
          var wellFormed = quoteCount === 2 && token[0] === "'" && token[token.length - 1] === "'";
          if (!wellFormed) malformed.push(token);
        });
      });
    });
    if (malformed.length) {
      fail("_headers: malformed CSP source expression(s): " + malformed.join(", ") +
        " — quotes should wrap the keyword exactly once (e.g. 'self', not ''self'')");
    } else {
      ok("_headers: CSP source expressions are quoted correctly");
    }
  })();
  
  // --- _redirects: stays within Cloudflare's per-file limits
  // (https://developers.cloudflare.com/pages/configuration/redirects/):
  // a maximum of 2 000 static redirects and 100 dynamic (placeholder)
  // redirects per file — 2 100 in total. If the file is absent (the
  // common case for projects that have no redirects at all) the check
  // is skipped: zero is valid. Sinonimia currently has no _redirects,
  // so this branch is the active one in CI.
  (function () {
    const redirectsFile = path.join(ROOT, "_redirects");
    if (!fs.existsSync(redirectsFile)) {
      ok("_redirects: absent, OK (zero redirects is valid)");
      return;
    }
    const lines = fs.readFileSync(redirectsFile, "utf8").split("\n");
    let staticCount = 0;
    let dynamicCount = 0;
    lines.forEach(function (line) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.charAt(0) === "#") return;
      const isStatic = /\s(?:200|301|302|303|307|308)\s*$/.test(trimmed) && !/:\w+\$/.test(trimmed);
      const isDynamic = /:\w+\$/.test(trimmed);
      if (isStatic) staticCount += 1;
      else if (isDynamic) dynamicCount += 1;
    });
    const STATIC_LIMIT = 2000;
    const DYNAMIC_LIMIT = 100;
    if (staticCount > STATIC_LIMIT) {
      fail("_redirects: " + staticCount + " static redirects, max is " + STATIC_LIMIT +
        " (Cloudflare Pages rejects the file)");
    }
    if (dynamicCount > DYNAMIC_LIMIT) {
      fail("_redirects: " + dynamicCount + " dynamic redirects, max is " + DYNAMIC_LIMIT +
        " (Cloudflare Pages rejects the file)");
    }
    if (staticCount <= STATIC_LIMIT && dynamicCount <= DYNAMIC_LIMIT) {
      ok("_redirects: " + staticCount + " static, " + dynamicCount + " dynamic (within Cloudflare limits)");
    }
  })();
  
  // --- _headers: stays within Cloudflare's per-file limit of 100
  // header rules per file
  // (https://developers.cloudflare.com/pages/configuration/headers/).
  // Both path-glob lines and individual Key: value lines are counted,
  // because Cloudflare's published limit of 100 applies to the total
  // number of lines in `_headers`, per the wording at the URL above.
  // The 7 currently shipped suites all stay well under 100 either way.
  (function () {
    const headersFile = path.join(ROOT, "_headers");
    if (!fs.existsSync(headersFile)) {
      ok("_headers: absent, OK");
      return;
    }
    const lines = fs.readFileSync(headersFile, "utf8").split("\n");
    let ruleCount = 0;
    for (let i = 0; i < lines.length; i++) {
      const hLine = lines[i];
      const hTrim = hLine.trim();
      if (!hTrim || hTrim.charAt(0) === "#") continue;
      if (hLine.charAt(0) === "/" && !/^\/.*:/.test(hLine)) {
        ruleCount += 1;
        continue;
      }
      if (/^[A-Za-z][\w-]*:\s/.test(hLine)) ruleCount += 1;
    }
    const HEADERS_RULE_LIMIT = 100;
    if (ruleCount > HEADERS_RULE_LIMIT) {
      fail("_headers: " + ruleCount + " rule lines (path-globs + headers), max is " +
        HEADERS_RULE_LIMIT + " (Cloudflare Pages rejects the file)");
    } else {
      ok("_headers: " + ruleCount + " rule lines (within Cloudflare limit)");
    }
  })();
  
  // --- 25 MB per-file limit (Cloudflare Pages):
  // https://developers.cloudflare.com/pages/limits/. Warns at 20 MB
  // (legal but worth a nudge before the next content commit pushes it
  // over) and fails at 25 MB (Cloudflare will reject the deploy). Only
  // walks files that actually deploy: .git/, node_modules/, .claude/
  // (graphify skill + agent settings, never uploaded), graphify-out*
  // (build artifacts), scripts/ingest/ (sinonimia's batch content
  // pipeline, contains multi-megabyte plaintext wordlists and ARASAAC
  // cache files — never shipped), and scripts/download/ (downloaded
  // source caches like the ~500 MB Kaikki EN extract, gitignored, never
  // shipped either — one shared download/ for the whole project since
  // 2026-09-05, see PROGRESS.md). This check cares about what Cloudflare
  // serves, not the maintainer's working area.
  const FILE_SIZE_WARN_MB = 20;
  const FILE_SIZE_FAIL_MB = 25;
  const sizeExcluded = new Set([".git", "node_modules", ".claude", "graphify-out", "graphify-out-meta", "ingest", "download"]);
  const largeFileWarnings = [];
  (function walkForLargeFiles(dir) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir, { withFileTypes: true }).forEach(function (entry) {
      if (sizeExcluded.has(entry.name)) return;
      const full = path.join(dir, entry.name);
      // scripts/ingest is the batch content pipeline; exclude both the
      // top-level and any sub-folder inside it.
      if (full.indexOf(path.sep + "scripts" + path.sep + "ingest") !== -1) return;
      if (entry.isDirectory()) {
        walkForLargeFiles(full);
      } else if (entry.isFile()) {
        const size = fs.statSync(full).size;
        const sizeMb = size / (1024 * 1024);
        if (sizeMb >= FILE_SIZE_FAIL_MB) {
          fail(path.relative(ROOT, full).split(path.sep).join("/") + ": " +
            sizeMb.toFixed(2) + " MB, max per file is " + FILE_SIZE_FAIL_MB +
            " MB (Cloudflare Pages rejects the deploy)");
        } else if (sizeMb >= FILE_SIZE_WARN_MB) {
          largeFileWarnings.push(path.relative(ROOT, full).split(path.sep).join("/") +
            ": " + sizeMb.toFixed(2) + " MB (warning: still legal, getting close)");
        }
      }
    });
  })(ROOT);
  if (largeFileWarnings.length) {
    console.log("");
    console.warn("WARNINGS (" + largeFileWarnings.length + ") - non-blocking, see https://developers.cloudflare.com/pages/limits/ (25 MB per-file limit):");
    largeFileWarnings.forEach(function (w) { console.warn("  - " + w); });
  }
  
  /* --- CSP: no executable inline <script> in any HTML page.
  
     The production CSP is `script-src 'self'` with no 'unsafe-inline' and
     no nonce/hash, so an inline <script> is dropped by the browser at
     runtime: no build error, no lint error, no failed test — the code
     simply does not run in production while working perfectly on a preview
     server that sends no CSP.
  
     That is not hypothetical. An inline `window.LocalePickerConfig` shipped
     that way: the shared locale picker fell back to its own defaults and
     rendered a second settings gear inside the app's own settings drawer.
     The same mistake disabled the service worker, the language buttons on
     the subpages, and (in one app) the whole 404 page.
  
     Non-executable data blocks (`<script type="application/ld+json">`, the
     JSON-LD in the landing page) are allowed: CSP does not apply to them. */
  var INLINE_DATA_TYPE = /^(application\/ld\+json|application\/json|text\/json|text\/template)\s*$/i;
  /* `download` and `ingest` are excluded for the same reason sizeExcluded
     above excludes them: scripts/download/ is a regenerable local cache of
     word lists and source dumps, not part of the app (see
     scripts/clean-downloads.js). The word-list HTML in there carries inline
     scripts, but no route serves them. */
  var inlineExcluded = ['.git', 'node_modules', '.claude', 'graphify-out', 'graphify-out-meta', 'test-results', 'doc', 'ingest', 'download'];
  var inlineScriptHits = [];
  (function walkForInlineScripts(dir) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir, { withFileTypes: true }).forEach(function (entry) {
      if (inlineExcluded.indexOf(entry.name) !== -1) return;
      var full = path.join(dir, entry.name);
      if (entry.isDirectory()) return walkForInlineScripts(full);
      if (!entry.isFile() || !/\.html?$/.test(entry.name)) return;
      var src = fs.readFileSync(full, 'utf8');
      /* Blank out HTML comments (keeping the newlines, so offsets and line
         numbers stay exact). Prose in a comment is allowed to mention
         `<script>` — that is not a tag. */
      var scannable = src.replace(/<!--[\s\S]*?-->/g, function (comment) {
        return comment.replace(/[^\n]/g, ' ');
      });
      var tagRe = /<script\b([^>]*)>/gi;
      var m;
      while ((m = tagRe.exec(scannable)) !== null) {
        var attrs = m[1];
        if (/\ssrc\s*=/i.test(attrs)) continue;            // external: allowed
        var typeMatch = attrs.match(/\stype\s*=\s*["']?([^"'\s>]+)/i);
        var type = typeMatch ? typeMatch[1] : '';
        if (type && INLINE_DATA_TYPE.test(type)) continue; // data block: not executed
        var line = scannable.slice(0, m.index).split('\n').length;
        inlineScriptHits.push(path.relative(ROOT, full) + ':' + line + '  <script>' + (type ? ' type="' + type + '"' : '') +
          " is inline and will not run in production (CSP script-src 'self') - move it to an external .js file");
      }
    });
  })(ROOT);
  inlineScriptHits.forEach(function (hit) { fail(hit); });
}

module.exports = { run: run };
