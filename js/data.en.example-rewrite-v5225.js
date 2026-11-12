/* Literal example fixes for Spanish A entries flagged by check.js. */
(() => {
  const changes = {
    apunar: { exampleSynonym: { word: "asió", text: "Asió el mango de la herramienta con fuerza." } },
    aquedar: { example: { word: "aquedó" } },
    aquerarse: { example: { word: "aqueró" } },
    arepita: { exampleSynonym: { word: "tortitas de maíz con queso" } },
    aresta: { exampleSynonym: { text: "La púa de una planta se enganchó en su manga." } },
    arestil: { exampleSynonym: { text: "El veterinario trató el sarpullido con picor que afectaba las patas del caballo." } },
    armos: { exampleSynonym: { word: "cruz de la mula" } },
    arremetedero: { exampleSynonym: { word: "punto vulnerable de la fortificación" } },
    arretranca: { exampleSynonym: { word: "freno del carro" } },
    arrieril: { exampleSynonym: { word: "vida propia de los arrieros" } },
    arrimon: { exampleSynonym: { text: "El arrimón, una persona apoyada en una pared, esperaba en la plaza." } },
    arrodelar: { exampleSynonym: { text: "El escudero tuvo que proteger con una rodela al caballero durante el ataque." } },
    arrugia: { exampleSynonym: { text: "Los arqueólogos estudiaron una excavación minera antigua en la zona." } },
    arrunflar: { exampleSynonym: { text: "En aquella mano logró reunir cartas del mismo palo: casi todas eran de oros." } },
    arrutar: { exampleSynonym: { text: "El cuidador salió al campo para ahuyentar aves de la siembra." } },
    artesilla: { exampleSynonym: { word: "cajón de la noria" } },
    artolas: { exampleSynonym: { word: "asientos de la caballería" } },
    asaetear: { exampleSynonym: { text: "Los arqueros saetearon el escudo durante el asalto." } },
    asainetear: { example: { word: "asaineteó" }, exampleSynonym: { word: "amenizó" } },
    asechar: { exampleSynonym: { text: "El rival trató de tender asechanzas al viajero para robarle el equipaje." } },
    asediante: { exampleSynonym: { text: "El ejército asediador rodeó la fortaleza durante semanas." } },
    aseglarizar: { exampleSynonym: { text: "La norma pretendía secularizar la vida del religioso." } },
    aselar: { exampleSynonym: { text: "Al anochecer, las gallinas empezaron a posarse para dormir en las ramas." } },
    asobinarse: { example: { word: "asobinó" }, exampleSynonym: { word: "quedó encogido" } },
    asoldar: { example: { word: "asoldó" }, exampleSynonym: { word: "reclutó" } },
    asondar: { example: { word: "asondó" }, exampleSynonym: { word: "sondeó" } },
    asordinar: { example: { word: "asordinó" }, exampleSynonym: { word: "amortiguó" } },
    aspro: { exampleSynonym: { text: "El inventario antiguo consignaba el pago de una moneda turca histórica." } },
    astero: {
      synonyms: ["encargado de las lanzas", "fabricante de astas", "soldado romano con lanza"],
      exampleSynonym: { word: "encargado de las lanzas" },
    },
    asturiense: {
      synonyms: ["propios de la etapa asturiense"],
      exampleSynonym: { word: "propios de la etapa asturiense", text: "En el yacimiento aparecieron útiles propios de la etapa asturiense, característicos de ese periodo." },
    },
    asumible: { exampleSynonym: { word: "se podía asumir" } },
    atabillar: { exampleSynonym: { word: "plegar el paño de lana para revisarlo" } },
    atacir: { exampleSynonym: { word: "división celeste en doce casas" } },
    ataderas: { exampleSynonym: { text: "La descripción antigua menciona unas ligas para medias de seda." } },
    atapierna: { exampleSynonym: { text: "La atapierna es una liga de media que se coloca por encima de la rodilla." } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.es || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5225 expected one es/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") {
        matches[0][field] = values;
      } else {
        if (!matches[0][field]) throw new Error(`v5225 missing ${field} on es/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
