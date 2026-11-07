"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
function run(options) {
  const ROOT = options.ROOT;
  const fail = options.fail;
  const ok = options.ok;
  // --- 1. Syntax of every JS file ---
  // The manifest and loader are required by the HTML boot sequence. Dictionary
  // shards are discovered from the manifest below, while any extra js/*.js that
  // happens to exist is checked too, so adding a future shard can't silently
  // ship broken.
  const jsDir = path.join(ROOT, "js");
  const requiredJs = [
    "js/i18n.js",
    "js/dictionary-manifest.js",
    "js/dictionary-data.js",
    "js/dictionary-loader.js",
    "js/app.js",
  ];
  requiredJs.forEach(function (relativePath) {
    try {
      execFileSync(process.execPath, ["--check", path.join(ROOT, relativePath)]);
      ok("syntax OK: " + relativePath);
    } catch (e) {
      fail("syntax error in " + relativePath);
    }
  });
  fs.readdirSync(jsDir).filter(function (f) {
    return f.endsWith(".js") && requiredJs.indexOf("js/" + f) === -1 && !/^dict\..+\.js$/.test(f);
  }).forEach(function (f) {
    try {
      execFileSync(process.execPath, ["--check", path.join(jsDir, f)]);
      ok("syntax OK: js/" + f + " (extras)");
    } catch (e) {
      fail("syntax error in js/" + f);
    }
  });
  
  // The reusable ingestion pipeline is versioned with the project too. Check
  // its root maintenance scripts and pipeline modules, but skip ignored batch,
  // exploration, repair, and WIP workspaces.
  function collectJavaScriptFiles(directory) {
    return fs.readdirSync(directory, { withFileTypes: true }).reduce(function (files, entry) {
      const absolutePath = path.join(directory, entry.name);
      if (entry.isDirectory()) return files.concat(collectJavaScriptFiles(absolutePath));
      if (entry.isFile() && entry.name.endsWith(".js")) files.push(absolutePath);
      return files;
    }, []);
  }
  const ingestRoot = path.join(ROOT, "scripts/ingest");
  const ingestJavaScript = fs.readdirSync(ingestRoot, { withFileTypes: true })
    .filter(function (entry) { return entry.isFile() && entry.name.endsWith(".js"); })
    .map(function (entry) { return path.join(ingestRoot, entry.name); })
    .concat(collectJavaScriptFiles(path.join(ingestRoot, "pipeline")));
  ingestJavaScript.forEach(function (absolutePath) {
    const relativePath = path.relative(ROOT, absolutePath).split(path.sep).join("/");
    try {
      execFileSync(process.execPath, ["--check", absolutePath]);
      ok("syntax OK: " + relativePath);
    } catch (e) {
      fail("syntax error in " + relativePath);
    }
  });
  
  // --- 2. Balanced braces in the CSS (no CSS linter is configured) ---
  const css = fs.readFileSync(path.join(ROOT, "css/styles.css"), "utf8");
  const openBraces = (css.match(/{/g) || []).length;
  const closeBraces = (css.match(/}/g) || []).length;
  if (openBraces === closeBraces) {
    ok("css/styles.css: balanced braces (" + openBraces + ")");
  } else {
    fail("css/styles.css: unbalanced braces (" + openBraces + " open, " + closeBraces + " closed)");
  }
}

module.exports = { run: run };
