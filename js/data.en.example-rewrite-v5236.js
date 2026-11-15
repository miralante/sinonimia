/* Literal example fixes for Spanish entries flagged by check.js. */
(() => {
  const changes = {
    "round2422-epifania-feast": { example: { text: "El seis de enero se celebra la epifanía, fiesta de los Reyes Magos." }, exampleSynonym: { text: "El Día de Reyes reúne a las familias el seis de enero." } },
    "round2423-epigenesis-development": { example: { text: "La epigénesis describe la formación progresiva del organismo." }, exampleSynonym: { text: "La formación progresiva del organismo ocurre a lo largo del desarrollo." } },
    "round2423-epigrama-inscription": { example: { text: "En la placa grabaron un epigrama, una inscripción conmemorativa." }, exampleSynonym: { text: "La inscripción conmemorativa recuerda la fundación del edificio." } },
    "round2424-epimone-poetic-repetition": { exampleSynonym: { text: "La repetición de un verso al final de cada estrofa dio ritmo al poema." } },
    "round2424-epilogo-peroration": { exampleSynonym: { text: "La oradora cerró su intervención con la parte final del discurso." } },
    "round2424-episcopado-period": { exampleSynonym: { text: "Durante el tiempo de gobierno de un obispo se construyó una nueva escuela." } },
    "round2425-epistola-mass": { exampleSynonym: { text: "La lectura bíblica de la misa se tomó de una epístola." } },
    "round2428-epodo-last-line": { exampleSynonym: { text: "El poeta incluyó un verso final repetido al terminar cada estrofa." } },
    "round2430-equipolente-vector": { exampleSynonym: { text: "El vector equivalente conserva la misma dirección y magnitud." } },
    "round2434-ergonomia-quality": { exampleSynonym: { text: "La adaptación al usuario permite sentarse con comodidad." } },
    "round2434-erguir-building": { example: { word: "yergue" }, exampleSynonym: { word: "alza" } },
    "round2434-erguir-proud": { example: { word: "irguió" }, exampleSynonym: { word: "envaneció" } },
    "round2435-erigir-status": { example: { word: "erigió" }, exampleSynonym: { word: "convirtió el territorio en" } },
    "round2438-erotizar-character": { example: { word: "erotiza" }, exampleSynonym: { word: "da carácter erótico" } },
    "round2438-errar-wander": { example: { word: "erró" }, exampleSynonym: { word: "vagó" } },
    "round2438-errar-digress": { example: { word: "erró" }, exampleSynonym: { word: "divagó" } },
    "round2441-esbozar-idea": { example: { word: "esbozó" }, exampleSynonym: { word: "presentó una idea brevemente", text: "La directora presentó una idea brevemente antes de detallar el plan." } },
    "round2443-escabullirse": { example: { word: "escabulló" }, exampleSynonym: { word: "escapó sin ser visto" } },
    "round2443-escafoides-tarsal": { exampleSynonym: { text: "El médico revisó el hueso escafoides del pie después de la caída." } },
    "round2444-escalable-general": { exampleSynonym: { word: "puede representarse a escala" } },
    "round2444-escaldar-burn": { exampleSynonym: { text: "El cocinero puede quemar con agua caliente la superficie del alimento." } },
    "round2445-escaleno-muscles": { exampleSynonym: { word: "músculo escaleno", text: "La médica revisó el músculo escaleno del cuello después del dolor." } },
    "round2445-escalfar-liquid": { example: { word: "escalfó" }, exampleSynonym: { word: "coció a fuego suave", text: "La cocinera coció a fuego suave las peras en vino con canela." } },
    "round2446-escalmo-machinery-wedge": { exampleSynonym: { text: "El mecánico usó una cuña para fijar piezas de la máquina." } },
    "round2447-escalonar-stages": { exampleSynonym: { word: "distribuir las salidas por etapas" } },
    "round2447-escamar-suspicion": { example: { word: "escamó" }, exampleSynonym: { word: "desconfió" } },
    "round2448-escamochar-andalusia": { example: { word: "escamochó" } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.es || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5236 expected one es/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5236 missing ${field} on es/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
