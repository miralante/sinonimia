/* Literal example fixes for English entries flagged by check.js. */
(() => {
  const changes = {
    photosynthetic: { exampleSynonym: { word: "related to photosynthesis" } },
    parasynthetic: { exampleSynonym: { word: "created by parasynthesis", text: "The linguist classified the word as created by parasynthesis." } },
    picrate: { exampleSynonym: { word: "salt of picric acid" } },
    kinetics: { exampleSynonym: { word: "dynamics", text: "The class studied the dynamics of the reaction." } },
    due: { exampleSynonym: { word: "payable", text: "The report is payable tomorrow." } },
    definitive: { exampleSynonym: { word: "conclusive", text: "The study offered conclusive evidence of the effect." } },
    duchess: { exampleSynonym: { word: "female noble", text: "The female noble attended the ceremony with her family." } },
    physicochemical: { exampleSynonym: { word: "physical and chemical" } },
    energy: { exampleSynonym: { word: "vigor", text: "She brought vigor and focus to the project." } },
    pleiad: { exampleSynonym: { word: "influential group", text: "The poet was one member of an influential group of writers." } },
    inverted: { exampleSynonym: { word: "reversed", text: "The image appeared reversed on the screen." } },
    assimilative: { exampleSynonym: { word: "assimilationist", text: "The policy placed assimilationist pressure on minority communities." } },
    aseismic: { exampleSynonym: { word: "earthquake-free" } },
    authenticator: { exampleSynonym: { word: "authentication app", text: "The employee entered a code from the authentication app." } },
    legs: { exampleSynonym: { word: "limbs", text: "The runner stretched her limbs before the race." } },
    patriotic: { exampleSynonym: { word: "loyal to one’s country", text: "The ceremony included a song about people who are loyal to one’s country." } },
    poetess: { exampleSynonym: { word: "woman poet", text: "The anthology includes poems by a nineteenth-century woman poet." } },
    phytochromatic: { exampleSynonym: { word: "related to phytochromes" } },
    phototypical: { exampleSynonym: { word: "associated with the phototype", text: "The study grouped participants by skin response associated with the phototype." } },
    organographic: { exampleSynonym: { word: "descriptions of the plant's leaves and roots" } },
    paleontography: { exampleSynonym: { word: "description of marine fossils" } },
    pantheistic: { exampleSynonym: { word: "associated with pantheism" } },
    paratactic: { exampleSynonym: { word: "related to parataxis" } },
    plantaginaceous: { exampleSynonym: { word: "belonging to the Plantaginaceae" } },
    plantinian: { exampleSynonym: { word: "by Christophe Plantin" } },
    rear: { exampleSynonym: { word: "back", text: "The bags were stored in the back of the vehicle." } },
    rapist: { exampleSynonym: { word: "person convicted of rape", text: "The court sentenced the person convicted of rape after the trial." } },
    "left-handed-2": { example: { word: "left-handed", text: "The left-handed player preferred a different grip." }, exampleSynonym: { word: "lefty", text: "The lefty player preferred a different grip." } },
    anglicistic: { exampleSynonym: { word: "influenced by English", text: "The article examines expressions influenced by English in modern Spanish." } },
    defibrator: { exampleSynonym: { word: "fiber-making machine", text: "The fiber-making machine turns steamed wood chips into fibers." } },
    physiognomic: { exampleSynonym: { word: "facial features", text: "The essay describes the facial features in the portrait." } },
    photomechanical: { exampleSynonym: { word: "photographic printing", text: "The publisher used photographic printing to reproduce the image." } },
    photochemical: { exampleSynonym: { word: "light-induced", text: "The film relies on a light-induced reaction." } },
    geochemist: { exampleSynonym: { word: "earth scientist", text: "The earth scientist analyzed minerals from the core sample." } },
    georgic: { exampleSynonym: { word: "agricultural", text: "The poet wrote an agricultural poem about tending orchards." } },
    heliophysicist: { exampleSynonym: { word: "solar physicist", text: "The solar physicist tracked changes in the solar wind." } },
    patristic: { exampleSynonym: { word: "Church Fathers", text: "The course examines interpretations of the Gospel by the Church Fathers." } },
    petroleochemical: { exampleSynonym: { word: "petroleum-chemical", text: "The lab conducts petroleum-chemical analysis of crude samples." } },
    rotor: { exampleSynonym: { word: "rotating assembly", text: "The rotating assembly turns inside the electric motor." } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.en || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5250 expected one en/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5250 missing ${field} on en/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();

