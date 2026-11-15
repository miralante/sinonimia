/* Literal example fixes for English entries flagged by check.js. */
(() => {
  const changes = {
    "muddy-18": { exampleSynonym: { word: "cover the hikers’ boots with mud" } },
    "excrete-dung": { exampleSynonym: { word: "defecated" } },
    "boot-wineskin-patch": { exampleSynonym: { word: "patch", text: "The cobbler used a patch to seal the leak in the wineskin." } },
    "embroider-with-gold-twist": { example: { word: "used a gold twist to embroider the handkerchief" } },
    "practice-witchcraft": { exampleSynonym: { word: "performed spells" } },
    "glass-nipping-tool": { exampleSynonym: { word: "notched iron tool" } },
    "to-grind-glass-edges": { example: { word: "ground the glass edges" }, exampleSynonym: { word: "smoothed the cut edges" } },
    "to-seek-by-clues": { example: { word: "sought by clues" }, exampleSynonym: { word: "ferreted out" } },
    livewire: { exampleSynonym: { word: "firecracker", text: "Everyone knew her as a firecracker, lively and energetic." } },
    "bubble-2": { exampleSynonym: { word: "release bubbles" } },
    burgraviate: { exampleSynonym: { word: "governed by a burgrave" } },
    minibus: { exampleSynonym: { word: "small bus" } },
    "leaflet-drop": { exampleSynonym: { word: "door drop", text: "The shop used door drop to deliver advertising leaflets through mailboxes." } },
    "drovers-road": { example: { word: "drovers’ road" } },
    "goat-herd": { exampleSynonym: { word: "herd of goats" } },
    "cachapa-stand": { exampleSynonym: { word: "roadside shop selling cachapas" } },
    "cane-blow": { exampleSynonym: { word: "blow from a club" } },
    armadillo: { exampleSynonym: { word: "cachicamo", text: "A cachicamo crossed the road at dusk." } },
    cachina: { exampleSynonym: { word: "sweet local grape liquor" } },
    "fence-8": { exampleSynonym: { word: "dealer in stolen goods" } },
    "political-bossism": { exampleSynonym: { word: "caciquismo", text: "The local caciquismo shaped political decisions for decades." } },
    "tagua-palm": { exampleSynonym: { word: "cadi", text: "Cadi palm leaves were used for roofing in Ecuador." } },
    obsolescence: { exampleSynonym: { word: "outdated" } },
    "headbutt-3": { exampleSynonym: { word: "struck the door with his head" } },
    "capable-of-being-calcined": { exampleSynonym: { word: "undergo calcination in a kiln" } },
    "furnace-charge": { exampleSynonym: { word: "added fuel" } },
    "be-necessary": { example: { word: "is necessary" }, exampleSynonym: { word: "is required" } },
    calligraph: { exampleSynonym: { word: "write the poem in beautiful handwriting" } },
    "branding-iron": { exampleSynonym: { word: "metal implement" } },
    limy: { exampleSynonym: { word: "containing lime" } },
    "earthenware-grain-roaster": { exampleSynonym: { word: "clay vessel" } },
    felloe: { exampleSynonym: { word: "section of the cart wheel rim" } },
    "bend-verb": { example: { word: "bent the wood" } },
    "heap-grain": { example: { word: "heaped the grain" }, exampleSynonym: { word: "piled the threshed grain" } },
    "camelo-hoax": { example: { word: "hoax", text: "The promise of a free holiday was a hoax, called a camelo." }, exampleSynonym: { word: "hoax" } },
    "roman-muse": { exampleSynonym: { word: "Roman goddesses of inspiration" } },
    "road-related": { exampleSynonym: { word: "connected with roads" } },
    "mail-shirt": { exampleSynonym: { word: "chain-mail garment" } },
    "lop-plant": { exampleSynonym: { word: "cut the branches away" } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.en || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5255 expected one en/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5255 missing ${field} on en/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
