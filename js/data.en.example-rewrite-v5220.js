/* Literal example fixes for Spanish E entries flagged by check.js. */
(() => {
  const changes = {
    engranerar: { exampleSynonym: { text: "Al terminar la cosecha, empezaron a almacenar grano en el granero." } },
    enguarapetarse: { example: { word: "enguarapetó" }, exampleSynonym: { word: "emborrachó" } },
    enhenar: { exampleSynonym: { word: "cubrieron de heno", text: "Cubrieron de heno el pesebre para mantener seco al animal." } },
    enhorquetar: { example: { word: "enhorquetó" }, exampleSynonym: { word: "puso al niño a horcajadas" } },
    enjambrazon: {
      synonyms: ["enjambrazón de abejas", "formación del enjambre"],
      exampleSynonym: { word: "formación del enjambre" },
    },
    enjaranarse: { example: { word: "enjaranó" }, exampleSynonym: { word: "endeudó" } },
    enjaretar: {
      example: { word: "enjaretó" },
      exampleSynonym: { word: "pasó por la jareta", text: "Pasó por la jareta el cordón del borde de la capucha." },
    },
    enjicar: { exampleSynonym: { word: "pusieron los soportes a la hamaca", text: "Pusieron los soportes a la hamaca entre dos árboles." } },
    enjumarse: { example: { word: "enjumó" }, exampleSynonym: { word: "emborrachó" } },
    enlabiar: { example: { word: "enlabió" }, exampleSynonym: { word: "acercó los labios" } },
    enlechar: { exampleSynonym: { text: "La lechada sirvió para recubrir las juntas de los azulejos." } },
    enlomarse: { example: { word: "enlomó" }, exampleSynonym: { word: "corcoveó" } },
    enmadejar: { example: { word: "enmadejó" }, exampleSynonym: { word: "aspó" } },
    enmangar: {
      synonyms: ["poner un mango", "encabar"],
      exampleSynonym: { word: "poner un mango" },
    },
    enmatarse: { example: { word: "enmató" }, exampleSynonym: { word: "escondió" } },
    enmonarse: { example: { word: "enmonó" }, exampleSynonym: { word: "emborrachó" } },
    enmontanarse: {
      example: { word: "enmontañaron" },
      exampleSynonym: { word: "se refugiaron en la montaña" },
    },
    enronchar: { exampleSynonym: { text: "El contacto con la planta puede llenar de ronchas la piel." } },
    ensayalar: { exampleSynonym: { text: "Decidieron cubrir con un tapete el arcón para proteger la madera." } },
    entabanarse: {
      example: { word: "entabanó" },
      exampleSynonym: { word: "se alborotó por los tábanos", text: "El ganado se alborotó por los tábanos junto al río." },
    },
    entabicar: { exampleSynonym: { text: "El equipo decidió poner un tabique en la habitación para crear un pequeño despacho." } },
    entapecer: { example: { word: "entapeció" }, exampleSynonym: { word: "tupió" } },
    entaquillarse: { example: { word: "entaquilló" }, exampleSynonym: { word: "vistió elegantemente" } },
    entirriarse: { example: { word: "entirrió" }, exampleSynonym: { word: "enfadó" } },
    entisar: { exampleSynonym: { word: "recubrieron con malla", text: "Recubrieron con malla la vasija para transportarla con seguridad." } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.es || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5220 expected one es/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") {
        matches[0][field] = values;
      } else {
        if (!matches[0][field]) throw new Error(`v5220 missing ${field} on es/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
