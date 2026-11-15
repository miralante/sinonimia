/* Literal example fixes for Spanish entries flagged by check.js. */
(() => {
  const changes = {
    "oscilar-values": { exampleSynonym: { word: "fluctuó" } },
    "oscurecer-figurative": { example: { word: "oscureció" }, exampleSynonym: { word: "enturbió" } },
    "otavaleno-adjective": { example: { word: "otavaleña" } },
    "otonar-grass": { example: { word: "otoñó" }, exampleSynonym: { word: "brotó en otoño" } },
    "otonar-soil": { example: { word: "otoñó" }, exampleSynonym: { word: "adquirió tempero" } },
    "otorgar-legal": { example: { word: "otorgó" }, synonyms: ["autorizar una escritura", "formalizar ante notario"], exampleSynonym: { word: "autorizó una escritura", text: "El notario autorizó una escritura." } },
    "ozono-contaminante": { exampleSynonym: { text: "El ozono troposférico cerca del suelo puede irritar los pulmones." } },
    "pachucho-overripe": { exampleSynonym: { word: "demasiado maduro" } },
    "pachuco-clothing": { exampleSynonym: { text: "Llevaba ropa ajustada, incluido un pantalón ceñido." } },
    "pacifismo-attitude": { synonyms: ["amor a la paz", "pacifismo"], exampleSynonym: { word: "amor a la paz", text: "Su amor a la paz le impedía apoyar la guerra." } },
    "pacota-insignificant": { synonyms: ["persona insignificante", "persona de poca importancia"], exampleSynonym: { word: "persona insignificante", text: "Lo trataron como una persona insignificante." } },
    "pacotilla-gang": { synonyms: ["pandilla", "grupo de amigos"], exampleSynonym: { word: "pandilla", text: "La pandilla de amigos se reunió en la plaza del barrio." } },
    "pacotilla-chusma": { synonyms: ["chusma", "gentuza"], exampleSynonym: { word: "chusma", text: "La chusma armó un escándalo en la calle." } },
    "de-pacotilla": { synonyms: ["de mala calidad", "de poco valor"], exampleSynonym: { word: "de mala calidad", text: "El mueble era de mala calidad y se rompió pronto." } },
    "pacotillero-vendor": { synonyms: ["vendedor ambulante", "mercader callejero"], exampleSynonym: { word: "vendedor ambulante", text: "El vendedor ambulante ofrecía frutas en la plaza." } },
    "padecer-injuries": { example: { word: "padeció" }, exampleSynonym: { word: "soportó" } },
    "padecer-disadvantage": { example: { word: "padeció" }, exampleSynonym: { word: "sufrió" } },
    "padecer-tolerate": { example: { word: "padeció" }, exampleSynonym: { word: "sobrellevó" } },
    "padecer-object-damage": { example: { word: "padece" }, exampleSynonym: { word: "recibe daños" } },
    "padrastro-hangnail": { exampleSynonym: { text: "El pellejo levantado junto a la uña le dolía." } },
    "padrastro-obstacle": { exampleSynonym: { text: "La falta de fondos fue un impedimento para el proyecto." } },
    "peliculon-2": { exampleSynonym: { text: "La película aburrida duraba tres horas." } },
    "peludear-2": { example: { word: "peludeó" }, exampleSynonym: { word: "quedó atascado" } },
    "pendiente-5": { exampleSynonym: { word: "inclinada" } },
    "penetrable-2": { exampleSynonym: { word: "clara" } },
    "raso-4": { example: { word: "rasa" }, exampleSynonym: { word: "nivelada" } },
    "ratero-2": { example: { word: "ratera" }, exampleSynonym: { word: "rastrera" } },
    "ratero-3": { example: { word: "ratera" } },
    "rayano-2": { example: { word: "rayana" } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.es || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5245 expected one es/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5245 missing ${field} on es/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
