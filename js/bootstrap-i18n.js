/*
 * bootstrap-i18n.js — pre-paint i18n for index.html.
 *
 * Loaded synchronously from <head> (no `async`/`defer`) so it runs before
 * the first paint and avoids a flash of Spanish content for English-speaking
 * users. Kept tiny on purpose: no app dependencies loaded yet.
 *
 * Mirrors js/app.js#initialLanguage and js/i18n.js (only the three
 * <head>-relevant keys: lang attribute, document title, meta description).
 * If you change any of these strings here, change them in js/i18n.js too
 * — scripts/validar.js doesn't enforce the mirror (the strings are
 * dynamic), but readers will.
 *
 * Kept as an external file (not inline) so the CSP `script-src 'self'`
 * allows it: inline <script> blocks would be blocked, but <script src="…">
 * pointing at a same-origin file is fine.
 */
(function () {
  var BOOTSTRAP_I18N = {
    es: {
      htmlLang: "es",
      metaTitulo: "Sinonimia \u2014 Diccionario f\u00e1cil de palabras dif\u00edciles",
      metaDescripcion: "Diccionario en lenguaje sencillo: palabras t\u00e9cnicas y dif\u00edciles de tr\u00e1mites y de salud, explicadas con ejemplos de la vida diaria y sus sin\u00f3nimos."
    },
    en: {
      htmlLang: "en",
      metaTitulo: "Sinonimia \u2014 An easy dictionary for hard words",
      metaDescripcion: "A plain-language dictionary: hard official and health words explained with everyday examples and simple synonyms."
    }
  };
  var AVAILABLE = ["es", "en"];
  var DEFAULT = "es";

  function resolveLang() {
    var hashParts = (location.hash || "").replace(/^#\/?/, "").split("/").filter(Boolean);
    if (AVAILABLE.indexOf(hashParts[0]) !== -1) return hashParts[0];
    try {
      var saved = localStorage.getItem("sinonimia-idioma");
      if (AVAILABLE.indexOf(saved) !== -1) return saved;
    } catch (e) { /* localStorage may be blocked; fall through */ }
    var browser = (navigator.language || "").slice(0, 2);
    if (AVAILABLE.indexOf(browser) !== -1) return browser;
    return DEFAULT;
  }

  var lang = resolveLang();
  var strings = BOOTSTRAP_I18N[lang] || BOOTSTRAP_I18N[DEFAULT];

  document.documentElement.lang = strings.htmlLang;
  document.title = strings.metaTitulo;
  var metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", strings.metaDescripcion);
})();