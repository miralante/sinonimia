/*
 * Sinonimia dictionary shard manifest.
 *
 * Keep shards ordered within each language. The first file creates the
 * language array; following files append to it with Array#concat. When a
 * dictionary approaches the hosting provider's per-file limit, add another
 * shard here instead of making the application know about a new filename.
 *
 * `src` includes the content hash because dictionary files are immutable at
 * the edge and in browser caches. The validation script checks every hash and
 * every file reference before the site can ship.
 */
window.SINONIMIA_DICTIONARY_SHARDS = {
  es: [
    { file: "js/data.es.js", src: "js/data.es.js?v=35bdb6acbe" },
    { file: "js/data.es.2.js", src: "js/data.es.2.js?v=72d4263364" },
  ],
  en: [
    { file: "js/data.en.js", src: "js/data.en.js?v=387dd6c38b" },
  ],
};
