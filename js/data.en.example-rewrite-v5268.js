/* Literal example fixes for English entries flagged by check.js. */
(() => {
  const changes = {
    "round2975-radical-adjective": { example: { word: "radical ideas", text: "They favour radical ideas that support major social change." } },
    "round3216-wake-awareness": { example: { word: "woke the public to the danger" } },
    "round3216-wake-up-awareness": { example: { word: "woke the public up to the danger" } },
    "round3221-wallow-emotional": { exampleSynonym: { word: "felt sorry for herself" } },
    "round3223-wander-thoughts": { exampleSynonym: { word: "lost focus during the long meeting" } },
    "round3233-watered-down-figurative": { example: { word: "watered-down plan" } },
    "round3236-wax-polish": { exampleSynonym: { word: "polished the floor with wax" } },
    "round3236-wax-hair-removal": { exampleSynonym: { word: "removed her leg hair with wax" } },
    "round3236-wax-speak": { exampleSynonym: { word: "became eloquent during the debate" } },
    "round3237-weaken-intransitive": { exampleSynonym: { word: "lost strength" } },
    "round3243-weigh-specific-weight": { exampleSynonym: { word: "has a weight of two kilos" } },
    "round3254-whisk-quick": { exampleSynonym: { word: "snatched the keys off the table" } },
    "round3254-whisper-secret": { exampleSynonym: { word: "murmured the answer in her ear" } },
    "round3255-whistle-bird": { exampleSynonym: { word: "sang high calls at dawn" } },
    "round3255-whistle-referee": { exampleSynonym: { word: "signaled a penalty with the whistle" } },
    "round3256-white-person": { exampleSynonym: { word: "residents of European ancestry" } },
    "round3258-whitewasher-cover-up": { exampleSynonym: { word: "person concealing the truth" } },
    "round3259-whore-insult": { example: { word: "sexist insult" } },
    "round3260-wick-moisture": { exampleSynonym: { word: "draws sweat away" } },
    "round3262-wig-verb": { exampleSynonym: { word: "told him off" } },
    "round3265-win-obtain": { example: { word: "won a scholarship" } },
    "round3266-wind-turn": { example: { word: "wound the old clock" }, exampleSynonym: { word: "wound up the old clock" } },
    "round3266-wind-wrap": { example: { word: "wound the scarf around her neck" } },
    "round3266-wind-someone-up": { example: { word: "wound him up about the mistake" } },
    "round3266-wind-breath-verb": { example: { word: "winded him" }, exampleSynonym: { word: "left him breathless" } },
    "round3271-wink-sleep": { exampleSynonym: { word: "did not get any sleep" } },
    "round3271-winnow-figurative": { exampleSynonym: { word: "filtered the list down to five strong candidates" } },
    "round3272-winter-feed-animals": { exampleSynonym: { word: "kept the sheep through winter" } },
    "round3274-wish-hope-someone": { exampleSynonym: { word: "sent her good wishes" } },
    "round3275-withdraw-money": { example: { word: "withdrew cash before the trip" } },
    "round3275-withdraw-retreat": { example: { word: "withdrew before nightfall" } },
    "round3275-withdraw-activity": { example: { word: "withdrew from the competition" } },
    "round3275-withdraw-retract": { example: { word: "withdrew his earlier claim" } },
    "round3276-withhold-tax": { example: { word: "withheld tax from her pay" } },
    "round3283-work-medicine-verb": { exampleSynonym: { word: "took effect quickly" } },
    "round3286-worm-move": { exampleSynonym: { word: "squeezed her way through the crowd" } },
    "round3286-worm-extract": { exampleSynonym: { word: "drew the secret out of his friend" } },
    "round3289-wrap-up-conclude": { example: { word: "wrapped up the meeting before noon" } },
    "round3290-wring-force": { example: { word: "wrung the handle until it broke" } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.en || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5268 expected one en/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5268 missing ${field} on en/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
