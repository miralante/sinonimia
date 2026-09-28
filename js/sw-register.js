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
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('./sw.js').catch(function (err) {
      console.warn('[sinonimia] service worker registration failed:', err);
    });
  });
})();
