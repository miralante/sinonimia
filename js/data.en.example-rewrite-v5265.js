/* Literal example fixes for English entries flagged by check.js. */
(() => {
  const changes = {
    "round2791-pencil-verb": { exampleSynonym: { word: "wrote in pencil" } },
    "round2807-perturb-technical": { exampleSynonym: { word: "changed the comet's path" } },
    "round2811-petty-mean": { exampleSynonym: { word: "small-minded", text: "His small-minded complaint about the gift upset her." } },
    "round2811-peyote-drug": { exampleSynonym: { word: "peyote drug", text: "The article describes the peyote drug’s use in a traditional ceremony." } },
    "round2812-pharisaic-hypocritical": { exampleSynonym: { word: "self-righteous", text: "The article criticized the leader for pretending to be self-righteous." } },
    "round2814-phenomenon-extraordinary": { exampleSynonym: { word: "remarkable person", text: "The young singer was a remarkable person in the history of music." } },
    "round2814-philanthropy-humanity": { exampleSynonym: { word: "love of humanity", text: "Her love of humanity led her to offer hands-on support." } },
    "round2816-philosophy-personal-principles": { exampleSynonym: { word: "guiding principle" } },
    "round2828-pick-strings": { exampleSynonym: { word: "pluck the guitar strings" } },
    "round2828-pick-out-select": { example: { word: "picked out a blue coat" } },
    "round2828-pick-out-notes": { example: { word: "picked out the tune" }, exampleSynonym: { word: "played the tune by ear" } },
    "round2828-pick-up-learn": { example: { word: "picked up some Spanish" }, exampleSynonym: { word: "learned some Spanish" } },
    "round2828-pick-up-improve": { example: { word: "picked up after the holiday" } },
    "round2828-pick-up-phone": { example: { word: "picked up when the office called" }, exampleSynonym: { word: "answered the phone" } },
    "round2829-picket-verb": { exampleSynonym: { word: "protested outside the factory" } },
    "round2829-pickle-verb": { exampleSynonym: { word: "preserve onions in brine" } },
    "round2834-pillow-verb": { exampleSynonym: { word: "rested her head on her folded arms" } },
    "round2834-pin-number": { exampleSynonym: { word: "personal identification number" } },
    "round2835-pinch-steal": { exampleSynonym: { word: "stole my gloves" } },
    "round2835-pine-longing-thing": { exampleSynonym: { word: "longed for a chance to return home" } },
    "round2837-pinwheel-verb": { exampleSynonym: { word: "spun across the yard" } },
    "round2837-pioneer-verb": { exampleSynonym: { word: "developed a new way to store energy" } },
    "round2837-pipe-verb-voice": { exampleSynonym: { word: "said in a high voice" } },
    "round2837-pipe-vulgar": { exampleSynonym: { word: "vulgar slang word for penis" } },
    "round2838-pirate-verb-copy": { exampleSynonym: { word: "copied the film illegally" } },
    "round2840-pit-low-quality": { exampleSynonym: { word: "the worst", text: "The hotel was the worst on the route." } },
    "round2840-pit-verb-against": { exampleSynonym: { word: "matched two strong teams against each other" } },
    "round2840-pitch-tent-verb": { exampleSynonym: { word: "put up our tent near the lake" } },
    "round2840-pitch-fall-verb": { exampleSynonym: { word: "tumble", text: "The bus stopped, causing him to tumble forward." } },
    "round2840-pitch-baseball-noun": { exampleSynonym: { word: "first throw" } },
    "round2840-pith-stem": { exampleSynonym: { word: "central tissue" } },
    "round2840-pith-essence": { exampleSynonym: { word: "main point of the argument" } },
    "round2840-pith-verb": { exampleSynonym: { word: "remove the inner layer" } },
    "round2841-pity-verb": { exampleSynonym: { word: "feel sorry for anyone" } },
    "round2841-pivot-verb-change": { exampleSynonym: { word: "changed direction" } },
    "round2843-plaice-food": { exampleSynonym: { word: "plaice meat", text: "We had fish, specifically plaice meat, for dinner." } },
    "round2844-plank-political": { exampleSynonym: { word: "main idea in the party’s plan" } },
    "round2844-plank-verb": { exampleSynonym: { word: "covered the cabin floor with boards" } },
    "round2845-plant-hide-verb": { exampleSynonym: { word: "hid false papers in her bag" } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.en || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5265 expected one en/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5265 missing ${field} on en/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
