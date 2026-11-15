/* Literal example fixes for English entries flagged by check.js. */
(() => {
  const changes = {
    cainite: { exampleSynonym: { text: "Their fratricidal hostility divided the family." } },
    polyarch: { exampleSynonym: { text: "The root was polyarch, having many xylem poles around the pith." } },
    sodomite: { exampleSynonym: { text: "The historical text uses sodomite for a person who engages in sodomy; the term is now considered offensive." } },
    trades: { synonyms: ["occupations", "commerce"], exampleSynonym: { word: "occupations", text: "She learned several skilled occupations before opening her workshop." } },
    banding: { synonyms: ["marking", "grouping"], exampleSynonym: { word: "marking", text: "The researcher used marking to track the birds." } },
    barrels: { exampleSynonym: { text: "The cellar held several casks of wine." } },
    dyke: { synonyms: ["slur for a lesbian"], exampleSynonym: { word: "slur for a lesbian", text: "The novel notes that dyke is an offensive slur for a lesbian and is sometimes reclaimed." } },
    buoyant: { exampleSynonym: { word: "floating", text: "The buoyant cork was floating beside the boat." } },
    bronchorrhage: { exampleSynonym: { text: "The old medical text described a bronchial hemorrhage, called bronchorrhage." } },
    bronchorrhea: { exampleSynonym: { text: "The patient was evaluated for bronchorrhoea, an excessive secretion of bronchial mucus." } },
    bucephalus: { exampleSynonym: { text: "Bucephalus, Alexander’s horse, carried him into battle." } },
    peddlery: { synonyms: ["wares", "peddler’s goods"], exampleSynonym: { word: "wares", text: "The peddler displayed his small wares on a cloth." } },
    knighthood: { exampleSynonym: { text: "She received the honorary title of knighthood for her public service." } },
    easel: { exampleSynonym: { text: "The painter set the canvas on the painting stand." } },
    cackler: { exampleSynonym: { text: "The clucker in the barnyard woke the neighbors." } },
    cactus: { synonyms: ["cactus-like", "succulent"], exampleSynonym: { word: "cactus-like", text: "The cactus-like succulent flowered after the rains." } },
    caddy: { exampleSynonym: { text: "She kept loose tea in a tea caddy." } },
    calender: { exampleSynonym: { word: "glazed", text: "The mill glazed the paper between rollers before printing." } },
    boilermaker: { exampleSynonym: { text: "The boiler maker repaired the factory boiler." } },
    calderonian: { exampleSynonym: { text: "The play’s sense of honor is Calderón-related." } },
    kaleidoscope: { synonyms: ["changing collection", "changing pattern"], exampleSynonym: { word: "changing collection", text: "The festival offered a changing collection of music and dance." } },
    calligraphic: { exampleSynonym: { text: "The exhibition included calligraphical works." } },
    calipedic: { exampleSynonym: { word: "calipedia-related", text: "The text was calipedia-related and described an imaginary practice." } },
    camper: { synonyms: ["camper", "person who camps"], exampleSynonym: { word: "camper", text: "The camper pitched a tent beside the lake." } },
    canonry: { exampleSynonym: { word: "canonicate", text: "He received a canonicate at the cathedral." } },
    cantonalism: { exampleSynonym: { text: "The cantonalist movement called for nearly independent cantons within the state." } },
    cantoner: { exampleSynonym: { word: "resident of the canton" } },
    phonetics: { synonyms: ["speech-sound science", "phonetic notation"], exampleSynonym: { word: "speech-sound science", text: "She studied speech-sound science and its account of production and perception." } },
    caramelize: { exampleSynonym: { word: "coated the apples with caramel", text: "The chef coated the apples with caramel before serving." } },
    carbonate: { exampleSynonym: { word: "convert the mineral into a carbonate", text: "The process can convert the mineral into a carbonate under controlled conditions." } },
    "clear-throat": { example: { word: "cleared his throat" }, exampleSynonym: { word: "coughed lightly" } },
    caseify: { synonyms: ["become caseous"], exampleSynonym: { word: "become caseous", text: "The tissue began to become caseous as the disease progressed." } },
    categorematic: { synonyms: ["independent-meaning term"], exampleSynonym: { word: "independent-meaning term", text: "In logic, an independent-meaning term contrasts with a syncategorematic word." } },
    hacking: { exampleSynonym: { text: "Roughing and carving a piece of wood with the chopping ax revealed dry wood inside." } },
    basketry: { exampleSynonym: { word: "basket weaving", text: "The village basket weaving shop sells handmade baskets and teaches the craft." } },
    plate: { exampleSynonym: { word: "coated the silver-colored clasp with gold", text: "The jeweler coated the silver-colored clasp with gold." } },
    clarifier: { synonyms: ["settling tank", "explainer"], exampleSynonym: { word: "settling tank", text: "Wastewater passes through a settling tank before treatment." } },
    connaturalize: { exampleSynonym: { word: "became accustomed" } },
    consubstantiate: { example: { word: "consubstantiate", text: "The theologian used consubstantiate to describe two natures united in one substance." } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.en || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5247 expected one en/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5247 missing ${field} on en/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
