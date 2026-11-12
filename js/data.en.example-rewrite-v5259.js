/* Literal example fixes for English entries flagged by check.js. */
(() => {
  const changes = {
    "round2435-livestream-verb": { exampleSynonym: { word: "broadcast the conference live online" } },
    "round2452-lousy-lice": { exampleSynonym: { word: "infested with fleas and lice" } },
    "round2452-love-verb-affection": { exampleSynonym: { word: "cares for" } },
    "round2452-love-sex": { exampleSynonym: { word: "made love" } },
    "round2453-low-height": { exampleSynonym: { word: "close to the ground" } },
    "round2453-low-mood": { exampleSynonym: { word: "sadness", text: "Her sadness eased after a call from her friend." } },
    "round2453-lower-position": { exampleSynonym: { word: "bring the basket down" } },
    "round2453-lower-descend": { exampleSynonym: { word: "sank toward the horizon" } },
    "round2454-lowercase-style": { exampleSynonym: { word: "small letters throughout" } },
    "round2457-lull-deceive": { exampleSynonym: { word: "put at ease" } },
    "round2459-lump-verb-group": { exampleSynonym: { word: "grouped several different causes together" } },
    "round2487-manifest-record": { exampleSynonym: { word: "recorded the boxes on a cargo list" } },
    "round2488-manipulate-influence": { exampleSynonym: { word: "unfairly influenced his friend" } },
    "round2488-manipulate-figures": { exampleSynonym: { word: "falsified the figures" } },
    "round2488-manipulate-medical": { exampleSynonym: { word: "treated her shoulder by hand" } },
    "round2490-manufacture-false": { exampleSynonym: { word: "made up an excuse" } },
    "round2490-manure-verb": { exampleSynonym: { word: "fertilized the field with manure" } },
    "round2491-manuscript-submission": { exampleSynonym: { word: "draft" } },
    "round2494-margin-collateral": { exampleSynonym: { word: "collateral requirement" } },
    "round2500-martyr-suffers-from": { exampleSynonym: { word: "person who suffered from frequent headaches" } },
    "round2500-martyr-verb": { exampleSynonym: { word: "put those who kept their faith to death for their beliefs" } },
    "round2502-mask-hide-feelings": { exampleSynonym: { word: "hide his disappointment" } },
    "round2503-masquerade-verb": { exampleSynonym: { word: "posed as a doctor" } },
    "round2503-massage-figures": { example: { word: "massaging the figures" }, exampleSynonym: { word: "manipulating the figures" } },
    "round2503-master-animal-owner": { exampleSynonym: { word: "owner" } },
    "round2503-master-control-problem": { exampleSynonym: { word: "overcame the emergency" } },
    "round2506-materialize-sudden-appearance": { exampleSynonym: { word: "appeared suddenly" } },
    "round2506-materialize-take-physical-form": { exampleSynonym: { word: "took bodily form" } },
    "round2512-means-test-verb": { exampleSynonym: { word: "check applicants’ income for housing support" } },
    "round2514-medallion-large-medal": { exampleSynonym: { word: "large silver medal" } },
    "round2539-meter-verb": { exampleSynonym: { word: "measures the water usage" } },
    "round2543-microchip-verb": { exampleSynonym: { word: "implants an identification chip" } },
    "round2546-microwave-verb": { exampleSynonym: { word: "heated the soup in a microwave" } },
    "round2546-mid-prefix": { example: { word: "mid-", text: "The prefix mid- appears in the word midweek." } },
    "round2547-migrate-animal": { exampleSynonym: { word: "move south each winter" } },
    "round2547-migrate-computing": { exampleSynonym: { word: "transfer its files to a new server" } },
    "round2549-mill-around": { exampleSynonym: { word: "moved around aimlessly" } },
    "round2552-mince-idiom": { exampleSynonym: { word: "spoke directly" } },
    "round2552-mince-walk": { exampleSynonym: { word: "walked delicately" } },
    "round2552-mind-care": { exampleSynonym: { word: "object" } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.en || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5259 expected one en/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5259 missing ${field} on en/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
