/* Literal example fixes for Spanish entries flagged by check.js. */
(() => {
  const changes = {
    "round2551-estrado-court": { exampleSynonym: { text: "La jueza volvió a ocupar el lugar del juez al empezar la vista." } },
    "round2553-estratificar-groups": { example: { word: "estratificó" }, exampleSynonym: { word: "clasificó a las familias en grupos" } },
    "round2555-estrenar-performance": { exampleSynonym: { word: "presentará la obra por primera vez" } },
    "round2557-estribar-founded": { example: { word: "estriba" }, exampleSynonym: { word: "se basa" } },
    "round2566-eternizar-lasting": { exampleSynonym: { word: "prolongarse indefinidamente" } },
    "round2567-etiquetar-online": { exampleSynonym: { word: "etiquetara en la publicación", text: "Me pidió que no la etiquetara en la publicación." } },
    "round2572-europeizar-intransitive": { exampleSynonym: { word: "adoptaron costumbres europeas", text: "Con el tiempo, algunas comunidades adoptaron costumbres europeas." } },
    "round2574-evangelico-person": { example: { word: "evangélica" }, exampleSynonym: { word: "miembros de la iglesia evangélica" } },
    "round2575-evangelizar-promote": { example: { word: "evangeliza" }, exampleSynonym: { word: "promueve con entusiasmo" } },
    "round2586-exequatur-consul": { exampleSynonym: { text: "El cónsul recibió autorización consular del país anfitrión." } },
    "round2587-exfoliar-skin": { exampleSynonym: { word: "eliminar las células muertas" } },
    "round2587-exhausto-resources": { exampleSynonym: { word: "agotó" } },
    "round2588-exigir-require": { example: { word: "exige" }, exampleSynonym: { word: "requiere" } },
    "round2589-exiliar-self": { example: { word: "exilió" }, exampleSynonym: { word: "desterró" } },
    "round2589-eximente-adjective": { exampleSynonym: { text: "El documento contenía un dato exculpatorio." } },
    "round2594-expedir-document": { example: { word: "expidió" }, exampleSynonym: { word: "emitió" } },
    "round2594-expedir-send": { example: { word: "expidió" }, exampleSynonym: { word: "envió" } },
    "round2594-expedir-decree": { example: { word: "expidió" }, exampleSynonym: { word: "dictó una resolución", text: "El juez dictó una resolución de protección." } },
    "round2595-explayar-pronominal": { example: { word: "explayó" }, exampleSynonym: { word: "extendió" } },
    "round2597-exponer-explain": { example: { word: "expuso" }, exampleSynonym: { word: "explicó" } },
    "round2597-exponer-risk": { exampleSynonym: { word: "poner a los niños en riesgo" } },
    "round2600-extensible-watchband": { exampleSynonym: { text: "El reloj tiene una pulsera de reloj extensible hecha de acero." } },
    "round2604-extraer-chemical": { example: { word: "extrajo" }, exampleSynonym: { word: "obtuvo" } },
    "round2604-extraer-infer": { example: { word: "extrajo" }, exampleSynonym: { word: "dedujo" } },
    "round2604-extralimitarse-abuse": { example: { word: "extralimitó" }, exampleSynonym: { word: "abusó" } },
    "round2616-faena-bullfight": { exampleSynonym: { text: "El público aplaudió la labor del torero con la muleta." } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.es || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5239 expected one es/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5239 missing ${field} on es/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
