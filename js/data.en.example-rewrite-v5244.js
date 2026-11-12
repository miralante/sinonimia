/* Literal example fixes for Spanish entries flagged by check.js. */
(() => {
  const changes = {
    "ningunear-menospreciar": { example: { word: "ninguneó" }, exampleSynonym: { word: "menospreció" } },
    "nocturnidad-legal": { exampleSynonym: { text: "El juez valoró una agravante nocturna del delito." } },
    "nomada-cultura": { exampleSynonym: { word: "propia de pueblos nómadas", text: "La cultura, propia de pueblos nómadas, dependía del pastoreo." } },
    "nomina-lista": { exampleSynonym: { word: "lista de invitados" } },
    "notar-apuntar": { example: { word: "notó" }, exampleSynonym: { word: "anotó" } },
    "notar-senalar": { example: { word: "notó" }, exampleSynonym: { word: "señaló" } },
    "novedad-noticia": { exampleSynonym: { text: "La noticia reciente llegó esta mañana." } },
    "nublar-figurative": { example: { word: "nubló" }, exampleSynonym: { word: "enturbió" } },
    "nucleo-celular": { exampleSynonym: { text: "El núcleo celular controla muchas funciones." } },
    "nucleo-atomico": { exampleSynonym: { text: "El núcleo atómico contiene protones y neutrones." } },
    "oblada-pez": { exampleSynonym: { text: "La oblada mediterránea nadaba junto a las rocas." } },
    "obnubilar-vista": { example: { word: "obnubiló" }, exampleSynonym: { word: "nubló la vista" } },
    "occidente-region": { exampleSynonym: { text: "Vivió varios años en Occidente de Europa." } },
    "oficioso-no-oficial": { example: { word: "oficiosa" } },
    "oneroso-coste": { example: { word: "onerosa" }, exampleSynonym: { word: "costosa" } },
    "onomastica-name-set": { exampleSynonym: { text: "La onomástica conserva los nombres propios del lugar." } },
    "onomatopeya-proceso": { exampleSynonym: { text: "El quiquiriquí es una imitación sonora del canto del gallo." } },
    "opa-takeover": { exampleSynonym: { text: "La empresa lanzó una oferta pública de adquisición de sus acciones." } },
    "opalino-object": { exampleSynonym: { text: "El jarrón era una pieza de vidrio opalino en la vitrina." } },
    "operoso-task": { example: { word: "operosa" }, exampleSynonym: { word: "trabajosa" } },
    "oprimir-people": { example: { word: "oprimió" }, exampleSynonym: { word: "subyugó" } },
    "oprimir-distress": { example: { word: "oprimía" }, exampleSynonym: { word: "angustiaba" } },
    "optativo-desiderative": { example: { word: "optativa" }, exampleSynonym: { word: "desiderativa" } },
    "orden-ranking": { example: { text: "El orden de los equipos en la clasificación quedó establecido tras el torneo." } },
    "orfismo-art": { exampleSynonym: { text: "El movimiento artístico abstracto influyó en varios artistas modernos." } },
    "original-creative": { exampleSynonym: { word: "creativa", text: "Presentó una solución creativa y novedosa al problema." } },
    "orquesta-theatre": { exampleSynonym: { text: "El espacio del coro estaba ante la escena." } },
    "orquestar-coordinate": { example: { word: "orquestó" }, exampleSynonym: { word: "coordinó" } },
    "oscilar-values": { example: { word: "osciló" } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.es || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5244 expected one es/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5244 missing ${field} on es/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
