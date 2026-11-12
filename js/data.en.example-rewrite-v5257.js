/* Literal example fixes for English entries flagged by check.js. */
(() => {
  const changes = {
    "ring-bells": { example: { word: "ring bells", text: "She had to ring bells insistently throughout the morning." } },
    gibberish: { exampleSynonym: { word: "meaningless" } },
    "have-poor-eyesight": { example: { word: "has poor eyesight" } },
    "round2389-lax-loose": { example: { word: "lax rope" } },
    "round2389-lax-phonetics": { example: { word: "lax vowel" }, exampleSynonym: { word: "is relaxed" } },
    "round2389-lay-down-wine": { example: { word: "laid down several bottles of wine" }, exampleSynonym: { word: "stored several bottles of wine to age" } },
    "round2391-lead-astray-bad-behavior": { example: { word: "led him astray" } },
    "round2392-leaflet-distribute": { exampleSynonym: { word: "handed out leaflets" } },
    "round2396-leech-verb-exploit": { exampleSynonym: { word: "sponged off" } },
    "round2397-legacy-outdated-computing": { exampleSynonym: { word: "older computer program" } },
    "round2400-legislate-bring-into-effect": { exampleSynonym: { word: "established a new safety standard by law" } },
    "round2400-legit-classical-singing": { exampleSynonym: { word: "trained in classical singing" } },
    "round2403-lenity-lenient-act": { exampleSynonym: { word: "lenient decision" } },
    "round2404-leonine-verse": { exampleSynonym: { word: "verse with a rhyme inside each line" } },
    "round2405-lesion-pathology": { exampleSynonym: { word: "abnormal change in the lung tissue" } },
    "round2405-lesion-plant": { exampleSynonym: { word: "dark spot caused by fungus" } },
    "round2405-lesion-verb": { exampleSynonym: { word: "damage the nerves" } },
    "round2406-lethal-damaging": { exampleSynonym: { word: "great damage" } },
    "round2407-lettering-process": { exampleSynonym: { word: "letters were inscribed by hand" } },
    "round2418-lilliputian-inhabitant": { example: { word: "Lilliputian", text: "A Lilliputian lived among the tiny people in Gulliver’s Travels." }, exampleSynonym: { word: "inhabitant of Lilliput", text: "An inhabitant of Lilliput appears in Gulliver’s Travels." } },
    "round2418-lilliputian-adjective-related": { example: { word: "Lilliputian", text: "The Lilliputian characters lived in a land of tiny people." }, exampleSynonym: { word: "of Lilliput", text: "The story describes the imaginary land of Lilliput." } },
    "round2419-lime-fruit": { example: { word: "lime", text: "She squeezed a lime into the drink." }, exampleSynonym: { word: "green citrus fruit", text: "She squeezed a green citrus fruit into the drink." } },
    "round2419-lime-drink": { example: { word: "lime", text: "He ordered a lime drink with lunch." }, exampleSynonym: { word: "lime-flavoured drink", text: "He ordered a lime-flavoured drink with lunch." } },
    "round2419-lime-birdlime": { example: { word: "lime", text: "The poacher spread lime on a twig to catch birds." }, exampleSynonym: { word: "birdlime", text: "Birdlime was spread on twigs to catch birds." } },
    "round2419-lime-twigs": { example: { word: "lime", text: "The poacher planned to lime the twigs to catch birds." }, exampleSynonym: { word: "coated with birdlime", text: "He coated twigs with birdlime to catch birds." } },
    "round2419-lime-catch": { example: { word: "lime", text: "They used lime to catch the bird." }, exampleSynonym: { word: "catching with birdlime", text: "Catching with birdlime was once used to trap small birds." } },
    "round2419-lime-whitewash": { example: { word: "lime", text: "They planned to lime the wall before summer." }, exampleSynonym: { word: "whitewashed", text: "They whitewashed the wall before summer." } },
    "round2419-lime-color": { example: { word: "lime", text: "The scarf was lime green." }, exampleSynonym: { word: "lime green" } },
    "round2419-lime-flavour": { example: { word: "lime", text: "The icing had a sharp lime flavour." }, exampleSynonym: { word: "lime-flavoured", text: "The lime-flavoured icing gave the cake a sharp citrus taste." } },
    "round2419-limelight-beam": { example: { word: "limelight", text: "The theatre’s old limelight produced a brilliant white beam." }, exampleSynonym: { word: "calcium light", text: "The theatre’s old calcium light produced a brilliant white beam." } },
    "round2420-limp-adjective-soft": { example: { word: "limp", text: "The fabric hung limp after soaking." }, exampleSynonym: { word: "floppy", text: "The wet fabric became floppy after soaking." } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.en || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5257 expected one en/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5257 missing ${field} on en/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
