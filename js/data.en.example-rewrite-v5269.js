/* Literal example fixes for English entries flagged by check.js. */
(() => {
  const changes = {
    "round3290-wring-extract": { example: { word: "wrung a promise from the mayor" } },
    "round3290-wring-distress": { example: { word: "wrung her heart" } },
    "round3290-write-correspond": { example: { word: "wrote to his sister every week" }, exampleSynonym: { word: "sent a message to his sister every week" } },
    "round3291-wrong-moral": { exampleSynonym: { word: "immoral", text: "It was immoral to blame her without proof." } },
    "round3295-yard-verb": { exampleSynonym: { word: "enclose", text: "They used a fence to enclose the cattle in the yard before the storm." } },
    "round3295-yarn-verb": { exampleSynonym: { word: "spin a yarn", text: "They spun a yarn about their travels all evening." } },
    "round3296-yawn-boring": { exampleSynonym: { word: "bored everyone", text: "The meeting bored everyone." } },
    "round3299-young-adjective": { exampleSynonym: { word: "youthful", text: "The youthful tree grew quickly." } },
    "round3301-zap-noun": { exampleSynonym: { word: "burst of energy", text: "A burst of energy made the lights flicker." } },
    "round3305-zone-verb": { exampleSynonym: { word: "divide the land into zones for homes and shops" } },
    "round3306-zoom-increase": { exampleSynonym: { word: "rose rapidly after the new product launched" } },
    "round3307-zoroastrian-adjective": { exampleSynonym: { word: "related to Zoroastrianism" } },
    "round3309-abandon-give-up": { exampleSynonym: { word: "gave up the plan" } },
    "round3312-abduction-anatomy": { exampleSynonym: { word: "movement of the patient’s arm away from the midline" } },
    "round3312-abductor-muscle": { exampleSynonym: { word: "abductor muscle", text: "The abductor muscle moved her leg outward during exercise." } },
    "round3314-ablative-protective": { exampleSynonym: { word: "material that wore away to protect its heat shield" } },
    "round3319-absolve-duty": { exampleSynonym: { word: "release her from her duties" } },
    "round3319-absolve-religious": { exampleSynonym: { word: "forgive his sins" } },
    "round3319-absorbable-medical": { exampleSynonym: { word: "absorbed by the body", text: "The stitches are absorbed by the body over time." } },
    "round3319-absorption-engrossed": { exampleSynonym: { word: "complete attention" } },
    "round3320-abstinence-sex": { exampleSynonym: { word: "refrain from sex" } },
    "round3320-abstract-art": { exampleSynonym: { word: "non-representational painting" } },
    "round3322-abyss-figurative": { exampleSynonym: { word: "great divide", text: "The scandal created a great divide that pushed the company toward disaster." } },
    "round3324-accelerate-development": { exampleSynonym: { word: "make development happen faster" } },
    "round3324-acceleration-debt": { exampleSynonym: { word: "term that made the full debt due earlier after default" } },
    "round3326-access-verb": { exampleSynonym: { word: "view the report online" } },
    "round3326-accessibility-inclusive": { exampleSynonym: { word: "easier for wheelchair users to use" } },
    "round3326-accessible-disabled": { exampleSynonym: { word: "usable by wheelchair users" } },
    "round3327-acclimatize-intransitive": { exampleSynonym: { word: "adapt to the heat" } },
    "round3329-account-for-track": { example: { word: "accounted for every item in the box" }, exampleSynonym: { word: "kept track of every item in the box" } },
    "round3330-accredit-source": { exampleSynonym: { word: "attributed the quote to a local historian" } },
    "round3334-ache-longing": { exampleSynonym: { word: "longed to see his family again" } },
    "round3343-active-finance": { exampleSynonym: { word: "frequent transactions" } },
    "round3344-acuity-senses": { exampleSynonym: { word: "how clearly she could see" } },
    "round3345-acute-perceptive": { exampleSynonym: { word: "sharp sense of hearing" } },
    "round3347-adapter-agent": { exampleSynonym: { word: "person who adapted the text" } },
    "round3348-addict-enthusiast": { exampleSynonym: { word: "music fan" } },
    "round3348-addictive-enjoyable": { exampleSynonym: { word: "hard to stop playing" } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.en || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5269 expected one en/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5269 missing ${field} on en/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
