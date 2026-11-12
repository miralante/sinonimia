/* Literal example fixes for English entries flagged by check.js. */
(() => {
  const changes = {
    "round2729-overbuild-over": { example: { word: "overbuilt across the tracks" } },
    "round2738-own-possess": { exampleSynonym: { word: "have a small apartment as their property" } },
    "round2738-own-defeat": { exampleSynonym: { word: "defeated its rivals completely" } },
    "round2738-own-goal-figurative": { exampleSynonym: { word: "harmed the company’s own interests" } },
    "round2740-pacemaker-natural": { exampleSynonym: { word: "small area of tissue in the heart" } },
    "round2741-pack-load": { exampleSynonym: { word: "carried their supplies" } },
    "round2741-pack-up-machine": { example: { word: "packed up" } },
    "round2741-pack-up-quit": { example: { word: "packed up his job" } },
    "round2742-paddock-racing": { exampleSynonym: { word: "area where it waited before the race" } },
    "round2744-paint-shop-workshop": { exampleSynonym: { word: "workshop where it would be painted" } },
    "round2744-painting-surface": { exampleSynonym: { word: "covering the fence with paint" } },
    "round2746-palaver-verb": { exampleSynonym: { word: "discussed the plans at length" } },
    "round2752-panel-cover": { exampleSynonym: { word: "cover the study walls with oak panels" } },
    "round2755-pantheon-temple": { exampleSynonym: { word: "temple to all the gods" } },
    "round2758-parabolize-shape": { exampleSynonym: { word: "made the mirror parabolic" } },
    "round2760-paragraph-divide": { exampleSynonym: { word: "divide the long report into paragraphs" } },
    "round2760-paragraph-write": { exampleSynonym: { word: "wrote about the causes of the war" } },
    "round2761-paralyze-ineffective": { exampleSynonym: { word: "brought the factory to a standstill" } },
    "round2764-parcel-divide": { exampleSynonym: { word: "divided among the heirs" } },
    "round2765-pariah-country": { exampleSynonym: { word: "became isolated among its neighbors" } },
    "round2766-parity-currency": { exampleSynonym: { word: "same value as the dollar" } },
    "round2766-park-vehicle": { exampleSynonym: { word: "left the car beside the station" } },
    "round2766-park-postpone": { exampleSynonym: { word: "put that question aside" } },
    "round2767-parody-verb": { example: { word: "parodied the mayor’s speech" } },
    "round2768-parrot-verb": { exampleSynonym: { word: "repeated the answer mechanically" } },
    "round2768-parsimonious-sparing": { exampleSynonym: { word: "brief account of the events" } },
    "round2769-part-verb-depart": { exampleSynonym: { word: "said goodbye at the station" } },
    "round2770-partition-legal": { exampleSynonym: { word: "divide the estate" } },
    "round2770-party-legal": { example: { word: "parties signed the agreement" }, exampleSynonym: { word: "signatories signed the agreement" } },
    "round2770-party-verb": { example: { word: "partied with friends after the concert" } },
    "round2771-pass-sports": { exampleSynonym: { word: "sent the ball to his teammate" } },
    "round2771-pass-out-distribute": { example: { word: "passed out the worksheets" }, exampleSynonym: { word: "handed out the worksheets" } },
    "round2771-pass-over-cross": { example: { word: "passes over a small bridge" } },
    "round2772-passage-travel": { exampleSynonym: { word: "booked a place on the next flight" } },
    "round2772-passage-permission": { exampleSynonym: { word: "right to travel safely through the harbor" } },
    "round2775-patent-verb": { exampleSynonym: { word: "secured a patent" } },
    "round2776-paternity-identity": { exampleSynonym: { word: "establish who the child’s father was" } },
    "round2777-patriarch-ancestor": { exampleSynonym: { word: "first founder" } },
    "round2781-pay-off-result": { example: { word: "paid off in the final match" } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.en || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5263 expected one en/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5263 missing ${field} on en/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
