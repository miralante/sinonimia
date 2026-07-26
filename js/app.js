(function () {
  "use strict";

  var AVAILABLE_LANGUAGES = Object.keys(DICCIONARIOS); // ["es", "en"]
  var DEFAULT_LANGUAGE = "es";

  var listEl = document.getElementById("lista-palabras");
  var listView = document.getElementById("vista-lista");
  var detailView = document.getElementById("vista-detalle");
  var gameView = document.getElementById("vista-juego");
  var searchInput = document.getElementById("buscar");
  var resultsInfo = document.getElementById("resultados-info");
  var noResults = document.getElementById("sin-resultados");
  var alphabetNav = document.getElementById("alfabeto");
  var filterButtons = document.querySelectorAll(".filtro-btn");
  var languageButtons = document.querySelectorAll(".idioma-btn");

  var state = { topic: "todos", letter: null };
  var currentLanguage = DEFAULT_LANGUAGE;
  var activeDictionary = [];
  var entryById = {};
  var entryByName = {};

  function t(key, variables) {
    return translate(currentLanguage, key, variables);
  }

  function normalize(text) {
    return text
      .toString()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .trim();
  }

  // entryByName maps a normalized headword to an ARRAY of entries, never a
  // single entry: two entries can legitimately share the same "palabra"
  // (a homograph, e.g. "Pensión" = retirement pay / a guesthouse). Storing
  // an array instead of overwriting keeps both reachable and lets callers
  // detect the ambiguity instead of silently resolving to whichever entry
  // happened to be defined last.
  function buildIndexes() {
    activeDictionary = DICCIONARIOS[currentLanguage] || [];
    entryById = {};
    entryByName = {};
    activeDictionary.forEach(function (entry) {
      entryById[entry.id] = entry;
      var key = normalize(entry.palabra);
      (entryByName[key] = entryByName[key] || []).push(entry);
    });
  }

  // Cross-language links use the shared ARASAAC pictogram id as the only
  // link between a concept in one language's dictionary and its counterpart
  // in another: the data files don't keep matching ids across languages (see
  // js/data.es.js), but a translated word intentionally reuses the same
  // pictogram (js/data.en.js's header comment). Pictogram ids ARE reused
  // within a single language for unrelated words, though, so a match only
  // counts when it's unique on both sides — otherwise there's no way to know
  // which word it corresponds to, and no link is shown.
  function otherLanguageEntries(entry) {
    var ownMatches = activeDictionary.filter(function (e) {
      return e.imagen.id === entry.imagen.id;
    });
    if (ownMatches.length !== 1) return [];

    var translations = [];
    AVAILABLE_LANGUAGES.forEach(function (lang) {
      if (lang === currentLanguage) return;
      var matches = (DICCIONARIOS[lang] || []).filter(function (e) {
        return e.imagen.id === entry.imagen.id;
      });
      if (matches.length === 1) {
        translations.push({ language: lang, entry: matches[0] });
      }
    });
    return translations;
  }

  function matchesSearch(entry, normalizedQuery) {
    if (!normalizedQuery) return true;
    if (normalize(entry.palabra).indexOf(normalizedQuery) !== -1) return true;
    if (normalize(entry.definicion).indexOf(normalizedQuery) !== -1) return true;
    return entry.sinonimos.some(function (synonym) {
      return normalize(synonym).indexOf(normalizedQuery) !== -1;
    });
  }

  function filteredEntries() {
    var query = normalize(searchInput.value || "");
    return activeDictionary.filter(function (entry) {
      if (state.topic !== "todos" && entry.situacion !== state.topic) return false;
      if (state.letter && normalize(entry.palabra).charAt(0) !== state.letter) return false;
      return matchesSearch(entry, query);
    }).sort(function (a, b) {
      return a.palabra.localeCompare(b.palabra, currentLanguage);
    });
  }

  function availableLetters() {
    var set = {};
    activeDictionary.forEach(function (e) {
      set[normalize(e.palabra).charAt(0)] = true;
    });
    return set;
  }

  function buildAlphabet() {
    var available = availableLetters();
    var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    alphabetNav.innerHTML = "";
    alphabet.forEach(function (letter) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = letter.toUpperCase();
      var exists = !!available[letter];
      btn.disabled = !exists;
      btn.setAttribute("aria-pressed", "false");
      if (exists) {
        btn.addEventListener("click", function () {
          if (state.letter === letter) {
            state.letter = null;
          } else {
            state.letter = letter;
          }
          renderList();
        });
      }
      alphabetNav.appendChild(btn);
    });
  }

  function updateAlphabetVisual() {
    Array.prototype.forEach.call(alphabetNav.children, function (btn) {
      var letter = btn.textContent.toLowerCase();
      var active = state.letter === letter;
      btn.classList.toggle("activo", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function wordLink(id) {
    return "#/" + currentLanguage + "/palabra/" + id;
  }

  function renderList() {
    showView("lista");
    var results = filteredEntries();
    listEl.innerHTML = "";

    results.forEach(function (entry) {
      var li = document.createElement("li");
      li.className = "tarjeta";
      var a = document.createElement("a");
      a.href = wordLink(entry.id);
      a.className = "tarjeta-enlace";

      var img = document.createElement("img");
      img.className = "tarjeta-imagen";
      img.src = "img/" + entry.imagen.id + ".png";
      img.alt = "";
      img.loading = "lazy";

      var h3 = document.createElement("h3");
      h3.textContent = entry.palabra;
      var def = document.createElement("p");
      def.className = "definicion-corta";
      def.textContent = entry.definicion;

      a.appendChild(img);
      if (isLearned(entry.id)) {
        var badge = document.createElement("span");
        badge.className = "tarjeta-aprendida";
        badge.setAttribute("aria-label", t("yaDescubierta"));
        badge.textContent = "✓";
        a.appendChild(badge);
      }
      a.appendChild(h3);
      a.appendChild(def);
      li.appendChild(a);
      listEl.appendChild(li);
    });

    noResults.hidden = results.length !== 0;
    resultsInfo.textContent = results.length === 1
      ? t("resultadoUno")
      : t("resultadosVarios", { n: results.length });

    updateAlphabetVisual();
  }

  function createHighlightedSentence(text, highlightedWord) {
    var p = document.createElement("p");
    var normalizedHighlight = normalize(highlightedWord);
    var normalizedText = normalize(text);
    var idx = normalizedText.indexOf(normalizedHighlight);

    if (idx === -1) {
      p.textContent = text;
      return p;
    }

    var before = text.slice(0, idx);
    var middle = text.slice(idx, idx + highlightedWord.length);
    var after = text.slice(idx + highlightedWord.length);

    p.appendChild(document.createTextNode(before));
    var mark = document.createElement("span");
    mark.className = "destacado";
    mark.textContent = middle;
    p.appendChild(mark);
    p.appendChild(document.createTextNode(after));
    return p;
  }

  function renderDetail(id) {
    var entry = entryById[id];
    if (!entry) {
      detailView.innerHTML = "";
      var notFound = document.createElement("p");
      notFound.textContent = t("noEncontrada");
      var notFoundBackLink = document.createElement("a");
      notFoundBackLink.className = "volver";
      notFoundBackLink.href = "#/" + currentLanguage + "/";
      notFoundBackLink.textContent = t("volver");
      detailView.appendChild(notFound);
      detailView.appendChild(notFoundBackLink);
      showView("detalle");
      return;
    }

    showView("detalle");
    detailView.innerHTML = "";

    var backLink = document.createElement("a");
    backLink.className = "volver";
    backLink.href = "#/" + currentLanguage + "/";
    backLink.textContent = t("volver");
    detailView.appendChild(backLink);

    var header = document.createElement("div");
    header.className = "detalle-cabecera";

    var img = document.createElement("img");
    img.className = "detalle-imagen";
    img.src = "img/" + entry.imagen.id + ".png";
    img.alt = entry.imagen.alt;
    header.appendChild(img);

    var titleBox = document.createElement("div");

    var h2 = document.createElement("h2");
    h2.tabIndex = -1;
    h2.textContent = entry.palabra;
    titleBox.appendChild(h2);

    var topicPill = document.createElement("span");
    topicPill.className = "tema-pill";
    topicPill.textContent = t("tema_" + entry.situacion);
    titleBox.appendChild(topicPill);

    header.appendChild(titleBox);
    detailView.appendChild(header);

    var def = document.createElement("p");
    def.className = "definicion";
    def.textContent = entry.definicion;
    detailView.appendChild(def);

    var synonymsHeading = document.createElement("h3");
    synonymsHeading.textContent = t("seDiceTambien");
    detailView.appendChild(synonymsHeading);

    var synonymsList = document.createElement("ul");
    synonymsList.className = "sinonimos-lista";
    entry.sinonimos.forEach(function (synonym) {
      var li = document.createElement("li");
      var relatedEntries = (entryByName[normalize(synonym)] || []).filter(function (candidate) {
        return candidate.id !== entry.id;
      });
      if (relatedEntries.length === 0) {
        li.textContent = synonym;
      } else if (relatedEntries.length === 1) {
        var link = document.createElement("a");
        link.href = wordLink(relatedEntries[0].id);
        link.textContent = synonym;
        li.appendChild(link);
      } else {
        // The synonym text matches more than one entry (a homograph, e.g.
        // "pensión"): link to all of them instead of guessing which one
        // was meant, distinguished by their topic label.
        li.appendChild(document.createTextNode(synonym + " ("));
        relatedEntries.forEach(function (relatedEntry, index) {
          if (index > 0) li.appendChild(document.createTextNode(" / "));
          var link = document.createElement("a");
          link.href = wordLink(relatedEntry.id);
          link.textContent = t("tema_" + relatedEntry.situacion);
          li.appendChild(link);
        });
        li.appendChild(document.createTextNode(")"));
      }
      synonymsList.appendChild(li);
    });
    detailView.appendChild(synonymsList);

    var exampleHeading = document.createElement("h3");
    exampleHeading.textContent = t("enFrase");
    detailView.appendChild(exampleHeading);

    var sentences = document.createElement("div");
    sentences.className = "frases";
    sentences.appendChild(createHighlightedSentence(entry.ejemplo.texto, entry.ejemplo.palabra));

    var simplifiedLabel = document.createElement("p");
    simplifiedLabel.className = "equivale";
    simplifiedLabel.textContent = t("dichoFormaSencilla");
    sentences.appendChild(simplifiedLabel);

    sentences.appendChild(createHighlightedSentence(entry.ejemploSinonimo.texto, entry.ejemploSinonimo.palabra));
    detailView.appendChild(sentences);

    detailView.appendChild(createYourSentenceBlock(entry));

    var translations = otherLanguageEntries(entry);
    if (translations.length > 0) {
      var translationsBox = document.createElement("div");
      translationsBox.className = "detalle-traducciones";
      translations.forEach(function (translation) {
        var translationLink = document.createElement("a");
        translationLink.className = "detalle-traduccion";
        translationLink.href = "#/" + translation.language + "/palabra/" + translation.entry.id;
        translationLink.textContent = t("verEnOtroIdioma", {
          idioma: t("idiomaNombre_" + translation.language),
          palabra: translation.entry.palabra,
        });
        translationsBox.appendChild(translationLink);
      });
      detailView.appendChild(translationsBox);
    }

    document.title = entry.palabra + t("tituloDetalleSufijo");
    h2.focus();

    markLearned(entry.id);
  }

  // --- Write your own sentence (per word, saved in this browser) ---
  function sentencesKey() {
    return "sinonimia-mis-frases-" + currentLanguage;
  }

  function mySentences() {
    try {
      var saved = JSON.parse(localStorage.getItem(sentencesKey()) || "{}");
      return saved && typeof saved === "object" ? saved : {};
    } catch (e) {
      return {};
    }
  }

  function saveMySentence(id, text) {
    var all = mySentences();
    all[id] = text;
    localStorage.setItem(sentencesKey(), JSON.stringify(all));
  }

  function createYourSentenceBlock(entry) {
    var section = document.createElement("div");
    section.className = "tu-frase";

    var h3 = document.createElement("h3");
    h3.textContent = t("fraseTuTurno");
    section.appendChild(h3);

    var instructions = document.createElement("p");
    instructions.className = "ayuda-texto";
    instructions.textContent = t("fraseInstruccion");
    section.appendChild(instructions);

    var fieldId = "tu-frase-campo-" + entry.id;

    var form = document.createElement("form");
    form.className = "tu-frase-form";
    form.noValidate = true;

    var label = document.createElement("label");
    label.setAttribute("for", fieldId);
    label.className = "tu-frase-label";
    label.textContent = t("fraseLabel");

    var field = document.createElement("textarea");
    field.id = fieldId;
    field.rows = 2;
    field.placeholder = t("frasePlaceholder");
    field.value = mySentences()[entry.id] || "";

    var saveBtn = document.createElement("button");
    saveBtn.type = "submit";
    saveBtn.className = "boton-cta boton-secundario";
    saveBtn.textContent = t("fraseGuardar");

    var notice = document.createElement("p");
    notice.className = "tu-frase-aviso";
    notice.setAttribute("role", "status");
    notice.setAttribute("aria-live", "polite");

    function showAsSaved(text) {
      notice.innerHTML = "";
      var savedLabel = document.createElement("strong");
      savedLabel.textContent = t("fraseGuardadaAviso") + " ";
      var quotedText = document.createElement("span");
      quotedText.className = "tu-frase-texto";
      quotedText.textContent = "“" + text + "”";
      notice.appendChild(savedLabel);
      notice.appendChild(quotedText);
      notice.classList.add("aparecer-una-vez");
    }

    form.addEventListener("submit", function (evt) {
      evt.preventDefault();
      var text = field.value.trim();
      if (!text) return;
      saveMySentence(entry.id, text);
      showAsSaved(text);
    });

    var row = document.createElement("div");
    row.className = "tu-frase-fila";
    row.appendChild(field);
    row.appendChild(saveBtn);

    form.appendChild(label);
    form.appendChild(row);
    section.appendChild(form);

    if (field.value) {
      showAsSaved(field.value);
    }
    section.appendChild(notice);

    return section;
  }

  function showView(name) {
    listView.hidden = name !== "lista";
    detailView.hidden = name !== "detalle";
    gameView.hidden = name !== "juego";
    noResults.hidden = noResults.hidden || name !== "lista";
  }

  // --- Routing: #/<lang>/  and  #/<lang>/palabra/<id> ---
  // The "palabra" / "juego" path segments are deliberately NOT translated per
  // language: they're routing tokens, not user-facing text, so the URL shape
  // stays identical across languages (#/es/palabra/x, #/en/palabra/y).
  function route() {
    var parts = (location.hash || "").replace(/^#\/?/, "").split("/").filter(Boolean);
    var hashLanguage = parts[0];

    if (AVAILABLE_LANGUAGES.indexOf(hashLanguage) === -1) {
      location.hash = "#/" + currentLanguage + "/";
      return;
    }

    if (hashLanguage !== currentLanguage) {
      syncLanguage(hashLanguage);
    }

    if (parts[1] === "palabra" && parts[2]) {
      renderDetail(parts[2]);
    } else if (parts[1] === "juego" && parts[2] === "palabra") {
      renderWordGame();
    } else if (parts[1] === "juego" && parts[2] === "frase") {
      renderSentenceGame();
    } else if (parts[1] === "juego") {
      renderGameMenu();
    } else {
      document.title = t("metaTitulo");
      renderList();
    }
  }

  // --- Apply the interface's fixed texts for the current language ---
  function applyStaticTexts() {
    document.documentElement.lang = t("htmlLang");
    document.title = t("metaTitulo");

    var metaDescriptionEl = document.querySelector('meta[name="description"]');
    if (metaDescriptionEl) metaDescriptionEl.setAttribute("content", t("metaDescripcion"));

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach(function (el) {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria-label")));
    });

    languageButtons.forEach(function (btn) {
      var active = btn.getAttribute("data-lang") === currentLanguage;
      btn.classList.toggle("activo", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  // --- Sync internal state to a language (without touching the hash or re-rendering the view) ---
  function syncLanguage(language) {
    if (AVAILABLE_LANGUAGES.indexOf(language) === -1) return;
    currentLanguage = language;
    localStorage.setItem("sinonimia-idioma", language);

    buildIndexes();
    applyStaticTexts();
    buildAlphabet();
    initHero();
    updateProgressBar();

    state.letter = null;
    searchInput.value = "";
  }

  function initialLanguage() {
    var parts = (location.hash || "").replace(/^#\/?/, "").split("/").filter(Boolean);
    if (AVAILABLE_LANGUAGES.indexOf(parts[0]) !== -1) return parts[0];

    var saved = localStorage.getItem("sinonimia-idioma");
    if (AVAILABLE_LANGUAGES.indexOf(saved) !== -1) return saved;

    var browserLang = (navigator.language || "").slice(0, 2);
    if (AVAILABLE_LANGUAGES.indexOf(browserLang) !== -1) return browserLang;

    return DEFAULT_LANGUAGE;
  }

  // --- Search box and filters ---
  searchInput.addEventListener("input", function () {
    if (location.hash.indexOf("/palabra/") !== -1) {
      location.hash = "#/" + currentLanguage + "/";
    }
    renderList();
  });

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterButtons.forEach(function (b) {
        b.classList.remove("activo");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("activo");
      btn.setAttribute("aria-pressed", "true");
      state.topic = btn.getAttribute("data-tema");
      if (location.hash.indexOf("/palabra/") !== -1) {
        location.hash = "#/" + currentLanguage + "/";
      }
      renderList();
    });
  });

  languageButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var language = btn.getAttribute("data-lang");
      if (language === currentLanguage) return;
      location.hash = "#/" + language + "/";
    });
  });

  window.addEventListener("hashchange", route);

  // --- Accessibility: font size ---
  var MIN_FONT_SIZE = 15, MAX_FONT_SIZE = 26, FONT_SIZE_STEP = 2;

  function applyFontSize(px) {
    document.documentElement.style.fontSize = px + "px";
    localStorage.setItem("sinonimia-tamano", px);
  }

  function currentFontSize() {
    var raw = parseInt(localStorage.getItem("sinonimia-tamano"), 10);
    return isNaN(raw) ? 18 : raw;
  }

  document.getElementById("letra-mas").addEventListener("click", function () {
    applyFontSize(Math.min(MAX_FONT_SIZE, currentFontSize() + FONT_SIZE_STEP));
  });
  document.getElementById("letra-menos").addEventListener("click", function () {
    applyFontSize(Math.max(MIN_FONT_SIZE, currentFontSize() - FONT_SIZE_STEP));
  });
  document.getElementById("letra-normal").addEventListener("click", function () {
    applyFontSize(18);
  });
  applyFontSize(currentFontSize());

  // --- Accessibility: high contrast ---
  var contrastBtn = document.getElementById("contraste-toggle");

  function applyContrast(active) {
    document.body.classList.toggle("alto-contraste", active);
    contrastBtn.setAttribute("aria-pressed", active ? "true" : "false");
    localStorage.setItem("sinonimia-contraste", active ? "1" : "0");
  }

  contrastBtn.addEventListener("click", function () {
    applyContrast(!document.body.classList.contains("alto-contraste"));
  });
  applyContrast(localStorage.getItem("sinonimia-contraste") === "1");

  // --- Progress: discovered words (this browser only, per language) ---
  var progressText = document.getElementById("progreso-texto");
  var progressBar = document.getElementById("barra-progreso");
  var progressBarFill = document.getElementById("barra-progreso-relleno");

  function progressKey() {
    return "sinonimia-aprendidas-" + currentLanguage;
  }

  function learnedWords() {
    try {
      var saved = JSON.parse(localStorage.getItem(progressKey()) || "[]");
      return Array.isArray(saved) ? saved : [];
    } catch (e) {
      return [];
    }
  }

  function isLearned(id) {
    return learnedWords().indexOf(id) !== -1;
  }

  function updateProgressBar() {
    var total = activeDictionary.length;
    var learnedCount = learnedWords().length;
    var percentage = total === 0 ? 0 : Math.round((learnedCount / total) * 100);

    progressText.textContent = learnedCount === 0
      ? t("progresoNinguna")
      : t("progresoParcial", { n: learnedCount, total: total }) + (learnedCount === total ? t("progresoCompleto") : "");

    progressBar.setAttribute("aria-valuenow", String(percentage));
    progressBarFill.style.width = percentage + "%";
  }

  function markLearned(id) {
    var list = learnedWords();
    if (list.indexOf(id) !== -1) return;
    list.push(id);
    localStorage.setItem(progressKey(), JSON.stringify(list));
    updateProgressBar();
    progressBarFill.classList.remove("animar-relleno");
    void progressBarFill.offsetWidth;
    progressBarFill.classList.add("animar-relleno");
  }

  // --- Word of the day ---
  function dayIndex() {
    var today = new Date();
    var yearStart = new Date(today.getFullYear(), 0, 0);
    var dayOfYear = Math.floor((today - yearStart) / 86400000);
    return dayOfYear % activeDictionary.length;
  }

  function initHero() {
    document.getElementById("juego-cta").href = "#/" + currentLanguage + "/juego";
    if (activeDictionary.length === 0) return;
    var wordOfDay = activeDictionary[dayIndex()];
    document.getElementById("hero-palabra-nombre").textContent = wordOfDay.palabra;
    document.getElementById("hero-cta").href = wordLink(wordOfDay.id);
  }

  document.getElementById("sorprendeme").addEventListener("click", function () {
    if (activeDictionary.length === 0) return;
    var random = activeDictionary[Math.floor(Math.random() * activeDictionary.length)];
    location.hash = wordLink(random.id);
  });

  // --- Games: menu and shared utilities ---
  var MIN_WORDS_FOR_GAME = 4;
  var gameTargetId = null;

  function scoreKey() {
    return "sinonimia-juego-aciertos-" + currentLanguage;
  }

  function savedScore() {
    var raw = parseInt(localStorage.getItem(scoreKey()), 10);
    return isNaN(raw) ? 0 : raw;
  }

  function addPoint() {
    var total = savedScore() + 1;
    localStorage.setItem(scoreKey(), String(total));
    return total;
  }

  function shuffle(list) {
    var copy = list.slice();
    for (var i = copy.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  }

  function createBackLink(text, href) {
    var backLink = document.createElement("a");
    backLink.className = "volver";
    backLink.href = href;
    backLink.textContent = text;
    return backLink;
  }

  function createScoreBadge() {
    var scoreEl = document.createElement("p");
    scoreEl.className = "juego-aciertos";
    scoreEl.textContent = t("juegoAciertos", { n: savedScore() });
    return scoreEl;
  }

  function renderGameMenu() {
    showView("juego");
    gameView.innerHTML = "";

    gameView.appendChild(createBackLink(t("volver"), "#/" + currentLanguage + "/"));

    var h2 = document.createElement("h2");
    h2.tabIndex = -1;
    h2.textContent = t("juegoMenuTitulo");
    gameView.appendChild(h2);

    var instructions = document.createElement("p");
    instructions.className = "ayuda-texto";
    instructions.textContent = t("juegoMenuInstruccion");
    gameView.appendChild(instructions);

    gameView.appendChild(createScoreBadge());

    var menu = document.createElement("div");
    menu.className = "juego-menu";

    [
      { href: "palabra", title: t("juegoPalabraTitulo"), desc: t("juegoPalabraDescripcion"), icon: "🖼️" },
      { href: "frase", title: t("juegoFraseTitulo"), desc: t("juegoFraseDescripcion"), icon: "✏️" },
    ].forEach(function (option) {
      var card = document.createElement("a");
      card.className = "juego-menu-opcion";
      card.href = "#/" + currentLanguage + "/juego/" + option.href;

      var icon = document.createElement("span");
      icon.className = "juego-menu-icono";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = option.icon;

      var title = document.createElement("span");
      title.className = "juego-menu-titulo";
      title.textContent = option.title;

      var desc = document.createElement("span");
      desc.className = "juego-menu-desc";
      desc.textContent = option.desc;

      card.appendChild(icon);
      card.appendChild(title);
      card.appendChild(desc);
      menu.appendChild(card);
    });

    gameView.appendChild(menu);
    h2.focus();
  }

  function checkTooFewWords(h2) {
    if (activeDictionary.length >= MIN_WORDS_FOR_GAME) return false;
    var notice = document.createElement("p");
    notice.textContent = t("juegoPocasPalabras");
    gameView.appendChild(notice);
    h2.focus();
    return true;
  }

  // --- Game 1: Which word is it? (clue + pictogram + 3 options) ---
  function pickDistractorEntries(target, howMany) {
    var targetName = normalize(target.palabra);
    // Exclude the target's own homograph twin too (same "palabra", different
    // id) — otherwise the game could show two options with identical text,
    // which breaks the "options must differ" rule since you can't tell them
    // apart by reading the button.
    var remaining = activeDictionary.filter(function (e) {
      return e.id !== target.id && normalize(e.palabra) !== targetName;
    });
    // Socratic design: put distractors from a DIFFERENT topic first. Reading
    // the clue should let you rule them out by contrast (they clearly don't
    // belong to that topic), so the right answer is reasoned out, not
    // guessed. Only fall back to same-topic entries if there aren't enough
    // different-topic ones to fill the options.
    var differentTopic = shuffle(remaining.filter(function (e) { return e.situacion !== target.situacion; }));
    var sameTopic = shuffle(remaining.filter(function (e) { return e.situacion === target.situacion; }));
    return differentTopic.concat(sameTopic).slice(0, howMany);
  }

  function markScoreEarned(scoreEl) {
    scoreEl.classList.remove("acierto-pop");
    void scoreEl.offsetWidth;
    scoreEl.classList.add("acierto-pop");
  }

  function renderWordGame() {
    showView("juego");
    gameView.innerHTML = "";

    gameView.appendChild(createBackLink(t("juegoVolverMenu"), "#/" + currentLanguage + "/juego"));

    var h2 = document.createElement("h2");
    h2.tabIndex = -1;
    h2.textContent = t("juegoPalabraTitulo");
    gameView.appendChild(h2);

    if (checkTooFewWords(h2)) return;

    var instructions = document.createElement("p");
    instructions.className = "ayuda-texto";
    instructions.textContent = t("juegoPalabraInstruccion");
    gameView.appendChild(instructions);

    var scoreEl = createScoreBadge();
    gameView.appendChild(scoreEl);

    var target = activeDictionary[Math.floor(Math.random() * activeDictionary.length)];
    gameTargetId = target.id;

    var clue = document.createElement("div");
    clue.className = "juego-pista";

    var img = document.createElement("img");
    img.className = "juego-pista-imagen";
    img.src = "img/" + target.imagen.id + ".png";
    img.alt = "";
    clue.appendChild(img);

    var content = document.createElement("div");
    content.className = "juego-pista-contenido";

    var topicPill = document.createElement("span");
    topicPill.className = "tema-pill";
    topicPill.textContent = t("tema_" + target.situacion);
    content.appendChild(topicPill);

    var def = document.createElement("p");
    def.className = "juego-pista-texto";
    def.textContent = target.definicion;
    content.appendChild(def);

    clue.appendChild(content);

    gameView.appendChild(clue);

    var options = document.createElement("div");
    options.className = "juego-opciones";

    var message = document.createElement("p");
    message.className = "juego-mensaje";
    message.setAttribute("role", "status");
    message.setAttribute("aria-live", "polite");

    var optionList = shuffle([target].concat(pickDistractorEntries(target, 2)));

    optionList.forEach(function (option) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "juego-opcion";
      btn.textContent = option.palabra;

      btn.addEventListener("click", function () {
        if (btn.classList.contains("correcta")) return;

        if (option.id === gameTargetId) {
          btn.classList.add("correcta");
          Array.prototype.forEach.call(options.children, function (other) {
            other.disabled = true;
          });
          message.textContent = t("juegoCorrecto");
          message.className = "juego-mensaje juego-mensaje-correcto";
          scoreEl.textContent = t("juegoAciertos", { n: addPoint() });
          markScoreEarned(scoreEl);

          var nextBtn = document.createElement("button");
          nextBtn.type = "button";
          nextBtn.className = "boton-cta";
          nextBtn.textContent = t("juegoSiguiente");
          nextBtn.addEventListener("click", renderWordGame);
          gameView.appendChild(nextBtn);
          nextBtn.focus();
        } else {
          btn.classList.add("incorrecta");
          btn.disabled = true;
          message.textContent = t("juegoPalabraIncorrecto");
          message.className = "juego-mensaje juego-mensaje-incorrecto";
        }
      });

      options.appendChild(btn);
    });

    gameView.appendChild(options);
    gameView.appendChild(message);

    h2.focus();
  }

  // --- Game 2: complete the sentence (sentence with a blank + 3 options) ---
  function createSentenceWithBlank(text, hiddenWord) {
    var p = document.createElement("p");
    var idx = normalize(text).indexOf(normalize(hiddenWord));

    if (idx === -1) {
      p.textContent = text;
      return p;
    }

    var before = text.slice(0, idx);
    var after = text.slice(idx + hiddenWord.length);

    p.appendChild(document.createTextNode(before));
    var blank = document.createElement("span");
    blank.className = "hueco";
    blank.textContent = "▁▁▁▁▁";
    p.appendChild(blank);
    p.appendChild(document.createTextNode(after));
    return p;
  }

  function renderSentenceGame() {
    showView("juego");
    gameView.innerHTML = "";

    gameView.appendChild(createBackLink(t("juegoVolverMenu"), "#/" + currentLanguage + "/juego"));

    var h2 = document.createElement("h2");
    h2.tabIndex = -1;
    h2.textContent = t("juegoFraseTitulo");
    gameView.appendChild(h2);

    if (checkTooFewWords(h2)) return;

    var instructions = document.createElement("p");
    instructions.className = "ayuda-texto";
    instructions.textContent = t("juegoFraseInstruccion");
    gameView.appendChild(instructions);

    var scoreEl = createScoreBadge();
    gameView.appendChild(scoreEl);

    var target = activeDictionary[Math.floor(Math.random() * activeDictionary.length)];
    gameTargetId = target.id;

    var clue = document.createElement("div");
    clue.className = "juego-pista juego-pista-frase";

    var topicPill = document.createElement("span");
    topicPill.className = "tema-pill";
    topicPill.textContent = t("tema_" + target.situacion);
    clue.appendChild(topicPill);

    clue.appendChild(createSentenceWithBlank(target.ejemplo.texto, target.ejemplo.palabra));
    gameView.appendChild(clue);

    var options = document.createElement("div");
    options.className = "juego-opciones";

    var message = document.createElement("p");
    message.className = "juego-mensaje";
    message.setAttribute("role", "status");
    message.setAttribute("aria-live", "polite");

    var correctWord = target.ejemplo.palabra;
    var distractors = pickDistractorEntries(target, 2).map(function (e) {
      return e.ejemplo.palabra;
    });
    var optionList = shuffle([correctWord].concat(distractors));

    optionList.forEach(function (optionWord) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "juego-opcion";
      btn.textContent = optionWord;

      btn.addEventListener("click", function () {
        if (btn.classList.contains("correcta")) return;

        if (optionWord === correctWord) {
          btn.classList.add("correcta");
          Array.prototype.forEach.call(options.children, function (other) {
            other.disabled = true;
          });
          clue.innerHTML = "";
          clue.appendChild(createHighlightedSentence(target.ejemplo.texto, target.ejemplo.palabra));
          message.textContent = t("juegoCorrecto");
          message.className = "juego-mensaje juego-mensaje-correcto";
          scoreEl.textContent = t("juegoAciertos", { n: addPoint() });
          markScoreEarned(scoreEl);

          var nextBtn = document.createElement("button");
          nextBtn.type = "button";
          nextBtn.className = "boton-cta";
          nextBtn.textContent = t("juegoSiguiente");
          nextBtn.addEventListener("click", renderSentenceGame);
          gameView.appendChild(nextBtn);
          nextBtn.focus();
        } else {
          btn.classList.add("incorrecta");
          btn.disabled = true;
          message.textContent = t("juegoFraseIncorrecto");
          message.className = "juego-mensaje juego-mensaje-incorrecto";
        }
      });

      options.appendChild(btn);
    });

    gameView.appendChild(options);
    gameView.appendChild(message);

    h2.focus();
  }

  // --- Startup ---
  currentLanguage = initialLanguage();
  buildIndexes();
  applyStaticTexts();
  buildAlphabet();
  initHero();
  updateProgressBar();
  route();
})();
