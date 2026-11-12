/* Literal example fixes for English entries flagged by check.js. */
(() => {
  const changes = {
    "round2457-lull-deceive": { exampleSynonym: { word: "put them at ease" } },
    "round2555-mint-plant": { exampleSynonym: { word: "mint leaves" } },
    "round2555-mint-verb": { exampleSynonym: { word: "make a new coin" } },
    "round2555-minority-legal": { exampleSynonym: { word: "underage" } },
    "round2555-mint-new-word": { exampleSynonym: { word: "coined a phrase" } },
    "round2558-miscellany-writing": { exampleSynonym: { word: "collection of short essays" } },
    "round2559-misdirect-attention": { exampleSynonym: { word: "used attention wrongly" } },
    "round2561-mismatch-verb": { exampleSynonym: { word: "paired the jacket and trousers badly" } },
    "round2562-miss-longing": { exampleSynonym: { word: "longed for his family" } },
    "round2562-miss-event": { exampleSynonym: { word: "failed to catch the last bus" } },
    "round2563-missing-person": { exampleSynonym: { word: "could not account for the hiker’s whereabouts" } },
    "round2563-mission-religious": { exampleSynonym: { word: "religious work", text: "The group’s religious work includes running a school in the village." } },
    "round2564-misuse-verb": { exampleSynonym: { word: "use improperly" } },
    "round2565-mitral-mitre": { exampleSynonym: { word: "related to a bishop’s hat" } },
    "round2567-mobilise-military": { exampleSynonym: { word: "prepared its troops" } },
    "round2568-mobilize-military": { exampleSynonym: { word: "prepared its troops" } },
    "round2568-modality-grammar": { exampleSynonym: { word: "grammatical possibility" } },
    "round2570-modulate-music": { exampleSynonym: { word: "changes into a higher key" } },
    "round2570-modulate-signal": { exampleSynonym: { word: "adjusts the signal" } },
    "round2570-modify-lessen": { example: { word: "modified her criticism" } },
    "round2577-monkey-verb": { exampleSynonym: { word: "fooling around" } },
    "round2584-moralize-preach": { example: { word: "moralizing" } },
    "round2589-mortify-discipline": { example: { word: "mortified his desires" }, exampleSynonym: { word: "practiced self-denial" } },
    "round2602-muddle-mix": { exampleSynonym: { word: "mixed up the name cards" } },
    "round2603-muffle-warm": { exampleSynonym: { word: "wrapped up warmly" } },
    "round2604-mulch-verb": { exampleSynonym: { word: "cover the garden beds with mulch" } },
    "round2606-multidimensional-physical": { exampleSynonym: { word: "space with several dimensions" } },
    "round2607-multimedia-art": { exampleSynonym: { word: "mixed-media work" } },
    "round2608-multipolar-world": { exampleSynonym: { word: "world with several centres of power" } },
    "round2610-municipalize-municipality": { exampleSynonym: { word: "make the growing settlement into a municipality" } },
    "round2611-murder-verb": { exampleSynonym: { word: "kill the king unlawfully" } },
    "round2611-murmur-heart": { exampleSynonym: { word: "unusual heart sound" } },
    "round2612-muscle-influence": { exampleSynonym: { word: "used its influence" } },
    "round2615-must-inference": { exampleSynonym: { word: "certain to be home" } },
    "round2616-mutable-computing": { exampleSynonym: { word: "can be changed" } },
    "round2617-mutiny-verb": { example: { word: "mutinied against their officers" } },
    "round2618-muzzle-animal-verb": { exampleSynonym: { word: "fitted a muzzle on the dog" } },
    "round2621-mystify-obscure": { example: { word: "mystified a simple process" }, exampleSynonym: { word: "made a simple process obscure" } },
    "round2622-mythologize-study": { exampleSynonym: { word: "wrote about the old stories" } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.en || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5260 expected one en/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5260 missing ${field} on en/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
