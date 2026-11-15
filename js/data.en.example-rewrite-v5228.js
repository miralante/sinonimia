/* Literal example fixes for Spanish entries flagged by check.js. */
(() => {
  const changes = {
    ascendente: { exampleSynonym: { text: "El sendero que asciende lleva hasta la cima." } },
    ecu: { exampleSynonym: { text: "El contrato fijó el valor en una unidad monetaria europea." } },
    electrodinamico: { example: { word: "electrodinámica" }, exampleSynonym: { word: "relativa a la electrodinámica" } },
    amarguero: { exampleSynonym: { word: "espárragos silvestres de los eriazos" } },
    embarbillar: { exampleSynonym: { text: "El carpintero decidió ensamblar maderos para construir el marco." } },
    diocesano: { exampleSynonym: { word: "relativa a una diócesis", text: "El archivo conserva documentación relativa a una diócesis." } },
    dionisiaco: { example: { word: "dionisíaca" }, exampleSynonym: { word: "báquica" } },
    escamoso: { example: { word: "escamosa" }, exampleSynonym: { word: "cubierta de escamas" } },
    fornicador: { exampleSynonym: { text: "El texto religioso llamaba fornicador a la persona que fornica fuera del matrimonio." } },
    estrangulador: { exampleSynonym: { word: "obstruía" } },
    estrategico: { example: { word: "estratégica" } },
    "agravante-lexical1": { exampleSynonym: { text: "La reincidencia se consideró un factor agravatorio." } },
    autobusero: { example: { word: "autobusera" } },
    ditono: { exampleSynonym: { text: "En el sistema pitagórico, la tercera mayor pitagórica tiene una razón de 81:64." } },
    eccematoso: { example: { word: "eccematosa" }, exampleSynonym: { word: "eczematosa" } },
    elogioso: { example: { word: "elogiosa" }, exampleSynonym: { word: "laudatoria" } },
    enfisematoso: { exampleSynonym: { word: "relacionados con el enfisema", text: "La radiografía mostró cambios relacionados con el enfisema pulmonar." } },
    epanalepsis: { example: { text: "En «Verde que te quiero verde» aparece una epanalepsis, repetición inicial y final de una palabra." }, exampleSynonym: { text: "En «Verde que te quiero verde» aparece una epanalepsis, repetición inicial y final de una palabra." } },
    epitafico: { example: { word: "epitáfica" }, exampleSynonym: { word: "funeraria" } },
    exocitosis: { exampleSynonym: { text: "La célula libera ciertas moléculas mediante una secreción por vesículas." } },
    feucho: { exampleSynonym: { text: "El dibujo quedó algo feo, aunque transmitía bien la idea." } },
    grecorromano: { example: { word: "grecorromana" } },
    discografico: { example: { word: "discográfica" } },
    autolesivo: { synonyms: ["que se vuelve contra quien la realiza"], example: { word: "autolesiva" }, exampleSynonym: { word: "que se vuelve contra quien la realiza", text: "El informe describía una conducta que se vuelve contra quien la realiza y recomendaba buscar apoyo especializado." } },
    disimbolo: { example: { word: "disímbolas" } },
    diversivo: { example: { word: "diversiva" } },
    dogmatizar: { exampleSynonym: { text: "No conviene sostener dogmáticamente una hipótesis antes de reunir pruebas." } },
    duendo: { example: { word: "duenda" }, exampleSynonym: { word: "mansa" } },
    eczematoso: { example: { word: "eczematosa" }, exampleSynonym: { word: "afectada de eczema", text: "El médico recomendó un tratamiento para la zona afectada de eczema." } },
    electronegativo: { exampleSynonym: { text: "El flúor es de alta electronegatividad." } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.es || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5228 expected one es/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5228 missing ${field} on es/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
