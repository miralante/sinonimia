/* Literal example fixes for Spanish entries flagged by check.js. */
(() => {
  const changes = {
    "round3318-lavaloza-machine": { synonyms: ["lavavajillas", "máquina lavaplatos"], exampleSynonym: { word: "lavavajillas" } },
    "round3319-laxante-adjective": { exampleSynonym: { word: "favoreció la evacuación" } },
    "round3321-lazo-lasso": { exampleSynonym: { word: "cuerda corrediza" } },
    "round3321-laxitud-strictness": { synonyms: ["falta de rigor", "laxitud"], exampleSynonym: { word: "falta de rigor", text: "La falta de rigor en la aplicación de las normas preocupó al comité." } },
    "round3333-lenificar-intransitive": { example: { word: "lenificó" }, exampleSynonym: { word: "mitigó" } },
    "round3344-liar-wrap": { example: { word: "lía" }, exampleSynonym: { word: "envuelve" } },
    "round3344-liar-confuse": { example: { word: "líes" }, exampleSynonym: { word: "confundas" } },
    "round3345-libar-sip": { example: { word: "libó" }, exampleSynonym: { word: "bebió el vino a pequeños sorbos" } },
    "round3345-levogiro-optical": { example: { word: "levógira" }, exampleSynonym: { word: "levorrotatoria" } },
    "round3346-libertar-moral": { exampleSynonym: { word: "librarse de la culpa" } },
    "round3346-libra-currency": { synonyms: ["moneda de curso legal", "divisa"], exampleSynonym: { text: "La libra es una moneda de curso legal en Siria." } },
    "round3346-libra-sterling": { exampleSynonym: { word: "libras esterlinas", text: "El precio es de veinte libras esterlinas." } },
    "round3347-librea-festive": { exampleSynonym: { text: "El caballero lució un traje de fiesta antiguo durante el desfile." } },
    "round3348-licencia-commercial": { exampleSynonym: { text: "La empresa pagó por un permiso para explotar una marca." } },
    "round3349-licenciatura-studies": { exampleSynonym: { text: "Cursó estudios universitarios para ese grado durante cinco años." } },
    "round3349-licitar-call": { example: { word: "licitó" }, exampleSynonym: { word: "pidió ofertas públicas" } },
    "round3352-lidiar-confront": { example: { word: "lidió" }, synonyms: ["enfrentarse", "tratar con"], exampleSynonym: { word: "se enfrentó" } },
    "round3353-lienterico-patient": { exampleSynonym: { word: "paciente con lientería" } },
    "round3353-ligado-writing": { exampleSynonym: { word: "unión de las letras" } },
    "round3353-ligado-music-tie": { exampleSynonym: { text: "La unión musical de notas mantuvo el sonido durante dos compases." } },
    "molienda-2": { exampleSynonym: { word: "carga de aceitunas para moler" } },
    "neocatolico-2": { exampleSynonym: { word: "partidario del neocatolicismo" } },
    "neofito-religion": { exampleSynonym: { word: "nuevos conversos" } },
    "neolitico-adj": { example: { word: "neolíticas" }, exampleSynonym: { word: "relativas al Neolítico", text: "Hallaron herramientas relativas al Neolítico en la cueva." } },
    "nervio-libro-cuerda": { exampleSynonym: { text: "El encuadernador añadió un cordón de encuadernación al lomo del libro." } },
    "nervio-libro-relieve": { exampleSynonym: { text: "El relieve del lomo sobresalía en la cubierta." } },
    "nervio-razon": { exampleSynonym: { text: "La fuerza del argumento convenció al jurado." } },
    "neurotoxico-sustancia": { exampleSynonym: { text: "Algunos pesticidas contienen neurotoxinas dañinas para el sistema nervioso." } },
    "neurotico-relativo": { exampleSynonym: { word: "relativos a la neurosis", text: "El estudio describió rasgos relativos a la neurosis." } },
    "nevado-montana": { exampleSynonym: { text: "La montaña nevada se veía desde el valle." } },
    "nicho-cementerio": { synonyms: ["nicho funerario", "sepultura"], exampleSynonym: { word: "nicho funerario", text: "La familia visitó el nicho funerario." } },
    "nidada-polluelos": { exampleSynonym: { text: "Los polluelos de la misma pollada salieron del nido por primera vez." } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.es || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5243 expected one es/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5243 missing ${field} on es/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
