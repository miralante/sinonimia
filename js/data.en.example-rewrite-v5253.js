/* Literal example fixes for English entries flagged by check.js. */
(() => {
  const changes = {
    "balcony-5": { example: { word: "watch the parade from a balcony" }, exampleSynonym: { word: "observed from above" } },
    "bell-2": { exampleSynonym: { word: "fit a bell" } },
    "chant-2": { exampleSynonym: { word: "recite the team’s name rhythmically" } },
    "fourteen-2": { example: { word: "set of fourteen" } },
    "invite-2": { exampleSynonym: { word: "invite their neighbors to a meal" } },
    "flared-3": { exampleSynonym: { word: "widened toward the hem" } },
    "close-9": { exampleSynonym: { word: "shut", text: "He shut the gate with a heavy chain." } },
    "disappointment-5": { exampleSynonym: { word: "letdown", text: "She felt let down when the event was canceled." } },
    "cut-sugar-cane": { exampleSynonym: { word: "harvest sugar cane", text: "Workers went to harvest sugar cane before the rainy season." } },
    margay: { exampleSynonym: { word: "tree ocelot", text: "The tree ocelot moved silently through the rainforest canopy." } },
    "muddy-18": { exampleSynonym: { word: "cover with mud", text: "The rain began to cover the hikers’ boots with mud." } },
    rebore: { exampleSynonym: { word: "bore the cylinder again" } },
    coroliflorous: { exampleSynonym: { word: "stamens borne on petals", text: "In this flower, stamens borne on petals are a coroliflorous feature." } },
    "easel-3": { exampleSynonym: { word: "stand" } },
    "open-6": { exampleSynonym: { word: "make available" } },
    "flattery-8": { exampleSynonym: { word: "insincere praise" } },
    "power-3": { exampleSynonym: { word: "supply power" } },
    pigeonhole: { exampleSynonym: { word: "categorize the artist too narrowly" } },
    "earthquake-resistant": { exampleSynonym: { word: "aseismic", text: "The new school was built with aseismic foundations." } },
    "boss-6": { exampleSynonym: { word: "order everyone around" } },
    bevor: { exampleSynonym: { word: "armor protecting his lower face" } },
    "declare-outlaw": { example: { word: "declare someone an outlaw", text: "The decree would declare someone an outlaw for treason." }, exampleSynonym: { word: "proscribed the fugitive" } },
    "aim-at": { example: { word: "aim at", text: "The archer must aim at the center of the target." }, exampleSynonym: { word: "point at", text: "The archer chose to point at the center of the target." } },
    "cap-with-branches": { example: { word: "cap with branches", text: "They chose to cap the garden wall with branches to keep out the rain." }, exampleSynonym: { word: "cover with brushwood", text: "They covered the garden wall with brushwood to keep out the rain." } },
    "ferry-across": { example: { word: "ferried supplies across", text: "The villagers ferried supplies across the river to reach the market." }, exampleSynonym: { word: "crossed the river by boat" } },
    "elephant-trumpet-call": { example: { word: "trumpet call" }, exampleSynonym: { word: "bellow" } },
    "pine-forest-litter": { exampleSynonym: { word: "dry needles and twigs" } },
    "drag-sled": { example: { word: "drag sled", text: "They used a drag sled across the meadow to spread the manure." } },
    "cane-maker": { exampleSynonym: { word: "walking stick maker", text: "The walking stick maker shaped a wooden handle for the stick." } },
    bel: { exampleSynonym: { word: "units of sound intensity" } },
    "animal-bellow": { example: { word: "bellow", text: "An animal bellow came from the barn." } },
    "kiss-repeatedly": { example: { word: "kissed her grandson repeatedly", text: "The grandmother kissed her grandson repeatedly." } },
    "apply-shoe-polish": { example: { word: "applied shoe polish" }, exampleSynonym: { word: "polished his shoes" } },
    "library-science-related": { exampleSynonym: { word: "related to library science" } },
    "male-salmon": { exampleSynonym: { word: "salmon male" } },
    "leap-year-adjective": { exampleSynonym: { word: "used in years with 366 days" } },
    "bake-twice": { example: { word: "baked bread twice" } },
    brandisher: { exampleSynonym: { word: "person wielding the weapon" } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.en || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5253 expected one en/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5253 missing ${field} on en/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
