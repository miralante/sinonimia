/* Literal example fixes for English entries flagged by check.js. */
(() => {
  const changes = {
    "agree-3": { exampleSynonym: { word: "share the same opinion", text: "The committee shared the same opinion that the launch should be delayed." } },
    "invite-2": { exampleSynonym: { word: "invite to a meal", text: "The family invited their neighbors to a meal." } },
    "copy-2": { example: { word: "go drinking", text: "They went drinking after the final match." }, exampleSynonym: { word: "go for drinks", text: "They went for drinks after the final match." } },
    "rampage-2": { exampleSynonym: { word: "run wild", text: "The crowd ran wild through the town centre." } },
    "poisoner-2": { exampleSynonym: { word: "person who poisons", text: "The person who poisons others may leave traces of the substance behind." } },
    "boss-2": { exampleSynonym: { word: "excellent", text: "That is an excellent new guitar." } },
    "murmur-2": { exampleSynonym: { word: "mutter", text: "They muttered softly during the performance." } },
    "archaebacteria-2": { example: { word: "archaebacteria", text: "Archaebacteria can live in highly salty environments." } },
    "caddy-2": { exampleSynonym: { word: "golf caddie", text: "The golf caddie carried the player's clubs." } },
    "orphanhood-3": { exampleSynonym: { word: "state of being orphaned", text: "The novel portrays the state of being orphaned without sentimentality." } },
    "imaginative-2": { exampleSynonym: { word: "creative", text: "The children devised a creative solution to the puzzle." } },
    "hit-9": { exampleSynonym: { word: "strike", text: "The boxer delivered a strike to the padded target." } },
    "chancellor-4": { exampleSynonym: { word: "senior official", text: "The senior official at the embassy prepared the documents." } },
    "lioness-2": { exampleSynonym: { word: "female lion", text: "The female lion watched over her cubs." } },
    "docimastic-2": { exampleSynonym: { word: "assaying", text: "The report describes the assaying of ore to measure its composition." } },
    "andalusian-3": { example: { word: "andalusian", text: "The Andalusian geologist identified the mineral in the metamorphic rock." }, exampleSynonym: { word: "aluminum silicate mineral", text: "The geologist identified an aluminum silicate mineral in the metamorphic rock." } },
    "trim-3": { exampleSynonym: { word: "clipped" } },
    "bohio": { exampleSynonym: { word: "Taíno hut", text: "The Taíno hut was built from local plant materials." } },
    "burundanga": { exampleSynonym: { word: "scopolamine", text: "Scopolamine is known regionally as burundanga." } },
    "cancon": { exampleSynonym: { word: "Canadian content", text: "The station met its Canadian content quota with local artists." } },
    "overwater": { exampleSynonym: { word: "water excessively" } },
    "overcomb": { exampleSynonym: { word: "comb excessively" } },
    "atonia": { exampleSynonym: { word: "loss of normal muscle tone" } },
    "ostial": { exampleSynonym: { word: "at the opening of the artery", text: "The scan showed narrowing at the opening of the artery." } },
    "adnate": { exampleSynonym: { word: "joined to the ovary", text: "The flower has an adnate calyx joined to the ovary." } },
    "discover-2": { exampleSynonym: { word: "find out" } },
    "normie": { exampleSynonym: { word: "ordinary people" } },
    "repeat": { exampleSynonym: { word: "perform the final number again", text: "The audience asked the singer to perform the final number again." } },
    "cross-eyed-3": { exampleSynonym: { word: "strabismic", text: "The specialist confirmed a strabismic condition in the child." } },
    "attic-4": { example: { word: "dormer window", text: "The dormer window admitted daylight into the attic room." } },
    "regarding-the-weather": { exampleSynonym: { word: "weather conditions", text: "For weather conditions, the forecast predicts clear skies." } },
    "regarding-jorge-luis-borges": { exampleSynonym: { word: "related to Borges" } },
    "open-5": { exampleSynonym: { word: "not closed", text: "The door was not closed." } },
    "tortilla": { exampleSynonym: { word: "corn flatbread" } },
    "guarache": { exampleSynonym: { word: "Mexican leather sandals", text: "He wore Mexican leather sandals through the market." } },
    "heel-6": { exampleSynonym: { word: "back of her foot", text: "She hurt the back of her foot while walking in new shoes." } },
    "boiler-4": { exampleSynonym: { word: "large quantity", text: "She prepared a large quantity of soup for the guests." } },
    "debt-5": { exampleSynonym: { word: "liability", text: "The liability was due at the end of the month." } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.en || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5251 expected one en/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5251 missing ${field} on en/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
