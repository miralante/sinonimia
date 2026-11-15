/* Literal example fixes for the Spanish E–F entries flagged by check.js. */
(() => {
  const changes = {
    etilico: { exampleSynonym: { text: "El informe analizó un compuesto relativo al etanol presente en la sangre." } },
    etnocentrico: { exampleSynonym: { text: "Su análisis estaba centrado en la propia cultura y no atendía a las costumbres locales." } },
    etnografia: { exampleSynonym: { text: "El estudio de una cultura incluyó entrevistas y visitas al pueblo." } },
    europeizar: { exampleSynonym: { text: "El gobierno quiso adaptar a Europa las leyes que seguían otro modelo." } },
    evangelico: {
      example: { word: "evangélicas" },
      exampleSynonym: { text: "La biblioteca tiene una traducción relativa al evangelio en edición protestante." },
    },
    exaltar: { example: { word: "exaltó" }, exampleSynonym: { word: "elogió" } },
    exclamar: { example: { word: "exclamó" }, exampleSynonym: { word: "gritó" } },
    excomulgar: { exampleSynonym: { text: "El consejo decidió expulsar de la comunidad religiosa a un sacerdote." } },
    excoriar: { example: { word: "excorió" }, exampleSynonym: { word: "raspó" } },
    execrar: { example: { word: "execró" }, exampleSynonym: { word: "condenó" } },
    exfoliar: { exampleSynonym: { text: "El calor empezó a dividir en capas finas la superficie de la roca." } },
    exhortar: { example: { word: "exhortó" }, exampleSynonym: { word: "instó" } },
    expansivo: { exampleSynonym: { word: "se extiende", text: "El gas se extiende al calentarse y llena el recipiente." } },
    expedir: { example: { word: "expidió" }, exampleSynonym: { word: "tramitó" } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.es || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5208 expected one es/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (!matches[0][field]) throw new Error(`v5208 missing ${field} on es/${id}`);
      Object.assign(matches[0][field], values);
    }
  }
})();
