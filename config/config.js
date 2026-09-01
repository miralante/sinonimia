/*
 * config.js — Settings page logic for /config/.
 *
 * Owns one action: clear every localStorage key whose name starts with
 * the sinonimia- prefix. This is the suite-wide "settings/data-reset
 * pattern" (see apptonomia/CLAUDE.md §B.6 and sinonimia/CLAUDE.md).
 * Two-step confirmation, scoped to the project prefix, no
 * localStorage.clear() so a browser that hosts several Miralante
 * siblings in the same origin isn't wiped across apps.
 *
 * Loaded synchronously at the bottom of config/index.html; no async /
 * defer, same pattern as about/about.js.
 */
(function () {
  // --- Helpers ---------------------------------------------------------
  // Wrap every storage access in try/catch because private-mode browsers
  // throw on localStorage access (and the page must still work there,
  // even if "Clear my data" just becomes a no-op rather than crashing).
  function safeRemoveItem(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      return false;
    }
  }

  function listSinonimiaKeys() {
    var out = [];
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && k.indexOf("sinonimia-") === 0) out.push(k);
      }
    } catch (e) {
      // localStorage access threw; return whatever we collected so far.
    }
    return out;
  }

  function clearAll() {
    var keys = listSinonimiaKeys();
    for (var i = 0; i < keys.length; i++) safeRemoveItem(keys[i]);
    return keys.length;
  }

  // --- Wire up the two-step confirmation -------------------------------
  var btnIniciar = document.getElementById("borrar-iniciar");
  var btnConfirmar = document.getElementById("borrar-confirmar-btn");
  var btnCancelar = document.getElementById("borrar-cancelar");
  var panelConfirmar = document.getElementById("borrar-confirmar");
  var panelResultado = document.getElementById("borrar-resultado");

  // Defensive: if any element is missing (older markup, partial fetch,
  // CSS-only page preview), the script just no-ops rather than throwing.
  if (!btnIniciar || !btnConfirmar || !btnCancelar ||
      !panelConfirmar || !panelResultado) {
    return;
  }

  btnIniciar.addEventListener("click", function () {
    panelConfirmar.hidden = false;
    btnIniciar.hidden = true;
    // Move focus to the cancel button so the user can back out with the
    // keyboard without first tabbing through the now-hidden trigger.
    btnCancelar.focus();
  });

  btnCancelar.addEventListener("click", function () {
    panelConfirmar.hidden = true;
    btnIniciar.hidden = false;
    btnIniciar.focus();
  });

  btnConfirmar.addEventListener("click", function () {
    var erased = clearAll();
    panelConfirmar.hidden = true;
    panelResultado.hidden = false;
    // The dev console is the only place the count is logged. End users
    // see a plain "Done. / Listo." — no numbers, no key names, no
    // technical detail that would need translation or maintenance.
    console.info("[sinonimia] erased " + erased + " localStorage key(s)");
  });
})();