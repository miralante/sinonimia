(()=>{const u={
  typism:{definition:'Discrimination or stereotyping based on assigning people to types or categories.',synonyms:['stereotyping','typification-based discrimination']},
  typometer:{definition:'A graduated ruler used in printing and graphic arts to measure type, spacing, and layout.',synonyms:['type gauge','typographic ruler']},
  tyrannicide:{definition:'The killing of a tyrant; also, a person who kills a tyrant.',synonyms:['killing of a tyrant','assassination of a tyrant','tyrant killer']},
  tyrannize:{definition:'To rule or treat someone in a cruel, oppressive, or arbitrary way.',synonyms:['oppress','domineer','bully']},
  tyranny:{definition:'Cruel, oppressive, or arbitrary rule; also, the government or power exercised in that way.',synonyms:['oppression','despotism','dictatorship']},
  'tyrian-purple':{definition:'A deep purple dye, and the color produced by it, historically obtained from certain sea snails of the genus Murex.',synonyms:['Tyrian dye','royal purple','ancient purple']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['tyrria','tyrannicide-2','typography-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
