/* Literal example fixes for Spanish entries flagged by check.js. */
(() => {
  const changes = {
    ensobinarse: { example: { word: "ensobinó" }, exampleSynonym: { word: "quedó en posición supina" } },
    entelar: { exampleSynonym: { text: "Decidieron revestir con tela las paredes para mejorar la acústica." } },
    ermar: { exampleSynonym: { word: "dejar yermas" } },
    escabro: { example: { word: "escabra" }, exampleSynonym: { word: "rugosa" } },
    escamole: { exampleSynonym: { text: "El restaurante sirvió una larva de hormiga comestible con mantequilla y epazote." } },
    escandir: { exampleSynonym: { text: "La profesora enseñó a medir versos del poema." } },
    escanarse: { example: { word: "escañaron" }, exampleSynonym: { word: "guarecieron" } },
    escripia: { exampleSynonym: { text: "El pescador guardó las capturas pequeñas en la cesta de pescador." } },
    excretar: { exampleSynonym: { text: "Los riñones ayudan a eliminar desechos del organismo." } },
    expurgar: { example: { word: "expurgó" }, exampleSynonym: { word: "suprimió" } },
    extranjerizar: { example: { word: "extranjeriza" }, exampleSynonym: { word: "incorpora elementos extranjeros" } },
    extrapolable: { exampleSynonym: { text: "El hallazgo es aplicable a otros casos con características similares." } },
    fabular: { example: { word: "fabula" }, exampleSynonym: { word: "imagina" } },
    feriar: { exampleSynonym: { text: "Fue a comprar en la feria frutas y verduras." } },
    ferretear: { example: { word: "ferreteó" }, exampleSynonym: { word: "adornó con hierro", text: "El artesano adornó con hierro el baúl." } },
    fervorizar: { example: { word: "fervorizó" }, exampleSynonym: { word: "entusiasmó" } },
    fiambrar: { synonyms: ["servir frío", "hacer fiambre"], example: { word: "fiambró" }, exampleSynonym: { word: "servir frío", text: "Preparó el fiambre para servir frío al día siguiente." } },
    fimbria: { exampleSynonym: { text: "La fimbria, borde de una vestidura, rozaba el suelo." } },
    flamencologia: { exampleSynonym: { text: "Su estudio del flamenco incluía el cante y el baile." } },
    hoparse: { example: { word: "hopó" }, exampleSynonym: { word: "fue", text: "Al oír el ruido, el animal se fue entre los matorrales." } },
    lerdear: { example: { word: "lerdees" }, exampleSynonym: { word: "tardes demasiado" } },
    madrearse: { example: { word: "madreó" }, exampleSynonym: { word: "se ahiló", text: "El vino se ahiló durante la fermentación." } },
    mantearse: { example: { word: "manteó" }, exampleSynonym: { text: "La veta llegó a convertirse en manto a mayor profundidad." } },
    rancharse: { example: { word: "ranchó" }, exampleSynonym: { word: "domicilió", text: "La familia se domicilió en una casa cerca del pueblo." } },
    vomipurgante: { exampleSynonym: { text: "El manual antiguo describe el vomipurgante como un medicamento vomitivo y purgante." } },
    yacata: { exampleSynonym: { text: "La zona arqueológica conserva una yácata, un templo purépecha." } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.es || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5229 expected one es/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5229 missing ${field} on es/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
