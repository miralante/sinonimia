/* Literal example fixes for Spanish entries flagged by check.js. */
(() => {
  const changes = {
    "round2448-escamochar-andalusia": { exampleSynonym: { word: "limpió las alcachofas" } },
    "round2448-escamondar-figurative": { example: { word: "escamondó" }, exampleSynonym: { word: "eliminó lo innecesario", text: "La editora eliminó lo innecesario del informe y quitó las repeticiones." } },
    "round2448-escamoso-reptile": { exampleSynonym: { text: "La serpiente es un reptil escamoso." } },
    "round2448-escamotear-withhold": { example: { word: "escamoteó" }, exampleSynonym: { word: "ocultó" } },
    "round2449-escampar-disperse": { example: { word: "escampó" }, exampleSynonym: { word: "dispersó" } },
    "round2449-escanciar-cider": { example: { word: "escanció" }, exampleSynonym: { word: "sirvió la sidra desde lo alto" } },
    "round2449-escandalizar-offend": { example: { word: "escandalizó" }, exampleSynonym: { word: "ofendió" } },
    "round2450-escanear-examine": { example: { word: "escaneó" }, exampleSynonym: { word: "examinó sistemáticamente" } },
    "round2451-escantillon-timber": { exampleSynonym: { text: "El carpintero comprobó la escuadría de la madera, midiendo el ancho y el alto de las vigas." } },
    "round2451-escano-parliamentary-seat": { exampleSynonym: { text: "El partido obtuvo un puesto parlamentario en las elecciones." } },
    "round2452-escapismo-reality": { exampleSynonym: { text: "Leer novelas era para ella una evasión de la realidad." } },
    "round2452-escaquear-evade-duty": { exampleSynonym: { text: "Intentó eludir una tarea de limpieza del local." } },
    "round2452-escaqueo-shirk": { exampleSynonym: { text: "El jefe se quejó de la evasión de una tarea por algunos empleados." } },
    "round2453-escarbar-search": { example: { word: "escarbó" }, exampleSynonym: { word: "escarbó entre la tierra", text: "Escarbó entre la tierra hasta encontrar la llave." } },
    "round2455-escarlatina-rash": { exampleSynonym: { text: "La erupción escarlatinosa le apareció primero en el cuello." } },
    "round2455-escariar-finish": { exampleSynonym: { word: "repasaron el agujero" } },
    "round2456-escarmentar-correct": { example: { word: "escarmentó" }, exampleSynonym: { word: "reprendió" } },
    "round2456-escarmentar-experience": { example: { word: "escarmentó" }, exampleSynonym: { word: "aprendió la lección" } },
    "round2456-escarme-wool": { example: { word: "escarmenó" }, exampleSynonym: { word: "cardó" } },
    "round2456-escarpado-cliff": { example: { word: "escarpada" }, exampleSynonym: { word: "abrupta" } },
    "round2457-escarpar-art": { example: { word: "escarpó" }, exampleSynonym: { word: "desbastó" } },
    "round2458-escatimar-praise": { example: { word: "escatimó" }, synonyms: ["dar con moderación", "reservar"], exampleSynonym: { word: "dio elogios con moderación", text: "La profesora dio elogios con moderación al grupo." } },
    "round2458-escatimar-effort": { example: { word: "escatimó" }, exampleSynonym: { word: "ahorró esfuerzos", text: "No ahorró esfuerzos al revisar el informe." } },
    "round2458-escatofagia-clinical": { exampleSynonym: { text: "El informe médico menciona un episodio de coprofagia." } },
    "round2458-escatofago-animal": { exampleSynonym: { text: "El escarabajo coprófago ayuda a descomponer el estiércol." } },
    "round2459-escatologico-faecal": { exampleSynonym: { text: "El humor relativo a los excrementos provocó risas y algunas quejas." } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.es || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5237 expected one es/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5237 missing ${field} on es/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
