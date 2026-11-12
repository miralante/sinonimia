/* Literal example fixes for Spanish P–P entries flagged by check.js. */
(() => {
  const changes = {
    propuesta: { exampleSynonym: { text: "El comité aprobó la proposición de ampliar el horario." } },
    remover: {
      synonyms: ["reabrir un conflicto"],
      exampleSynonym: { word: "reabrir un conflicto", text: "La noticia llevó a reabrir un conflicto olvidado." },
    },
    varada: { exampleSynonym: { word: "varamiento" } },
    aturar: { exampleSynonym: { text: "Al notar su enojo, el pastor intentó moderarse antes de responder." } },
    autoadhesivo: { example: { word: "autoadhesiva" } },
    canariego: {
      definition: "Dicho de una piel de oveja: procedente de una res muerta en una cañada; dicho de una persona, perro o caballo: que viaja con rebaños trashumantes.",
      synonyms: ["que acompaña a los rebaños trashumantes"],
      example: { word: "cañariego" },
      exampleSynonym: { word: "que acompaña a los rebaños trashumantes", text: "El perro que acompaña a los rebaños trashumantes viajó durante toda la temporada." },
    },
    cervecear: { example: { word: "cerveceando" }, exampleSynonym: { word: "bebiendo cerveza" } },
    concelebrar: { exampleSynonym: { word: "celebraron conjuntamente" } },
    contramatarse: { example: { word: "contramató" }, exampleSynonym: { word: "se cayó" } },
    cuerear: { exampleSynonym: { text: "En la reunión dejaron de rajar del ausente y hablaron del proyecto." } },
    desbarrar: { example: { word: "desbarró" }, exampleSynonym: { word: "desvarió", text: "En su respuesta, desvarió y confundió las fechas." } },
    destantear: { exampleSynonym: { word: "desorientar" } },
    empachar: { exampleSynonym: { word: "indigestar", text: "La comida pesada puede indigestar a quien come demasiado." } },
    empajar: { exampleSynonym: { word: "techar de paja" } },
    empiparse: { example: { word: "empipó" }, exampleSynonym: { word: "se hartó" } },
    encanizar: { exampleSynonym: { text: "El criador empezó a cubrir con cañizos las bandejas de los gusanos de seda." } },
    endiablar: { exampleSynonym: { word: "dañó", text: "El calor dañó el motor y obligó a detener el autobús." } },
    erotogeno: { example: { word: "erotógena" }, exampleSynonym: { word: "erógena" } },
    escabioso: { example: { word: "escabiosa" }, exampleSynonym: { word: "escabiótica" } },
    espatarrarse: { example: { word: "espatarró" }, exampleSynonym: { word: "despatarró" } },
    felpear: { example: { word: "felpeó" }, exampleSynonym: { word: "reprendió" } },
    guachar: { exampleSynonym: { text: "El agricultor salió a mirar el campo antes de sembrar." } },
    guadanar: { example: { word: "guadañó" } },
    malmatar: {
      synonyms: ["dar una paliza", "herirse"],
      exampleSynonym: { word: "dar una paliza", text: "En la pelea estuvieron a punto de dar una paliza al rival." },
    },
    melar: { exampleSynonym: { text: "En Valladolid, comenzaron a marcar el ganado lanar con pez derretida tras esquilarlo." } },
    metatear: { exampleSynonym: { text: "La cocinera decidió moler en metate el maíz para las tortillas." } },
    murriar: { exampleSynonym: { text: "El albañil tuvo que recubrir con cemento diluido la pared antes de pintarla." } },
    otonar: { exampleSynonym: { text: "Las aves migratorias suelen pasar el otoño en esa región." } },
    pallar: { exampleSynonym: { word: "judías peruanas" } },
    pambacear: {
      synonyms: ["golpear", "dar una paliza"],
      exampleSynonym: { word: "golpear", text: "La policía intervino antes de que pudieran golpear al hombre." },
    },
    primar: { exampleSynonym: { word: "prevalecer" } },
    punetear: { exampleSynonym: { word: "golpear", text: "El boxeador amenazó con golpear a su rival con los puños." } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.es || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5217 expected one es/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") {
        matches[0][field] = values;
      } else {
        if (!matches[0][field]) throw new Error(`v5217 missing ${field} on es/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
