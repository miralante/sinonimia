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
    /* En el 404 no hay hash al que ir: esa página publica
       window.SinonimiaNotFound.setLanguage (js/notfound-page.js) y se
       repinta en el idioma nuevo sin moverse de sitio. Si no —es decir,
       en index.html— el comportamiento de siempre: el idioma viaja en el
       hash para que los enlaces profundos a una palabra sigan apuntando
       a la versión correcta. El hashchange de app.js recoge el cambio y
       vuelve a pintar. */
    if (window.SinonimiaNotFound && typeof window.SinonimiaNotFound.setLanguage === 'function') {
      window.SinonimiaNotFound.setLanguage(locale);
      return;
    }
    if (typeof location !== 'undefined') {
      location.hash = '#/' + locale + '/';
    }
  }
};
