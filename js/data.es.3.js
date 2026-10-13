/* Spanish dictionary additions, reviewed against the DLE. */
window.DICCIONARIOS = window.DICCIONARIOS || {};
DICCIONARIOS.es = DICCIONARIOS.es || [];
DICCIONARIOS.es = DICCIONARIOS.es.concat([
  {
    id: "cenido",
    word: "Ceñido",
    image: { id: 36384, alt: "Gastos" },
    definition: "Muy ajustado o limitado; dicho especialmente de un presupuesto, que restringe los gastos.",
    synonyms: ["moderado", "reducido"],
    example: { word: "ceñido", text: "La familia preparó un presupuesto ceñido para el viaje." },
    exampleSynonym: { word: "moderado", text: "La familia preparó un presupuesto moderado para el viaje." },
    situacion: "finanzas",
    translation: { en: "tight; constrained; limited (budget)" },
  },
  {
    id: "fenotipo",
    word: "Fenotipo",
    image: { id: 2450, alt: "Información y conocimiento" },
    definition: "Conjunto de características observables de un organismo, resultado de la expresión de sus genes y de su interacción con el ambiente.",
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
    definition: "Lesión física o daño psicológico causado por un agente externo o por una experiencia muy difícil; también, secuela que puede persistir después de ella.",
    synonyms: ["lesión", "daño psicológico", "herida emocional"],
    example: { word: "trauma", text: "Tras el accidente, recibió ayuda para superar el trauma." },
    exampleSynonym: { word: "lesión", text: "Tras el accidente, recibió ayuda para tratar la lesión." },
    situacion: "salud",
    translation: { en: "trauma; physical injury; psychological trauma" }
  },
  {
    id: "trauma-fisico",
    word: "Trauma",
    image: { id: 2467, alt: "Atención médica" },
    definition: "Lesión causada por un golpe u otro daño al cuerpo.",
    synonyms: ["lesión", "daño físico"],
    example: { word: "trauma", text: "El médico revisó el trauma después de la caída." },
    exampleSynonym: { word: "lesión", text: "El médico revisó la lesión después de la caída." },
    situacion: "salud",
    translation: { en: "trauma; physical injury" }
  }
]);

/* Let people find the existing infinitive entry when they search its participle. */
var derruirEntry = DICCIONARIOS.es.find(function (entry) { return entry.id === "derruir"; });
if (derruirEntry && derruirEntry.synonyms.indexOf("derruido") === -1) {
  derruirEntry.synonyms.push("derruido");
}
