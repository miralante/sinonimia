/* Literal example fixes for English entries flagged by check.js. */
(() => {
  const changes = {
    "balcony-5": { exampleSynonym: { word: "observed the parade from above" } },
    "disappointment-5": { exampleSynonym: { word: "letdown", text: "The cancellation was a letdown for her." } },
    "muddy-18": { exampleSynonym: { word: "covered the hikers’ boots with mud" } },
    "open-6": { exampleSynonym: { word: "make the library available" } },
    "cap-with-branches": { example: { word: "cap the garden wall with branches" }, exampleSynonym: { word: "covered the garden wall with brushwood" } },
    "kiss-repeatedly": { exampleSynonym: { word: "covered her grandson with kisses" } },
    "bake-twice": { example: { word: "baked the bread twice" } },
    "knock-away": { example: { word: "knocked away" }, exampleSynonym: { word: "knocked the other ball aside" } },
    "bocce-strike": { exampleSynonym: { word: "volley shot", text: "She used a volley shot to send the opponent’s ball away from the target." } },
    "raised-embroidery": { exampleSynonym: { word: "relief embroidery", text: "The blouse had relief embroidery on its sleeves." } },
    "hurl-short-lance": { example: { word: "hurl a short lance", text: "The knights prepared to hurl a short lance at the target." }, exampleSynonym: { word: "throw lances" } },
    "ball-blow": { exampleSynonym: { word: "hit by a ball" } },
    "to-confuse-or-tangle": { example: { word: "confuse the buyer" } },
    "murder-lunfardo": { example: { word: "murder" } },
    "to-stamp-cloth": { example: { word: "stamped the cloth" }, exampleSynonym: { word: "sealed the fabric" } },
    "fool-colloquial": { example: { word: "fool" } },
    "grant-a-bonus": { example: { word: "grant a bonus", text: "The company chose to grant a bonus to customers for the delay." }, exampleSynonym: { word: "gave customers a bonus credit" } },
    "gush-of-water": { example: { word: "gush of water", text: "A gush of water came through the opening." } },
    "trivial-thing": { exampleSynonym: { word: "trifle", text: "The paperwork error was a mere trifle." } },
    "excrete-dung": { example: { word: "excreted dung" } },
    "boot-wineskin-patch": { example: { word: "boot or wineskin patch", text: "A boot or wineskin patch sealed the leak." } },
    "raise-money-by-collecting": { example: { word: "raise money by collecting donations", text: "They organized a concert to raise money by collecting donations." }, exampleSynonym: { word: "collected donations" } },
    "beer-bottle": { exampleSynonym: { word: "small bottle of beer" } },
    "braceado-worker": { exampleSynonym: { word: "brewery or foundry worker", text: "The brewery or foundry worker stood beside the vat." } },
    "arm-armor": { example: { word: "arm armor", text: "The knight’s arm armor, called a vambrace, protected his forearm." } },
    "rutting-ground": { exampleSynonym: { word: "rutting site", text: "The deer returned to the rutting site in early autumn." } },
    "to-work-colloquial": { example: { word: "work early tomorrow" } },
    "rock-a-child": { example: { word: "rocked the child until he fell asleep" }, exampleSynonym: { word: "cradled the baby" } },
    "light-reflecting": { exampleSynonym: { word: "shiny" } },
    "jumping-animal": { exampleSynonym: { word: "leaping animal" } },
    "cattle-jumping-place": { exampleSynonym: { word: "livestock crossing", text: "The livestock crossing let the herd get over the fence." } },
    "embroider-with-gold-twist": { example: { word: "embroider with gold twist", text: "The artisan used a gold twist to embroider the handkerchief." }, exampleSynonym: { word: "brocaded the handkerchief with gold thread" } },
    bronzing: { exampleSynonym: { word: "tan" } },
    "bronze-work": { exampleSynonym: { word: "bronze fittings" } },
    "blow-with-a-buckler": { example: { word: "blow with a buckler", text: "The fighter landed a blow with a buckler." }, exampleSynonym: { word: "struck with his small shield" } },
    "oak-leaf-caterpillar": { exampleSynonym: { word: "stripped the oak leaves" } },
    "practice-witchcraft": { example: { word: "practiced witchcraft" } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.en || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5254 expected one en/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5254 missing ${field} on en/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
