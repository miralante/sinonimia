/*
 * Exclude entries whose headword itself is a cardinal or ordinal number.
 * Selection reads only entry.word; compounds with other words are retained.
 */
(() => {
  const normalize = (word) => String(word || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  const isDigitNumber = (word) => /^\d+(?:[.,]\d+)?(?:st|nd|rd|th|º|ª|o|a)?$/.test(normalize(word));
  const cardinal = new Set(("cero un uno una dos tres cuatro cinco seis siete ocho nueve diez once doce trece catorce quince dieciseis diecisiete dieciocho diecinueve veinte veintiuno veintiuna veintidos veintitres veinticuatro veinticinco veintiseis veintisiete veintiocho veintinueve treinta cuarenta cincuenta sesenta setenta ochenta noventa cien ciento doscientos doscientas trescientos trescientas cuatrocientos cuatrocientas quinientos quinientas seiscientos seiscientas setecientos setecientas ochocientos ochocientas novecientos novecientas mil millon billon trillon").split(" "));
  const ordinal = new Set();
  for (const stem of ["primer", "segund", "tercer", "cuart", "quint", "sext", "septim", "octav", "noven"]) {
    const endings = stem === "primer" || stem === "tercer" ? ["", "o", "a", "os", "as"] : ["o", "a", "os", "as"];
    for (const ending of endings) ordinal.add(stem + ending);
  }
  for (const stem of ["decim", "undecim", "duodecim", "vigesim", "trigesim", "cuadragesim", "quincuagesim", "sexagesim", "septuagesim", "octogesim", "nonagesim", "centesim", "milesim", "millonesim"]) {
    for (const ending of ["o", "a", "os", "as"]) ordinal.add(stem + ending);
  }
  for (const stem of ["prim", "segund", "terc", "cuart", "quint", "sext", "septim", "octav", "noven"]) {
    for (const ending of ["o", "a", "os", "as"]) {
      ordinal.add("decimo" + stem + ending);
      ordinal.add("decima" + stem + ending);
    }
  }
  for (const word of ["decimonono", "decimonona", "decimononos", "decimononas", "decimonoveno", "decimonovena", "decimonovenos", "decimonovenas", "decimatercio", "decimatercia", "decimatercios", "decimatercias"]) ordinal.add(word);
  const numericWords = new Set([...cardinal, ...ordinal]);
  const isNumberOrOrdinal = (word) => {
    const value = normalize(word);
    if (isDigitNumber(value)) return true;
    const parts = value.split(/[\s-]+/).filter(Boolean);
    return parts.length > 0 && parts.every((part) => numericWords.has(part)) ||
      parts.length > 2 && parts.includes("y") && parts.every((part) => part === "y" || numericWords.has(part));
  };
  DICCIONARIOS.es = DICCIONARIOS.es.filter((entry) => !isNumberOrOrdinal(entry.word));
})();
