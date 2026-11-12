/* Literal example fixes for Spanish E–I entries flagged by check.js. */
(() => {
  const changes = {
    excitante: { example: { text: "El partido fue excitante hasta el último minuto." } },
    excluir: { exampleSynonym: { text: "No debemos dejar fuera a nadie de la conversación." } },
    exclusividad: { exampleSynonym: { text: "El contrato establece un uso reservado del producto para esa empresa." } },
    exigir: { example: { word: "exigió" }, exampleSynonym: { word: "reclamó" } },
    existencial: { exampleSynonym: { text: "La novela plantea una pregunta relativa a la existencia y la libertad." } },
    existir: { example: { word: "existen" }, exampleSynonym: { word: "hay" } },
    exitoso: {
      example: { word: "exitosa" },
      synonyms: ["de éxito", "triunfador", "dar buen resultado"],
      exampleSynonym: { word: "dio buen resultado" },
    },
    expiar: { exampleSynonym: { text: "Quiso reparar una falta del pasado ayudando a quienes había perjudicado." } },
    exponer: { example: { word: "expondrá" } },
    expulsar: { example: { word: "expulsó" }, exampleSynonym: { word: "echó" } },
    fallo: { exampleSynonym: { text: "El jugador declaró que había falta de un palo en su mano." } },
    fecal: { exampleSynonym: { text: "El análisis detectó un marcador fecal, relativo a las heces, en la muestra." } },
    felicitar: { exampleSynonym: { text: "La llamé para dar la enhorabuena a Ana por su nuevo trabajo." } },
    festejar: { example: { word: "festejó" }, exampleSynonym: { word: "celebró" } },
    fetichismo: {
      synonyms: ["culto a ciertos objetos", "devoción excesiva"],
      exampleSynonym: { word: "culto a ciertos objetos" },
    },
    fijar: { example: { word: "fijó" }, exampleSynonym: { word: "sujetar", text: "Sujetar el estante a la pared evita que se caiga." } },
    footing: {
      synonyms: ["carrera a pie", "trotar", "jogging"],
      exampleSynonym: { word: "trotar" },
    },
    formular: { example: { word: "formuló" }, exampleSynonym: { word: "planteó" } },
    forzar: { exampleSynonym: { text: "Tuvieron que abrir por la fuerza la puerta porque la llave se había roto." } },
    genital: { exampleSynonym: { word: "reproductiva" } },
    insinuar: { example: { word: "insinuó" }, exampleSynonym: { word: "sugirió" } },
    intimar: { example: { word: "intimó" } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.es || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5215 expected one es/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") {
        matches[0][field] = values;
      } else {
        if (!matches[0][field]) throw new Error(`v5215 missing ${field} on es/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
