/* Literal example fixes for English entries flagged by check.js. */
(() => {
  const changes = {
    "round3352-adjunct-grammar": { exampleSynonym: { word: "optional phrase in “We met at noon.”" } },
    "brick-device": { exampleSynonym: { word: "made my old phone stop working" } },
    "call-up-display": { example: { word: "called up the file on her computer" } },
    "call-up-military": { example: { word: "called up reservists" } },
    "call-up-sport": { example: { word: "called up two new players" } },
    "calyx-anatomy": { exampleSynonym: { word: "kidney cavity" } },
    "camelid-adjective": { exampleSynonym: { word: "teeth related to camels" } },
    "canteen-bottle": { exampleSynonym: { word: "water bottle" } },
    "cantonal-political": { exampleSynonym: { word: "regionalist platform" } },
    "crisis-medical": { exampleSynonym: { word: "sudden worsening overnight" } },
    "crow-crowing-sound": { exampleSynonym: { word: "rooster call" } },
    "crowd-interest": { exampleSynonym: { word: "young following" } },
    "crustacean-adjective": { exampleSynonym: { word: "shell of the crustacean" } },
    "cubic-volume": { exampleSynonym: { word: "volume unit" } },
    "cue-letter": { example: { word: "letter Q" }, exampleSynonym: { word: "letter Q", text: "The word queue begins with the letter Q." } },
    "cuff-trouser": { exampleSynonym: { word: "turn-up of his trousers" } },
    "cult-2-fashion": { exampleSynonym: { word: "popular with a devoted group" } },
    "culverin-musket": { exampleSynonym: { word: "early firearm" } },
    "culture-workplace": { exampleSynonym: { word: "workplace customs" } },
    "cup-mixed-drink": { exampleSynonym: { word: "wine punch" } },
    "deterioration-state": { exampleSynonym: { word: "serious decay" } },
    "detritus-3": { exampleSynonym: { word: "decaying matter in the soil" } },
    "diaper-3": { exampleSynonym: { word: "change the baby’s diaper" } },
    "diaspora-2": { exampleSynonym: { word: "dispersal of the people" } },
    "flame-2": { exampleSynonym: { word: "sent an insulting message online to the moderator" } },
    "flannel-5": { exampleSynonym: { word: "talked evasively" } },
    "flap-6": { exampleSynonym: { word: "got worried about the flight all morning" } },
    "flare-8": { exampleSynonym: { word: "got worse suddenly after the walk" } },
    "flash-7": { exampleSynonym: { word: "displayed his badge for a moment" } },
    "flash-8": { exampleSynonym: { word: "sent information quickly around the world" } },
    "flash-9": { exampleSynonym: { word: "passed quickly down the road" } },
    "flex-5": { exampleSynonym: { word: "showed its power against the company" } },
    "flight-3": { exampleSynonym: { word: "group of geese in flight" } },
    "formalize-2": { exampleSynonym: { word: "translated the statement into logic" } },
    "formate-2": { exampleSynonym: { word: "ester of formic acid" } },
    "fortify-4": { example: { word: "fortifies milk with vitamin D" }, exampleSynonym: { word: "enriches milk with vitamin D" } },
    "fortify-6": { example: { word: "fortified its claim with clear records" }, exampleSynonym: { word: "supported its claim with clear records" } },
    "get-on-4": { example: { word: "gets on in years" } },
    "get-on-5": { example: { word: "getting on" } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.en || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5271 expected one en/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5271 missing ${field} on en/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
