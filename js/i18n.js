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
 * No changes needed in app.js.
 */

const I18N = {
  es: {
    htmlLang: "es",
    metaTitulo: "Sinonimia — Diccionario fácil de palabras difíciles",
    metaDescripcion: "Diccionario en lenguaje sencillo: palabras técnicas y difíciles de trámites y de salud, explicadas con ejemplos de la vida diaria y sus sinónimos.",
    saltarContenido: "Saltar al contenido",
    tagline: "Palabras difíciles, explicadas fácil",

    tamanoLetra: "Tamaño de letra",
    reducirLetra: "Reducir tamaño de letra",
    letraNormal: "Tamaño de letra normal",
    aumentarLetra: "Aumentar tamaño de letra",
    altoContraste: "Alto contraste",
    idiomaEtiqueta: "Idioma",

    heroEtiqueta: "Palabra del día",
    heroCta: "Descúbrela →",
    progresoNinguna: "Todavía no has descubierto ninguna palabra",
    progresoParcial: "{n} de {total} palabras descubiertas",
    progresoCompleto: " · ¡Las has visto todas! 🎉",

    buscarLabel: "Escribe una palabra o un tema",
    buscarPlaceholder: "Por ejemplo: subsanar, cefalea, artrosis…",
    buscarAyuda: "Busca por la palabra difícil o por su significado sencillo. No hace falta escribir acentos.",
    sorprendeme: "🎲 Sorpréndeme",

    temaEtiqueta: "Tema:",
    temaTodos: "Todos",
    tema_tramites: "Trámites",
    tema_salud: "Salud",
    "tema_vida-diaria": "Vida diaria",
    tema_finanzas: "Finanzas",
    tema_vivienda: "Vivienda",
    tema_trabajo: "Trabajo",
    tema_legal: "Legal",

    alfabetoLabel: "Buscar por letra inicial",
    listaLabel: "Lista de palabras",
    detalleLabel: "Detalle de la palabra",

    resultadoUno: "1 palabra encontrada.",
    resultadosVarios: "{n} palabras encontradas.",
    sinResultados: "No hemos encontrado esa palabra. Prueba a escribir solo el principio, por ejemplo «cefal» para «cefalea».",
    noEncontrada: "No hemos encontrado esa palabra.",

    volver: "← Volver al buscador",
    verEnOtroIdioma: "🌐 Ver en {idioma}: {palabra}",
    idiomaNombre_es: "español",
    idiomaNombre_en: "inglés",
    seDiceTambien: "Se puede decir también",
    enFrase: "En una frase de cada día",
    dichoFormaSencilla: "Dicho de forma más sencilla:",
    yaDescubierta: "Ya descubierta",

    pieMensaje: "Sinonimia explica palabras difíciles. Frases cortas. Ejemplos de cada día.",
    pieCreditosHtml: 'Los pictogramas son de <a href="https://arasaac.org" target="_blank" rel="noopener">ARASAAC</a> (Gobierno de Aragón, autor Sergio Palao, licencia CC BY-NC-SA). Las definiciones se basan en glosarios de lenguaje claro y glosarios médicos para pacientes.',
    piePrivacidadHtml: '<a href="about/privacidad.html">Privacidad</a>',

    tituloDetalleSufijo: " — Sinonimia",

    // Write your own sentence (below the examples, on each word's detail page)
    fraseTuTurno: "Ahora te toca a ti",
    fraseInstruccion: "Escribe tu propia frase con esta palabra.",
    fraseLabel: "Tu frase",
    frasePlaceholder: "Escribe aquí tu frase…",
    fraseGuardar: "Guardar mi frase",
    fraseGuardadaAviso: "¡Bien hecho! Esta es tu frase:",
    fraseEditar: "Editar mi frase",

    // Games: menu and shared texts
    juegoCta: "🎮 Jugar",
    juegoLabel: "Juego para practicar las palabras",
    juegoMenuTitulo: "¿A qué quieres jugar?",
    juegoMenuInstruccion: "Elige un juego para practicar las palabras.",
    juegoAciertos: "⭐ Aciertos: {n}",
    juegoCorrecto: "¡Correcto! 🎉",
    juegoSiguiente: "Siguiente →",
    juegoPocasPalabras: "Todavía no hay palabras suficientes para jugar en este idioma.",
    juegoVolverMenu: "← Elegir otro juego",

    // Game 1: pick the right word from a clue
    juegoPalabraTitulo: "¿Qué palabra es?",
    juegoPalabraDescripcion: "Lee la pista y elige la palabra.",
    juegoPalabraInstruccion: "Lee la pista y elige la palabra correcta.",
    juegoPalabraIncorrecto: "Esa no es. Vuelve a leer la pista: ¿qué palabra encaja mejor?",

    // Game 2: complete the sentence with the right word
    juegoFraseTitulo: "Completa la frase",
    juegoFraseDescripcion: "Elige la palabra que falta en la frase.",
    juegoFraseInstruccion: "Elige la palabra que completa la frase.",
    juegoFraseIncorrecto: "Esa no es. Vuelve a leer la frase: ¿qué palabra completa el hueco?",
  },

  en: {
    htmlLang: "en",
    metaTitulo: "Sinonimia — An easy dictionary for hard words",
    metaDescripcion: "A plain-language dictionary: hard official and health words explained with everyday examples and simple synonyms.",
    saltarContenido: "Skip to content",
    tagline: "Hard words, made easy",

    tamanoLetra: "Text size",
    reducirLetra: "Decrease text size",
    letraNormal: "Normal text size",
    aumentarLetra: "Increase text size",
    altoContraste: "High contrast",
    idiomaEtiqueta: "Language",

    heroEtiqueta: "Word of the day",
    heroCta: "Discover it →",
    progresoNinguna: "You haven't discovered any word yet",
    progresoParcial: "{n} of {total} words discovered",
    progresoCompleto: " · You've seen them all! 🎉",

    buscarLabel: "Type a word or a topic",
    buscarPlaceholder: "For example: rectify, migraine, arthritis…",
    buscarAyuda: "Search by the hard word or by its plain meaning.",
    sorprendeme: "🎲 Surprise me",

    temaEtiqueta: "Topic:",
    temaTodos: "All",
    tema_tramites: "Paperwork",
    tema_salud: "Health",
    "tema_vida-diaria": "Everyday life",
    tema_finanzas: "Finance",
    tema_vivienda: "Housing",
    tema_trabajo: "Employment",
    tema_legal: "Legal",

    alfabetoLabel: "Browse by first letter",
    listaLabel: "List of words",
    detalleLabel: "Word detail",

    resultadoUno: "1 word found.",
    resultadosVarios: "{n} words found.",
    sinResultados: "We couldn't find that word. Try typing just the start, for example «migr» for «migraine».",
    noEncontrada: "We couldn't find that word.",

    volver: "← Back to search",
    verEnOtroIdioma: "🌐 See it in {idioma}: {palabra}",
    idiomaNombre_es: "Spanish",
    idiomaNombre_en: "English",
    seDiceTambien: "You can also say",
    enFrase: "In an everyday sentence",
    dichoFormaSencilla: "Said in a simpler way:",
    yaDescubierta: "Already discovered",

    pieMensaje: "Sinonimia explains hard words. Short sentences. Everyday examples.",
    pieCreditosHtml: 'Pictograms by <a href="https://arasaac.org" target="_blank" rel="noopener">ARASAAC</a> (Government of Aragón, author Sergio Palao, CC BY-NC-SA license). Definitions are based on plain-language glossaries and patient-facing medical glossaries.',
    piePrivacidadHtml: '<a href="about/privacidad.html">Privacy</a>',

    tituloDetalleSufijo: " — Sinonimia",

    // Write your own sentence (below the examples, on each word's detail page)
    fraseTuTurno: "Now it's your turn",
    fraseInstruccion: "Write your own sentence with this word.",
    fraseLabel: "Your sentence",
    frasePlaceholder: "Write your sentence here…",
    fraseGuardar: "Save my sentence",
    fraseGuardadaAviso: "Well done! Here's your sentence:",
    fraseEditar: "Edit my sentence",

    // Games: menu and shared texts
    juegoCta: "🎮 Play",
    juegoLabel: "A game to practise the words",
    juegoMenuTitulo: "What do you want to play?",
    juegoMenuInstruccion: "Choose a game to practise the words.",
    juegoAciertos: "⭐ Correct: {n}",
    juegoCorrecto: "Correct! 🎉",
    juegoSiguiente: "Next →",
    juegoPocasPalabras: "There aren't enough words yet to play in this language.",
    juegoVolverMenu: "← Choose another game",

    // Game 1: pick the right word from a clue
    juegoPalabraTitulo: "Which word is it?",
    juegoPalabraDescripcion: "Read the clue and pick the word.",
    juegoPalabraInstruccion: "Read the clue and pick the right word.",
    juegoPalabraIncorrecto: "Not quite. Read the clue again: which word fits best?",

    // Game 2: complete the sentence with the right word
    juegoFraseTitulo: "Complete the sentence",
    juegoFraseDescripcion: "Pick the missing word in the sentence.",
    juegoFraseInstruccion: "Pick the word that completes the sentence.",
    juegoFraseIncorrecto: "Not quite. Read the sentence again: which word completes the blank?",
  },
};

function translate(language, key, variables) {
  var texts = I18N[language] || I18N.es;
  var value = texts[key] != null ? texts[key] : (I18N.es[key] || key);
  if (variables) {
    Object.keys(variables).forEach(function (name) {
      value = value.replace("{" + name + "}", variables[name]);
    });
  }
  return value;
}
