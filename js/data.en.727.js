(()=>{const u={
  twisting:{definition:'The act or process of turning, bending, or winding something; also, a turning or winding movement.',synonyms:['turning','bending','winding']},
  twitter:{definition:'To make a series of short, high-pitched sounds, especially as a bird does; also, to speak rapidly and nervously.',synonyms:['chirp','twee','chatter']},
  'two-handed':{definition:'Requiring or performed with both hands; also, skilled in using both hands.',synonyms:['requiring both hands','ambidextrous (when describing a person)']},
  'two-headed-ax':{definition:'An axe with a head that has a blade on each side.',synonyms:['double-bitted axe','double-headed axe']},
  'two-months':{definition:'Lasting for two months or relating to a period of two months.',synonyms:['two-month','bimonthly (context-dependent)']},
  'two-time-championship':{definition:'The achievement of winning a championship twice.',synonyms:['two championship titles','two-time titleholder']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['twisting-2','twist-it','twist-something','twitter-2','two-hundred-2','twosignal','two-step-verification-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
