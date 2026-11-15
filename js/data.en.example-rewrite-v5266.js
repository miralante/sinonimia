/* Literal example fixes for English entries flagged by check.js. */
(() => {
  const changes = {
    "round2845-plant-secret-noun": { exampleSynonym: { word: "decoy", text: "The reporter suspected a decoy planted in the audience." } },
    "round2845-plaster-wall-verb": { exampleSynonym: { word: "covered the bedroom wall with plaster" } },
    "round2845-plaster-posters-verb": { exampleSynonym: { word: "covered the room with team photos" } },
    "round2845-plaster-cast-verb": { exampleSynonym: { word: "put his broken leg in a cast" } },
    "round2845-plaster-hit-verb": { exampleSynonym: { word: "beat their rivals badly" } },
    "round2846-plasticity-brain": { exampleSynonym: { word: "ability to adapt" } },
    "round2846-plate-sheet": { exampleSynonym: { word: "steel sheet" } },
    "round2846-plate-verb": { exampleSynonym: { word: "coated the spoon with silver" } },
    "round2846-plateau-progress": { exampleSynonym: { word: "stopped growing in June" } },
    "round2846-plateau-verb": { exampleSynonym: { word: "leveled off after a year" } },
    "round2847-platform-digital": { exampleSynonym: { word: "online system for lessons" } },
    "round2848-play-music": { exampleSynonym: { word: "performs music on the violin" } },
    "round2848-play-device": { exampleSynonym: { word: "run the video again" } },
    "round2848-play-around-fooling": { example: { word: "playing around" }, exampleSynonym: { word: "fooling around" } },
    "round2848-play-around-cheating": { example: { word: "playing around" }, exampleSynonym: { word: "being unfaithful" } },
    "round2848-play-off-pit": { example: { word: "played the rivals off against each other" }, exampleSynonym: { word: "set the rivals against each other" } },
    "round2848-player-musician": { exampleSynonym: { word: "musician", text: "The musician practised the piano every morning." } },
    "round2849-pleasure-source": { exampleSynonym: { word: "source of enjoyment", text: "Meeting them was a source of enjoyment." } },
    "round2850-pledge-money": { exampleSynonym: { word: "promised to give five hundred dollars to the fund" } },
    "round2850-pledge-security-verb": { exampleSynonym: { word: "used his watch as collateral" } },
    "round2852-plot-land-noun": { exampleSynonym: { word: "vegetable patch" } },
    "round2852-plow-snow-verb": { exampleSynonym: { word: "cleared snow from the road" } },
    "round2852-plow-through-verb": { exampleSynonym: { word: "pushed through the waves" } },
    "round2852-pluck-music-verb": { exampleSynonym: { word: "played the guitar strings" } },
    "plume-5": { exampleSynonym: { word: "took pride in her careful work" } },
    "plump-2": { exampleSynonym: { word: "fluffed up the pillows" } },
    "plump-3": { exampleSynonym: { word: "chose the smaller house" } },
    "plump-4": { exampleSynonym: { word: "fell heavily onto the floor" } },
    "poach-2": { exampleSynonym: { word: "lure skilled staff away from its competitor" } },
    "poach-3": { exampleSynonym: { word: "stealing its design idea" } },
    "poach-4": { exampleSynonym: { word: "took the shot that her partner was about to return" } },
    "poach-5": { exampleSynonym: { word: "churned the field into mud" } },
    "poach-6": { exampleSynonym: { word: "sank into the wet ground" } },
    "poach-8": { exampleSynonym: { word: "simmer the fish gently in milk" } },
    "point-out-3": { example: { word: "pointed out a mistake" } },
    "displace-4": { exampleSynonym: { word: "forced families out of their homes" } },
    "dollarize-2": { exampleSynonym: { word: "convert the economy to dollars" } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.en || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5266 expected one en/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5266 missing ${field} on en/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
