/* Literal example fixes for the remaining Spanish entries flagged by check.js. */
(() => {
  const changes = {
    "recibir-2": { example: { word: "recibe" }, exampleSynonym: { word: "capta señales", text: "El aparato capta señales de televisión." } },
    "recibir-3": { example: { word: "reciben" }, exampleSynonym: { word: "sostienen" } },
    "recibir-4": { exampleSynonym: { text: "El albañil debe fijar con yeso el marco." } },
    "reconciliar-2": { exampleSynonym: { word: "readmitir al fiel en la Iglesia" } },
    "recrecer-2": { example: { word: "recreció" }, exampleSynonym: { word: "recobró fuerzas" } },
    "recrecer-3": { example: { word: "recreció" }, exampleSynonym: { word: "se repitió" } },
    "recriminar-2": { example: { word: "recriminó" }, exampleSynonym: { word: "acusó en respuesta" } },
    "recurrir-2": { example: { word: "recurrió" } },
    "recusar-2": { exampleSynonym: { word: "pedir que apartaran al juez" } },
    "redil-2": { exampleSynonym: { word: "volvió al grupo" } },
    "redimir-4": { example: { word: "redimió" } },
    "redoblar-2": { example: { word: "redobló" }, exampleSynonym: { word: "tocó redobles" } },
    "redoblar-4": { example: { word: "redobló" }, exampleSynonym: { word: "dobló la punta del clavo" } },
    "redova-2": { exampleSynonym: { word: "melodía de redova" } },
    "redundar-2": { example: { word: "redundó" }, exampleSynonym: { word: "rebosó" } },
    "reencontrar-2": { synonyms: ["recuperar", "volver a encontrar"], exampleSynonym: { word: "recuperar su afición", text: "Tras años, logró recuperar su afición por la música." } },
    "remitir-2": { example: { word: "remite" }, exampleSynonym: { word: "cita" } },
    "remitir-3": { example: { word: "remitió" }, exampleSynonym: { word: "dejó que el tribunal superior decidiera el asunto", text: "El juez dejó que el tribunal superior decidiera el asunto." } },
    "remitir-4": { example: { word: "remitió" }, exampleSynonym: { word: "aplazó" } },
    "remitir-5": { example: { word: "remito" }, exampleSynonym: { word: "atengo" } },
    "timpanico-sounds-like-drum": { exampleSynonym: { text: "El sonido que suena como un tambor resonó en la sala." } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.es || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5246 expected one es/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5246 missing ${field} on es/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
