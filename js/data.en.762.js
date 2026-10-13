/*
 * Exclude entries whose headword itself is a cardinal or ordinal number.
 * Selection reads only entry.word; compounds with other words are retained.
 */
(() => {
  const normalize = (word) => String(word || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  const isDigitNumber = (word) => /^\d+(?:[.,]\d+)?(?:st|nd|rd|th|º|ª|o|a)?$/.test(normalize(word));
  const cardinal = new Set(("zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty thirty forty fifty sixty seventy eighty ninety hundred thousand million billion trillion quadrillion").split(" "));
  const ordinal = new Set(("first second third fourth fifth sixth seventh eighth ninth tenth eleventh twelfth thirteenth fourteenth fifteenth sixteenth seventeenth eighteenth nineteenth twentieth thirtieth fortieth fiftieth sixtieth seventieth eightieth ninetieth hundredth thousandth millionth billionth trillionth quadrillionth").split(" "));
  const numericWords = new Set([...cardinal, ...ordinal]);
  const isNumberOrOrdinal = (word) => {
    const value = normalize(word);
    if (isDigitNumber(value)) return true;
    const parts = value.split(/[\s-]+/).filter(Boolean);
    return parts.length > 0 && parts.every((part) => numericWords.has(part)) ||
      parts.length > 2 && parts.includes("and") && parts.every((part) => part === "and" || numericWords.has(part));
  };
  DICCIONARIOS.en = DICCIONARIOS.en.filter((entry) => !isNumberOrOrdinal(entry.word));
})();

/* Keep the two difficult meanings of trauma in separate easy-read entries. */
(() => {
  const updates = {
    trauma: {
      definition: "Emotional harm that can last after a frightening event.",
      synonyms: ["deep emotional pain", "psychological trauma"],
      example: { word: "trauma", text: "She got help after the frightening event left her with trauma." },
      exampleSynonym: { word: "deep emotional pain", text: "She got help after the frightening event left her with deep emotional pain." },
      translation: { es: "trauma" }
    },
    "trauma-2": {
      definition: "An injury to the body caused by a blow or accident.",
      synonyms: ["physical injury", "physical trauma"],
      example: { word: "trauma", text: "The doctor treated his trauma after the fall." },
      exampleSynonym: { word: "physical injury", text: "The doctor treated his physical injury after the fall." },
      translation: { es: "trauma-fisico" }
    }
  };
  for (const [id, fields] of Object.entries(updates)) {
    const entry = DICCIONARIOS.en.find((item) => item.id === id);
    if (!entry) continue; // The earlier source shard intentionally removed this entry.
    Object.assign(entry, fields);
  }
})();

/* Keep the physical sense as its own entry, as requested for homonyms. */
if (!DICCIONARIOS.en.some((item) => item.id === "trauma-2")) {
  DICCIONARIOS.en.push({
    id: "trauma-2",
    word: "Trauma",
    image: { id: 2467, alt: "Medical care" },
    definition: "An injury to the body caused by a blow or accident.",
    synonyms: ["physical injury", "physical trauma"],
    example: { word: "trauma", text: "The doctor treated his trauma after the fall." },
    exampleSynonym: { word: "physical injury", text: "The doctor treated his physical injury after the fall." },
    situacion: "salud",
    translation: { es: "trauma-fisico" }
  });
}
