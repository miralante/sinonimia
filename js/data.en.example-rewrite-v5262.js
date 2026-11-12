/* Literal example fixes for English entries flagged by check.js. */
(() => {
  const changes = {
    "round2689-octant-circle": { exampleSynonym: { word: "one eighth of the circle" } },
    "round2689-octant-space": { exampleSynonym: { word: "one-eighth section of the graph" } },
    "round2689-octant-astronomy": { exampleSynonym: { word: "45-degree position relative to the star" } },
    "round2691-odorant-adjective": { exampleSynonym: { word: "noticeable smell" } },
    "round2690-odonate-adjective": { exampleSynonym: { word: "habitat for dragonflies and damselflies" } },
    "round2695-officiate-ceremony": { exampleSynonym: { word: "lead the wedding ceremony" } },
    "round2697-oiliness-figurative": { exampleSynonym: { word: "insincere manner" } },
    "round2699-oleoresin-prepared": { exampleSynonym: { word: "oil and resin extract made from ginger" } },
    "round2700-oligocene-adjective": { exampleSynonym: { word: "during the Oligocene Epoch" } },
    "round2700-olio-stew": { exampleSynonym: { word: "hot stew with meat and vegetables" } },
    "round2707-open-start": { exampleSynonym: { word: "began the meeting" } },
    "round2709-operative-in-force": { exampleSynonym: { word: "come into force next month" } },
    "round2711-opportunity-job": { example: { word: "opportunities for new graduates" } },
    "round2711-opposable-anatomical": { exampleSynonym: { word: "grasp a branch" } },
    "round2712-oppress-emotional": { exampleSynonym: { word: "weighed on him" } },
    "round2713-orange-color": { exampleSynonym: { word: "painted the door orange" } },
    "round2716-organize-union": { exampleSynonym: { word: "formed a union" } },
    "round2717-orientalism-theory": { exampleSynonym: { word: "stereotyped portrayals" } },
    "round2719-orphan-verb": { exampleSynonym: { word: "left many children without parents" } },
    "round2722-ossify-figurative": { example: { word: "ossified" }, exampleSynonym: { word: "became rigid" } },
    "round2726-outing-disclosure": { exampleSynonym: { word: "revealing a private individual’s identity" } },
    "round2727-outrage-verb": { exampleSynonym: { word: "deeply offended the workers" } },
    "round2729-overbuild-over": { example: { word: "overbuilt a walkway" } },
    "round2732-overglaze-verb": { exampleSynonym: { word: "added a blue design over the bowl’s glaze" } },
    "round2732-overgrow-cover": { example: { word: "overgrew the old stone wall" } },
    "round2733-overlay-emotion": { example: { word: "overlaid her relief" } },
    "round2733-overlook-view": { exampleSynonym: { word: "see the garden clearly" } },
    "round2733-overlook-noun": { exampleSynonym: { word: "place with a wide mountain view" } },
    "round2734-override-control": { exampleSynonym: { word: "control the system by hand" } },
    "round2734-overpress-argument": { exampleSynonym: { word: "insisted on the same point too much" } },
    "round2735-overshadow-importance": { exampleSynonym: { word: "made the old one seem less important" } },
    "round2735-overshadow-gloom": { exampleSynonym: { word: "made their holiday less happy" } },
    "round2736-overthrow-turn": { example: { word: "overthrew several trees" }, exampleSynonym: { word: "knocked several trees down" } },
    "round2736-overthrow-throw": { example: { word: "overthrew the base" }, exampleSynonym: { word: "threw the ball too far past the base" } },
    "round2736-overturn-government": { exampleSynonym: { word: "remove the government from power" } },
    "round2736-overwhelm-cover": { exampleSynonym: { word: "covered the low sea wall completely" } },
    "round2737-overwork-use": { exampleSynonym: { word: "used the joke too many times" } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.en || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5262 expected one en/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5262 missing ${field} on en/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
