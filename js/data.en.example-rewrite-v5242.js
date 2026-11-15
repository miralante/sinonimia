/* Literal example fixes for Spanish entries flagged by check.js. */
(() => {
  const changes = {
    "round3128-inflamar-redness": { exampleSynonym: { word: "enrojeció" } },
    "round3129-influir-moral": { example: { word: "influyó" }, exampleSynonym: { word: "condicionó" } },
    "round3129-influir-success": { example: { word: "influyó" }, exampleSynonym: { word: "contribuyó" } },
    "round3147-inmutarse": { example: { word: "inmutó" } },
    "round3157-insolentar-pronominal": { exampleSynonym: { word: "se envalentonó", text: "Con tantos elogios, el joven se envalentonó." } },
    "round3182-intimar-cercania": { exampleSynonym: { word: "estrecharon su relación" } },
    "round3186-introducir-presentar": { example: { word: "introdujo" }, exampleSynonym: { word: "presentó" } },
    "round3191-invernada-ganado": { exampleSynonym: { text: "El ganado pasó el invierno en los pastos de invierno del valle." } },
    "round3213-jabalconar-voladizo": { example: { word: "jabalconó" }, exampleSynonym: { word: "reforzó el saliente con un soporte" } },
    "round3257-jubilarse-venezuela": { example: { word: "jubiló" }, exampleSynonym: { word: "faltó a la clase sin justificación" } },
    "round3263-julepe-card-game": { exampleSynonym: { text: "La familia jugó un juego de naipes después de cenar." } },
    "round3265-junior-professional": { exampleSynonym: { word: "abogado principiante" } },
    "round3265-juntarse-near": { example: { word: "juntó" }, exampleSynonym: { word: "acercó" } },
    "round3265-juntarse-accompany": { example: { word: "juntó" }, exampleSynonym: { word: "se acompañó" } },
    "round3265-juntarse-sex": { example: { word: "juntaron" } },
    "round3265-juntarse-cohabit": { example: { word: "juntaron" } },
    "round3267-juramentar-pronominal": { example: { word: "juramentaron" } },
    "round3267-jurar-curse": { example: { word: "juró" }, exampleSynonym: { word: "maldijo" } },
    "round3270-justificar-theology": { exampleSynonym: { word: "conceder su gracia" } },
    "round3281-lacear-tie": { example: { word: "laceó" }, exampleSynonym: { word: "ató la caja con lazos" } },
    "round3285-ladear-deviate": { example: { word: "ladeaba" }, exampleSynonym: { word: "desviaba" } },
    "round3286-ladrido-figurative": { exampleSynonym: { text: "La murmuración del rival no cambió su decisión." } },
    "round3287-ladron-water-diversion": { exampleSynonym: { text: "El portillo de agua del canal desviaba el caudal al molino." } },
    "round3295-lamentar-express": { synonyms: ["llorar", "sentir pesar por"], example: { word: "lamentó", text: "El alcalde lamentó la pérdida de la antigua biblioteca." }, exampleSynonym: { word: "lloró", text: "El alcalde lloró la pérdida de la antigua biblioteca." } },
    "round3297-lamparilla-lamp": { exampleSynonym: { text: "Encendió una lamparita durante el apagón." } },
    "round3301-lanero-adjective": { example: { word: "lanera" }, exampleSynonym: { word: "relativa a la lana", text: "La industria relativa a la lana creció en la región." } },
    "round3305-lanzamisiles-adjective": { exampleSynonym: { word: "barco armado con misiles" } },
    "round3310-lastima-object": { exampleSynonym: { text: "El edificio, objeto de compasión, necesitaba una restauración." } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.es || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5242 expected one es/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5242 missing ${field} on es/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
