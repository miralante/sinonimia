/* Literal example fixes for English entries flagged by check.js. */
(() => {
  const changes = {
    "round3295-yarn-verb": { exampleSynonym: { word: "spun a yarn about their travels" } },
    "round3324-acceleration-debt": { exampleSynonym: { word: "made the full debt due earlier after default" } },
    "round3350-adhesion-medical": { exampleSynonym: { word: "band of scar tissue" } },
    "round3351-adiposis-condition": { exampleSynonym: { word: "condition that causes fatty tissue to build up" } },
    "round3352-adjudicate-contest": { exampleSynonym: { word: "judged the regional dance contest" } },
    "round3352-adjunct-grammar": { exampleSynonym: { word: "optional phrase in the sentence" } },
    "round3352-adjust-settle": { exampleSynonym: { word: "settled the claim after reviewing the damage" } },
    "round3353-adjustment-device": { exampleSynonym: { word: "control on the microscope" } },
    "brave-splendid": { exampleSynonym: { word: "impressive sight" } },
    "brawl-verb": { exampleSynonym: { word: "fought noisily outside the stadium" } },
    "bray-grind": { exampleSynonym: { word: "ground the sample into a powder" } },
    "bray-ink": { exampleSynonym: { word: "spread ink across the plate" } },
    "breach-gap": { exampleSynonym: { word: "opening in the wall" } },
    "break-interrupt": { example: { word: "broke the silence" } },
    "brechtian-style": { exampleSynonym: { word: "theatre method influenced by Brecht" } },
    "breed-raise": { exampleSynonym: { word: "raise horses for racing" } },
    "breeze-through": { exampleSynonym: { word: "got through the exam easily" } },
    "brick-device": { exampleSynonym: { word: "old phone that stopped working" } },
    "brighten-up-intransitive": { example: { word: "brightened up after the rain" }, exampleSynonym: { word: "cheer up", text: "The sky brightened up and the children began to cheer up after the rain." } },
    "brilliance-magnificence": { exampleSynonym: { word: "splendor of the palace" } },
    "bring-in-income": { example: { word: "brings in enough money to stay open" } },
    "bring-in-invite": { example: { word: "brought in an expert to help" } },
    "bring-in-verdict": { example: { word: "brought in its verdict at noon" }, exampleSynonym: { word: "announced its decision at noon" } },
    "briquette-verb": { exampleSynonym: { word: "press the clay into small blocks" } },
    "bristle-anger": { exampleSynonym: { word: "showed anger at the unfair comment" } },
    "brocade-verb": { exampleSynonym: { word: "wove a raised pattern into the fabric with gold thread" } },
    "bronze-work-objects": { exampleSynonym: { word: "bronze objects from China" } },
    "browse-online": { exampleSynonym: { word: "searched the web for a new recipe" } },
    "brush-light-touch": { exampleSynonym: { word: "lightly touched the wall" } },
    "buccaneer-verb": { exampleSynonym: { word: "raided ships along the coast" } },
    "buddhist-adjective": { exampleSynonym: { word: "Buddhistic", text: "They visited a temple with Buddhistic art." } },
    "bump-verb": { exampleSynonym: { word: "knocked into the table with her knee" } },
    "bureaucracy-officials": { exampleSynonym: { word: "administrative staff" } },
    "burgundy-color": { exampleSynonym: { word: "dark red curtains" } },
    "bypass-verb": { exampleSynonym: { word: "went around the village on the new road" } },
    "byssus-cloth": { exampleSynonym: { word: "fine linen" } },
    "cacophony-speech": { exampleSynonym: { word: "discordant speech sounds", text: "The poem avoids discordant speech sounds, using repeated consonants instead." } },
    "cadaveric-appearance": { exampleSynonym: { word: "deathly" } },
    "call-on-demand": { example: { word: "called on the council to act" }, exampleSynonym: { word: "appealed to the council to act" } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.en || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5270 expected one en/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5270 missing ${field} on en/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
