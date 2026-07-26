/*
 * about.js — shared language switcher for the /about/ pages
 * (about/index.html, about/privacidad.html, …).
 *
 * The /about/ pages are hidden routes with no shared state with index.html
 * (they don't load js/i18n.js or js/app.js). Each one ships its own ES/EN
 * content marked with `data-lang-block="es"` / `="en"`, and lets the user
 * pick the language with the buttons in the header. The picked language
 * is also honored from `?lang=…` so a deep link can force one.
 *
 * The matching styles live in css/styles.css, scoped to `.page-about` /
 * `.page-privacidad` (see the `[data-lang-block]` display rules at the
 * bottom of the stylesheet).
 *
 * Loaded synchronously at the bottom of each about/* page (no async /
 * defer) so the button handlers attach as soon as the DOM is parsed.
 */
(function () {
  var root = document.documentElement;
  var params = new URLSearchParams(location.search);
  var requested = params.get("lang");
  if (requested === "es" || requested === "en") {
    root.setAttribute("data-lang", requested);
  }
  function setLang(lang) {
    root.setAttribute("data-lang", lang);
    document.querySelectorAll(".idioma-btn").forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-lang") === lang));
    });
  }
  document.querySelectorAll(".idioma-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLang(btn.getAttribute("data-lang"));
    });
  });
  setLang(root.getAttribute("data-lang"));
})();