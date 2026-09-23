/* ============================================================
   Sinonimia — Service Worker
   Cache-first strategy for the app shell (works offline).
   When adding new files: add them to FILES and bump VERSION.
   The shell is intentionally small — the dictionaries already ship
   under /js/data.*.js with content-hash ?v= query strings in
   js/dictionary-manifest.js (handled by scripts/check.js), so a new
   dictionary revision picks up automatically when the manifest changes.
   The SW's job is just to make the first paint and the first
   dictionary load work offline.
   ============================================================ */
var VERSION = 'sinonimia-v174';

var FILES = [
  './',
  './index.html',
  './404.html',
  './manifest.json',
  './offline.html',
  './css/styles.css',
  './js/i18n.js',
  './js/dictionary-manifest.js',
  './js/dictionary-loader.js',
  './js/bootstrap-i18n.js',
  './js/data.es.js',
  './js/data.es.2.js',
  './js/data.en.js',
  './js/data.en.2.js',
  './js/app.js',
  './img/logo.svg',
  './about/index.html',
  './about/about.js',
  './legal/index.html',
  './legal/privacidad.html',
  './team/index.html',
  './config/index.html',
  './config/config.js'
];

var CACHE_NAME = 'sinonimia-' + VERSION;

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      // Put each file individually so one 404 on a future addition
      // does not abort the whole pre-cache pass — better to ship a
      // shell that's missing one entry than a shell that never
      // installs.
      return Promise.all(
        FILES.map(function (url) {
          return cache.add(url).catch(function (err) {
            // Surface the failing path in DevTools so an editor who
            // added a path that doesn't exist on disk sees the cause
            // immediately, instead of a silent "offline page" later.
            console.warn('[sw] pre-cache failed for ' + url + ': ' + (err && err.message ? err.message : err));
          });
        })
      );
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys
          .filter(function (key) { return key.indexOf('sinonimia-') === 0 && key !== CACHE_NAME; })
          .map(function (key) { return caches.delete(key); })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function (event) {
  var request = event.request;
  // Only handle same-origin GETs. Anything cross-origin (ARASAAC
  // pictograms, etc.) is left to the network — the _headers rules
  // cache them at the edge, and the runtime never needs them offline.
  if (request.method !== 'GET') return;
  var url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Cache-first: try the cache, fall back to network, then to the
  // offline page. We deliberately cache the *full response* (with
  // status 200) so a 404/500 from the network never pollutes the
  // cache with an error page that would then be served offline.
  event.respondWith(
    caches.match(request).then(function (cached) {
      if (cached) return cached;
      return fetch(request).then(function (response) {
        // Only cache successful basic responses — opaque / errored
        // responses are skipped so the cache stays a faithful mirror
        // of what the server actually said.
        if (response && response.status === 200 && response.type === 'basic') {
          var copy = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(request, copy);
          });
        }
        return response;
      }).catch(function () {
        // No cache, no network — last resort is the offline page for
        // navigation requests. For sub-resources (CSS, JS, images)
        // we just propagate the failure so the browser surfaces a
        // standard network error.
        if (request.mode === 'navigate') {
          return caches.match('./offline.html');
        }
        return new Response('', { status: 504, statusText: 'Offline' });
      });
    })
  );
});
