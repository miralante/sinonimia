/* ============================================================
   Sinonimia — Settings (hidden route)
   View/reset what's saved in localStorage. Two actions:
   - "Reset the person's data": clears user-authored sentences
     ("sinonimia-mis-frases-<lang>"), text size and contrast
     mode. Learned words and game stars are kept.
   - "Reset the whole app": clears every key under the
     "sinonimia-" prefix (equivalent to opening the dictionary
     for the first time).
   Two-step confirmation (same pattern as routime/settings
   and calculia/settings): one tap asks to confirm, the second
   deletes.
   Sinonimia does not use App.storage (it reads/writes
   localStorage directly), so the reset walks every key with
   the "sinonimia-" prefix and removes it.
   ============================================================ */
(function () {
  'use strict';

  var $ = function (sel) { return document.querySelector(sel); };

  var PREFIX = 'sinonimia-';
  var PII_KEYS = ['mis-frases', 'tamano', 'contraste'];
  var KEPT_KEYS = ['aprendidas', 'frases-estrellas', 'juego-aciertos'];

  function listKeys() {
    var keys = [];
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key && key.indexOf(PREFIX) === 0) keys.push(key);
      }
    } catch (e) {
      /* private browsing: pretend nothing is stored */
    }
    return keys;
  }

  function removeBySuffix(suffixes) {
    var keys = listKeys();
    keys.forEach(function (key) {
      var tail = key.substring(PREFIX.length);
      suffixes.forEach(function (suffix) {
        if (tail === suffix || tail.indexOf(suffix + '-') === 0 || tail.indexOf('-' + suffix) >= 0) {
          try { localStorage.removeItem(key); } catch (e) { /* silent */ }
        }
      });
    });
  }

  function removeByPrefix() {
    listKeys().forEach(function (key) {
      try { localStorage.removeItem(key); } catch (e) { /* silent */ }
    });
  }

  function countBySuffix(suffix) {
    var n = 0;
    listKeys().forEach(function (key) {
      if (key.indexOf('-' + suffix) >= 0 || key.indexOf(suffix + '-') === 0) n++;
    });
    return n;
  }

  function renderState() {
    var languageName = App.i18n.t(App.i18n.locale() === 'en' ? 'languageNameEn' : 'languageNameEs');

    var learnedKeys = countBySuffix('aprendidas');
    var scoreKeys = countBySuffix('juego-aciertos');

    /* Aggregate counts by language suffix when the key encodes it.
       Keys seen in sinonimia/js/app.js:
       - sinonimia-aprendidas-<lang>     : array of learned ids
       - sinonimia-juego-aciertos-<lang> : string number
       - sinonimia-mis-frases-<lang>     : JSON of own sentences */
    function countJsonEntries(suffix) {
      var total = 0;
      listKeys().forEach(function (key) {
        if (key.indexOf(PREFIX + suffix + '-') !== 0) return;
        try {
          var raw = JSON.parse(localStorage.getItem(key) || '{}');
          if (raw && typeof raw === 'object') {
            if (Array.isArray(raw)) total += raw.length;
            else total += Object.keys(raw).length;
          }
        } catch (e) { /* silent */ }
      });
      return total;
    }

    var sentencesCount = countJsonEntries('mis-frases');
    var scoreKeysList = listKeys().filter(function (k) {
      return k.indexOf(PREFIX + 'juego-aciertos-') === 0;
    });
    var totalScore = 0;
    scoreKeysList.forEach(function (k) {
      var n = parseInt(localStorage.getItem(k) || '0', 10);
      if (!isNaN(n)) totalScore += n;
    });

    var items = [
      App.i18n.t('currentLanguage').replace('{lang}', languageName),
      App.i18n.t('mySentencesCount').replace('{n}', String(sentencesCount)),
      App.i18n.t('learnedWordsCount').replace('{n}', String(learnedKeys > 0 ? '(hay datos en este navegador)' : 0)),
      App.i18n.t('scoreTotal').replace('{n}', String(totalScore))
    ];

    var list = $('#listaEstado');
    if (!list) return;
    list.innerHTML = '';
    items.forEach(function (text) {
      var li = document.createElement('li');
      li.textContent = text;
      list.appendChild(li);
    });
  }

  /* Two-step confirmation on the same button. */
  function confirmTwice(btn, normalKey, confirmKey, onConfirm) {
    var confirming = false;
    var timeoutId = null;
    btn.textContent = App.i18n.t(normalKey);
    btn.addEventListener('click', function () {
      if (!confirming) {
        confirming = true;
        btn.textContent = App.i18n.t(confirmKey);
        timeoutId = setTimeout(function () {
          confirming = false;
          btn.textContent = App.i18n.t(normalKey);
        }, 5000);
        return;
      }
      clearTimeout(timeoutId);
      confirming = false;
      btn.textContent = App.i18n.t(normalKey);
      onConfirm();
    });
  }

  function resetPersonalData() {
    removeBySuffix(PII_KEYS);
    var f = $('#feedbackPersona');
    if (f) {
      f.textContent = App.i18n.t('feedbackResetPersonalDone');
      f.className = 'feedback acierto';
    }
    renderState();
  }

  function resetEverything() {
    removeByPrefix();
    var f = $('#feedbackTodo');
    if (f) {
      f.textContent = App.i18n.t('feedbackResetAllDone');
      f.className = 'feedback acierto';
    }
    renderState();
  }

  function wireLanguageButtons() {
    var currentLocale = App.i18n.locale();
    var buttons = document.querySelectorAll('.btn-idioma');
    buttons.forEach(function (btn) {
      var pressed = btn.dataset.locale === currentLocale;
      btn.setAttribute('aria-pressed', String(pressed));
      btn.addEventListener('click', function () {
        App.i18n.setLocale(btn.dataset.locale);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    wireLanguageButtons();
    renderState();
    App.i18n.apply();

    confirmTwice(
      $('#btnBorrarPersona'),
      'btnResetPersonal',
      'confirmResetPersonal',
      resetPersonalData
    );
    confirmTwice(
      $('#btnBorrarTodo'),
      'btnResetAll',
      'confirmResetAll',
      resetEverything
    );
  });
})();
