(()=>{const u={
  triumphant:{definition:'Having achieved a victory or success; expressing or celebrating triumph.',synonyms:['victorious','successful','exultant']},
  triumvir:{definition:'One of three men jointly appointed to govern or administer something, especially in ancient Rome.',synonyms:['member of a triumvirate','one of three rulers']},
  trivia:{definition:'Unimportant or little-known facts and details, often presented as quiz questions; also, the quality of being trivial.',synonyms:['miscellaneous facts','quiz facts','trivial details']},
  triviality:{definition:'The quality of being trivial or unimportant; also, a trivial matter or detail.',synonyms:['insignificance','trivial matter','minor detail']},
  trivially:{definition:'In a trivial, insignificant, or commonplace way.',synonyms:['insignificantly','trivially','ordinarily']},
  'trivial-thing':{definition:'A thing of little importance or value.',synonyms:['trifle','triviality','unimportant thing']},
  triweekly:{definition:'Occurring three times a week or once every three weeks; the term is ambiguous, so the intended frequency should be stated.',synonyms:['three times a week','every three weeks']},
  troglodyte:{definition:'A person who lives in a cave; also, an uncivilized or deliberately old-fashioned person.',synonyms:['cave dweller','caveman','recluse (figurative)']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['triumphant-2','triumphantly-2','triumphantly-3','trivial-2','trivialize-2','trocheo','troco','troja','trojan-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
