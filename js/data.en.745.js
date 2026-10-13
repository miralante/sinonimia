(()=>{const u={
  ungrateful:{definition:'Not feeling or showing gratitude for help, kindness, or a benefit received.',synonyms:['unthankful','unappreciative','thankless']},
  ungreasy:{definition:'Not greasy or oily; containing little or no grease.',synonyms:['non-greasy','oil-free','lean']},
  unhappily:{definition:'In an unhappy, sad, or unfortunate way.',synonyms:['sadly','unfortunately','miserably']},
  unhappiness:{definition:'The state or quality of being unhappy; sadness, misery, or dissatisfaction.',synonyms:['misery','sadness','sorrow']},
  unhappy:{definition:'Not happy; feeling sad, dissatisfied, or distressed. It can also describe an undesirable or unfortunate situation.',synonyms:['sad','dissatisfied','unfortunate (of a situation)']},
  unhealthy:{definition:'Harmful to health or not in good health; also, morally or socially damaging.',synonyms:['harmful to health','unwell','unwholesome']},
  unhinge:{definition:'To remove the hinges from something; figuratively, to unsettle or mentally disturb someone.',synonyms:['remove the hinges','unsettle','disorient']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['ungrateful-2','ungrateful-3','ungrateful-4','ungrateful-5','unhappily-2','unhappily-3','unhappiness-2','unhappy-2','unhealthy-2','unhealthy-3','unhairing','unhelp','unhinging','unhinging-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
