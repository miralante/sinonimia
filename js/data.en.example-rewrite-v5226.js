/* Literal example fixes for Spanish A–D entries flagged by check.js. */
(() => {
  const changes = {
    atarazar: { exampleSynonym: { text: "El cachorro empezó a morder la manta con los dientes." } },
    atascaburras: { exampleSynonym: { text: "Prepararon ajoarriero manchego, un guiso de patata y bacalao, para la comida del invierno." } },
    atear: { example: { word: "ateó" }, exampleSynonym: { word: "avivó" } },
    ateje: { exampleSynonym: { text: "El ateje es un árbol cubano de fruto colorado, dulce y gomoso." } },
    atepocate: { exampleSynonym: { word: "renacuajos", text: "En el charco se movían varios renacuajos." } },
    aterrerar: { exampleSynonym: { text: "La cuadrilla tuvo que echar escombros en el hueco de la excavación." } },
    atetillar: { exampleSynonym: { word: "cavó alrededor del árbol", text: "Tras plantar el olivo, el agricultor cavó alrededor del árbol y arrimó tierra al tronco." } },
    atezar: { example: { word: "atezó" }, exampleSynonym: { word: "pulió" } },
    atijara: {
      synonyms: ["mercancía", "precio de transporte", "recompensa"],
      exampleSynonym: { word: "precio pagado por el transporte" },
    },
    atilintar: { exampleSynonym: { word: "tensar la cuerda" } },
    atiparse: { example: { word: "atipado" }, exampleSynonym: { word: "se había hartado" } },
    atorcer: { example: { word: "atorcía" }, exampleSynonym: { word: "se desviaba" } },
    atortujar: { example: { word: "atortujó" }, exampleSynonym: { word: "aplastó" } },
    atrabajar: { exampleSynonym: { text: "La faena llegó a hacer pasar trabajos a los peones." } },
    atrafagar: { example: { word: "atrafagó" }, exampleSynonym: { word: "cansó" } },
    atrampar: {
      example: { word: "atrampó" },
      synonyms: ["atrapar", "capturar", "obstruirse", "atascarse", "atrancarse"],
      exampleSynonym: { word: "se obstruyó" },
    },
    aurinaciense: { exampleSynonym: { word: "auriñacienses" } },
    autocabeza: { exampleSynonym: { text: "El juez dictó una cabeza de proceso para iniciar formalmente la causa penal." } },
    azararse: { example: { word: "azaró" }, exampleSynonym: { word: "se torció", text: "La partida se torció por una jugada inesperada." } },
    barrearse: { example: { word: "barreó" }, exampleSynonym: { word: "se revolcó", text: "El jabalí se revolcó junto a la charca." } },
    coronal: { exampleSynonym: { word: "coronaria" } },
    corregibilidad: { exampleSynonym: { text: "La posibilidad de corrección permitió actualizar el informe." } },
    correjel: { exampleSynonym: { text: "El zapatero eligió cuero para suelas resistente y flexible." } },
    correntiar: { exampleSynonym: { text: "En Aragón se puede regar por inundación el campo después de la siega." } },
    corruptibilidad: { exampleSynonym: { text: "La facilidad para ser corrompido aumenta cuando un funcionario carece de controles." } },
    coscarse: { example: { word: "coscó" }, exampleSynonym: { word: "percató", text: "No se percató de que habían cambiado el horario." } },
    cotrofe: { exampleSynonym: { word: "vasos antiguos" } },
    coulis: { exampleSynonym: { word: "salsa de frambuesa" } },
    dipodia: { exampleSynonym: { text: "El verso griego se analizó como un grupo de dos pies métricos, en concreto yámbicos." } },
    dirham: { exampleSynonym: { word: "dírhams marroquíes" } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.es || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5226 expected one es/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") {
        matches[0][field] = values;
      } else {
        if (!matches[0][field]) throw new Error(`v5226 missing ${field} on es/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
