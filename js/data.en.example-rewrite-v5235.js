/* Literal example fixes for Spanish entries flagged by check.js. */
(() => {
  const changes = {
    "round2396-entranar-introduce-deeply": { exampleSynonym: { word: "internó", text: "El frío le internó un dolor profundo en los huesos." } },
    "round2396-entranarse-unite-intimately": { exampleSynonym: { word: "estrecharon sus lazos" } },
    "round2398-entrecoger-pressure": { example: { word: "entrecogieron" } },
    "round2400-entreguerras-world-wars": { exampleSynonym: { word: "interbélica" } },
    "round2401-entremeter-diaper": { example: { word: "entremetió" }, exampleSynonym: { word: "ajustó el pañal" } },
    "round2401-entremeter-meddle": { example: { word: "entremetas" }, exampleSynonym: { word: "entrometas" } },
    "round2401-entremeter-stand-between": { example: { word: "entremetió" }, exampleSynonym: { word: "interpuso" } },
    "round2405-entresacar-vegetation": { example: { word: "entresacó" }, exampleSynonym: { word: "espació las plantas", text: "El agricultor espació las plantas para que tuvieran más lugar." } },
    "round2405-entresacar-hair": { example: { word: "entresacó" }, exampleSynonym: { word: "quitó volumen al pelo" } },
    "round2405-entretallar-engrave": { example: { word: "entretalló" }, exampleSynonym: { word: "esculpió" } },
    "round2405-entretallar-fabric": { example: { word: "entretalló" }, exampleSynonym: { word: "hizo calados en la tela" } },
    "round2405-entretallar-obstruct": { example: { word: "entretalló" }, exampleSynonym: { word: "estorbó el paso" } },
    "round2405-entretallar-jam": { example: { word: "entretalló" }, exampleSynonym: { word: "atascó" } },
    "round2405-entretallar-salamanca": { example: { word: "entretalló" }, exampleSynonym: { word: "quedó atrapado" } },
    "round2406-entretejer-interlace": { example: { word: "entreteje" }, exampleSynonym: { word: "entrelaza" } },
    "round2406-entretelar-printing": { example: { word: "entreteló" }, exampleSynonym: { word: "alisó los pliegos" } },
    "round2407-entrever-suspect": { example: { word: "entreví" }, exampleSynonym: { word: "sospeché" } },
    "round2415-enviciar-plant": { exampleSynonym: { text: "El exceso de abono envició las tomateras, que dieron pocos frutos." } },
    "round2417-enyugar-bell": { exampleSynonym: { text: "Los campaneros sujetaron con un yugo la campana antes de instalarla." } },
    "round2420-epacta-december": { example: { text: "El almanaque señalaba la epacta, la edad de la luna al comenzar enero." }, exampleSynonym: { text: "La edad de la luna al comenzar enero ayudaba a calcular las fechas festivas." } },
    "round2420-epacta-calendar": { example: { text: "Consultó la epacta para encontrar las fiestas y fechas del año." }, exampleSynonym: { text: "El calendario anual indicaba las fiestas y fechas de cada mes." } },
    "round2420-epanastrofe-conduplicacion": { example: { text: "La epanástrofe, una conduplicación retórica, repite una expresión para darle énfasis." }, exampleSynonym: { text: "La conduplicación repite una expresión para darle énfasis." } },
    "round2421-epicedio-elegy": { example: { text: "El poeta compuso un epicedio para lamentar la muerte de su amiga y alabar sus cualidades." }, exampleSynonym: { text: "Escribió una elegía fúnebre para llorar la muerte de su amiga y recordar sus cualidades." } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.es || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5235 expected one es/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5235 missing ${field} on es/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
