/* Literal example fixes for English entries flagged by check.js. */
(() => {
  const changes = {
    palpate: { exampleSynonym: { word: "examine the abdomen by touch" } },
    hocks: { exampleSynonym: { word: "joints of its hind legs", text: "The horse had a small scar near the joints of its hind legs." } },
    nomonic: { exampleSynonym: { text: "The court chose a lawful procedure." } },
    orogeny: { exampleSynonym: { word: "mountain-building event" } },
    oronymic: { exampleSynonym: { text: "The gazetteer includes an index relating to mountain names." } },
    orchestrate: { exampleSynonym: { word: "arrange the piece for orchestra", text: "The composer will arrange the piece for orchestra." } },
    popess: { exampleSynonym: { text: "The medieval legend tells of a female pope who briefly ruled in Rome." } },
    patricide: { synonyms: ["murder of a father", "parricide (broader term)", "killer of one’s father"], exampleSynonym: { word: "murder of a father", text: "The ancient tragedy centers on the murder of a father and its consequences." } },
    pedestrianize: { exampleSynonym: { word: "make the historic shopping street pedestrian-only" } },
    penis: { example: { word: "penis", text: "The penis is discussed in medical and anatomical contexts." }, exampleSynonym: { word: "male reproductive organ", text: "The male reproductive organ is described in medical and anatomical texts." } },
    perennialize: { exampleSynonym: { word: "make the border perennial" } },
    perjurer: { exampleSynonym: { word: "one who committed perjury" } },
    permian: { exampleSynonym: { word: "from the Permian" } },
    petroleochemistry: { exampleSynonym: { text: "Petroleum chemistry helps identify useful compounds in crude oil." } },
    pigeon: { exampleSynonym: { text: "A dove landed on the balcony rail." } },
    beaked: { exampleSynonym: { text: "The beak-shaped bird searched the mud for food." } },
    trampler: { exampleSynonym: { word: "stomper", text: "The stomper crushed the plants underfoot." } },
    prophetess: { exampleSynonym: { text: "The ancient text describes her as a female prophet." } },
    propel: { exampleSynonym: { word: "drives the boat forward", text: "The motor drives the boat forward through the water." } },
    pointing: { synonyms: ["indication", "directing", "showing"], exampleSynonym: { word: "indication", text: "Her indication toward the exit made the instructions clear." } },
    radical: { example: { word: "radical", text: "They proposed a radical, far-reaching plan." } },
    dowsing: { exampleSynonym: { text: "He used water divining rods while searching for a well site." } },
    "label-maker": { example: { word: "label maker", text: "She used a label maker to mark the storage boxes." }, exampleSynonym: { word: "label printer", text: "She used a label printer to mark the storage boxes." } },
    roan: { exampleSynonym: { text: "The horse had a roan coat of mixed white hairs and a darker base color." } },
    pecan: { exampleSynonym: { word: "pecan nuts", text: "She baked a pie with freshly shelled pecan nuts." } },
    perfoliate: { exampleSynonym: { word: "stem-clasping", text: "Its stem-clasping leaves completely surround the stem." } },
    periodize: { exampleSynonym: { word: "divide the novel’s development into three periods", text: "The historian chose to divide the novel’s development into three periods." } },
    perquire: { exampleSynonym: { word: "search the archives thoroughly" } },
    pileus: { exampleSynonym: { text: "The mushroom cap was broad and pale." } },
    overbroil: { exampleSynonym: { word: "overcook it under the broiler" } },
    oversweep: { exampleSynonym: { text: "The broom seemed to brush over the floor lightly without removing the dust." } },
    "pre-select": { exampleSynonym: { word: "choose their preferred interview times in advance" } },
    gulper: { exampleSynonym: { word: "swallowed its prey" } },
    uniate: { exampleSynonym: { text: "The museum displayed an Eastern Catholic liturgical manuscript." } },
    grandma: { exampleSynonym: { text: "My grandmother taught me how to bake bread." } },
    analytics: { exampleSynonym: { word: "data analysis", text: "The company uses data analysis to understand customer behavior." } },
    parasympathetic: { synonyms: ["parasympathetic nervous system activity"], exampleSynonym: { word: "parasympathetic nervous system activity", text: "Parasympathetic nervous system activity can slow the heart rate." } },
    brusque: { exampleSynonym: { text: "His blunt reply ended the discussion." } },
    phlogistic: { exampleSynonym: { text: "The historian explained the phlogiston-related theory of combustion." } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.en || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5249 expected one en/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5249 missing ${field} on en/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
