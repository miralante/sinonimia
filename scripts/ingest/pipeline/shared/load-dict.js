/*
 * scripts/ingest/pipeline/shared/load-dict.js
 *
 * Shared js/data.<lang>.js loader. js/data.*.js assigns to
 * `window.DICCIONARIOS`, which doesn't exist in Node, so the assignment
 * is rewritten to a global the eval'd code can see. Used by
 * filters/sinonimia-coverage.js and by any script that needs raw entries
 * (not just the folded coverage set), e.g. to scan `definicion` text. Not
 * a filter itself — lives in shared/ (not filters/) for that reason.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..', '..', '..');

function loadDict(fileRel) {
  const match = /^js\/data\.([a-z0-9-]+)\.js$/.exec(fileRel);
  const files = [fileRel];
  if (match) {
    const shardPattern = new RegExp(`^data\\.${match[1]}\\.\\d+\\.js$`);
    const shardFiles = fs.readdirSync(path.join(ROOT, 'js'))
      .filter((name) => shardPattern.test(name))
      .sort((a, b) => Number(a.match(/\.(\d+)\.js$/)[1]) - Number(b.match(/\.(\d+)\.js$/)[1]));
    files.push(...shardFiles.map((name) => `js/${name}`));
  }
  global.__DICT = undefined;
  for (const relativePath of files) {
    const code = fs.readFileSync(path.join(ROOT, relativePath), 'utf8')
      .replace(/window\.DICCIONARIOS/g, 'global.__DICT')
      .replace(/\bDICCIONARIOS\b/g, 'global.__DICT');
    // eslint-disable-next-line no-eval
    eval(code);
  }
  return global.__DICT || {};
}

module.exports = { loadDict };
