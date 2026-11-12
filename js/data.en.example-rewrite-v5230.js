/* Literal example fixes for Spanish entries flagged by check.js. */
(() => {
  const changes = {
    electropositivo: { exampleSynonym: { text: "El sodio, que cede electrones con facilidad, participó en esa reacción." } },
    electroquimico: { example: { word: "electroquímica" }, exampleSynonym: { word: "relativa a la electroquímica" } },
    entomofilo: { example: { word: "entomófila" }, exampleSynonym: { word: "polinizada por insectos" } },
    escarioso: { example: { word: "escariosas" }, exampleSynonym: { word: "membranosas" } },
    escolarca: { exampleSynonym: { text: "El director de una escuela filosófica sucedió a su fundador." } },
    exudativo: { example: { word: "exudativa" }, exampleSynonym: { text: "La lesión, que produce exudación, preocupó al médico." } },
    filicineo: { example: { word: "filicíneas" }, exampleSynonym: { word: "relativas a los helechos", text: "El jardín conserva plantas relativas a los helechos." } },
    finquero: { exampleSynonym: { text: "Un administrador de una finca revisó el sistema de riego." } },
    fisonomico: { exampleSynonym: { word: "relativos a la fisonomía", text: "El retrato resalta los rasgos relativos a la fisonomía del modelo." } },
    hacendistico: { example: { word: "hacendística" } },
    heterocigotico: { exampleSynonym: { text: "El análisis identificó a un individuo con dos variantes genéticas del gen." } },
    heteronomo: { exampleSynonym: { text: "El organismo heterónomo era no autónomo y dependía de otra autoridad." } },
    dravidico: { example: { word: "dravídicas" }, exampleSynonym: { word: "relativos a las lenguas dravídicas", text: "El estudio compara rasgos relativos a las lenguas dravídicas." } },
    endotermico: { example: { word: "endotérmica" } },
    distrofico: { exampleSynonym: { word: "relativos a la distrofia" } },
    autoagresivo: { example: { word: "autoagresiva" }, exampleSynonym: { word: "autolesiva" } },
    dislalico: { exampleSynonym: { word: "relativos a la dislalia" } },
    electromotriz: { exampleSynonym: { word: "relativa a la fuerza electromotriz" } },
    figurativo: { example: { word: "figurativa" }, exampleSynonym: { word: "representativa" } },
    fletador: { exampleSynonym: { text: "La persona que contrata un transporte reservó un barco para llevar la mercancía." } },
    anepigrafico: { example: { word: "anepigráfica" }, exampleSynonym: { text: "Hallaron una lápida sin inscripción ni título junto a una medalla también sin inscripción ni título." } },
    anglicado: { exampleSynonym: { text: "El informe destacó un término influido por el inglés en varias expresiones comerciales." } },
    anglicano: { example: { word: "anglicana" } },
    antepechado: { example: { word: "antepechada" }, exampleSynonym: { word: "provista de antepecho" } },
    anticanonico: { example: { word: "anticanónica" } },
    anticipativo: { example: { word: "anticipativa" } },
    apanalado: { example: { word: "apanalada" } },
    aparasolado: { example: { word: "aparasoladas" } },
    apavorado: { example: { word: "apavorada" }, exampleSynonym: { word: "asustada" } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.es || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5230 expected one es/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5230 missing ${field} on es/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
