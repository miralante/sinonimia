/* Literal example fixes for Spanish C–E entries flagged by check.js. */
(() => {
  const changes = {
    candente: {
      synonyms: ["al rojo vivo"],
      exampleSynonym: { word: "al rojo vivo" },
    },
    cargamento: { exampleSynonym: { text: "La carga de productos que lleva un vehículo llegó al mercado al amanecer." } },
    caritativo: {
      synonyms: ["que ejercita la caridad"],
      exampleSynonym: { word: "que ejercita la caridad", text: "El grupo que ejercita la caridad repartió comida en el barrio." },
    },
    cascara: {
      synonyms: ["cubierta exterior"],
      exampleSynonym: { word: "cubierta exterior" },
    },
    catedra: { exampleSynonym: { text: "La cátedra es el asiento elevado desde donde el profesor instruye a los estudiantes." } },
    crucificar: {
      exampleSynonym: { text: "En la obra teatral, los soldados decidieron fijar o clavar en una cruz a una persona que representaba al prisionero." },
    },
    dina: { exampleSynonym: { text: "El problema expresa la fuerza en una unidad de fuerza CGS." } },
    efectuar: { example: { word: "efectuó" }, exampleSynonym: { word: "realizó" } },
    enano: { exampleSynonym: { text: "La persona con enanismo era el cartógrafo más hábil del grupo." } },
    encender: { example: { word: "encendió" }, exampleSynonym: { word: "prendió" } },
    encierro: { exampleSynonym: { text: "La conducción de toros hasta la plaza comenzó al amanecer." } },
    entrevistar: {
      example: { word: "entrevistó" },
      exampleSynonym: { word: "hizo una entrevista", text: "La periodista hizo una entrevista a los vecinos afectados por la obra." },
    },
    escalado: { exampleSynonym: { text: "El pescado abierto para salar, como el bacalao, se dejó secar al aire." } },
    estorbar: { example: { word: "estorban" }, exampleSynonym: { word: "bloquean" } },
    estornudar: {
      synonyms: ["estornudar"],
      exampleSynonym: { word: "estornudar", text: "El polvo le hizo estornudar varias veces." },
    },
    estrenar: {
      example: { word: "estrenó" },
      exampleSynonym: { text: "Marta pudo usar por primera vez sus zapatos nuevos en la fiesta." },
    },
    estricnina: { exampleSynonym: { text: "La estricnina es un alcaloide tóxico presente en algunas semillas." } },
    estrofa: { exampleSynonym: { text: "Cada estrofa es un grupo de versos dentro del poema." } },
    estructural: { exampleSynonym: { text: "El edificio necesita una reparación relativa a la estructura." } },
    eunuco: {
      synonyms: ["servidor de la corte"],
      exampleSynonym: { word: "servidor de la corte" },
    },
    evangelio: { exampleSynonym: { text: "El evangelio es un libro del Nuevo Testamento que recoge la vida y las enseñanzas de Jesús." } },
    exagerar: { example: { word: "exageres" }, exampleSynonym: { word: "des demasiada importancia" } },
    examinar: { example: { word: "examinó" }, exampleSynonym: { word: "revisó" } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.es || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5214 expected one es/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") {
        matches[0][field] = values;
      } else {
        if (!matches[0][field]) throw new Error(`v5214 missing ${field} on es/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
