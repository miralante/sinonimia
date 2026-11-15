/* Literal example fixes for Spanish A entries flagged by check.js. */
(() => {
  const changes = {
    anorante: { exampleSynonym: { word: "nostálgica" } },
    apacorral: { exampleSynonym: { text: "El apacorral, árbol medicinal hondureño, tiene una corteza amarga que se usa para bajar la fiebre." } },
    aparchonar: { example: { word: "aparchonó" }, exampleSynonym: { word: "manchó" } },
    aparragarse: { example: { word: "aparragó" }, exampleSynonym: { word: "achaparró" } },
    apaulillarse: { example: { word: "apaulilló" }, exampleSynonym: { word: "agorgojó" } },
    apeldar: {
      example: { word: "llamó", text: "Al oír el ruido, el ladrón llamó al guardia." },
      synonyms: ["llamar"],
      exampleSynonym: { word: "llamó", text: "Al oír el ruido, el ladrón llamó al guardia." },
    },
    apendicular: { exampleSynonym: { word: "relativa al apéndice" } },
    apenumbrar: { example: { word: "apenumbraban" }, exampleSynonym: { word: "puso en penumbra", text: "La cortina puso en penumbra el pasillo." } },
    apeonar: {
      definition: "En algunos usos, humillar a alguien; dicho de la perdiz, correr rápidamente.",
      synonyms: ["andar aceleradamente", "humillar"],
      example: { word: "apeonó" },
      exampleSynonym: { word: "anduvo aceleradamente" },
    },
    aperar: {
      synonyms: ["preparar la tierra"],
      example: { word: "aperó", text: "El agricultor aperó el terreno antes de sembrarlo." },
      exampleSynonym: { word: "preparó la tierra", text: "El agricultor preparó la tierra antes de sembrar." },
    },
    apestillar: { example: { word: "apestilló" }, exampleSynonym: { word: "cerró con pestillo", text: "Antes de dormir, cerró con pestillo la puerta." } },
    apianar: { example: { word: "apianó" }, exampleSynonym: { word: "atenuó" } },
    apitar: {
      example: { word: "apitó" },
      exampleSynonym: { word: "abucheó" },
    },
    aplanar: { example: { word: "aplanó" }, exampleSynonym: { word: "niveló" } },
    aplantillar: {
      example: { word: "aplantilló" },
      exampleSynonym: { text: "El cantero tuvo que dar forma con una plantilla a la piedra siguiendo el diseño." },
    },
    aplatanar: { exampleSynonym: { word: "se apoltronaran" } },
    aplayar: { example: { word: "aplayó" }, exampleSynonym: { word: "se desbordó" } },
    aplegar: { example: { word: "aplegó" }, exampleSynonym: { word: "arrimó" } },
    apocharse: { example: { word: "apocha" }, exampleSynonym: { word: "acriolla" } },
    aporracear: { example: { word: "aporraceó" }, exampleSynonym: { word: "aporreó" } },
    aporrar: { example: { word: "aporró" }, exampleSynonym: { word: "se quedó sin habla" } },
    aporrillarse: { example: { word: "aporrilló" } },
    apunar: { example: { word: "apuñó" } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.es || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5224 expected one es/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") {
        matches[0][field] = values;
      } else {
        if (!matches[0][field]) throw new Error(`v5224 missing ${field} on es/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
