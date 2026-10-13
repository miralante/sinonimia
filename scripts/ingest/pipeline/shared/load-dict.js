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
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..', '..', '..', '..');
const { applySynonymMerges } = require('./apply-synonym-merges');

function loadDict(fileRel) {
  const ctx = {};
  ctx.window = ctx;
  vm.createContext(ctx);
  const manifestPath = path.join(ROOT, 'js/dictionary-manifest.js');
  vm.runInContext(fs.readFileSync(manifestPath, 'utf8'), ctx, { filename: 'js/dictionary-manifest.js' });
  const manifest = ctx.SINONIMIA_DICTIONARY_SHARDS;
  // Load every language first because later source shards can contain patches
  // to either dictionary. Then run the requested language's merge registry.
  for (const lang of Object.keys(manifest)) {
    for (const shard of manifest[lang] || []) {
      const shardPath = path.join(ROOT, shard.file);
      vm.runInContext(fs.readFileSync(shardPath, 'utf8'), ctx, { filename: shard.file });
    }
  }
  return applySynonymMerges(ctx.DICCIONARIOS || {});
}

module.exports = { loadDict };
