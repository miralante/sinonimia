/*
 * about-app.js — "About the app" page logic (about-app/).
 *
 * Paints the page texts from js/i18n.js in the active language and draws
 * the achievements grid (js/achievements.js). Language order: ?lang=…,
 * then the language saved by the main app (sinonimia-idioma), then the
 * browser's, then Spanish. Picking a language here saves it too, so the
 * dictionary opens in the same language.
 *
 * Loaded synchronously at the bottom of about-app/index.html (no async /
 * defer), after js/i18n.js and js/achievements.js.
 */
(function () {
  var LANGUAGES = Object.keys(I18N);
  var DEFAULT_LANGUAGE = "es";

  function initialLanguage() {
    var requested = new URLSearchParams(location.search).get("lang");
    if (LANGUAGES.indexOf(requested) !== -1) return requested;
    var saved = null;
    try { saved = localStorage.getItem("sinonimia-idioma"); } catch (e) { saved = null; }
    if (LANGUAGES.indexOf(saved) !== -1) return saved;
    var browserLang = ((navigator.languages && navigator.languages[0]) || navigator.language || "")
      .toLowerCase().split(/[-_]/)[0];
    if (LANGUAGES.indexOf(browserLang) !== -1) return browserLang;
    return DEFAULT_LANGUAGE;
  }

  function paint(language) {
    document.documentElement.lang = translate(language, "htmlLang");
    document.title = translate(language, "aboutAppPageTitle");
    document.querySelectorAll("[data-about-i18n]").forEach(function (el) {
      el.textContent = translate(language, el.getAttribute("data-about-i18n"));
    });
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      var active = btn.getAttribute("data-lang") === language;
      btn.classList.toggle("activo", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    var list = SINONIMIA_ACHIEVEMENTS.list;
    var done = SINONIMIA_ACHIEVEMENTS.unlocked();
    var count = list.filter(function (a) { return !!done[a.id]; }).length;
    document.getElementById("achievements-count").textContent =
      translate(language, "achievementsCount", { n: count, total: list.length });
    SINONIMIA_ACHIEVEMENTS.render(document.getElementById("achievements-grid"), language);
  }

  document.querySelectorAll(".lang-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var language = btn.getAttribute("data-lang");
      try { localStorage.setItem("sinonimia-idioma", language); } catch (e) { /* not saved */ }
      paint(language);
    });
  });

  // Credit progress saved before achievements existed, then draw.
  SINONIMIA_ACHIEVEMENTS.syncFromStorage();
  paint(initialLanguage());
})();
