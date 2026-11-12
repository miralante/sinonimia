/* Literal example fixes for English entries flagged by check.js. */
(() => {
  const changes = {
    "round2564-misuse-verb": { exampleSynonym: { word: "use the safety equipment improperly" } },
    "round2622-mythologize-invent": { exampleSynonym: { word: "created myths" } },
    "round2622-mythomaniac-adjective": { exampleSynonym: { word: "related to mythomania" } },
    "round2623-nail-attach": { exampleSynonym: { word: "fastened the sign to the fence with a nail" } },
    "round2623-nail-catch": { exampleSynonym: { word: "caught the thief" } },
    "round2623-nail-succeed": { exampleSynonym: { word: "did perfectly" } },
    "round2631-naturalize-species": { exampleSynonym: { word: "establish the flower in the cooler climate" } },
    "round2631-naturalize-word": { exampleSynonym: { word: "adopted the borrowed word into common use" } },
    "round2631-naturalization-plant": { exampleSynonym: { word: "establishment of the plant in the new region" } },
    "round2633-navigate-figurative": { exampleSynonym: { word: "find our way" } },
    "round2640-neither-conjunction": { exampleSynonym: { word: "did not call or send a message" } },
    "round2642-neogene-adjective": { exampleSynonym: { word: "from the Neogene" } },
    "round2647-net-catch": { exampleSynonym: { word: "caught several fish with a net" } },
    "round2654-nick-steal": { exampleSynonym: { word: "stole my bicycle" } },
    "round2657-nineties-age": { exampleSynonym: { word: "between the ages of 90 and 99" } },
    "round2660-nod-agree": { exampleSynonym: { word: "signaled agreement" } },
    "round2674-nude-person": { exampleSynonym: { word: "naked people" } },
    "round2674-nudge-verb": { exampleSynonym: { word: "gave his friend a gentle push" } },
    "round2674-nugget-information": { exampleSynonym: { word: "useful historical fact" } },
    "round2675-numb-physical-verb": { exampleSynonym: { word: "deadened sensation in his hands" } },
    "round2675-numb-emotional-verb": { exampleSynonym: { word: "dull her emotions" } },
    "round2678-nutrition-study": { exampleSynonym: { word: "studied diet and health" } },
    "round2681-objectify-concrete": { example: { word: "objectifies the steps in the process" }, exampleSynonym: { word: "makes the steps in the process concrete" } },
    "round2681-objectify-reality": { example: { word: "objectifies a concept that is difficult to measure" }, exampleSynonym: { word: "treats a difficult-to-measure concept as an objective reality" } },
    "round2682-oblivion-destruction": { exampleSynonym: { word: "destroyed the building" } },
    "round2683-obscurity-unknown": { exampleSynonym: { word: "remained unknown for years" } },
    "round2685-obstruct-view": { exampleSynonym: { word: "blocked the view" } },
    "round2685-obtuse-blunt": { exampleSynonym: { word: "rounded tip" } },
    "round2686-obviousness-patent": { exampleSynonym: { word: "obvious invention" } },
    "round2687-occupy-time": { example: { word: "occupied the children all afternoon" }, exampleSynonym: { word: "kept the children busy all afternoon" } },
    "round2687-occupy-force": { example: { word: "occupied the port during the conflict" }, exampleSynonym: { word: "took over the port during the conflict" } },
    "round2687-occupy-position": { example: { word: "occupies a senior position" } },
    "round2687-occupy-attention": { example: { word: "occupied his thoughts all day" }, exampleSynonym: { word: "preoccupied him all day" } },
    "round2687-occur-present": { exampleSynonym: { word: "is found in dry areas" } },
    "round2688-oceanic-crust": { exampleSynonym: { word: "from the ocean floor" } },
    "round2688-oceanic-languages": { exampleSynonym: { word: "from the Oceanic group" } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.en || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5261 expected one en/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5261 missing ${field} on en/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
