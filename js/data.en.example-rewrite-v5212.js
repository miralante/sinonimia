/* Literal example fixes for Spanish A entries flagged by check.js. */
(() => {
  const changes = {
    adrede: {
      synonyms: ["de forma deliberada"],
      exampleSynonym: { word: "de forma deliberada" },
    },
    adulador: { exampleSynonym: { text: "Un subordinado que adula al jefe puede esperar un ascenso." } },
    afilar: { example: { word: "afiló" }, exampleSynonym: { word: "amoló" } },
    aflojar: {
      example: { word: "afloja" },
      synonyms: ["reducir la presión"],
      exampleSynonym: { word: "reducir la presión", text: "Se puede reducir la presión que la correa ejerce sobre el cuello del perro." },
    },
    afrontar: { example: { word: "afrontó" }, exampleSynonym: { word: "enfrentó" } },
    agarre: {
      synonyms: ["acción de agarrarse"],
      exampleSynonym: { word: "acción de agarrarse" },
    },
    agitar: {
      example: { word: "agita" },
      exampleSynonym: { word: "mueve con frecuencia y fuerza", text: "Mueve con frecuencia y fuerza la botella antes de servir el jugo." },
    },
    agradar: { example: { word: "agradó" }, exampleSynonym: { word: "complació" } },
    agrandar: { example: { word: "agrandó" }, exampleSynonym: { word: "aumentó el tamaño" } },
    alabar: { example: { word: "alabó" }, exampleSynonym: { word: "elogió" } },
    alardear: { example: { word: "alardeó" }, exampleSynonym: { word: "se jactó" } },
    albergar: { example: { word: "alberga" }, exampleSynonym: { word: "hospeda" } },
    alejar: { example: { word: "alejó" }, exampleSynonym: { word: "distanció" } },
    alemana: { exampleSynonym: { text: "El conjunto interpretó una alemanda barroca." } },
    alentar: { example: { word: "alentó" }, exampleSynonym: { word: "animó" } },
    allanar: { example: { word: "allanó" }, exampleSynonym: { word: "alisó" } },
    ambicioso: { example: { word: "ambiciosa" } },
    ampliar: { example: { word: "amplió" }, exampleSynonym: { word: "acrecentó" } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.es || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5212 expected one es/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") {
        matches[0][field] = values;
      } else {
        if (!matches[0][field]) throw new Error(`v5212 missing ${field} on es/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
