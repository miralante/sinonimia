/* Literal example fixes for Spanish I–M entries flagged by check.js. */
(() => {
  const changes = {
    intimar: { exampleSynonym: { word: "requirió formalmente" } },
    inyectar: { exampleSynonym: { text: "La enfermera va a administrar mediante inyección el medicamento." } },
    jesucristo: { exampleSynonym: { text: "En español, «Jesucristo» también puede usarse como interjección de sorpresa." } },
    jorobado: { example: { text: "En el cuento, el personaje jorobado aparece representado como un anciano." } },
    kappa: { exampleSynonym: { text: "La palabra griega «kairos» comienza con la letra griega κ." } },
    kebab: { exampleSynonym: { text: "Pidieron una brocheta de carne de cordero con verduras." } },
    labia: {
      synonyms: ["elocuencia", "facundia", "verbo persuasivo"],
      exampleSynonym: { word: "verbo persuasivo", text: "Con su verbo persuasivo, consiguió que aceptaran su propuesta." },
    },
    lamentar: { example: { word: "lamento" }, exampleSynonym: { word: "deploro" } },
    lamer: {
      synonyms: ["lamber", "pasarse la lengua"],
      exampleSynonym: { word: "pasarse la lengua" },
    },
    leproso: { example: { word: "persona con lepra" } },
    lux: {
      synonyms: ["lx (símbolo)", "lúmenes por metro cuadrado (equivalencia)"],
      exampleSynonym: { word: "lúmenes por metro cuadrado" },
    },
    machacar: { example: { word: "machacó" }, exampleSynonym: { word: "trituró" } },
    madrastra: {
      synonyms: ["esposa del padre (si no es la madre)"],
      exampleSynonym: { word: "esposa de su padre" },
    },
    "round2485-esfumar-pencil": { example: { word: "esfumó" } },
    madrugar: { exampleSynonym: { word: "levantarnos temprano" } },
    malevolo: { example: { word: "malévola" }, exampleSynonym: { word: "malintencionada" } },
    mandamas: { exampleSynonym: { word: "jefa" } },
    manifestar: { example: { word: "manifestó" }, exampleSynonym: { word: "expresó" } },
    manita: { exampleSynonym: { text: "La manita es una sustancia del maná que aparece en algunas plantas." } },
    manoso: { example: { word: "mañosa" } },
    marginado: { example: { word: "marginadas" }, exampleSynonym: { word: "excluidas socialmente" } },
    mariano: { example: { word: "mariana" }, exampleSynonym: { word: "relativa al culto mariano" } },
    marron: { exampleSynonym: { word: "castaña" } },
    masivo: { example: { word: "masiva" }, exampleSynonym: { word: "multitudinaria" } },
    matiz: { example: { word: "matices" } },
    mayordomo: {
      synonyms: ["administrador de la casa", "encargado del servicio doméstico", "gestor de una hacienda"],
      exampleSynonym: { word: "administrador de la casa" },
    },
    meada: { example: { text: "El veterinario limpió la meada que el gato había dejado junto a la puerta." } },
    mediatico: {
      example: { word: "mediática" },
      exampleSynonym: { word: "de gran repercusión pública", text: "El caso fue de gran repercusión pública." },
    },
    medir: { example: { word: "midió" }, exampleSynonym: { word: "cuantificó" } },
    melodramatico: { example: { word: "melodramática" }, exampleSynonym: { word: "exageradamente emotiva" } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.es || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5216 expected one es/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") {
        matches[0][field] = values;
      } else {
        if (!matches[0][field]) throw new Error(`v5216 missing ${field} on es/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
