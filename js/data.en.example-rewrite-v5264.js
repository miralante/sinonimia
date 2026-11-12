/* Literal example fixes for English entries flagged by check.js. */
(() => {
  const changes = {
    "round2729-overbuild-over": { example: { word: "overbuilt across the tracks" } },
    "round2781-pay-off-result": { exampleSynonym: { word: "worked out well in the final match" } },
    "round2783-peach-excellent": { exampleSynonym: { word: "wonderful person", text: "The new colleague is a wonderful person." } },
    "round2783-peak-verb": { exampleSynonym: { word: "reached a maximum in December" } },
    "round2783-pear-shaped-figurative": { exampleSynonym: { word: "went wrong when the supplier cancelled" } },
    "round2784-peasant-insult": { exampleSynonym: { word: "called his rival uncultured" } },
    "round2785-pedal-verb": { exampleSynonym: { word: "rode their bikes" } },
    "round2789-peer-look": { exampleSynonym: { word: "looked closely through the fog" } },
    "round2789-peg-economic-noun": { exampleSynonym: { word: "fixed dollar level" } },
    "round2790-pen-write": { exampleSynonym: { word: "wrote a note" } },
    "round2791-pencil-verb": { exampleSynonym: { word: "write in pencil", text: "She wrote in pencil in the margin." } },
    "round2791-pencil-in": { example: { word: "penciled in lunch for Friday" } },
    "round2791-pendular-figurative": { exampleSynonym: { word: "shifted back and forth" } },
    "round2793-pension-verb": { exampleSynonym: { word: "gave him a pension" } },
    "round2794-pentathlon-ancient": { exampleSynonym: { word: "ancient Greek five-event contest" } },
    "round2794-pepper-season": { exampleSynonym: { word: "season the soup with pepper" } },
    "round2795-perceive-interpret": { exampleSynonym: { word: "understood the comment as criticism" } },
    "round2796-perch-fish": { exampleSynonym: { word: "freshwater fish" } },
    "round2796-perch-verb": { exampleSynonym: { word: "sat on the wall" } },
    "round2796-percolate-coffee": { exampleSynonym: { word: "let the coffee brew for five minutes" } },
    "round2796-percuss-medical": { exampleSynonym: { word: "tapped his chest during the examination" } },
    "round2796-percussion-instruments": { exampleSynonym: { word: "percussion instruments", text: "She played percussion instruments in the band." } },
    "round2796-percussion-medical": { exampleSynonym: { word: "tapped his chest as part of the examination" } },
    "round2797-perennial-plant": { exampleSynonym: { word: "plants that live for more than two years" } },
    "round2798-performance-ability": { exampleSynonym: { word: "worked better after repairs" } },
    "round2800-period-menstruation": { exampleSynonym: { word: "menstrual flow" } },
    "round2800-peripheral-secondary": { exampleSynonym: { word: "minor details" } },
    "round2801-perish-decay": { exampleSynonym: { word: "broke down in the sun" } },
    "round2802-periwinkle-color": { exampleSynonym: { word: "pale blue-purple" } },
    "round2803-perpendicular-line": { exampleSynonym: { word: "line meeting the road at a 90-degree angle" } },
    "round2805-persist-effort": { exampleSynonym: { word: "kept going with the appeal" } },
    "round2806-personify-embody": { example: { word: "personified courage" }, exampleSynonym: { word: "embodied courage" } },
    "round2807-perturb-technical": { exampleSynonym: { word: "changed the comet’s path" } },
    "round2807-perverse-moral": { exampleSynonym: { word: "cruel act" } },
    "round2807-perversity-action": { exampleSynonym: { word: "rejected the helpful advice to be difficult" } },
    "round2808-pestilential-harm": { exampleSynonym: { word: "harmful effects of the chemical" } },
    "round2809-petrify-fear": { example: { word: "petrified the child" }, exampleSynonym: { word: "left the child unable to move" } },
    "round2809-petrify-harden": { example: { word: "petrified his feelings" }, exampleSynonym: { word: "made his feelings hard and cold" } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.en || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5264 expected one en/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5264 missing ${field} on en/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
