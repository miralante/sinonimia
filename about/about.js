/*
 * about.js — shared language switcher + footer injector for the static
 * "hidden" routes of Sinonimia (about/index.html, legal/index.html,
 * legal/privacidad.html, and any future route that uses the same
 * markup — config/ already loads this script too).
 *
 * These pages are not linked from index.html, the READMEs, or any
 * other doc: they are reached by typing the address directly. They
 * have no shared state with index.html: they don't load js/i18n.js
 * or js/app.js, and each one ships its own ES/EN content marked with
 * `data-lang-block="es"` / `="en"`. The user picks the language with
 * the buttons in the header; the picked language is also honored
 * from `?lang=…` so a deep link can force one.
 *
 * The matching styles live in css/styles.css, scoped to `.page-about`
 * / `.page-legal` (see the `[data-lang-block]` display rules at the
 * bottom of the stylesheet).
 *
 * Loaded synchronously at the bottom of each about/* and legal/*
 * page (no async / defer) so the button handlers attach as soon as
 * the DOM is parsed.
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

  /* ---------------------------------------------------------------
   * Shared footer injector (sinonimia dialect).
   *
   * Sinonimia uses [data-lang-block="es"|"en"] paired with CSS
   * selectors that match `<html data-lang="es">` (see css/styles.css
   * `.page-about` / `.page-legal` blocks at the bottom of the
   * stylesheet). The CSS already handles show/hide; this injector
   * just has to generate the right pair of <a data-lang-block>
   * children inside any <footer data-pie-app> marker.
   *
   * Shared content (always emitted, same in every page):
   *   - "Ir al diccionario"     (es, href="../index.html")
   *   - "Go to the dictionary"  (en, href="../index.html")
   *
   * Page-specific pairs are declared via the data-pie-extra
   * attribute on the marker, encoded as
   *   data-pie-extra="es-text^en-text^es-href|en-href"
   * (ES text, EN text, ES href and EN href separated by `^` between
   * fields and `|` between the ES/EN href pair).
   *
   * Idempotent: a footer that already has children is skipped, so a
   * page that wants to keep its own footer markup can just write the
   * children directly and leave the marker attribute off.
   * --------------------------------------------------------------- */
  function injectFooter() {
    var pies = document.querySelectorAll("footer[data-pie-app]");
    for (var i = 0; i < pies.length; i++) {
      var pie = pies[i];
      if (pie.childNodes && pie.childNodes.length > 0) continue;
      var extraClass = pie.getAttribute("data-pie-class");
      if (extraClass) pie.className = (pie.className ? pie.className + " " : "") + extraClass;
      var html = "";
      html += '<a class="btn" href="../index.html" data-lang-block="es">Ir al diccionario</a>';
      html += '<a class="btn" href="../index.html" data-lang-block="en">Go to the dictionary</a>';
      /* Optional page-specific pair. Format: "es-text^en-text^es-href|en-href" */
      var extra = pie.getAttribute("data-pie-extra");
      if (extra) {
        var parts = extra.split("^");
        if (parts.length === 3) {
          var esText = parts[0];
          var enText = parts[1];
          var hrefs = parts[2].split("|");
          if (hrefs.length === 2) {
            html += '<a class="btn" href="' + hrefs[0] + '" data-lang-block="es">' + esText + '</a>';
            html += '<a class="btn" href="' + hrefs[1] + '" data-lang-block="en">' + enText + '</a>';
          }
        }
      }
      pie.innerHTML = html;
    }
  }
  injectFooter();
})();