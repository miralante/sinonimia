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
 * `data-lang-block="es"` / `="en"`. The language is picked with the
 * suite's shared dropdown (js/locale-picker.js), which announces the
 * change through `window.LocalePicker.onChange`; the picked language is
 * also honored from `?lang=…` so a deep link can force one.
 *
 * The matching styles live in css/styles.css, scoped to `.page-about`
 * / `.page-legal` / `.page-config` / `.page-privacidad` (see the
 * `[data-lang-block]` display rules at the bottom of the stylesheet).
 *
 * Loaded synchronously at the bottom of each about/* and legal/*
 * page (no async / defer) so the button handlers attach as soon as
 * the DOM is parsed.
 */
(function () {
  var root = document.documentElement;
  var params = new URLSearchParams(location.search);
  var requested = params.get("lang");

  function setLang(lang) {
    if (lang !== "es" && lang !== "en") lang = "es";
    root.setAttribute("data-lang", lang);
    /* `lang` también, no solo `data-lang`. Estas páginas no pasan por
       js/i18n.js, que es quien mueve el atributo en el resto de la suite, así
       que sin esto el texto estaba en inglés con `<html lang="es">` y un
       lector de pantalla lo anunciaba en español. */
    root.setAttribute("lang", lang);
  }

  /* El idioma lo pone el desplegable compartido de la suite
     (js/locale-picker.js), no los dos botones que estas páginas tuvieron.
     Ese componente avisa por aquí: sin este registro escribía el idioma en
     el localStorage y nada más, y se pulsaba "English" sin que la página
     cambiara — el desplegable se veía vivo y no movía el texto. */
  window.LocalePicker = window.LocalePicker || {};
  window.LocalePicker.onChange = setLang;

  /* La misma clave que usa el desplegable para recordar el idioma, leída
     de su config para no repetirla aquí. */
  var key =
    (window.LocalePickerConfig && window.LocalePickerConfig.storageKey) ||
    "sinonimia-idioma";
  var stored = null;
  try {
    stored = localStorage.getItem(key);
  } catch (e) {}

  /* Orden al abrir, el MISMO que sigue el desplegable en su detectLocale():
   `?lang=` (enlace profundo) manda; si no, el idioma ya guardado; si no, el
   idioma del navegador; si no, el del atributo del HTML. Mantenerlos
   distintos era peor que ninguno de los dos: con navegador en inglés el
   desplegable marcaba "EN" y la página se quedaba en español, y el primer
   clic no parecía hacer nada porque el texto ya estaba en el idioma
   inicial. */
  var initial;
  if (requested === "es" || requested === "en") {
    initial = requested;
    /* Se guarda para que el desplegable muestre lo mismo que el texto: si
       no, `?lang=en` pondría la página en inglés con el desplegable
       marcando "ES". Va antes de que corra el componente, que se carga
       en diferido. */
    try {
      localStorage.setItem(key, requested);
    } catch (e) {}
  } else if (stored === "es" || stored === "en") {
    initial = stored;
  } else {
    var navLang = (navigator.languages && navigator.languages[0]) || navigator.language || "";
    var prefix = String(navLang).split(/[-_]/)[0].toLowerCase();
    initial = prefix === "es" || prefix === "en" ? prefix : root.getAttribute("data-lang");
  }
  setLang(initial);

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
  function inyectarPie() {
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
  inyectarPie();
})();