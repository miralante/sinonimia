/* Literal example fixes for Spanish A entries flagged by check.js. */
(() => {
  const changes = {
    abrazo: {
      synonyms: ["acción de abrazar"],
      exampleSynonym: { word: "acción de abrazar" },
    },
    abrigado: { example: { word: "abrigada" }, exampleSynonym: { word: "resguardada" } },
    acalorado: { example: { word: "acalorada" } },
    acaparar: {
      example: { word: "acaparó" },
      synonyms: ["reunir posesiones y poder"],
      exampleSynonym: { word: "reunir posesiones y poder" },
    },
    acarrear: {
      synonyms: ["transportar en carro"],
      exampleSynonym: { word: "transportar en carro", text: "Los vecinos tuvieron que transportar en carro la grava hasta la obra." },
    },
    acertar: { example: { word: "acertó" }, exampleSynonym: { word: "descifró" } },
    acoger: { example: { word: "acoge" }, exampleSynonym: { word: "recibe" } },
    acomodar: { example: { word: "acomodó" }, exampleSynonym: { word: "arregló" } },
    aconsejar: {
      example: { word: "aconsejó" },
      exampleSynonym: { text: "La doctora logró brindar consejo a los pacientes sobre el descanso." },
    },
    acordeon: { exampleSynonym: { text: "El instrumento musical polifónico de viento (aerófono) sonó durante el baile de la fiesta del barrio." } },
    acostumbrar: {
      example: { word: "acostumbra" },
      synonyms: ["tener la costumbre de"],
      exampleSynonym: { word: "tiene la costumbre de", text: "Mi vecino tiene la costumbre de correr por el parque al amanecer." },
    },
    acuatico: { example: { word: "acuática" } },
    acusador: {
      synonyms: ["realizar la acusación"],
      exampleSynonym: { word: "realiza la acusación" },
    },
    adaptar: { example: { word: "adaptó" }, exampleSynonym: { word: "acomodó" } },
    adelantar: {
      example: { word: "adelantó" },
      exampleSynonym: { text: "El ciclista logró pasar delante de otro vehículo antes del cruce." },
    },
    adictivo: {
      synonyms: ["que genera adicción"],
      exampleSynonym: { word: "que genera adicción" },
    },
    adinerado: { example: { word: "adinerada" }, exampleSynonym: { word: "rica" } },
    adivinar: { example: { word: "adivinó" }, exampleSynonym: { word: "barruntó" } },
    administrador: {
      exampleSynonym: { text: "Una persona que se ocupa de la administración de algo, como un edificio, debe mantener sus cuentas al día." },
    },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.es || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5211 expected one es/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") {
        matches[0][field] = values;
      } else {
        if (!matches[0][field]) throw new Error(`v5211 missing ${field} on es/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
