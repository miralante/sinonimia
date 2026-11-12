/* Literal example fixes for Spanish A entries flagged by check.js. */
(() => {
  const changes = {
    adivinable: { exampleSynonym: { word: "podía adivinarse" } },
    adscribible: { exampleSynonym: { text: "El rasgo que se puede atribuir a varias especies del mismo género ayuda a clasificarlas." } },
    aeronavegabilidad: { exampleSynonym: { text: "La inspección confirmó la capacidad de vuelo seguro del aparato." } },
    ahocicar: {
      example: { word: "ahocicó" },
      exampleSynonym: { word: "hizo reconocer el error", text: "Con pruebas claras, la abogada hizo reconocer el error a su oponente en el debate." },
    },
    ahocinarse: { example: { word: "ahocinaba" }, exampleSynonym: { word: "encajonaba" } },
    ahorquillar: {
      example: { word: "ahorquilló" },
      synonyms: ["sujetar con horquillas"],
      exampleSynonym: { word: "sujetó con horquillas", text: "El jardinero sujetó con horquillas las ramas cargadas de ciruelas." },
    },
    ahuesarse: { example: { word: "ahuesó" }, exampleSynonym: { word: "se quedó sin vender" } },
    ajamonarse: { example: { word: "ajamonaba" }, exampleSynonym: { word: "engordaba" } },
    alagartarse: { example: { word: "alagartó" }, exampleSynonym: { word: "se volvió avaro" } },
    alergizante: { exampleSynonym: { word: "alergénica" } },
    alforrochar: { example: { word: "alforrochó" }, exampleSynonym: { word: "ahuyentó" } },
    aliger: {
      synonyms: ["protección para la mano", "pieza de la guarnición de la espada"],
      exampleSynonym: { word: "protección para la mano" },
    },
    alipegarse: {
      example: { word: "alipegaron" },
      synonyms: ["juntarse sin invitación"],
      exampleSynonym: { word: "juntarse sin invitación", text: "Los vecinos decidieron juntarse sin invitación a la excursión, aunque nadie los hubiera llamado." },
    },
    almarbatar: { example: { word: "almarbató" }, exampleSynonym: { word: "ensambló" } },
    almogavarear: { example: { word: "almogavareaban" }, exampleSynonym: { word: "hacían correrías" } },
    alobar: { example: { word: "alobó" }, exampleSynonym: { word: "importunó" } },
    aluminar: { example: { word: "aluminó" }, exampleSynonym: { word: "recubrió de aluminio" } },
    aluminizar: {
      example: { word: "aluminiza" },
      exampleSynonym: { word: "recubre con aluminio", text: "La fábrica recubre con aluminio el acero para protegerlo de la corrosión." },
    },
    amacharse: { example: { word: "amachó" }, exampleSynonym: { word: "se obstinó" } },
    amachinarse: {
      example: { word: "amachinó" },
      synonyms: ["vivir juntos sin casarse"],
      exampleSynonym: { word: "vivir juntos sin casarse", text: "La pareja acordó vivir juntos sin casarse y se instaló en el campo." },
    },
    amachorrarse: { example: { word: "amachorró" }, exampleSynonym: { word: "se volvió estéril" } },
    amalar: { example: { word: "amaló" }, exampleSynonym: { word: "echó a perder" } },
    amalayar: { example: { word: "amalayaba" } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.es || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5222 expected one es/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") {
        matches[0][field] = values;
      } else {
        if (!matches[0][field]) throw new Error(`v5222 missing ${field} on es/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
