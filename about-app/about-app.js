/*
 * about-app.js — "About the app" page logic (about-app/).
 *
 * Paints the page texts through App.i18n (js/i18n.js) in the active language
 * and draws the achievements grid (js/achievements.js). The language order is
 * the engine's: ?lang=…, then the saved choice (sinonimia-idioma), then the
 * browser's, then the default locale.
 *
 * Loaded synchronously at the bottom of about-app/index.html (no async /
 * defer), after js/i18n.js, the strings files and js/achievements.js.
 */
(function () {
  function paint() {
    var i18n = window.App.i18n;
    document.documentElement.lang = i18n.t("htmlLang");
    document.title = i18n.t("aboutAppPageTitle");
    document.querySelectorAll("[data-about-i18n]").forEach(function (el) {
      el.textContent = i18n.t(el.getAttribute("data-about-i18n"));
    });

    var list = SINONIMIA_ACHIEVEMENTS.list;
    var done = SINONIMIA_ACHIEVEMENTS.unlocked();
    var count = list.filter(function (a) { return !!done[a.id]; }).length;
    document.getElementById("achievements-count").textContent =
      i18n.t("achievementsCount", { n: count, total: list.length });
    SINONIMIA_ACHIEVEMENTS.render(document.getElementById("achievements-grid"), i18n.locale());
  }

  /* The language is picked with the suite's shared dropdown (js/locale-picker.js),
     which saves the choice and announces it here. ?lang= comes first in the
     engine's order, so it is rewritten to the new language. */
  window.LocalePicker = window.LocalePicker || {};
  window.LocalePicker.onChange = function (language) {
    if (window.App.i18n.SUPPORTED.indexOf(language) === -1) return;
    var url = new URL(location.href);
    url.searchParams.set("lang", language);
    history.replaceState(null, "", url);
    paint();
  };

  // Credit progress saved before achievements existed, then draw.
  SINONIMIA_ACHIEVEMENTS.syncFromStorage();
  paint();
})();
