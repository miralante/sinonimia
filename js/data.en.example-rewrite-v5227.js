/* Literal example fixes for Spanish D–E entries flagged by check.js. */
(() => {
  const changes = {
    dismnesia: { exampleSynonym: { text: "La evaluación detectó una debilidad de la memoria leve, sin pérdida completa de los recuerdos." } },
    doladera: { exampleSynonym: { text: "El tonelero empleó una azuela de tonelero para ajustar las duelas." } },
    dotacional: { exampleSynonym: { text: "El espacio estaba destinado a equipamientos públicos." } },
    dotal: { exampleSynonym: { text: "El régimen era relativo a la dote y sus disposiciones." } },
    dragonear: { exampleSynonym: { text: "Durante la ausencia del jefe, le tocó suplir temporalmente un cargo superior." } },
    duunviral: { exampleSynonym: { word: "duunviralicia" } },
    eclesial: { exampleSynonym: { word: "eclesiástica" } },
    elami: { exampleSynonym: { text: "El catálogo describe la pieza como un objeto relativo a Elam." } },
    electrolizar: { exampleSynonym: { text: "El método consiste en someter a electrólisis una muestra de agua para obtener hidrógeno." } },
    emballenar: { exampleSynonym: { text: "La modista decidió reforzar con varillas el corpiño." } },
    embanquetar: { exampleSynonym: { text: "El anfitrión quiso agasajar con un banquete a sus invitados." } },
    embocicar: { exampleSynonym: { text: "Tuvieron que introducir en un hueco estrecho la pieza." } },
    emborujarse: { example: { word: "emborujó" }, exampleSynonym: { word: "arrebujó" } },
    emetina: { exampleSynonym: { text: "La emetina es un alcaloide de la ipecacuana descrito en antiguos tratados de farmacología." } },
    empotrerar: { exampleSynonym: { text: "Al amanecer salieron a poner ganado a pastar." } },
    enancarse: { example: { word: "enancó" }, exampleSynonym: { word: "montó a las ancas", text: "El niño montó a las ancas de la yegua para cruzar el campo." } },
    encabrestar: { exampleSynonym: { text: "Tuvieron que poner el cabestro al potro antes de llevarlo al establo." } },
    encachilarse: { example: { word: "encachiló" }, exampleSynonym: { word: "obstinó", text: "Se obstinó y persistió en su decisión." } },
    encodillarse: { example: { word: "encodilló" }, exampleSynonym: { word: "guareció" } },
    enertarse: { example: { word: "enertasen" }, exampleSynonym: { word: "quedaran rígidas" } },
    enfusar: { example: { word: "enfusó" }, exampleSynonym: { word: "mezcló" } },
    engarbullar: { example: { word: "engarbulló" }, exampleSynonym: { word: "enrolló" } },
    engolletarse: { example: { word: "engolletó" }, exampleSynonym: { word: "enroscó" } },
    engolondrinar: { exampleSynonym: { text: "La torre abandonada llegó a poblar de golondrinas el campanario en primavera." } },
    enguaraparse: { example: { word: "enguarapó" }, exampleSynonym: { word: "arropó" } },
    enjitomatar: { exampleSynonym: { word: "Mezclaron jitomate y cebolla", text: "Mezclaron jitomate y cebolla para preparar la salsa." } },
    enlistar: { example: { word: "enlistó" }, exampleSynonym: { word: "enumeró" } },
    enrocarse: { example: { word: "enrocó" }, exampleSynonym: { word: "enrocó" } },
    enserenar: { exampleSynonym: { text: "Dejaron la ropa en el patio para orear durante la noche." } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.es || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5227 expected one es/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5227 missing ${field} on es/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
