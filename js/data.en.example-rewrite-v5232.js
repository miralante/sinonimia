/* Literal example fixes for Spanish entries flagged by check.js. */
(() => {
  const changes = {
    dipterocarpeo: { example: { word: "dipterocárpea" }, exampleSynonym: { word: "dipterocarpácea" } },
    disepalo: { example: { word: "disépala" } },
    distocico: { exampleSynonym: { word: "relativas a la distocia" } },
    dragontino: { exampleSynonym: { word: "relativa al dragón", text: "La leyenda describe una criatura relativa al dragón." } },
    ecuoreo: { example: { word: "ecuórea" }, exampleSynonym: { word: "marina" } },
    efedraceo: { exampleSynonym: { word: "relativas a la efedra" } },
    endergonico: { example: { word: "endergónica" }, exampleSynonym: { text: "La síntesis es una reacción endergónica que necesita energía." } },
    engordador: { exampleSynonym: { text: "El ganadero cebador preparó el alimento antes del invierno." } },
    enmantillado: { example: { word: "enmantillada" } },
    equisetineo: { example: { word: "equisetínea" }, exampleSynonym: { word: "equisetácea" } },
    eruginoso: { example: { word: "eruginosa" }, exampleSynonym: { word: "herrumbrosa" } },
    escajocote: { exampleSynonym: { text: "Prepararon una conserva con el fruto del escajocote." } },
    estomatico: { example: { word: "estomática" } },
    euroasiatico: { example: { word: "euroasiática" }, exampleSynonym: { text: "La ruta es de Europa y Asia y conecta varias ciudades." } },
    fantasmatico: { example: { word: "fantasmática" } },
    fasciculado: { example: { word: "fasciculadas" }, exampleSynonym: { word: "agrupadas en haces" } },
    feldespatico: { example: { word: "feldespática" } },
    fitocromatico: { example: { word: "fitocromática" }, exampleSynonym: { word: "relativa al fitocromo" } },
    fotocromatico: { example: { word: "fotocromáticas" } },
    empuesta: { exampleSynonym: { text: "El cazador describió la posición del ave por detrás del ave que la perseguía." } },
    figural: { exampleSynonym: { word: "figurativa" } },
    dulzal: { exampleSynonym: { text: "La aceituna dulzal de esta zona se prepara para consumirla verde." } },
    enjorquetarse: { example: { word: "enjorquetó" }, exampleSynonym: { word: "puso a horcajadas" } },
    autoguiado: { exampleSynonym: { word: "recorrido autónomo" } },
    dipsacaceo: { example: { word: "dipsacácea" } },
    dipterocarpaceo: { example: { word: "dipterocarpáceas" } },
    donquijotesco: { example: { word: "donquijotesca" } },
    duenesco: { exampleSynonym: { word: "propio de las dueñas", text: "El relato retrata con humor el ambiente propio de las dueñas de la casa." } },
    ebenaceo: { example: { word: "ebenácea" } },
    ejecutadero: { example: { word: "ejecutadera" } },
    englantado: { example: { word: "englantada" } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.es || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5232 expected one es/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5232 missing ${field} on es/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
