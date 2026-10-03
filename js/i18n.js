/*
 * Sinonimia's interface texts, per language.
 * This is NOT the dictionary content (that lives in js/data.<lang>.js).
 * This is the web app's fixed UI copy: buttons, labels, messages.
 *
 * To add a new language:
 *  1. Copy the whole "es" or "en" block and translate it entirely (every key).
 *  2. Create js/data.<lang>.js with that language's words (see that file for
 *     the format) and add its <script> tag in index.html.
 *  3. Add a button to the language selector in index.html.
 * No changes needed in app.js. *
 * The full step-by-step — including the mirrored strings in
 * js/bootstrap-i18n.js, the about.js whitelist and the parallel
 * data-lang-block blocks on about/* and 404.html, the
 * languageName_<code> key that has to be added in every existing
 * I18N block, the traduccion cross-link conventions, and a complete
 * checklist — is in doc/en/i18n.md (or doc/es/i18n.md in
 * Spanish). That document is the canonical reference; this header
 * is the short version. */

const I18N = {
  es: {
    htmlLang: "es",
    suiteBy: "Una app de",
    metaTitle: "Sinonimia — Diccionario fácil de palabras difíciles",
    metaDescription: "Diccionario en lenguaje sencillo: palabras técnicas y difíciles de trámites y de salud, explicadas con ejemplos de la vida diaria y sus sinónimos.",
    skipToContent: "Saltar al contenido",
    tagline: "Palabras difíciles, explicadas fácil",

    fontSize: "Tamaño de letra",
    decreaseFontSize: "Reducir tamaño de letra",
    normalFontSize: "Tamaño de letra normal",
    increaseFontSize: "Aumentar tamaño de letra",
    highContrast: "Alto contraste",
    languageLabel: "Idioma",

    heroLabel: "Palabra del día",
    heroCta: "Descúbrela →",
    statDiscovered: "Palabras descubiertas",
    statDictionary: "Palabras en el diccionario",

    searchLabel: "Escribe una palabra o un tema",
    searchPlaceholder: "Por ejemplo: subsanar, cefalea, artrosis…",
    searchHelp: "Busca por la palabra difícil o por su significado sencillo. No hace falta escribir acentos.",
    surpriseMe: "🎲 Sorpréndeme",

    topicLabel: "Tema:",
    topicAll: "Todos",
    topic_tramites: "Trámites",
    topic_salud: "Salud",
    "topic_vida-diaria": "Vida diaria",
    topic_finanzas: "Finanzas",
    topic_vivienda: "Vivienda",
    topic_trabajo: "Trabajo",
    topic_legal: "Legal",
    topic_tecnologia: "Tecnología",
    topic_seguridad: "Seguridad",
    topic_educacion: "Educación",
    topic_conocimiento: "Conocimiento general",

    alphabetLabel: "Buscar por letra inicial",
    listLabel: "Lista de palabras",
    detailLabel: "Detalle de la palabra",

    showMore: "Mostrar más palabras",
    loadError: "No se pudieron cargar las palabras. Comprueba tu conexión y recarga la página.",
    offlinePreparing: "Guardando las palabras para usarlas sin conexión… {n} %",
    offlineReady: "Todas las palabras están guardadas. Puedes usar Sinonimia sin conexión.",
    offlineMissing: "No hay conexión y esto aún no está guardado. Conéctate a internet para verlo.",
    offlineImagesButton: "Guardar también los dibujos para usarlos sin conexión ({mb} MB)",
    offlineImagesPreparing: "Guardando los dibujos… {n} %",
    offlineImagesReady: "Los dibujos están guardados. Ya puedes usar todo sin conexión.",
    offlineImagesFailed: "No se pudieron guardar todos los dibujos. Inténtalo de nuevo con conexión.",
    resultOne: "1 palabra encontrada.",
    resultsMany: "{n} palabras encontradas.",
    noResultsFound: "No hemos encontrado esa palabra. Prueba a escribir solo el principio, por ejemplo «cefal» para «cefalea».",
    noResultsHelp: "También puedes buscar «{q}» en otro sitio:",
    noResultsTipInternet: "Búscala en Internet.",
    noResultsTipChatbot: "Pregúntale a tu chatbot: “Explícame con palabras muy sencillas qué significa «{q}»”.",
    externalDictionaryLabel: "Buscar en el diccionario de la RAE",
    externalDictionaryUrl: "https://dle.rae.es/{q}",
    externalWikipediaLabel: "Buscar en Wikipedia",
    externalWikipediaUrl: "https://es.wikipedia.org/w/index.php?search={q}",
    externalOpensNote: "se abre en otra pestaña",
    wordNotFound: "No hemos encontrado esa palabra.",

    backToSearch: "← Volver al buscador",
    viewInOtherLanguage: "🌐 Ver en {idioma}: {word}",
    languageName_es: "español",
    languageName_en: "inglés",
    alsoKnownAs: "Se puede decir también",
    inASentence: "En una frase de cada día",
    saidSimply: "Dicho de forma más sencilla:",
    alreadyDiscovered: "Ya descubierta",

    wordNavLabel: "Ir a otra palabra",
    previousWord: "← Anterior",
    nextWord: "Siguiente →",
    previousWordAria: "Palabra anterior: {word}",
    nextWordAria: "Palabra siguiente: {word}",

    footerMessage: "Sinonimia explica palabras difíciles. Frases cortas. Ejemplos de cada día.",
    footerCreditsHtml: 'Pictogramas: <a href="https://arasaac.org" target="_blank" rel="noopener">ARASAAC</a> (CC BY-NC-SA) y <a href="https://opensymbols.org/" target="_blank" rel="noopener">OpenSymbols</a>.',
    footerConfigHtml: '<a href="config/">Configuración</a>',
    footerPrivacyHtml: '<a href="legal/privacidad.html">Privacidad</a>',

    detailTitleSuffix: " — Sinonimia",

    // Write your own sentence (below the examples, on each word's detail page)
    yourTurn: "Ahora te toca a ti",
    sentenceInstruction: "Escribe tu propia frase con esta palabra.",
    sentenceLabel: "Tu frase",
    sentencePlaceholder: "Escribe aquí tu frase…",
    saveSentence: "Guardar mi frase",
    sentenceSavedNotice: "¡Bien done! Esta es tu frase:",
    sentenceStars: "⭐ Estrellas por tus frases: {n}",
    sentenceStarEarned: "¡Has ganado una estrella!",
    editSentence: "Editar mi frase",

    // Games: menu and shared texts
    playCta: "🎮 Jugar",
    gameLabel: "Juego para practicar las palabras",
    gameMenuTitle: "¿A qué quieres jugar?",
    gameMenuInstruction: "Elige un juego para practicar las palabras.",
    gameScore: "⭐ Aciertos: {n}",
    gameCorrect: "¡Correcto! 🎉",
    gameNext: "Siguiente →",
    gameTooFewWords: "Todavía no hay palabras suficientes para jugar en este idioma.",
    gameBackToMenu: "← Elegir otro juego",

    // Game 1: pick the right word from a clue
    wordGameTitle: "¿Qué palabra es?",
    wordGameDescription: "Lee la pista y elige la palabra.",
    wordGameInstruction: "Lee la pista y elige la palabra correcta.",
    wordGameIncorrect: "Esa no es. Vuelve a leer la pista: ¿qué palabra encaja mejor?",

    // Game 2: complete the sentence with the right word
    sentenceGameTitle: "Completa la frase",
    sentenceGameDescription: "Elige la palabra que falta en la frase.",
    sentenceGameInstruction: "Elige la palabra que completa la frase.",
    sentenceGameIncorrect: "Esa no es. Vuelve a leer la frase: ¿qué palabra completa el hueco?",

    // 404 page (404.html)
    error404Title: "404",
    error404Heading: "No hemos encontrado esa página",
    error404Description: "Puede que la dirección esté mal escrita, o que la palabra que buscas no esté en el diccionario todavía.",
    error404Suggestion: "Puedes probar con una de estas opciones:",
    error404HomeButton: "← Volver al inicio",
    error404RandomButton: "🎲 Ver una palabra al azar",
    error404PlayButton: "🎮 Jugar con las palabras",
  },

  en: {
    htmlLang: "en",
    suiteBy: "An app by",
    metaTitle: "Sinonimia — An easy dictionary for hard words",
    metaDescription: "A plain-language dictionary: hard official and health words explained with everyday examples and simple synonyms.",
    skipToContent: "Skip to content",
    tagline: "Hard words, made easy",

    fontSize: "Text size",
    decreaseFontSize: "Decrease text size",
    normalFontSize: "Normal text size",
    increaseFontSize: "Increase text size",
    highContrast: "High contrast",
    languageLabel: "Language",

    heroLabel: "Word of the day",
    heroCta: "Discover it →",
    statDiscovered: "Words discovered",
    statDictionary: "Words in the dictionary",

    searchLabel: "Type a word or a topic",
    searchPlaceholder: "For example: rectify, migraine, arthritis…",
    searchHelp: "Search by the hard word or by its plain meaning.",
    surpriseMe: "🎲 Surprise me",

    topicLabel: "Topic:",
    topicAll: "All",
    topic_tramites: "Paperwork",
    topic_salud: "Health",
    "topic_vida-diaria": "Everyday life",
    topic_finanzas: "Finance",
    topic_vivienda: "Housing",
    topic_trabajo: "Employment",
    topic_legal: "Legal",
    topic_tecnologia: "Technology",
    topic_seguridad: "Safety",
    topic_educacion: "Education",
    topic_conocimiento: "General knowledge",

    alphabetLabel: "Browse by first letter",
    listLabel: "List of words",
    detailLabel: "Word detail",

    showMore: "Show more words",
    loadError: "The words could not be loaded. Check your connection and reload the page.",
    offlinePreparing: "Saving the words to use them offline… {n}%",
    offlineReady: "All the words are saved. You can use Sinonimia offline.",
    offlineMissing: "There is no connection and this is not saved yet. Connect to the internet to see it.",
    offlineImagesButton: "Also save the pictures to use them offline ({mb} MB)",
    offlineImagesPreparing: "Saving the pictures… {n}%",
    offlineImagesReady: "The pictures are saved. You can now use everything offline.",
    offlineImagesFailed: "Not all the pictures could be saved. Try again when you are online.",
    resultOne: "1 word found.",
    resultsMany: "{n} words found.",
    noResultsFound: "We couldn't find that word. Try typing just the start, for example «migr» for «migraine».",
    noResultsHelp: "You can also look up «{q}» somewhere else:",
    noResultsTipInternet: "Search for it on the Internet.",
    noResultsTipChatbot: "Ask your chatbot: “Explain in very simple words what «{q}» means.”",
    externalDictionaryLabel: "Search the Cambridge Dictionary",
    externalDictionaryUrl: "https://dictionary.cambridge.org/search/english/direct/?q={q}",
    externalWikipediaLabel: "Search Wikipedia",
    externalWikipediaUrl: "https://en.wikipedia.org/w/index.php?search={q}",
    externalOpensNote: "opens in a new tab",
    wordNotFound: "We couldn't find that word.",

    backToSearch: "← Back to search",
    viewInOtherLanguage: "🌐 See it in {idioma}: {word}",
    languageName_es: "Spanish",
    languageName_en: "English",
    alsoKnownAs: "You can also say",
    inASentence: "In an everyday sentence",
    saidSimply: "Said in a simpler way:",
    alreadyDiscovered: "Already discovered",

    wordNavLabel: "Go to another word",
    previousWord: "← Previous",
    nextWord: "Next →",
    previousWordAria: "Previous word: {word}",
    nextWordAria: "Next word: {word}",

    footerMessage: "Sinonimia explains hard words. Short sentences. Everyday examples.",
    footerCreditsHtml: 'Pictograms: <a href="https://arasaac.org" target="_blank" rel="noopener">ARASAAC</a> (CC BY-NC-SA) and <a href="https://opensymbols.org/" target="_blank" rel="noopener">OpenSymbols</a>.',
    footerConfigHtml: '<a href="config/">Settings</a>',
    footerPrivacyHtml: '<a href="legal/privacidad.html">Privacy</a>',

    detailTitleSuffix: " — Sinonimia",

    // Write your own sentence (below the examples, on each word's detail page)
    yourTurn: "Now it's your turn",
    sentenceInstruction: "Write your own sentence with this word.",
    sentenceLabel: "Your sentence",
    sentencePlaceholder: "Write your sentence here…",
    saveSentence: "Save my sentence",
    sentenceSavedNotice: "Well done! Here's your sentence:",
    sentenceStars: "⭐ Stars for your sentences: {n}",
    sentenceStarEarned: "You earned a star!",
    editSentence: "Edit my sentence",

    // Games: menu and shared texts
    playCta: "🎮 Play",
    gameLabel: "A game to practise the words",
    gameMenuTitle: "What do you want to play?",
    gameMenuInstruction: "Choose a game to practise the words.",
    gameScore: "⭐ Correct: {n}",
    gameCorrect: "Correct! 🎉",
    gameNext: "Next →",
    gameTooFewWords: "There aren't enough words yet to play in this language.",
    gameBackToMenu: "← Choose another game",

    // Game 1: pick the right word from a clue
    wordGameTitle: "Which word is it?",
    wordGameDescription: "Read the clue and pick the word.",
    wordGameInstruction: "Read the clue and pick the right word.",
    wordGameIncorrect: "Not quite. Read the clue again: which word fits best?",

    // Game 2: complete the sentence with the right word
    sentenceGameTitle: "Complete the sentence",
    sentenceGameDescription: "Pick the missing word in the sentence.",
    sentenceGameInstruction: "Pick the word that completes the sentence.",
    sentenceGameIncorrect: "Not quite. Read the sentence again: which word completes the blank?",

    // 404 page (404.html)
    error404Title: "404",
    error404Heading: "We couldn't find that page",
    error404Description: "The address might be mistyped, or the word you're looking for might not be in the dictionary yet.",
    error404Suggestion: "You can try one of these:",
    error404HomeButton: "← Back to home",
    error404RandomButton: "🎲 Show me a random word",
    error404PlayButton: "🎮 Play with the words",
  },
};

function translate(language, key, variables) {
  var texts = I18N[language] || I18N.es;
  var value = texts[key] != null ? texts[key] : (I18N.es[key] || key);
  if (variables) {
    Object.keys(variables).forEach(function (name) {
      value = value.replace("{" + name + "}", function () { return variables[name]; });
    });
  }
  return value;
}
