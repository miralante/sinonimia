/* Literal example fixes for Spanish A–C entries flagged by check.js. */
(() => {
  const changes = {
    analizar: { example: { word: "analizó" }, exampleSynonym: { word: "estudió" } },
    apurado: { example: { word: "apurada" } },
    arar: { example: { word: "aró" }, exampleSynonym: { word: "aricó" } },
    arder: {
      synonyms: ["estar encendida"],
      exampleSynonym: { word: "estar encendida" },
    },
    asignar: {
      synonyms: ["determinar la propiedad o responsabilidad"],
      exampleSynonym: { word: "determinar la propiedad o responsabilidad", text: "La directora debe determinar la propiedad o responsabilidad de cada recurso y tarea." },
    },
    aterrizar: {
      synonyms: ["posarse en el suelo"],
      exampleSynonym: { word: "posarse en el suelo" },
    },
    atraer: { exampleSynonym: { text: "El imán puede captar pequeños objetos de hierro cuando los atrae." } },
    automatica: { exampleSynonym: { text: "La puerta que funciona automáticamente se abrió cuando el sensor detectó movimiento." } },
    automotriz: {
      synonyms: ["relativo a los vehículos de motor"],
      exampleSynonym: { word: "relativo a los vehículos de motor", text: "El diseño automotor, relativo a los vehículos de motor, incorporó modelos eléctricos." },
    },
    ayuno: {
      synonyms: ["abstención de ingerir alimentos"],
      exampleSynonym: { word: "abstención de ingerir alimentos" },
    },
    baldio: {
      synonyms: ["terreno común de un pueblo"],
      exampleSynonym: { word: "terreno común de un pueblo" },
    },
    banar: {
      synonyms: ["sumergir en agua"],
      exampleSynonym: { word: "sumergir en agua", text: "La madre decidió sumergir en agua el juguete del bebé antes de dormir." },
    },
    barata: {
      synonyms: ["cucaracha"],
      exampleSynonym: { word: "cucaracha" },
    },
    basar: {
      example: { word: "se basa" },
      synonyms: ["asentarse sobre una base"],
      exampleSynonym: { word: "se asienta sobre una base" },
    },
    bastar: {
      synonyms: ["ser suficientes y proporcionadas"],
      exampleSynonym: { word: "ser suficientes y proporcionadas", text: "Dos firmas deben ser suficientes y proporcionadas para aprobar el trámite." },
    },
    bayoneta: { exampleSynonym: { text: "La bayoneta es un arma blanca afilada que se exhibe junto al fusil antiguo." } },
    bebedor: { exampleSynonym: { text: "El bebedor es alguien que bebe, sobre todo si bebe mucho." } },
    bici: {
      synonyms: ["bicicleta"],
      exampleSynonym: { word: "bicicleta" },
    },
    bilateral: {
      synonyms: ["relativo a dos lados o facciones o partidos implicados"],
      exampleSynonym: { word: "relativo a dos lados o facciones o partidos implicados" },
    },
    bis: {
      synonyms: ["repetición de la actuación"],
      exampleSynonym: { word: "repetición de la actuación" },
    },
    blindado: {
      synonyms: ["acorazado"],
      exampleSynonym: { word: "acorazado" },
    },
    bonzo: {
      synonyms: ["monje budista"],
      exampleSynonym: { word: "monje budista", text: "El monje budista recibió a los visitantes en el templo." },
    },
    bucear: {
      synonyms: ["nadar sumergido"],
      exampleSynonym: { word: "nadar sumergido" },
    },
    caber: {
      synonyms: ["estar contenido dentro"],
      exampleSynonym: { word: "estar contenido dentro" },
    },
    cachorro: {
      exampleSynonym: { text: "El hijo de corta edad de algunos mamíferos como el perro recibió alimento en la madriguera." },
    },
    camarada: {
      exampleSynonym: { text: "Un camarada es el que acompaña a otro y comparte el viaje." },
    },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.es || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5213 expected one es/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") {
        matches[0][field] = values;
      } else {
        if (!matches[0][field]) throw new Error(`v5213 missing ${field} on es/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
