/* Literal example fixes for English entries flagged by check.js. */
(() => {
  const changes = {
    consubstantiate: { exampleSynonym: { word: "united in one substance", text: "The theologian described the two natures as united in one substance." } },
    hocks: { exampleSynonym: { word: "hind-leg joints", text: "The horse had a small scar near its hind-leg joints." } },
    any: { exampleSynonym: { text: "You may choose whichever seat in the room." } },
    cubic: { exampleSynonym: { text: "The cube-shaped container holds one cubic meter of water." } },
    pickling: { exampleSynonym: { word: "preserving the vegetables in brine" } },
    parabolize: { exampleSynonym: { word: "express the lesson through a parable" } },
    "boning-machine": { exampleSynonym: { text: "The plant installed a deboning machine for poultry processing." } },
    promise: { exampleSynonym: { word: "undertook" } },
    piecework: { synonyms: ["piece-rate pay", "output-based pay"], exampleSynonym: { word: "piece-rate pay" } },
    radicalism: { example: { word: "radicalism", text: "The party’s radicalism grew after the vote as support for major change increased." } },
    dogmatics: { exampleSynonym: { text: "Her research focuses on theological doctrine and church history." } },
    bottling: { exampleSynonym: { text: "The bottling process begins after the cider has finished fermenting." } },
    "pack-up": { example: { word: "packed up" }, exampleSynonym: { word: "broke down" } },
    encore: { exampleSynonym: { word: "perform its final song again" } },
    overplow: { exampleSynonym: { word: "plowing the field again" } },
    overbrow: { exampleSynonym: { word: "overhung" } },
    oversize: { exampleSynonym: { word: "make the bolts too large", text: "The manufacturer decided to make the bolts too large for the housing." } },
    overfill: { exampleSynonym: { word: "fill the container to overflowing" } },
    overpopulate: { exampleSynonym: { word: "overfill a small island with inhabitants" } },
    fabulistics: { exampleSynonym: { text: "Her paper surveys Arabic fable studies across several centuries." } },
    filmer: { exampleSynonym: { word: "camera operator", text: "The camera operator captured the parade from the balcony." } },
    philological: { exampleSynonym: { text: "The editor prepared a linguistic study of the manuscript’s language and history." } },
    physiognomics: { exampleSynonym: { text: "The historian examined physiognomy as an early modern theory." } },
    photomechanics: { exampleSynonym: { text: "The shop used photomechanical reproduction to prepare the illustration for the press." } },
    photochemistry: { exampleSynonym: { text: "The chemistry of light explains how sunlight can trigger the reaction." } },
    electroplating: { synonyms: ["electrodeposition", "metal plating"], exampleSynonym: { word: "electrodeposition", text: "Electrodeposition gave the steel part a protective nickel coating." } },
    geochemistry: { exampleSynonym: { text: "Earth chemistry helps researchers trace the origin of the mineral deposit." } },
    geotechnical: { exampleSynonym: { text: "A geologic engineering survey tested the ground before construction." } },
    "anti-crisis": { exampleSynonym: { text: "The government announced a crisis-fighting plan to support families." } },
    heliophysics: { exampleSynonym: { text: "Solar physics missions monitor solar storms and their effects." } },
    assumable: { exampleSynonym: { word: "assumable under the contract", text: "The additional cost was assumable under the contract." } },
    atomism: { exampleSynonym: { text: "Ancient atomistic philosophy explained nature through atoms and their motions." } },
    aurignacian: { synonyms: ["of the Aurignacian culture"], exampleSynonym: { word: "of the Aurignacian culture", text: "The team studied tools of the Aurignacian culture found in the cave." } },
    hypercritical: { exampleSynonym: { word: "overcritical", text: "The review was overcritical of minor stylistic choices." } },
    impudent: { exampleSynonym: { word: "cheeky", text: "The cheeky, disrespectful remark offended the guests." } },
    even: { exampleSynonym: { word: "level", text: "The carpenter checked that the shelf was level." } },
    hieroglyphic: { exampleSynonym: { word: "pictographic", text: "The museum displayed a pictographic inscription on the stone." } },
    piglet: { exampleSynonym: { word: "young pig", text: "The young pig stayed close to its mother." } },
    macrobiotic: { exampleSynonym: { text: "The restaurant offers meals prepared according to a macrobiotic diet." } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.en || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5248 expected one en/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5248 missing ${field} on en/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
