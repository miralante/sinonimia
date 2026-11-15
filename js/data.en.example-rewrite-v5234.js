/* Literal example fixes for Spanish entries flagged by check.js. */
(() => {
  const changes = {
    "round2391-entesar-tighten": { example: { word: "entesó" }, exampleSynonym: { word: "tensó" } },
    "round2391-entestar-fit-together": { example: { word: "entestó" }, exampleSynonym: { word: "encajó" } },
    "round2391-entestar-touch-border": { example: { word: "entesta" }, exampleSynonym: { word: "linda" } },
    "round2393-entoldar-tapestries": { exampleSynonym: { word: "cubrieron con telas", text: "Cubrieron con telas las paredes del salón para la ceremonia." } },
    "round2393-entoldar-conceited": { example: { word: "entoldó" }, exampleSynonym: { word: "envaneció" } },
    "round2393-entonar-sing-in-tune": { example: { word: "entonó" }, exampleSynonym: { word: "cantó en tono" } },
    "round2393-entonar-tone-voice": { example: { word: "entonó" }, exampleSynonym: { word: "moduló la voz" } },
    "round2393-entonar-organ-bellows": { example: { word: "entonó" }, exampleSynonym: { word: "dio aire al órgano" } },
    "round2393-entonar-start-song": { example: { word: "entonó" }, exampleSynonym: { word: "dio la entrada" } },
    "round2393-entonar-strengthen": { example: { word: "entonó" }, exampleSynonym: { word: "fortaleció" } },
    "round2393-entonar-harmonize-colors": { example: { word: "entonó" }, exampleSynonym: { word: "armonizó los colores" } },
    "round2393-entonar-colors-match": { example: { word: "entonan" }, exampleSynonym: { word: "armonizan" } },
    "round2393-entonar-become-conceited": { example: { word: "entonó" }, exampleSynonym: { word: "envaneció" } },
    "round2394-entorpecer-confuse": { example: { word: "entorpecía" }, exampleSynonym: { word: "confundía" } },
    "round2394-entorpecer-hinder": { example: { word: "entorpeció" }, exampleSynonym: { word: "dificultó" } },
    "round2395-entortar-injure-eye": { example: { word: "entortó" }, exampleSynonym: { word: "dejó tuerto" } },
    "round2396-entrampar-confuse-business": { example: { word: "entrampan" }, exampleSynonym: { word: "enredan" } },
    "round2396-entrampar-load-with-debt": { example: { word: "entrampó" }, exampleSynonym: { word: "endeudó" } },
    "round2396-entramparse-get-stuck": { example: { word: "entrampó" }, exampleSynonym: { word: "atascó" } },
    "round2396-entramparse-become-indebted": { example: { word: "entrampó" }, exampleSynonym: { word: "endeudó" } },
    "round2396-entranar-introduce-deeply": { example: { word: "entrañó" } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.es || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5234 expected one es/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5234 missing ${field} on es/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
