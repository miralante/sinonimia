/* Literal example fixes for Spanish E–A entries flagged by check.js. */
(() => {
  const changes = {
    entrederramar: { example: { word: "entrederramó" }, exampleSynonym: { word: "vertió poco a poco", text: "Vertió poco a poco el aceite para no manchar la mesa." } },
    entrejuntar: { example: { word: "entrejuntó" }, exampleSynonym: { word: "ensambló" } },
    entrellevar: {
      synonyms: ["llevar entre otros"],
      exampleSynonym: { word: "llevar entre los viajeros", text: "El mozo debía llevar entre los viajeros las cajas." },
    },
    entrevolver: { example: { word: "entrevolvió" }, exampleSynonym: { word: "envolvió la carta" } },
    entropillar: {
      synonyms: ["acostumbrar a vivir en tropilla"],
      exampleSynonym: { word: "acostumbrar a los caballos jóvenes a vivir en tropilla" },
    },
    envelar: { exampleSynonym: { text: "La tradición mandaba cubrir con un velo la imagen durante la ceremonia." } },
    envilortar: { exampleSynonym: { word: "ataron haces", text: "Antes de cargarlas en el carro, ataron haces de mies con vilortos." } },
    enyertar: { exampleSynonym: { text: "El frío parecía poner tieso el tallo de las ramas." } },
    equipotente: { exampleSynonym: { word: "tienen igual cardinalidad" } },
    esbrencar: { exampleSynonym: { text: "Después de cosecharlo, hay que desbriznar azafrán con cuidado." } },
    escabechar: { exampleSynonym: { text: "Decidieron adobar en escabeche el pescado para conservarlo." } },
    escabrosearse: { exampleSynonym: { word: "volverse indecorosa" } },
    escalabrar: { exampleSynonym: { text: "La caída estuvo a punto de herir en la cabeza al ciclista." } },
    escamonearse: { example: { word: "escamoneó" }, exampleSynonym: { word: "desconfió" } },
    escarabajear: { example: { word: "escarabajeaban" }, exampleSynonym: { word: "se movían sin orden" } },
    esgaritar: { exampleSynonym: { word: "dispersar" } },
    estraperlear: { exampleSynonym: { text: "Lo detuvieron por comerciar en el mercado negro con medicinas." } },
    evidenciar: { example: { word: "evidencian" }, exampleSynonym: { word: "demuestran" } },
    excombatiente: { exampleSynonym: { word: "veteranos de guerra" } },
    explicitar: { exampleSynonym: { text: "El contrato debe dejar claro el alcance y las condiciones del servicio." } },
    exportable: { exampleSynonym: { word: "aptos para exportación" } },
    faldear: { example: { word: "faldeó" }, exampleSynonym: { word: "recorrió una ladera" } },
    fermentable: { exampleSynonym: { word: "capaces de fermentar" } },
    festonear: { exampleSynonym: { word: "adornaron con festones", text: "Adornaron con festones el mantel de hilo dorado." } },
    filipinismo: { exampleSynonym: { word: "regionalismos filipinos" } },
    fluidificar: {
      synonyms: ["hacer más fluida", "volver menos espesa"],
      exampleSynonym: { word: "hacer más fluida", text: "El calor puede hacer más fluida la cera." },
    },
    repudiable: { exampleSynonym: { text: "Es una propuesta que se puede rechazar por su falta de garantías." } },
    evolucionar: { example: { word: "evolucionando" }, exampleSynonym: { word: "desarrollándose" } },
    acema: { exampleSynonym: { text: "Compraron pan dulce venezolano recién horneado en la panadería." } },
    actitudinal: { exampleSynonym: { word: "relativos a la actitud" } },
    adarvar: { example: { word: "adarvó" }, exampleSynonym: { word: "aturdió" } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.es || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5221 expected one es/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") {
        matches[0][field] = values;
      } else {
        if (!matches[0][field]) throw new Error(`v5221 missing ${field} on es/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
