/* Literal example fixes for English entries flagged by check.js. */
(() => {
  const changes = {
    "agree-3": { exampleSynonym: { word: "shared the same opinion", text: "The committee shared the same opinion that the launch should be delayed." } },
    "invite-2": { exampleSynonym: { word: "invite to a meal", text: "The family chose to invite their neighbors to a meal." } },
    "copy-2": { example: { word: "go drinking", text: "They decided to go drinking after the final match." }, exampleSynonym: { word: "go for drinks", text: "They decided to go for drinks after the final match." } },
    "rampage-2": { exampleSynonym: { word: "run wild", text: "The crowd began to run wild through the town centre." } },
    "overwater": { exampleSynonym: { word: "water excessively", text: "Do not water excessively while the seedlings' roots are developing." } },
    "overcomb": { exampleSynonym: { word: "comb wet hair excessively" } },
    "discover-2": { exampleSynonym: { word: "find out", text: "The auditor tried to find out who had altered the records." } },
    guzzler: { exampleSynonym: { word: "heavy consumer", text: "The old truck is a heavy consumer of gasoline, earning it the nickname gas guzzler." } },
    god: { exampleSynonym: { word: "deity", text: "In the story, the deity guarded the spring." } },
    mordicative: { exampleSynonym: { word: "can bite" } },
    petrarchan: { exampleSynonym: { word: "Petrarchan sonnet style", text: "The poet used the Petrarchan sonnet style." } },
    "bed-3": { exampleSynonym: { word: "cot", text: "The child went to sleep early in a cot." } },
    "enjoy-2": { exampleSynonym: { word: "take pleasure in", text: "The children take pleasure in the concert." } },
    "affect-2": { exampleSynonym: { word: "made an emotional impression" } },
    attractable: { exampleSynonym: { word: "magnetizable", text: "The iron particles were magnetizable and could be drawn by the magnet." } },
    "austerity-3": { exampleSynonym: { word: "severity", text: "The severity of the design gave the gallery a stark, uncluttered feel." } },
    "hitchhiking-2": { exampleSynonym: { word: "getting free rides from drivers" } },
    "break-down-2": { example: { word: "break down", text: "The old printer began to break down just before the deadline." }, exampleSynonym: { word: "fail", text: "The old printer was about to fail just before the deadline." } },
    "get-lost-2": { example: { word: "get flustered", text: "She began to get flustered when she had to speak in front of the group." }, exampleSynonym: { word: "become embarrassed", text: "She started to become embarrassed when she had to speak in front of the group." } },
    "get-excited-3": { example: { word: "become moldy", text: "Fruit can become moldy when left in a damp cellar." } },
    "dance-3": { exampleSynonym: { word: "moved to the music" } },
    "aging-3": { exampleSynonym: { word: "made the old building look older" } },
    "balcony-5": { example: { word: "watch from a balcony", text: "They chose to watch the parade from a balcony across the street." } },
    "bizarre-2": { exampleSynonym: { word: "odd", text: "The odd sculpture drew a crowd of curious visitors." } },
    "biscuit-2": { exampleSynonym: { word: "cookie", text: "She served a cookie alongside the soup." } },
    "sponge-cake-2": { exampleSynonym: { word: "sugar-glazed sponge cake", text: "The nuns made a sugar-glazed sponge cake." } },
    "blazon-2": { exampleSynonym: { word: "describe a coat of arms", text: "The expert used heraldic terms to describe a coat of arms." } },
    "boycott-2": { exampleSynonym: { word: "refusal to buy the products" } },
    "gasp-2": { exampleSynonym: { word: "draw breath" } },
    "bordeaux-2": { exampleSynonym: { word: "Bordelais", text: "The Bordelais are known for wines from the Bordeaux region." } },
    "erase-2": { exampleSynonym: { word: "rub out", text: "She tried to rub out the notes on the board." } },
    "bottle-3": { exampleSynonym: { word: "small bottle of beer" } },
    "brush-2": { exampleSynonym: { word: "swept" } },
    "bustle-2": { exampleSynonym: { word: "busy" } },
    "junk-2": { exampleSynonym: { word: "useless things" } },
    "chain-2": { exampleSynonym: { word: "ornamental chain", text: "The horse’s bridle was decorated with a narrow ornamental chain." } },
    "bell-2": { exampleSynonym: { word: "fit with a bell", text: "The farmer chose to fit a bell to the lead sheep." } },
    "chancellor-2": { exampleSynonym: { word: "senior official", text: "The senior official met with foreign diplomats." } },
    "chant-2": { exampleSynonym: { word: "recite rhythmically", text: "The crowd began to recite the team’s name rhythmically." } },
    "capable-2": { exampleSynonym: { word: "able", text: "She is able to manage the project." } },
    "beaver-2": { exampleSynonym: { word: "wool fabric with a dense raised nap" } },
    "cart-4": { example: { word: "go partying", text: "They planned to go partying with their friends on Saturday." } },
    "centrifuge-2": { exampleSynonym: { word: "move objects away from the centre" } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.en || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5252 expected one en/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5252 missing ${field} on en/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
