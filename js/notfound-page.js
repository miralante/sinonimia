/* ==========================================================================
   Sinonimia — 404 page wiring.
   This block used to sit inline in 404.html. The production CSP is
   `script-src 'self'` with no 'unsafe-inline', so the browser blocked it
   and the whole 404 page lost its behaviour: the text was never
   translated and the language buttons had no handler.

   Intentionally separate from js/app.js: app.js owns the hash router and
   would try to route the current URL, which on a 404 means rewriting the
   hash to #/<lang>/ before the user even sees the error. This file only
   needs the static-text behaviour — no routing, no list, no detail, no
   game. The accessibility settings (text size, theme, high contrast) and
   the language picker come from the shared js/locale-picker.js drawer, so
   there is a single control for them, as in the other 7 apps.

   Load AFTER js/dictionary-data.js (it reads SINONIMIA_DICTIONARY_DATA).
   ========================================================================== */
(function () {
  "use strict";

  var AVAILABLE_LANGUAGES = Object.keys(SINONIMIA_DICTIONARY_DATA.languages);
  var DEFAULT_LANGUAGE = "en";

  var currentLanguage = (function () {
    var saved = localStorage.getItem("sinonimia-idioma");
    if (AVAILABLE_LANGUAGES.indexOf(saved) !== -1) return saved;
    var browserLang = (navigator.language || "").slice(0, 2);
    if (AVAILABLE_LANGUAGES.indexOf(browserLang) !== -1) return browserLang;
    return DEFAULT_LANGUAGE;
  })();

  function t(key) {
    return translate(currentLanguage, key);
  }

  function repaintStaticTexts() {
    document.documentElement.lang = t("htmlLang");
    document.title = t("error404Title") + " — Sinonimia";
    var metaDescriptionEl = document.querySelector('meta[name="description"]');
    if (metaDescriptionEl) metaDescriptionEl.setAttribute("content", t("error404Description"));
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach(function (el) {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria-label")));
    });
  }

  function repaintActions() {
    document.getElementById("error-404-inicio").href = "#/" + currentLanguage + "/";
    document.getElementById("error-404-azar").href = "#/" + currentLanguage + "/juego/palabra";
    document.getElementById("error-404-juego").href = "#/" + currentLanguage + "/juego";
    document.getElementById("cabecera-enlace").href = "#/" + currentLanguage + "/";
  }

  function paintAll() {
    repaintStaticTexts();
    repaintActions();
  }

  paintAll();

  // El idioma, el tema, el tamaño de letra y el alto contraste los lleva
  // el cajón compartido (js/locale-picker.js), el mismo ⚙️ que en
  // index.html. Esta página ya no pinta sus propios botones: si se
  // duplicaran, los dos caminos pelearían por data-theme y por el
  // font-size de <html>, y cada uno llegaría a un ajuste distinto.
  //
  // js/locale-picker-config.js llama a setLanguage() cuando el idioma se
  // cambia desde el cajón, porque en el 404 no hay hash al que ir: la
  // página se repinta en el idioma nuevo y se queda donde está.
  window.SinonimiaNotFound = {
    setLanguage: function (locale) {
      if (AVAILABLE_LANGUAGES.indexOf(locale) === -1) return;
      currentLanguage = locale;
      localStorage.setItem("sinonimia-idioma", currentLanguage);
      paintAll();
    }
  };
})();
