/* Literal example fixes for Spanish E–F entries flagged by check.js. */
(() => {
  const changes = {
    evangelico: { exampleSynonym: { text: "La biblioteca conserva material relativo al evangelio en varias traducciones." } },
    expirar: { example: { word: "expiró" }, exampleSynonym: { word: "terminó" } },
    externar: { example: { word: "externó" }, exampleSynonym: { word: "expresó" } },
    extralimitarse: { example: { word: "extralimitó" }, exampleSynonym: { word: "se excedió" } },
    extruir: {
      example: { word: "extruye" },
      exampleSynonym: { text: "La fábrica necesita moldear a presión el plástico para fabricar tubos." },
    },
    exultar: { example: { word: "exultó" }, exampleSynonym: { word: "se regocijó" } },
    fardar: { example: { word: "fardaba" }, exampleSynonym: { word: "presumía" } },
    fasto: { exampleSynonym: { text: "El calendario romano clasificaba ciertas jornadas como día hábil romano para los asuntos públicos." } },
    faxear: { exampleSynonym: { text: "Le pidieron enviar por fax el formulario firmado." } },
    federar: { exampleSynonym: { text: "Las asociaciones acordaron unir en una federación a sus equipos." } },
    femtogramo: { exampleSynonym: { text: "El femtogramo es una unidad de masa de 10⁻¹⁵ gramos." } },
    fenecer: { example: { word: "feneció" }, exampleSynonym: { word: "falleció" } },
    ferrar: {
      example: { word: "ferró" },
      exampleSynonym: { word: "revistió de hierro" },
    },
    fileteado: { exampleSynonym: { text: "El corte en filetes del pescado quedó uniforme." } },
    filetear: {
      example: { word: "fileteó" },
      exampleSynonym: { text: "El cocinero tuvo que cortar en filetes el pescado." },
    },
    flatulento: { exampleSynonym: { text: "Se considera flatulenta una comida que produce gases durante la digestión." } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.es || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5209 expected one es/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (!matches[0][field]) throw new Error(`v5209 missing ${field} on es/${id}`);
      Object.assign(matches[0][field], values);
    }
  }
})();
