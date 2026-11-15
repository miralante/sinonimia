/* Literal example fixes for English entries flagged by check.js. */
(() => {
  const changes = {
    "round2389-lax-phonetics": { example: { text: "The lax vowel in “bit” is lax in English." } },
    "round2419-lime-twigs": { exampleSynonym: { word: "coated twigs with birdlime" } },
    "round2419-lime-color": { exampleSynonym: { word: "lime green", text: "The bright lime green scarf stood out in the shop." } },
    "round2420-limp-adjective-energy": { example: { word: "limp", text: "After the long hike, he felt limp and lifeless." }, exampleSynonym: { word: "lifeless", text: "After the long hike, he felt lifeless and limp." } },
    "round2421-linen-household": { example: { word: "linen", text: "She changed the linen on the bed." }, exampleSynonym: { word: "household linen", text: "She changed the household linen on the bed." } },
    "round2421-liner-eye": { example: { word: "liner", text: "She applied liner around her eyes." }, exampleSynonym: { word: "eyeliner", text: "She applied eyeliner around her eyes." } },
    "round2421-ling-heather": { example: { word: "ling", text: "Ling flowers grow across the moor." }, exampleSynonym: { word: "heather", text: "Heather flowers grow across the moor." } },
    "round2422-lining-process": { example: { word: "lining", text: "They are lining the drawer with paper." }, exampleSynonym: { word: "covering the inside", text: "They are covering the inside of the drawer with paper." } },
    "round2422-linoleum-similar-flooring": { example: { word: "linoleum", text: "The kitchen floor was covered with linoleum." }, exampleSynonym: { word: "similar floor covering", text: "The kitchen floor had a similar floor covering." } },
    "round2424-liquidity-market": { exampleSynonym: { word: "easy to sell the shares quickly" } },
    "round2425-listed-stock": { exampleSynonym: { word: "traded on the London Stock Exchange" } },
    "round2426-literality-interpretation": { exampleSynonym: { word: "exact meaning of the words" } },
    "round2426-literacy-language": { exampleSynonym: { word: "ability to use English well" } },
    "round2426-literacy-field-knowledge": { exampleSynonym: { word: "knowledge about finance" } },
    "round2426-literate-subject": { exampleSynonym: { word: "understand finance well" } },
    "round2426-literature-topic": { exampleSynonym: { word: "books and articles about immigration policy" } },
    "round2427-lithograph-verb": { exampleSynonym: { word: "prints the artist’s designs on paper by lithography" } },
    "round2435-livery-company": { exampleSynonym: { word: "red and gold colors" } },
    "round2435-livestream-verb": { exampleSynonym: { word: "broadcast live online" } },
    "round2439-locality-position": { exampleSynonym: { word: "position of physical objects in space" } },
    "round2440-lockpick-verb": { exampleSynonym: { word: "pick a lock", text: "The locksmith can pick a lock using simple tools." } },
    "round2446-longitudinal-study": { exampleSynonym: { word: "tracked children’s reading over five years" } },
    "round2448-loop-verb": { exampleSynonym: { word: "wound the rope around the post" } },
    "round2448-loophole-wall": { exampleSynonym: { word: "narrow opening in the stone wall" } },
    "round2448-loosen-intransitive": { exampleSynonym: { word: "came loose" } },
    "round2449-lordosis-excessive": { exampleSynonym: { word: "excessive curve in the lower spine" } },
    "round2450-lose-contest": { example: { word: "lost the final" }, exampleSynonym: { word: "was defeated in the final" } },
    "round2450-lose-ability": { example: { word: "lost some movement in his hand" }, exampleSynonym: { word: "no longer had full movement in his hand" } },
    "round2450-lose-opportunity": { example: { word: "lost the chance to study abroad" } },
    "round2450-lose-understanding": { example: { word: "lost the thread of the lecture" }, exampleSynonym: { word: "failed to understand the lecture" } },
    "round2450-lose-yourself-way": { example: { word: "lost ourselves in the forest" }, exampleSynonym: { word: "got lost in the forest" } },
    "round2450-loser-disadvantaged": { exampleSynonym: { word: "small businesses lost out most" } },
    "round2450-loss-reduction": { exampleSynonym: { word: "reduces heat" } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.en || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5258 expected one en/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5258 missing ${field} on en/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
