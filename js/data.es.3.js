/* Spanish dictionary additions, reviewed against the DLE. */
window.DICCIONARIOS = window.DICCIONARIOS || {};
DICCIONARIOS.es = DICCIONARIOS.es || [];
DICCIONARIOS.es = DICCIONARIOS.es.concat([
  {
    id: "cenido",
    word: "Ceñido",
    image: { id: 36384, alt: "Gastos" },
    definition: "Un presupuesto ceñido tiene poco dinero para gastar.",
    synonyms: ["moderado", "reducido"],
    example: { word: "ceñido", text: "La familia preparó un presupuesto ceñido para el viaje." },
    exampleSynonym: { word: "moderado", text: "La familia preparó un presupuesto moderado para el viaje." },
    situacion: "finanzas",
    translation: { en: "tight budget" },
  },
  {
    id: "fenotipo",
    word: "Fenotipo",
    image: { id: 2450, alt: "Información y conocimiento" },
    definition: "El fenotipo son las características que vemos en un ser vivo. Sus genes y el ambiente influyen en ellas.",
    synonyms: ["rasgos observables", "características visibles"],
    example: { word: "fenotipo", text: "El estudio compara el fenotipo de dos plantas." },
    exampleSynonym: { word: "rasgos observables", text: "El estudio compara los rasgos observables de dos plantas." },
    situacion: "conocimiento",
    translation: { en: "phenotype" },
  },
  {
    id: "trauma",
    word: "Trauma",
    image: { id: 2467, alt: "Atención médica" },
    definition: "Daño emocional que puede quedar después de vivir una situación muy difícil.",
    synonyms: ["daño emocional", "herida emocional", "trauma psicológico"],
    example: { word: "trauma", text: "Después de lo ocurrido, pidió ayuda para superar el trauma." },
    exampleSynonym: { word: "daño emocional", text: "Después de lo ocurrido, pidió ayuda para superar el daño emocional." },
    situacion: "salud",
    translation: { en: "psychological trauma" }
  },
  {
    id: "trauma-fisico",
    word: "Trauma",
    image: { id: 2467, alt: "Atención médica" },
    definition: "Lesión del cuerpo causada por un golpe o un accidente.",
    synonyms: ["lesión", "daño físico", "traumatismo", "trauma físico"],
    example: { word: "trauma", text: "El médico revisó el trauma después de la caída." },
    exampleSynonym: { word: "lesión", text: "El médico revisó la lesión después de la caída." },
    situacion: "salud",
    translation: { en: "physical trauma" }
  }
]);

/* Keep the participle as its own adjective entry, separate from the infinitive. */
DICCIONARIOS.es.push({
  id: "derruido",
  word: "Derruido",
  image: { id: 7024, alt: "Un edificio en ruinas" },
  definition: "Que está en ruinas o muy deteriorado.",
  synonyms: ["en ruinas", "muy deteriorado"],
  example: { word: "derruido", text: "El edificio derruido será reparado por el ayuntamiento." },
  exampleSynonym: { word: "en ruinas", text: "El edificio en ruinas será reparado por el ayuntamiento." },
  situacion: "vida-diaria",
});
