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
