/*
 * sw-register.js — service-worker registration. Lazy + try/catch so older
 * browsers (or private mode where navigator.serviceWorker is unavailable)
 * silently no-op rather than throwing.
 *
 * Kept as an external file (not inline) so the CSP `script-src 'self'`
 * allows it: inline <script> blocks are blocked, but <script src="…">
 * pointing at a same-origin file is fine (see js/bootstrap-i18n.js for
 * the same pattern). Same-origin './sw.js' keeps the CSP `worker-src
 * 'self'` directive happy. The install handler in sw.js is what
 * pre-caches the app shell listed in FILES. See CLAUDE.md §B.1 for the
 * cache contract and the bump-on-every-cached-file-change rule.
 */
(function () {
  if (!('serviceWorker' in navigator)) return;

  /* Reload once when a NEW worker takes control. Only when a worker already
     controlled this page: the very first install claims the page without a
     reload. */
  var hadController = !!navigator.serviceWorker.controller;
  var reloaded = false;
  navigator.serviceWorker.addEventListener('controllerchange', function () {
    if (!hadController || reloaded) return;
    reloaded = true;
    location.reload();
  });

  window.addEventListener('load', function () {
    /* updateViaCache: 'none' keeps the sw.js update check off the HTTP cache. */
    navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' })
      .then(function (registration) {
        /* Ask for a new sw.js whenever the tab comes back into view. */
        document.addEventListener('visibilitychange', function () {
          if (document.visibilityState === 'visible') registration.update().catch(function () {});
        });
      })
      .catch(function (err) {
        console.warn('[sinonimia] service worker registration failed:', err);
      });
  });
})();
