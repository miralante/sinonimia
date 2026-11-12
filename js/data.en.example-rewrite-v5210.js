/* Literal example fixes for Spanish F–A entries flagged by check.js. */
(() => {
  const changes = {
    fletar: { exampleSynonym: { text: "La empresa decidió alquilar una embarcación para transportar el grano." } },
    flexivo: { exampleSynonym: { text: "El español tiene un sistema relativo a la flexión gramatical que modifica las palabras según su función." } },
    flexor: { exampleSynonym: { text: "El músculo flexor ayuda a doblar el brazo." } },
    florin: { exampleSynonym: { text: "El museo expone una moneda florentina de oro acuñada en Florencia." } },
    fosca: { exampleSynonym: { text: "La oscuridad atmosférica ocultaba las montañas al caer la tarde." } },
    fosforescer: { exampleSynonym: { text: "Algunas algas pueden brillar en la oscuridad después de recibir energía." } },
    fotogenico: { exampleSynonym: { text: "El perro es un animal que sale bien en las fotos y mira siempre a la cámara." } },
    gneisico: {
      example: { word: "gneísica" },
      exampleSynonym: { text: "El geólogo estudió una roca que pertenece o concierne al gneis en la montaña." },
    },
    guarecer: { example: { word: "guareció" } },
    heder: { example: { word: "hiede" } },
    heterodoxo: { exampleSynonym: { text: "El grupo disidente religioso rechazó la doctrina oficial." } },
    incensada: { exampleSynonym: { text: "El sacerdote realizó un vaivén del incensario ante el altar." } },
    malparida: { exampleSynonym: { text: "La definición antigua describe a la mujer que acaba de abortar." } },
    motilona: {
      synonyms: ["lega", "hermana lega"],
      exampleSynonym: { word: "hermana lega", text: "La hermana lega atendía a los visitantes del convento." },
    },
    noviar: { exampleSynonym: { text: "El verbo noviar significa estar de novio, una relación que puede durar meses." } },
    rastrillada: { exampleSynonym: { text: "El montón recogido con el rastrillo llenó una carretilla." } },
    rosticeria: { exampleSynonym: { text: "Compramos pollo asado en el lugar en donde se rostizan pollos, en la esquina." } },
    sacrosanto: { exampleSynonym: { text: "El término describe algo con las cualidades de sagrado y santo." } },
    salamanquina: {
      definition: "En Chile y Cuba, lagartija.",
      synonyms: ["lagartija"],
      exampleSynonym: { word: "lagartija", text: "La lagartija se ocultó entre las piedras." },
    },
    teatina: {
      synonyms: ["mujer de la orden teatina"],
      exampleSynonym: { word: "mujer de la orden teatina", text: "La mujer de la orden teatina atendía a los visitantes del convento." },
    },
    temoso: { exampleSynonym: { text: "Un alumno temoso es alguien que no cambia su opinión o proceder, pese a las razones en sentido contrario." } },
    tendente: {
      synonyms: ["encaminado a un fin"],
      exampleSynonym: { word: "encaminada a un fin", text: "El informe presenta una conclusión encaminada a un fin concreto: favorecer el cambio." },
    },
    abarcar: { example: { word: "abarcó" }, exampleSynonym: { word: "abrazó" } },
    abofetear: { example: { word: "abofeteó" }, exampleSynonym: { word: "cacheteó" } },
    abrasador: {
      synonyms: ["que abrasa y quema"],
      exampleSynonym: { word: "que abrasa y quema" },
    },
    abrazar: {
      example: { word: "abrazó" },
      synonyms: ["rodear con los brazos"],
      exampleSynonym: { word: "rodear con los brazos", text: "Al reencontrarse, Marta decidió rodear con los brazos a su hermana." },
    },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.es || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5210 expected one es/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") {
        matches[0][field] = values;
      } else {
        if (!matches[0][field]) throw new Error(`v5210 missing ${field} on es/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
