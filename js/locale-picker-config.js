/*
 * locale-picker-config.js — window.LocalePickerConfig, read by
 * js/locale-picker.js on load. Must run before that script.
 *
 * Kept as an external file (not inline) so the CSP `script-src 'self'`
 * allows it: inline <script> blocks are blocked, but <script src="…">
 * pointing at a same-origin file is fine (see js/bootstrap-i18n.js for
 * the same pattern).
 *
 * Sinonimia uses hash routing (location.hash = "#/<lang>/...") instead of
 * reload-on-change, so onChange() is overridden to update the hash.
 * storageKey must match the one js/app.js#syncLanguage writes to
 * (localStorage 'sinonimia-idioma').
 */
window.LocalePickerConfig = {
  storageKey: 'sinonimia-idioma',
  /* Sinonimia ships its UI strings inline in js/i18n.js (no per-locale
     file), so there's nothing to discover with HEAD requests. Setting
     path: null tells the component to skip discovery and use only the
     locales listed explicitly in requiredLocales. */
  path: null,
  requiredLocales: ['es', 'en'],
  defaultLocale: 'en',
  settingsHref: 'config/',
  onChange: function (locale) {
    /* Sinonimia hashes the current language into the URL so deep
       links to specific words stay scoped. Match the existing
       behaviour: location.hash = "#/<locale>/". The hashchange
       listener in app.js picks it up and re-renders. */
    if (typeof location !== 'undefined') {
      location.hash = '#/' + locale + '/';
    }
  }
};
