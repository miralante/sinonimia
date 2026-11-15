/* Literal example fixes for English entries flagged by check.js. */
(() => {
  const changes = {
    "field-related": { exampleSynonym: { word: "relating to the countryside" } },
    "ring-bells": { example: { word: "ring bells", text: "She rang the bells insistently throughout the morning." }, exampleSynonym: { word: "pealed" } },
    "rocky-ground": { exampleSynonym: { word: "field of rocks" } },
    "garden-gate": { exampleSynonym: { word: "small gate" } },
    "drainage-ditch": { exampleSynonym: { word: "drain", text: "The drain carried rainwater away from the farmland." } },
    nominate: { exampleSynonym: { word: "put her forward" } },
    "candombe-dance": { example: { word: "danced candombe" }, exampleSynonym: { word: "danced candombe", text: "They danced candombe, an Afro-Uruguayan style, during the carnival." } },
    cangahua: { exampleSynonym: { word: "hardened local soil" } },
    "popcorn-kernel": { exampleSynonym: { word: "hard corn kernels" } },
    "bobbin-maker": { exampleSynonym: { word: "bobbin maker", text: "The bobbin maker carved bobbins for the workshop." } },
    nagging: { exampleSynonym: { word: "repeated complaints" } },
    gibberish: { exampleSynonym: { word: "meaningless answer" } },
    "have-a-beer": { exampleSynonym: { word: "go for a beer", text: "They stopped at the bar to go for a beer after work." } },
    "honey-harvest": { exampleSynonym: { word: "gathering honey" } },
    "censure-severely": { example: { word: "censured the author severely" }, exampleSynonym: { word: "reprimanded the author harshly" } },
    "train-of-ceremonial-cloak": { example: { word: "train of a ceremonial cloak", text: "The train of a ceremonial cloak trailed across the floor." } },
    "immature-lamb-or-kid": { example: { word: "immature lambs and kids" }, exampleSynonym: { word: "young lambs and goats" } },
    "have-poor-eyesight": { example: { word: "have poor eyesight" }, exampleSynonym: { word: "sees poorly" } },
    "river-mist": { exampleSynonym: { word: "mist over the river" } },
    nape: { exampleSynonym: { word: "back of his neck" } },
    "round2381-lash-tie": { exampleSynonym: { word: "tied the crates together" } },
    "round2381-lash-criticize": { exampleSynonym: { word: "criticized the minister sharply" } },
    "round2381-lash-incite": { exampleSynonym: { word: "stirred the crowd to anger" } },
    "round2381-lash-out-anger": { example: { word: "lashed out at the manager" }, exampleSynonym: { word: "criticized the manager angrily" } },
    "round2382-last-verb": { exampleSynonym: { word: "shaped the boot on a form" } },
    "round2384-lathe-verb": { exampleSynonym: { word: "turned the shaft on a lathe" } },
    "round2385-latinize-style": { exampleSynonym: { word: "gave the name a Latin form" } },
    "round2385-latinize-catholic": { exampleSynonym: { word: "introduced Roman Catholic rites" } },
    "round2385-latinize-expressions": { exampleSynonym: { word: "used Latin expressions in conversation" } },
    "round2386-launch-initiative": { exampleSynonym: { word: "began an investigation" } },
    "round2386-launch-product": { exampleSynonym: { word: "introduce its new phone" } },
    "round2386-launch-into": { exampleSynonym: { word: "began a speech suddenly" } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.en || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5256 expected one en/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5256 missing ${field} on en/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
