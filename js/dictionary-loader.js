/*
 * Dictionary loader for static hosting (window.SinonimiaDictionary).
 *
 * The dictionary is split in two layers, both generated from js/data.*.js by
 * scripts/build-dictionary-data.js and listed in js/dictionary-data.js:
 *
 * - INDEX shards (per language): one light row per entry — enough for the
 *   list, the search, the alphabet, the topic filters, the word of the day
 *   and the "which word is it?" game. `loadIndex(language)` fetches them in
 *   parallel and resolves with the entries once all have executed.
 * - DETAIL chunks (per language): the heavy fields — pictogram alt text, the
 *   two example sentences and the translation links. An entry's chunk is
 *   fnv1a(id) % chunks, so `loadDetail(language, entries)` fetches only the
 *   few small chunks it needs and merges the fields into the entry objects.
 *
 * Nothing is fetched until the app asks. Every URL carries a content hash, so
 * browser/edge caches and the service worker (which downloads the very same
 * URLs in the background for offline use) never see two names for one file.
 *
 * Plain <script> tags are used (not fetch) so the site also works when opened
 * straight from disk, and under the CSP `script-src 'self'`.
 */
(function (global, document) {
  "use strict";

  var data = global.SINONIMIA_DICTIONARY_DATA;
  if (!data || typeof data !== "object" || !data.languages) {
    throw new Error("Missing dictionary data manifest (js/dictionary-data.js)");
  }

  var languageNames = Object.keys(data.languages);
  var states = {};

  function stateOf(language) {
    if (!data.languages[language]) throw new Error("Unknown dictionary language: " + language);
    if (!states[language]) {
      states[language] = {
        parts: [],          // index rows per shard, filled by defineIndex
        details: {},        // detail records per chunk, filled by defineDetail
        entries: null,      // the built entries, once every index shard ran
        indexPromise: null,
        chunkPromises: {}
      };
    }
    return states[language];
  }

  // Same function as chunkOf in scripts/build-dictionary-data.js.
  function chunkOf(id) {
    var h = 0x811c9dc5;
    for (var i = 0; i < id.length; i++) {
      h ^= id.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return (h >>> 0) % data.chunks;
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var el = document.createElement("script");
      el.src = src;
      el.onload = function () { resolve(); };
      el.onerror = function () {
        el.remove();
        reject(new Error("Could not load " + src));
      };
      document.head.appendChild(el);
    });
  }

  // Called by the generated js/dict.<lang>.idx.<n>.js files.
  function defineIndex(language, shardNumber, rows) {
    stateOf(language).parts[shardNumber - 1] = rows;
  }

  // Called by the generated js/dict.<lang>.det.<kkk>.js files.
  function defineDetail(language, chunk, records) {
    stateOf(language).details[chunk] = records;
  }

  function buildEntries(state) {
    var entries = [];
    state.parts.forEach(function (rows) {
      rows.forEach(function (row) {
        entries.push({
          id: row[0],
          word: row[1],
          definition: row[2],
          synonyms: row[3],
          image: { id: row[4] },
          situacion: row[5]
        });
      });
    });
    state.parts = [];
    return entries;
  }

  function loadIndex(language) {
    var state = stateOf(language);
    if (state.entries) return Promise.resolve(state.entries);
    if (state.indexPromise) return state.indexPromise;

    state.indexPromise = Promise.all(data.languages[language].index.map(function (shard) {
      return loadScript(shard.src);
    })).then(function () {
      state.entries = buildEntries(state);
      state.byId = new Map();
      state.entries.forEach(function (entry) { state.byId.set(entry.id, entry); });
      return state.entries;
    }, function (err) {
      state.parts = [];
      state.indexPromise = null; // allow a retry after a network failure
      throw err;
    });
    return state.indexPromise;
  }

  function hasDetail(entry) {
    return !!entry.example;
  }

  // record = [imageAlt, exampleWord, exampleText, synonymWord, synonymText, links?]
  function applyDetail(entry, record) {
    entry.image.alt = record[0];
    entry.example = { word: record[1], text: record[2] };
    entry.exampleSynonym = { word: record[3], text: record[4] };
    entry.translations = (record[5] || []).map(function (link) {
      return { language: link[0], id: link[1], word: link[2] };
    });
  }

  function loadChunk(language, chunk) {
    var state = stateOf(language);
    if (state.chunkPromises[chunk]) return state.chunkPromises[chunk];

    state.chunkPromises[chunk] = loadScript(data.languages[language].detail[chunk].src).then(function () {
      var records = state.details[chunk] || {};
      delete state.details[chunk];
      Object.keys(records).forEach(function (id) {
        var entry = state.byId.get(id);
        if (entry) applyDetail(entry, records[id]);
      });
    }, function (err) {
      delete state.chunkPromises[chunk]; // allow a retry
      throw err;
    });
    return state.chunkPromises[chunk];
  }

  // Resolves once every given entry has its detail fields. The index of that
  // language must already be loaded (the entries come from it).
  function loadDetail(language, entries) {
    var needed = {};
    entries.forEach(function (entry) {
      if (!hasDetail(entry)) needed[chunkOf(entry.id)] = true;
    });
    return Promise.all(Object.keys(needed).map(function (chunk) {
      return loadChunk(language, Number(chunk));
    }));
  }

  global.SinonimiaDictionary = {
    languages: languageNames,
    isIndexLoaded: function (language) { return !!(states[language] && states[language].entries); },
    entries: function (language) { return states[language] && states[language].entries || []; },
    loadIndex: loadIndex,
    loadDetail: loadDetail,
    hasDetail: hasDetail,
    chunkOf: chunkOf,
    defineIndex: defineIndex,
    defineDetail: defineDetail
  };
})(window, document);
