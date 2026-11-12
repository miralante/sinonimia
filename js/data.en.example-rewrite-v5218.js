/* Literal example fixes for Spanish Q–E entries flagged by check.js. */
(() => {
  const changes = {
    propuesta: { exampleSynonym: { text: "El comité aprobó la proposición de ampliar el horario." } },
    remover: {
      synonyms: ["reabrir un asunto"],
      exampleSynonym: { word: "reabrir un asunto", text: "La noticia volvió a reabrir un asunto olvidado." },
    },
    varada: { exampleSynonym: { word: "varamiento" } },
    aturar: { exampleSynonym: { text: "Al notar su enojo, el pastor intentó moderarse antes de responder." } },
    quinchar: { exampleSynonym: { text: "Decidieron cubrir con quinchas la parcela de caña." } },
    rabosear: { exampleSynonym: { text: "La rama llegó a deslucir la pintura de la puerta." } },
    recudir: { exampleSynonym: { text: "La institución tuvo que pagar a los beneficiarios la cantidad que les correspondía." } },
    redolar: { example: { word: "redolando" }, exampleSynonym: { word: "girando" } },
    rujiar: { exampleSynonym: { text: "Al atardecer salió a rociar las plantas del patio." } },
    rumbar: { exampleSynonym: { word: "gruñir" } },
    saetar: { exampleSynonym: { word: "flechar" } },
    zacatear: { exampleSynonym: { text: "El personaje cuenta que de niño lo llegaron a azotar." } },
    lazar: { exampleSynonym: { text: "El vaquero consiguió enlazar al ternero que se había escapado." } },
    atraible: { exampleSynonym: { word: "susceptibles de ser atraídas" } },
    atramuz: { exampleSynonym: { word: "altramuces" } },
    autodominio: { exampleSynonym: { word: "dominio de sí misma" } },
    autoinducir: { exampleSynonym: { text: "Al variar la corriente, la bobina puede producir por autoinducción una fuerza electromotriz." } },
    disecable: { exampleSynonym: { text: "El ejemplar que puede disecarse se conserva para la colección de ciencias naturales." } },
    doselera: { exampleSynonym: { text: "La cenefa de dosel, bordada a mano, enmarcaba la cama antigua." } },
    durofrio: { exampleSynonym: { word: "helados de fruta" } },
    eclipsable: { exampleSynonym: { word: "quedar oscurecida" } },
    edificable: { exampleSynonym: { word: "apta para construir" } },
    efigiar: { exampleSynonym: { text: "El escultor decidió representar en efigie al monarca." } },
    elijable: { exampleSynonym: { word: "apta para elijar" } },
    elipsoidal: {
      synonyms: ["forma de elipsoide", "ovoide"],
      exampleSynonym: { word: "forma de elipsoide" },
    },
    embanastar: { exampleSynonym: { text: "Al final de la cosecha, ayudaron a poner en una banasta las frutas." } },
    embarrilar: { exampleSynonym: { text: "La bodega decidió envasar en barriles el vino de la nueva cosecha." } },
    embarrotar: { exampleSynonym: { text: "El carpintero tuvo que reforzar con barrotes la puerta." } },
    embaular: { exampleSynonym: { text: "Tuvieron que guardar en un baúl los disfraces antes de viajar." } },
    embejucar: { exampleSynonym: { text: "Antiguamente solían cubrir con lianas la estructura." } },
    embijar: { exampleSynonym: { text: "El artesano solía teñir con bija las piezas de madera." } },
    embodegar: { exampleSynonym: { text: "La cooperativa decidió almacenar en una bodega el vino hasta la primavera." } },
    embolsillarse: {
      example: { word: "embolsilló" },
      exampleSynonym: { word: "se apropió del dinero", text: "El intermediario se apropió del dinero destinado al proyecto." },
    },
    embonigar: { exampleSynonym: { text: "El agricultor decidió abonar con estiércol el terreno antes de sembrar." } },
    emboquera: { exampleSynonym: { text: "La cubierta de sacos de cisco los protegía de la lluvia." } },
    embornar: { exampleSynonym: { text: "El técnico tuvo que conectar mediante bornes los conductores antes de cerrar el cuadro." } },
    emborrazar: { exampleSynonym: { text: "El cocinero decidió preparar un ave para asar en el horno." } },
    emborricarse: { example: { word: "emborricó" }, exampleSynonym: { word: "se quedó bloqueado" } },
    embroquetar: { exampleSynonym: { text: "Antes de asar el ave, el cocinero tuvo que sujetar con broquetas sus piernas." } },
    embuzonar: { exampleSynonym: { text: "La banda intentó esconder armas fuera de la ciudad." } },
    empadrarse: { exampleSynonym: { text: "Durante las vacaciones, el niño empezó a encariñarse con el padre." } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.es || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5218 expected one es/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") {
        matches[0][field] = values;
      } else {
        if (!matches[0][field]) throw new Error(`v5218 missing ${field} on es/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
