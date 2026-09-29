(function () {
  "use strict";

  // Languages come from the runtime manifest: each language's dictionary is
  // fetched on demand (see js/dictionary-loader.js).
  var AVAILABLE_LANGUAGES = SinonimiaDictionary.languages; // ["es", "en"]
  var DEFAULT_LANGUAGE = "en";

  var listEl = document.getElementById("word-list");
  var listView = document.getElementById("list-view");
  var detailView = document.getElementById("detail-view");
  var gameView = document.getElementById("game-view");
  var searchInput = document.getElementById("search");
  var resultsInfo = document.getElementById("results-info");
  var noResults = document.getElementById("no-results");
  var alphabetNav = document.getElementById("alphabet");
  var filterButtons = document.querySelectorAll(".filter-btn");
  var languageButtons = document.querySelectorAll(".lang-btn");

  var state = { topic: "todos", letter: null };
  var currentLanguage = DEFAULT_LANGUAGE;
  var activeDictionary = [];
  var entryById = new Map();
  var entryByName = new Map();
  var suiteAudioContext = null;

  function playSuiteSound(kind) {
    var enabled = kind === "success";
    try {
      var saved = JSON.parse(localStorage.getItem("miralante:sounds") || "null");
      if (saved && typeof saved[kind] === "boolean") enabled = saved[kind];
    } catch (e) { /* ignore */ }
    if (!enabled) return;
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      if (!suiteAudioContext) suiteAudioContext = new AC();
      if (suiteAudioContext.state === "suspended") suiteAudioContext.resume();
      function tone(frequency, duration, type, delay) {
        var now = suiteAudioContext.currentTime + (delay || 0);
        var oscillator = suiteAudioContext.createOscillator();
        var gain = suiteAudioContext.createGain();
        oscillator.type = type;
        oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
        oscillator.connect(gain);
        gain.connect(suiteAudioContext.destination);
        oscillator.start(now);
        oscillator.stop(now + duration);
      }
      if (kind === "success") {
        tone(523.25, 0.15, "sine", 0);
        tone(659.25, 0.2, "sine", 0.12);
      } else {
        tone(180, 0.12, "triangle", 0);
      }
    } catch (e) { /* optional audio must never block the activity */ }
  }

  function t(key, variables) {
    return translate(currentLanguage, key, variables);
  }

  function normalize(text) {
    // Explicit `\uXXXX` escapes for the combining-marks range, NOT literal
    // Unicode characters in the source: Safari's regex engine has been
    // observed to mis-parse the character range when the source file's
    // bytes for the combining marks are literal, so the regex silently
    // fails to strip accents. That breaks search-by-letter, the alphabet
    // filters, and the highlight/blank-game word finders in Safari.
    return text
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  // entryByName maps a normalized headword to an ARRAY of entries, never a
  // single entry: two entries can legitimately share the same "word"
  // (a homograph, e.g. "Pensión" = retirement pay / a guesthouse). Storing
  // an array instead of overwriting keeps both reachable and lets callers
  // detect the ambiguity instead of silently resolving to whichever entry
  // happened to be defined last.
  function buildIndexes() {
    activeDictionary = SinonimiaDictionary.entries(currentLanguage);
    entryById = new Map();
    entryByName = new Map();
    activeDictionary.forEach(function (entry) {
      entryById.set(entry.id, entry);
      var key = normalize(entry.word);
      if (!entryByName.has(key)) entryByName.set(key, []);
      entryByName.get(key).push(entry);
    });
  }

  // Cross-language links ("see it in English") are resolved when the dictionary
  // data is generated (scripts/build-dictionary-data.js: explicit `traduccion`
  // first, shared-pictogram fallback second) and arrive with the entry's detail
  // as `entry.translations`, so the other language never has to be loaded just
  // to draw them.

  // Normalized search keys are computed once per entry and cached on it.
  function searchKeys(entry) {
    if (!entry._k) {
      entry._k = {
        word: normalize(entry.word),
        rest: normalize(entry.definition + " | " + entry.synonyms.join(" | "))
      };
    }
    return entry._k;
  }

  function matchesSearch(entry, normalizedQuery) {
    if (!normalizedQuery) return true;
    var keys = searchKeys(entry);
    return keys.word.indexOf(normalizedQuery) !== -1 ||
      keys.rest.indexOf(normalizedQuery) !== -1;
  }

  // Sorted fresh from activeDictionary on every call (never cached) so it
  // always reflects whatever words are currently in js/data.<lang>.js — the
  // dictionary is under active ingestion and gains new entries often, and
  // this order also drives the detail page's previous/next navigation.
  // Cached per dictionary array: with tens of thousands of entries, sorting
  // and normalizing on every keystroke froze the search box.
  var sortedCache = { source: null, list: null };
  function alphabeticalEntries() {
    if (sortedCache.source !== activeDictionary) {
      var collator = new Intl.Collator(currentLanguage);
      sortedCache.source = activeDictionary;
      sortedCache.list = activeDictionary.slice().sort(function (a, b) {
        return collator.compare(a.word, b.word);
      });
    }
    return sortedCache.list;
  }

  function filteredEntries() {
    var query = normalize(searchInput.value || "");
    return alphabeticalEntries().filter(function (entry) {
      if (state.topic !== "todos" && entry.situacion !== state.topic) return false;
      if (state.letter && searchKeys(entry).word.charAt(0) !== state.letter) return false;
      return matchesSearch(entry, query);
    });
  }

  function availableLetters() {
    var set = {};
    activeDictionary.forEach(function (e) {
      set[normalize(e.word).charAt(0)] = true;
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
    return "#/" + currentLanguage + "/word/" + id;
  }

  // Only PAGE_SIZE cards are in the DOM at a time; "show more" appends the
  // next page. Rendering every match (the dictionary has tens of thousands
  // of entries) made the page and the search box unusable.
  var PAGE_SIZE = 60;
  var listResults = [];
  var listShown = 0;
  var showMoreBtn = document.getElementById("show-more");

  function buildCard(entry) {
    var li = document.createElement("li");
    li.className = "card";
    var a = document.createElement("a");
    a.href = wordLink(entry.id);
    a.className = "card-enlace";

    var img = document.createElement("img");
    img.className = "card-image";
    img.src = "img/" + entry.image.id + ".png";
    img.alt = "";
    img.loading = "lazy";

    var h3 = document.createElement("h3");
    h3.textContent = entry.word;
    var def = document.createElement("p");
    def.className = "short-definition";
    def.textContent = entry.definition;

    a.appendChild(img);
    if (isLearned(entry.id)) {
      var badge = document.createElement("span");
      badge.className = "card-aprendida";
      badge.setAttribute("aria-label", t("alreadyDiscovered"));
      badge.textContent = "✓";
      a.appendChild(badge);
    }
    a.appendChild(h3);
    a.appendChild(def);
    li.appendChild(a);
    return li;
  }

  function renderNextPage() {
    var fragment = document.createDocumentFragment();
    var end = Math.min(listShown + PAGE_SIZE, listResults.length);
    for (var i = listShown; i < end; i++) fragment.appendChild(buildCard(listResults[i]));
    listShown = end;
    listEl.appendChild(fragment);
    showMoreBtn.hidden = listShown >= listResults.length;
  }

  // When a search finds nothing, point the person somewhere else: two links (a
  // dictionary and an encyclopedia, which differ by language) and two plain
  // tips — search the Internet, ask your chatbot — deliberately naming no
  // product. Labels and URL templates live in js/i18n.js (per language), so the
  // set can differ by language without touching this file. `{q}` is the
  // encoded text. Only shown when the person typed something; links open in a
  // new tab.
  var EXTERNAL_SEARCHES = [
    { label: "externalDictionaryLabel", url: "externalDictionaryUrl" },
    { label: "externalWikipediaLabel", url: "externalWikipediaUrl" }
  ];
  var noResultsHelp = document.getElementById("no-results-help");
  var noResultsHelpText = document.getElementById("no-results-help-text");
  var noResultsLinks = document.getElementById("no-results-links");
  var noResultsTips = document.getElementById("no-results-tips");

  function renderExternalSearch(query) {
    noResultsLinks.innerHTML = "";
    noResultsTips.innerHTML = "";
    noResultsHelp.hidden = !query;
    if (!query) return;

    noResultsHelpText.textContent = t("noResultsHelp", { q: query });
    [t("noResultsTipInternet"), t("noResultsTipChatbot", { q: query })].forEach(function (tip) {
      var li = document.createElement("li");
      li.textContent = tip;
      noResultsTips.appendChild(li);
    });
    var vars = { q: encodeURIComponent(query) };
    EXTERNAL_SEARCHES.forEach(function (item) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.className = "boton-cta boton-secundario";
      a.href = t(item.url, vars);
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = t(item.label);
      a.setAttribute("aria-label", t(item.label) + " (" + t("externalOpensNote") + ")");
      li.appendChild(a);
      noResultsLinks.appendChild(li);
    });
  }

  function renderList() {
    showView("lista");
    listResults = filteredEntries();
    listShown = 0;
    listEl.innerHTML = "";

    noResults.hidden = listResults.length !== 0;
    renderExternalSearch(listResults.length === 0 ? (searchInput.value || "").trim().slice(0, 200) : "");
    resultsInfo.textContent = listResults.length === 1
      ? t("resultOne")
      : t("resultsMany", { n: listResults.length });

    renderNextPage();
    updateAlphabetVisual();
  }

  showMoreBtn.addEventListener("click", renderNextPage);

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

  // Previous/next always walk the whole dictionary in alphabetical order
  // (not the list view's current search/topic/letter filters), so a word
  // reached directly (a link, a game, a bookmark) has stable neighbors
  // regardless of how the visitor got there.
  function buildWordNavLink(direction, targetEntry) {
    var el;
    if (targetEntry) {
      el = document.createElement("a");
      el.href = wordLink(targetEntry.id);
      el.setAttribute(
        "aria-label",
        t(direction === "previous" ? "previousWordAria" : "nextWordAria", { word: targetEntry.word })
      );
    } else {
      el = document.createElement("span");
      el.setAttribute("aria-hidden", "true");
    }
    el.className = "detalle-navegacion-enlace detalle-navegacion-" + direction;
    el.textContent = t(direction === "previous" ? "previousWord" : "nextWord");
    return el;
  }

  function renderDetail(id) {
    var entry = entryById.get(id);
    if (entry && !SinonimiaDictionary.hasDetail(entry)) {
      // The list only carries the light index; the example sentences and
      // translation links live in a small per-word chunk fetched on demand.
      withDetails([entry], function () { renderDetail(id); }, function () {
        showView("detalle");
        showUnavailable(detailView, "#/" + currentLanguage + "/");
      });
      return;
    }
    if (!entry) {
      detailView.innerHTML = "";
      var notFound = document.createElement("p");
      notFound.textContent = t("wordNotFound");
      var notFoundBackLink = document.createElement("a");
      notFoundBackLink.className = "backToSearch";
      notFoundBackLink.href = "#/" + currentLanguage + "/";
      notFoundBackLink.textContent = t("backToSearch");
      detailView.appendChild(notFound);
      detailView.appendChild(notFoundBackLink);
      showView("detalle");
      return;
    }

    showView("detalle");
    detailView.innerHTML = "";

    var backLink = document.createElement("a");
    backLink.className = "backToSearch";
    backLink.href = "#/" + currentLanguage + "/";
    backLink.textContent = t("backToSearch");
    detailView.appendChild(backLink);

    var header = document.createElement("div");
    header.className = "detalle-cabecera";

    var img = document.createElement("img");
    img.className = "detail-image";
    img.src = "img/" + entry.image.id + ".png";
    img.alt = entry.image.alt;
    header.appendChild(img);

    var titleBox = document.createElement("div");

    var h2 = document.createElement("h2");
    h2.tabIndex = -1;
    h2.textContent = entry.word;
    titleBox.appendChild(h2);

    var topicPill = document.createElement("span");
    topicPill.className = "tema-pill";
    topicPill.textContent = t("topic_" + entry.situacion);
    titleBox.appendChild(topicPill);

    header.appendChild(titleBox);
    detailView.appendChild(header);

    var def = document.createElement("p");
    def.className = "definicion";
    def.textContent = entry.definition;
    detailView.appendChild(def);

    var synonymsHeading = document.createElement("h3");
    synonymsHeading.textContent = t("alsoKnownAs");
    detailView.appendChild(synonymsHeading);

    var synonymsList = document.createElement("ul");
    synonymsList.className = "synonyms-list";
    entry.synonyms.forEach(function (synonym) {
      var li = document.createElement("li");
      var relatedEntries = (entryByName.get(normalize(synonym)) || []).filter(function (candidate) {
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
          link.textContent = t("topic_" + relatedEntry.situacion);
          li.appendChild(link);
        });
        li.appendChild(document.createTextNode(")"));
      }
      synonymsList.appendChild(li);
    });
    detailView.appendChild(synonymsList);

    var exampleHeading = document.createElement("h3");
    exampleHeading.textContent = t("inASentence");
    detailView.appendChild(exampleHeading);

    var sentences = document.createElement("div");
    sentences.className = "sentences";
    sentences.appendChild(createHighlightedSentence(entry.example.text, entry.example.word));

    var simplifiedLabel = document.createElement("p");
    simplifiedLabel.className = "equivale";
    simplifiedLabel.textContent = t("saidSimply");
    sentences.appendChild(simplifiedLabel);

    sentences.appendChild(createHighlightedSentence(entry.exampleSynonym.text, entry.exampleSynonym.word));
    detailView.appendChild(sentences);

    detailView.appendChild(createYourSentenceBlock(entry));

    var translations = entry.translations || [];
    if (translations.length > 0) {
      var translationsBox = document.createElement("div");
      translationsBox.className = "detail-translations";
      translations.forEach(function (translation) {
        var translationLink = document.createElement("a");
        translationLink.className = "detail-translation";
        translationLink.href = "#/" + translation.language + "/word/" + translation.id;
        translationLink.textContent = t("viewInOtherLanguage", {
          idioma: t("languageName_" + translation.language),
          word: translation.word,
        });
        translationsBox.appendChild(translationLink);
      });
      detailView.appendChild(translationsBox);
    }

    var ordered = alphabeticalEntries();
    var currentIndex = ordered.indexOf(entry);
    var previousEntry = currentIndex > 0 ? ordered[currentIndex - 1] : null;
    var nextEntry = currentIndex < ordered.length - 1 ? ordered[currentIndex + 1] : null;

    var wordNav = document.createElement("nav");
    wordNav.className = "detalle-navegacion";
    wordNav.setAttribute("aria-label", t("wordNavLabel"));
    wordNav.appendChild(buildWordNavLink("previous", previousEntry));
    wordNav.appendChild(buildWordNavLink("next", nextEntry));
    detailView.appendChild(wordNav);

    document.title = entry.word + t("detailTitleSuffix");
    // The hash changes before this view is rebuilt. On mobile browsers that
    // can leave the viewport at the old document position (often the footer).
    // Focus the heading for accessibility without letting the browser choose
    // a position, then explicitly place the word at the top of the viewport.
    h2.focus({ preventScroll: true });
    window.requestAnimationFrame(function () {
      h2.scrollIntoView({ block: "start", inline: "nearest" });
    });

    markLearned(entry.id);
  }

  // --- Write your own sentence (per word, saved in this browser) ---
  function sentencesKey() {
    return "sinonimia-mis-sentences-" + currentLanguage;
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
  function sentenceStarsKey() {
    return "sinonimia-sentences-estrellas-" + currentLanguage;
  }

  function sentenceStars() {
    try {
      var saved = JSON.parse(localStorage.getItem(sentenceStarsKey()) || "[]");
      return Array.isArray(saved) ? saved : [];
    } catch (e) {
      return [];
    }
  }

  function earnSentenceStar(id) {
    var earned = sentenceStars();
    if (earned.indexOf(id) !== -1) return false;
    earned.push(id);
    localStorage.setItem(sentenceStarsKey(), JSON.stringify(earned));
    return true;
  }

  function createYourSentenceBlock(entry) {
    var section = document.createElement("div");
    section.className = "tu-frase";

    var h3 = document.createElement("h3");
    h3.textContent = t("yourTurn");
    section.appendChild(h3);

    var instructions = document.createElement("p");
    instructions.className = "help-texto";
    instructions.textContent = t("sentenceInstruction");
    section.appendChild(instructions);
    var stars = document.createElement("p");
    stars.className = "tu-frase-estrellas";
    stars.textContent = t("sentenceStars", { n: sentenceStars().length });
    section.appendChild(stars);

    var fieldId = "tu-frase-campo-" + entry.id;

    var form = document.createElement("form");
    form.className = "tu-frase-form";
    form.noValidate = true;

    var label = document.createElement("label");
    label.setAttribute("for", fieldId);
    label.className = "tu-frase-label";
    label.textContent = t("sentenceLabel");

    var field = document.createElement("textarea");
    field.id = fieldId;
    field.rows = 2;
    field.placeholder = t("sentencePlaceholder");
    field.value = mySentences()[entry.id] || "";

    var saveBtn = document.createElement("button");
    saveBtn.type = "submit";
    saveBtn.className = "boton-cta boton-secundario";
    saveBtn.textContent = t("saveSentence");

    var notice = document.createElement("p");
    notice.className = "tu-frase-aviso";
    notice.setAttribute("role", "status");
    notice.setAttribute("aria-live", "polite");

    function showAsSaved(text) {
      notice.innerHTML = "";
      var savedLabel = document.createElement("strong");
      savedLabel.textContent = t("sentenceSavedNotice") + " ";
      var quotedText = document.createElement("span");
      quotedText.className = "your-sentence-text";
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
      if (earnSentenceStar(entry.id)) {
        stars.textContent = t("sentenceStars", { n: sentenceStars().length });
        stars.classList.remove("acierto-pop");
        void stars.offsetWidth;
        stars.classList.add("acierto-pop");
        notice.appendChild(document.createTextNode(" " + t("sentenceStarEarned")));
      }
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
    // A list render can still be yielding between chunks when navigation
    // changes to a detail page or a game. Invalidate it immediately so it
    // cannot keep building thousands of hidden cards in the background.
    listView.hidden = name !== "lista";
    detailView.hidden = name !== "detalle";
    gameView.hidden = name !== "juego";
    noResults.hidden = name !== "lista";
  }

  // --- Routing: #/<lang>/  and  #/<lang>/word/<id> ---
  // The "word" / "juego" path segments are deliberately NOT translated per
  // language: they're routing tokens, not user-facing text, so the URL shape
  // stays identical across languages (#/es/word/x, #/en/word/y).
  var booted = false;
  // Bumped by every navigation and every async render, so a chunk that arrives
  // late for a page the user already left cannot overwrite the current one.
  var viewToken = 0;

  function showLoadError() {
    resultsInfo.textContent = t("loadError");
  }

  // Runs `render` once every entry has its detail fields. Chunks come from the
  // network or, for an installed app, from the offline cache.
  function withDetails(entries, render, onFailure) {
    var missing = entries.filter(function (entry) { return !SinonimiaDictionary.hasDetail(entry); });
    if (missing.length === 0) { render(); return; }
    var token = ++viewToken;
    setBusy(1);
    SinonimiaDictionary.loadDetail(currentLanguage, missing).then(function () {
      setBusy(-1);
      if (token === viewToken) render();
    }, function () {
      setBusy(-1);
      if (token === viewToken) onFailure();
    });
  }

  // `aria-busy` on <main> while a detail chunk is being fetched: assistive
  // technology knows the content is about to change, and the UI smoke test
  // waits for it to clear before touching the next control.
  var pendingLoads = 0;
  var mainEl = document.getElementById("contenido");
  function setBusy(delta) {
    pendingLoads += delta;
    if (pendingLoads > 0) mainEl.setAttribute("aria-busy", "true");
    else mainEl.removeAttribute("aria-busy");
  }

  // Shown when a chunk cannot be fetched: offline (not saved yet) or a network error.
  function showUnavailable(container, backHref) {
    container.innerHTML = "";
    var message = document.createElement("p");
    message.textContent = t(navigator.onLine === false ? "offlineMissing" : "loadError");
    var back = document.createElement("a");
    back.className = "backToSearch";
    back.href = backHref;
    back.textContent = t("backToSearch");
    container.appendChild(message);
    container.appendChild(back);
  }

  function route() {
    if (!booted) return; // start() routes once the first language is loaded
    viewToken++;
    var parts = (location.hash || "").replace(/^#\/?/, "").split("/").filter(Boolean);
    var hashLanguage = parts[0];

    if (AVAILABLE_LANGUAGES.indexOf(hashLanguage) === -1) {
      location.hash = "#/" + currentLanguage + "/";
      return;
    }

    // Never render a language whose data has not arrived yet: fetch it, then
    // route again (the hash is re-read, so a newer navigation wins).
    if (!SinonimiaDictionary.isIndexLoaded(hashLanguage)) {
      SinonimiaDictionary.loadIndex(hashLanguage).then(route, showLoadError);
      return;
    }

    if (hashLanguage !== currentLanguage) {
      syncLanguage(hashLanguage);
    }

    if (parts[1] === "word" && parts[2]) {
      renderDetail(parts[2]);
    } else if (parts[1] === "juego" && (parts[2] === "word" || parts[2] === "palabra")) {
      renderWordGame();
    } else if (parts[1] === "juego" && parts[2] === "frase") {
      renderSentenceGame();
    } else if (parts[1] === "juego") {
      renderGameMenu();
    } else {
      document.title = t("metaTitle");
      renderList();
    }
  }

  // --- Apply the interface's fixed texts for the current language ---
  function applyStaticTexts() {
    document.documentElement.lang = t("htmlLang");
    document.title = t("metaTitle");

    var metaDescriptionEl = document.querySelector('meta[name="description"]');
    if (metaDescriptionEl) metaDescriptionEl.setAttribute("content", t("metaDescription"));

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

    var browserLang = ((navigator.languages && navigator.languages[0]) || navigator.language || "").toLowerCase().split(/[-_]/)[0];
    if (AVAILABLE_LANGUAGES.indexOf(browserLang) !== -1) return browserLang;

    return DEFAULT_LANGUAGE;
  }

  // --- Search box and filters ---
  var searchTimer = null;
  searchInput.addEventListener("input", function () {
    if (location.hash.indexOf("/word/") !== -1) {
      location.hash = "#/" + currentLanguage + "/";
    }
    clearTimeout(searchTimer);
    // Before the first language is loaded there is nothing to list: start()
    // renders with whatever is in the box by then.
    searchTimer = setTimeout(function () { if (booted) renderList(); }, 150);
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
      if (location.hash.indexOf("/word/") !== -1) {
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
  var progressText = document.getElementById("progress-text");
  var progressBar = document.getElementById("progress-bar");
  var progressBarFill = document.getElementById("barra-progress-relleno");

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
      ? t("progressNone")
      : t("progressPartial", { n: learnedCount, total: total }) + (learnedCount === total ? t("progressComplete") : "");

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
    document.getElementById("hero-word-name").textContent = wordOfDay.word;
    document.getElementById("hero-cta").href = wordLink(wordOfDay.id);
  }

  document.getElementById("surpriseMe").addEventListener("click", function () {
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
    backLink.className = "backToSearch";
    backLink.href = href;
    backLink.textContent = text;
    return backLink;
  }

  function createScoreBadge() {
    var scoreEl = document.createElement("p");
    scoreEl.className = "juego-aciertos";
    scoreEl.textContent = t("gameScore", { n: savedScore() });
    return scoreEl;
  }

  function renderGameMenu() {
    showView("juego");
    gameView.innerHTML = "";

    gameView.appendChild(createBackLink(t("backToSearch"), "#/" + currentLanguage + "/"));

    var h2 = document.createElement("h2");
    h2.tabIndex = -1;
    h2.textContent = t("gameMenuTitle");
    gameView.appendChild(h2);

    var instructions = document.createElement("p");
    instructions.className = "help-texto";
    instructions.textContent = t("gameMenuInstruction");
    gameView.appendChild(instructions);

    gameView.appendChild(createScoreBadge());

    var menu = document.createElement("div");
    menu.className = "juego-menu";

    [
      { href: "word", title: t("wordGameTitle"), desc: t("wordGameDescription"), icon: "🖼️" },
      { href: "frase", title: t("sentenceGameTitle"), desc: t("sentenceGameDescription"), icon: "✏️" },
    ].forEach(function (option) {
      var card = document.createElement("a");
      card.className = "juego-menu-option";
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
    notice.textContent = t("gameTooFewWords");
    gameView.appendChild(notice);
    h2.focus();
    return true;
  }

  // --- Game 1: Which word is it? (clue + pictogram + 3 options) ---
  function pickDistractorEntries(target, howMany) {
    var targetName = normalize(target.word);
    // Exclude the target's own homograph twin too (same "word", different
    // id) — otherwise the game could show two options with identical text,
    // which breaks the "options must differ" rule since you can't tell them
    // apart by reading the button.
    var remaining = activeDictionary.filter(function (e) {
      return e.id !== target.id && normalize(e.word) !== targetName;
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

    gameView.appendChild(createBackLink(t("gameBackToMenu"), "#/" + currentLanguage + "/juego"));

    var h2 = document.createElement("h2");
    h2.tabIndex = -1;
    h2.textContent = t("wordGameTitle");
    gameView.appendChild(h2);

    if (checkTooFewWords(h2)) return;

    var instructions = document.createElement("p");
    instructions.className = "help-texto";
    instructions.textContent = t("wordGameInstruction");
    gameView.appendChild(instructions);

    var scoreEl = createScoreBadge();
    gameView.appendChild(scoreEl);

    var target = activeDictionary[Math.floor(Math.random() * activeDictionary.length)];
    gameTargetId = target.id;

    var clue = document.createElement("div");
    clue.className = "juego-pista";

    var img = document.createElement("img");
    img.className = "game-hint-image";
    img.src = "img/" + target.image.id + ".png";
    img.alt = "";
    clue.appendChild(img);

    var content = document.createElement("div");
    content.className = "juego-pista-contenido";

    var topicPill = document.createElement("span");
    topicPill.className = "tema-pill";
    topicPill.textContent = t("topic_" + target.situacion);
    content.appendChild(topicPill);

    var def = document.createElement("p");
    def.className = "game-hint-text";
    def.textContent = target.definition;
    content.appendChild(def);

    clue.appendChild(content);

    gameView.appendChild(clue);

    var options = document.createElement("div");
    options.className = "game-options";

    var message = document.createElement("p");
    message.className = "juego-mensaje";
    message.setAttribute("role", "status");
    message.setAttribute("aria-live", "polite");

    var optionList = shuffle([target].concat(pickDistractorEntries(target, 2)));

    optionList.forEach(function (option) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "game-option";
      btn.textContent = option.word;

      btn.addEventListener("click", function () {
        if (btn.classList.contains("correcta")) return;

        if (option.id === gameTargetId) {
          btn.classList.add("correcta");
          Array.prototype.forEach.call(options.children, function (other) {
            other.disabled = true;
          });
          message.textContent = t("gameCorrect");
          message.className = "juego-mensaje juego-mensaje-correcto";
          playSuiteSound("success");
          scoreEl.textContent = t("gameScore", { n: addPoint() });
          markScoreEarned(scoreEl);

          var nextBtn = document.createElement("button");
          nextBtn.type = "button";
          nextBtn.className = "boton-cta";
          nextBtn.textContent = t("gameNext");
          nextBtn.addEventListener("click", renderWordGame);
          gameView.appendChild(nextBtn);
          nextBtn.focus();
        } else {
          btn.classList.add("incorrecta");
          btn.disabled = true;
          message.textContent = t("wordGameIncorrect");
          message.className = "juego-mensaje juego-mensaje-incorrecto";
          playSuiteSound("error");
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

    gameView.appendChild(createBackLink(t("gameBackToMenu"), "#/" + currentLanguage + "/juego"));

    var h2 = document.createElement("h2");
    h2.tabIndex = -1;
    h2.textContent = t("sentenceGameTitle");
    gameView.appendChild(h2);

    if (checkTooFewWords(h2)) return;

    var instructions = document.createElement("p");
    instructions.className = "help-texto";
    instructions.textContent = t("sentenceGameInstruction");
    gameView.appendChild(instructions);

    var scoreEl = createScoreBadge();
    gameView.appendChild(scoreEl);

    var target = activeDictionary[Math.floor(Math.random() * activeDictionary.length)];
    gameTargetId = target.id;
    var distractorEntries = pickDistractorEntries(target, 2);

    // The sentences are detail fields: fetch the (few, small) chunks that hold
    // the target and its two distractors, then draw the round.
    withDetails([target].concat(distractorEntries), function () {

      var clue = document.createElement("div");
      clue.className = "juego-pista juego-pista-frase";

      var topicPill = document.createElement("span");
      topicPill.className = "tema-pill";
      topicPill.textContent = t("topic_" + target.situacion);
      clue.appendChild(topicPill);

      clue.appendChild(createSentenceWithBlank(target.example.text, target.example.word));
      gameView.appendChild(clue);

      var options = document.createElement("div");
      options.className = "game-options";

      var message = document.createElement("p");
      message.className = "juego-mensaje";
      message.setAttribute("role", "status");
      message.setAttribute("aria-live", "polite");

      var correctWord = target.example.word;
      var distractors = distractorEntries.map(function (e) {
        return e.example.word;
      });
      var optionList = shuffle([correctWord].concat(distractors));

      optionList.forEach(function (optionWord) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "game-option";
        btn.textContent = optionWord;

        btn.addEventListener("click", function () {
          if (btn.classList.contains("correcta")) return;

          if (optionWord === correctWord) {
            btn.classList.add("correcta");
            Array.prototype.forEach.call(options.children, function (other) {
              other.disabled = true;
            });
            clue.innerHTML = "";
            clue.appendChild(createHighlightedSentence(target.example.text, target.example.word));
            message.textContent = t("gameCorrect");
            message.className = "juego-mensaje juego-mensaje-correcto";
            playSuiteSound("success");
            scoreEl.textContent = t("gameScore", { n: addPoint() });
            markScoreEarned(scoreEl);

            var nextBtn = document.createElement("button");
            nextBtn.type = "button";
            nextBtn.className = "boton-cta";
            nextBtn.textContent = t("gameNext");
            nextBtn.addEventListener("click", renderSentenceGame);
            gameView.appendChild(nextBtn);
            nextBtn.focus();
          } else {
            btn.classList.add("incorrecta");
            btn.disabled = true;
            message.textContent = t("sentenceGameIncorrect");
            message.className = "juego-mensaje juego-mensaje-incorrecto";
            playSuiteSound("error");
          }
        });

        options.appendChild(btn);
      });

      gameView.appendChild(options);
      gameView.appendChild(message);

      h2.focus();
    }, function () {
      showUnavailable(gameView, "#/" + currentLanguage + "/");
    });
  }

  // --- Startup ---
  // The page shell is already painted; only the active language's light index
  // is fetched before the first render. Everything else (example sentences,
  // the other language) is fetched when needed and, for an installed app,
  // saved in the background for offline use (see requestOfflineCopy).
  function start() {
    booted = true;
    listView.removeAttribute("aria-busy");
    buildIndexes();
    applyStaticTexts();
    buildAlphabet();
    initHero();
    updateProgressBar();
    route();
    requestOfflineCopy();
  }

  // --- Offline copy ---
  // sw.js downloads every dictionary file (both languages) into its own cache
  // when asked and reports progress back. We ask a few seconds after the first
  // render so it never competes with the first pictograms or the user's first
  // interaction, and not at all when the browser asks to save data.
  var offlineStatusEl = document.getElementById("offline-status");

  function showOfflineStatus(message) {
    offlineStatusEl.textContent = message;
    offlineStatusEl.hidden = !message;
  }

  function requestOfflineCopy() {
    if (!("serviceWorker" in navigator)) return;
    var connection = navigator.connection;
    if (connection && (connection.saveData || /(^|-)2g$/.test(connection.effectiveType || ""))) return;

    var imagesButton = document.getElementById("offline-images");
    var imagesMb = Math.round(SINONIMIA_DICTIONARY_DATA.imagesBytes / 1e6);

    function tellWorker(message) {
      navigator.serviceWorker.ready.then(function (registration) {
        if (registration.active) registration.active.postMessage(message);
      }).catch(function () { /* optional: the app works online without it */ });
    }

    function readImagesChoice() {
      try { return localStorage.getItem("sinonimia-offline-images") === "1"; } catch (e) { return false; }
    }

    function offerImages() {
      imagesButton.textContent = t("offlineImagesButton", { mb: imagesMb });
      imagesButton.parentNode.hidden = false;
    }

    // The ~40 MB of pictograms are never downloaded without asking. Once the
    // person says yes, the choice is remembered and later visits only complete
    // what is missing (new words with new pictograms).
    imagesButton.addEventListener("click", function () {
      try { localStorage.setItem("sinonimia-offline-images", "1"); } catch (e) { /* asked again next time */ }
      imagesButton.parentNode.hidden = true;
      showOfflineStatus(t("offlineImagesPreparing", { n: 0 }));
      tellWorker({ type: "warm-images" });
    });

    navigator.serviceWorker.addEventListener("message", function (event) {
      var msg = event.data;
      if (!msg) return;
      if (msg.type === "dictionary-offline") {
        if (msg.state === "done") {
          showOfflineStatus(t("offlineReady"));
          if (readImagesChoice()) tellWorker({ type: "warm-images" });
          else offerImages();
        } else if (msg.state === "progress") {
          showOfflineStatus(t("offlinePreparing", { n: Math.floor((msg.done / msg.total) * 100) }));
        }
      } else if (msg.type === "images-offline") {
        if (msg.state === "done") {
          showOfflineStatus(t("offlineImagesReady"));
        } else if (msg.state === "progress") {
          showOfflineStatus(t("offlineImagesPreparing", { n: Math.floor((msg.done / msg.total) * 100) }));
        } else if (msg.state === "failed") {
          showOfflineStatus(t("offlineImagesFailed"));
          offerImages();
        }
      }
    });

    setTimeout(function () {
      navigator.serviceWorker.ready.then(function (registration) {
        if (registration.active) {
          registration.active.postMessage({ type: "warm-dictionary", language: currentLanguage });
        }
      }).catch(function () { /* optional: the app works online without it */ });
    }, 3000);
  }

  currentLanguage = initialLanguage();
  listView.setAttribute("aria-busy", "true");
  SinonimiaDictionary.loadIndex(currentLanguage).then(start, showLoadError);

  // Re-route on hash changes (e.g. after route() sets the initial hash,
  // or after user navigates to a different route).
  window.addEventListener("hashchange", route);
})();
