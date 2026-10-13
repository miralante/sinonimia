(()=>{const u={
  understandable:{definition:'Able to be understood; also, reasonable or sympathetic in the circumstances.',synonyms:['intelligible','comprehensible','reasonable']},
  understandably:{definition:'In a way that can be understood; also, in a way that is reasonable given the circumstances.',synonyms:['reasonably','comprehensibly','understandably']},
  understanding:{definition:'The ability to comprehend something; also, sympathetic and tolerant toward another person’s feelings or circumstances.',synonyms:['comprehension','sympathy','empathy']},
  underuse:{definition:'To use something less than is appropriate or possible; also, insufficient use of something.',synonyms:['make insufficient use of','underutilize','insufficient use']},
  underwater:{definition:'Beneath the surface of water; also, taking place or operating below that surface.',synonyms:['submerged','subaqueous','below the waterline']},
  underworld:{definition:'The criminal world or its members; in mythology, the realm of the dead.',synonyms:['criminal underworld','organized crime','realm of the dead (mythology)']},
  underwriter:{definition:'A person or organization that evaluates and assumes financial risk, especially an insurer; also, one that guarantees the sale of securities or a loan.',synonyms:['insurer','risk assessor','guarantor']},
  undine:{definition:'A water spirit or elemental being in European folklore and alchemical tradition.',synonyms:['water nymph','water spirit','water elemental']},
  undisputed:{definition:'Not disputed, challenged, or called into question.',synonyms:['unchallenged','uncontested','undoubted']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['understandable-2','understandable-3','understanding-2','understood','understood-2','understood-3','undesirable-or-despised-book','undisson','undo-2','underworld-2','underworld-3']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
