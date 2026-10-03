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
  var btnIniciar = document.querySelectorAll("#erase-iniciar");
  var btnConfirmar = document.querySelectorAll("#erase-confirm-btn");
  var btnCancelar = document.querySelectorAll("#erase-cancel");
  var panelConfirmar = document.getElementById("erase-confirm");
  var panelResultado = document.getElementById("erase-resultado");

  // Defensive: if any element is missing (older markup, partial fetch,
  // CSS-only page preview), the script just no-ops rather than throwing.
  if (!btnIniciar.length || !btnConfirmar.length || !btnCancelar.length ||
      !panelConfirmar || !panelResultado) {
    return;
  }

  function setHidden(buttons, hidden) {
    Array.prototype.forEach.call(buttons, function (button) { button.hidden = hidden; });
  }

  function focusVisible(buttons) {
    var target = Array.prototype.find.call(buttons, function (button) {
      return button.getClientRects().length > 0;
    }) || buttons[0];
    target.focus();
  }

  Array.prototype.forEach.call(btnIniciar, function (button) {
    button.addEventListener("click", function () {
      panelConfirmar.hidden = false;
      setHidden(btnIniciar, true);
      // Move focus to the visible cancel button so a keyboard user can back out.
      focusVisible(btnCancelar);
    });
  });

  Array.prototype.forEach.call(btnCancelar, function (button) {
    button.addEventListener("click", function () {
      panelConfirmar.hidden = true;
      setHidden(btnIniciar, false);
      focusVisible(btnIniciar);
    });
  });

  Array.prototype.forEach.call(btnConfirmar, function (button) {
    button.addEventListener("click", function () {
      var erased = clearAll();
      panelConfirmar.hidden = true;
      panelResultado.hidden = false;
      // The dev console is the only place the count is logged. End users
      // see a plain "Done. / Listo." — no numbers, no key names, no
      // technical detail that would need translation or maintenance.
      console.info("[sinonimia] erased " + erased + " localStorage key(s)");
    });
  });
})();
