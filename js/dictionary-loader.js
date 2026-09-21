/*
 * Synchronous dictionary shard loader for static hosting.
 *
 * This file deliberately uses document.write while the HTML parser is still
 * at this script tag. That keeps the existing dependency-free boot contract:
 * every data shard has executed before js/app.js (or the 404 inline app)
 * starts. It also means adding a shard only changes the manifest, the shard
 * file and (for projects with a service worker) its cache manifest; no app
 * code or page-specific script list needs to be edited.
 */
(function (global, document) {
  "use strict";

  var manifest = global.SINONIMIA_DICTIONARY_SHARDS;
  if (!manifest || typeof manifest !== "object") {
    throw new Error("Missing dictionary shard manifest");
  }

  var seen = {};
  Object.keys(manifest).forEach(function (language) {
    var shards = manifest[language];
    if (!Array.isArray(shards) || shards.length === 0) {
      throw new Error("Dictionary language has no shards: " + language);
    }

    shards.forEach(function (shard, index) {
      if (!shard || typeof shard.file !== "string" || typeof shard.src !== "string") {
        throw new Error("Invalid dictionary shard at " + language + "[" + index + "]");
      }
      if (seen[shard.file]) {
        throw new Error("Dictionary shard listed twice: " + shard.file);
      }
      if (!/^js\/data\.[a-z0-9-]+(?:\.[a-z0-9-]+)*\.js\?v=[a-f0-9]{10}$/.test(shard.src)) {
        throw new Error("Invalid dictionary shard URL: " + shard.src);
      }
      if (shard.src.split("?v=")[0] !== shard.file) {
        throw new Error("Shard file and URL disagree: " + shard.file);
      }
      seen[shard.file] = true;
      document.write('<script src="' + shard.src + '"><\/script>');
    });
  });
})(window, document);
