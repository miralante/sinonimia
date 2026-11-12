/* Literal example fixes for Spanish entries flagged by check.js. */
(() => {
  const changes = {
    englantado: { example: { word: "englantada" }, exampleSynonym: { word: "englandada" } },
    englutativo: { example: { word: "englutativa" } },
    enguichado: { example: { word: "enguichada" }, exampleSynonym: { word: "sujeta" } },
    fisiopatologia: { exampleSynonym: { text: "El curso de fisiopatología explica el estudio de las alteraciones del organismo causadas por el asma." } },
    "destemple-3": { example: { word: "destemple" }, exampleSynonym: { word: "desorden" } },
    "dialectica-3": { example: { word: "dialéctica" }, exampleSynonym: { word: "capacidad de oposición" } },
    "diamantino-2": { example: { word: "diamantina" } },
    "hibernar-2": { example: { word: "hiberna" }, exampleSynonym: { word: "queda inactiva por un tiempo" } },
    "difundir-2": { example: { word: "difundió" }, exampleSynonym: { word: "esparció" } },
    "difundir-3": { example: { word: "difunde" }, exampleSynonym: { word: "dispersa" } },
    "dignificar-2": { example: { word: "dignifica" }, exampleSynonym: { word: "enaltece" } },
    "digno-3": { example: { word: "digna" } },
    "dimensionar-2": { example: { word: "dimensionó" }, exampleSynonym: { word: "exageró" } },
    "dislocar-2": { exampleSynonym: { word: "tergiversó" } },
    "dispersivo-2": { exampleSynonym: { word: "separa los colores", text: "El prisma separa los colores de la luz blanca." } },
    "disponer-2": { exampleSynonym: { word: "ordenó" } },
    "disponer-3": { exampleSynonym: { word: "preparó" } },
    "distribuir-3": { exampleSynonym: { word: "hará llegar" } },
    "documental-film": { exampleSynonym: { word: "película documental", text: "Vimos una película documental sobre la vida del río." } },
    "emanar-sustancia": { example: { word: "emanaba" }, exampleSynonym: { word: "salía de" } },
    "emanar-cualidad": { example: { word: "emanaba" }, exampleSynonym: { word: "transmitía" } },
    "round2380-ensangrentar-discussion": { exampleSynonym: { text: "Los vecinos se ofendieron en la discusión por el terreno." } },
    "round2381-ensartar-pierce": { example: { word: "ensartó la carne" }, exampleSynonym: { word: "atravesó la carne" } },
    "round2384-ensombrecer-tristeza": { exampleSynonym: { text: "La noticia entristeció la reunión y a todos sus asistentes." } },
    "round2386-entablillar-chocolate": { example: { word: "entablillan" }, exampleSynonym: { word: "moldean el chocolate en tabletas" } },
    "round2388-entelar-eye": { exampleSynonym: { text: "A causa de la irritación, se le nubló un ojo." } },
    "round2389-entenebrecer-figurative": { example: { word: "entenebreció" }, exampleSynonym: { word: "ensombreció" } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.es || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5233 expected one es/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5233 missing ${field} on es/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
