/* Literal example fixes for Spanish E entries flagged by check.js. */
(() => {
  const changes = {
    empapelonarse: { example: { word: "empapelonó" }, exampleSynonym: { word: "embrolló" } },
    empericarse: { example: { word: "empericó" }, exampleSynonym: { word: "acicaló" } },
    empericuetarse: { example: { word: "empericuetó" }, exampleSynonym: { word: "arregló" } },
    empestillarse: { example: { word: "empestilló" }, exampleSynonym: { word: "obstinó" } },
    empurrarse: { example: { word: "empurró" }, exampleSynonym: { word: "escondió la cara" } },
    enamoriscarse: { example: { word: "enamoriscó" }, exampleSynonym: { word: "encaprichó" } },
    encarajinarse: { example: { word: "encarajinó" }, exampleSynonym: { word: "encolerizó" } },
    encuevar: { example: { word: "encuevó" }, exampleSynonym: { word: "encovó" } },
    enculillarse: { example: { word: "enculilló" }, exampleSynonym: { word: "acobardó" } },
    encunetarse: { example: { word: "encunetó" }, exampleSynonym: { word: "quedó atascado" } },
    endehesar: { exampleSynonym: { text: "El pastor decidió llevar a la dehesa el rebaño durante el otoño." } },
    endoselar: { exampleSynonym: { text: "Decidieron cubrir con un dosel el estrado para la ceremonia." } },
    enfiebrarse: { example: { word: "enfiebró" }, exampleSynonym: { word: "entusiasmó" } },
    enfirolar: { example: { word: "enfiroló" }, exampleSynonym: { word: "se arregló" } },
    enfroscarse: { example: { word: "enfroscó" }, exampleSynonym: { word: "se enfrascó" } },
    enfunarse: { example: { word: "enfuñó" }, exampleSynonym: { word: "se enfadó" } },
    enfusir: { example: { word: "enfusían" }, exampleSynonym: { word: "embutían" } },
    engarbarse: { example: { word: "engarbó" }, exampleSynonym: { word: "se encaramó" } },
    engavetar: { exampleSynonym: { text: "La oficina decidió dejar en suspenso el proyecto sin dar explicaciones." } },
    engeridor: { exampleSynonym: { text: "El glosario antiguo usa este término para el hombre que ingiere la sustancia." } },
    engominarse: { example: { word: "engominó" }, exampleSynonym: { word: "se peinó con gomina" } },
    engonzar: { example: { word: "engonzó" }, exampleSynonym: { word: "abisagró" } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.es || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5219 expected one es/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") {
        matches[0][field] = values;
      } else {
        if (!matches[0][field]) throw new Error(`v5219 missing ${field} on es/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
