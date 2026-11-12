/* Literal example fixes for Spanish entries flagged by check.js. */
(() => {
  const changes = {
    "round2757-fulminar-disease": { example: { word: "fulminó" }, exampleSynonym: { word: "mató" } },
    "round2757-fulminar-words": { example: { word: "fulminó" }, exampleSynonym: { word: "censuró" } },
    "round2757-fulminar-impress": { example: { word: "fulminó" }, exampleSynonym: { word: "dejó sin palabras" } },
    "round2759-fumigar-pests": { exampleSynonym: { word: "tratar los cultivos contra las plagas", text: "Van a tratar los cultivos contra las plagas." } },
    "round2761-fundar-build": { exampleSynonym: { word: "construyeron" } },
    "round2774-gaje-job-drawback": { exampleSynonym: { word: "inconveniente propio del trabajo" } },
    "round2798-garantia-assurance": { exampleSynonym: { text: "La ley ofrece respaldo a los consumidores." } },
    "round2798-garantia-instrument": { exampleSynonym: { text: "Dejó su casa como fianza del préstamo." } },
    "round2816-gastronomia-traditions": { exampleSynonym: { text: "La cocina local del norte incluye muchos platos de pescado." } },
    "round2827-genio-talent": { exampleSynonym: { word: "talento musical extraordinario" } },
    "round2827-genio-person": { exampleSynonym: { word: "joven brillante" } },
    "pinzar-2": { example: { word: "pinzó" }, exampleSynonym: { word: "hizo un pliegue" } },
    "pionero-2": { example: { word: "pionera" }, exampleSynonym: { word: "persona que empezó primero" } },
    "pitar-3": { example: { word: "pitó" }, exampleSynonym: { word: "dirigió" } },
    "pitar-4": { example: { word: "pitó" }, exampleSynonym: { word: "señaló una incidencia" } },
    "pitar-6": { example: { word: "pita" }, exampleSynonym: { word: "manda" } },
    "prestamo-2": { exampleSynonym: { text: "El objeto prestado debe devolverse el viernes." } },
    "prestar-2": { example: { word: "prestó" }, exampleSynonym: { word: "ayudó" } },
    "prestar-3": { example: { word: "prestó" }, exampleSynonym: { word: "ofreció" } },
    "presuponer-3": { example: { word: "presupone" }, exampleSynonym: { word: "requiere" } },
    "presupuestar-2": { example: { word: "presupuestó" }, exampleSynonym: { word: "asignó" } },
    "round3051-idoneidad-consumo": { exampleSynonym: { word: "adecuación del producto a lo ofrecido" } },
    "round3058-ilustre-lineage": { exampleSynonym: { word: "familia distinguida" } },
    "round3086-incapacidad-laboral": { exampleSynonym: { word: "imposibilidad temporal de trabajar" } },
    "round3103-incubadora-business": { exampleSynonym: { text: "La empresa recibió ayuda de un centro de apoyo empresarial." } },
    "round3109-indexar-price": { exampleSynonym: { word: "ajustar el alquiler al IPC" } },
    "round3125-infarto-enlargement": { exampleSynonym: { word: "agrandamiento de un ganglio" } },
    "round3128-inflamar-redness": { example: { word: "inflamó" } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.es || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5241 expected one es/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5241 missing ${field} on es/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
