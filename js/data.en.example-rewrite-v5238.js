/* Literal example fixes for Spanish entries flagged by check.js. */
(() => {
  const changes = {
    "round2459-escayolar-cast": { exampleSynonym: { word: "enyesó", text: "El médico enyesó el tobillo del paciente." } },
    "round2459-escavador-person": { exampleSynonym: { text: "El cavador abrió el terreno con una pala." } },
    "round2459-escenico-design": { example: { word: "escénica" } },
    "round2487-eslavismo-interest": { exampleSynonym: { text: "El libro refleja el interés por la cultura eslava de su autora." } },
    "round2487-eslabonar-figurative": { example: { word: "eslabona" }, exampleSynonym: { word: "conecta" } },
    "round2488-esmaltar-colors": { example: { word: "esmaltó" }, exampleSynonym: { word: "decoró" } },
    "round2488-esmaltar-illustrate": { example: { word: "esmaltaba" }, exampleSynonym: { word: "adornaba" } },
    "round2489-esmerar-care": { example: { word: "esmeró" }, exampleSynonym: { word: "esforzó mucho" } },
    "round2489-esmerilar-glass": { exampleSynonym: { word: "deslustraron el vidrio" } },
    "round2490-esoterico-occult": { example: { word: "esotéricas" } },
    "round2491-espaciar-temporal": { exampleSynonym: { word: "separar las visitas en el tiempo" } },
    "round2496-espanolizar-language": { example: { word: "españolizó" }, exampleSynonym: { word: "castellanizó" } },
    "round2496-espanolizar-pronominal": { example: { word: "españolizó" }, exampleSynonym: { word: "adoptó costumbres españolas" } },
    "round2497-esparcir-noticia": { example: { word: "esparció" }, exampleSynonym: { word: "difundió" } },
    "round2498-espartillo-colloquial-expression": { example: { word: "cogí a mi vecino al espartillo" }, exampleSynonym: { word: "me encontré por casualidad" } },
    "round2508-espetar-pierce": { example: { word: "espetó" }, exampleSynonym: { word: "pinchó" } },
    "round2508-espichar-die-colloquial": { example: { word: "espichó" }, exampleSynonym: { word: "murió" } },
    "round2509-espigar-information": { example: { word: "espigó" }, exampleSynonym: { word: "reunió información", text: "La autora reunió información de varios diarios antiguos." } },
    "round2511-espira-column-base": { exampleSynonym: { word: "parte inferior", text: "La parte inferior decoraba la base de la columna." } },
    "round2511-espirar-release-scent": { example: { word: "espiraban" }, exampleSynonym: { word: "despedían aroma", text: "Las flores despedían aroma suave." } },
    "round2514-espolear-incite": { example: { word: "espoleó" }, exampleSynonym: { word: "impulsó" } },
    "round2516-esponjar-pride": { example: { word: "esponjó" }, exampleSynonym: { word: "engrió" } },
    "round2519-espulgar-examine": { example: { word: "espulgó" }, exampleSynonym: { word: "examinó el contrato con cuidado" } },
    "round2519-espumarajo-anger": { example: { word: "echó espumarajos por la boca" }, exampleSynonym: { word: "se puso furioso" } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.es || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5238 expected one es/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5238 missing ${field} on es/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
