/* Literal example fixes for Spanish A entries flagged by check.js. */
(() => {
  const changes = {
    amalayar: { exampleSynonym: { word: "anhelaba" } },
    amapolar: { example: { word: "amapoló" }, exampleSynonym: { word: "enrojeció" } },
    amarchantarse: { example: { word: "amarchantó" }, exampleSynonym: { word: "se hizo cliente habitual" } },
    amariconar: { example: { word: "amariconó" }, exampleSynonym: { word: "afeminó" } },
    amenorgar: { example: { word: "amenorgó" }, exampleSynonym: { word: "menguó" } },
    amillarar: {
      example: { word: "amillaró" },
      synonyms: ["regular los caudales para repartir contribuciones"],
      exampleSynonym: { word: "regular los caudales", text: "El ayuntamiento tuvo que regular los caudales para repartir las contribuciones entre los vecinos." },
    },
    amoragar: { exampleSynonym: { text: "Al caer la tarde, decidieron asar a la leña las sardinas junto a la orilla." } },
    amosquilarse: {
      example: { word: "amosquilaron" },
      synonyms: ["buscar refugio de las moscas"],
      exampleSynonym: { word: "buscaron refugio de las moscas", text: "Al mediodía, las vacas buscaron refugio de las moscas bajo los árboles." },
    },
    amostrar: { example: { word: "amostró" }, exampleSynonym: { word: "mostró" } },
    amoyote: { exampleSynonym: { word: "mosquitos lacustres comestibles" } },
    amurrinarse: { example: { word: "amurriñó" }, exampleSynonym: { word: "entristeció" } },
    analco: { exampleSynonym: { text: "El barrio separado por un río quedaba al otro lado del cauce que atravesaba el pueblo." } },
    anarcoide: { exampleSynonym: { text: "La prensa calificó al grupo de tendente al desorden por su conducta." } },
    anascote: { exampleSynonym: { text: "El anascote es una tela de lana para mantos, ligera y de tejido diagonal." } },
    anatemizar: { exampleSynonym: { text: "El concilio resolvió anatematizar a quien persistiera en aquella doctrina." } },
    andaboba: {
      synonyms: ["parar"],
      exampleSynonym: { word: "parar" },
    },
    andel: { exampleSynonym: { word: "rodadas de carro" } },
    andurrial: { exampleSynonym: { word: "parajes apartados" } },
    anglicanizante: { exampleSynonym: { text: "El ensayo cuestionaba una tendencia que imita lo anglicano en algunas reformas litúrgicas." } },
    angorra: {
      synonyms: ["protección de cuero", "protección de tela gruesa"],
      exampleSynonym: { word: "protección de cuero" },
    },
    aniquilante: { exampleSynonym: { text: "La sequía es un fenómeno que aniquila los cultivos." } },
    antepuerta: {
      synonyms: ["cortina delante de la puerta"],
      exampleSynonym: { word: "cortina delante de la puerta", text: "En invierno colgaban una cortina delante de la puerta para cortar las corrientes de aire." },
    },
    antevenir: { example: { word: "antevino" }, exampleSynonym: { word: "precedió" } },
    anticrisis: { exampleSynonym: { text: "El gobierno anunció un plan para combatir una crisis económica y apoyar a las familias." } },
    antisolar: { exampleSynonym: { text: "El protector solar protege la piel de los efectos de la radiación." } },
    antologizar: { exampleSynonym: { text: "La editora decidió incluir en una antología los poemas de la autora." } },
    antropomorfizar: { example: { word: "antropomorfiza" }, exampleSynonym: { word: "dio forma humana" } },
    anacear: { example: { word: "anaceaban" }, exampleSynonym: { word: "se regocijaban" } },
    anares: {
      synonyms: ["añares"],
      exampleSynonym: { word: "añares", text: "¡Añares sin verte! ¿Cómo te ha ido?" },
    },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.es || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5223 expected one es/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") {
        matches[0][field] = values;
      } else {
        if (!matches[0][field]) throw new Error(`v5223 missing ${field} on es/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
