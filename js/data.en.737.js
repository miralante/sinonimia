(()=>{const u={
  unconversable:{definition:'Difficult or impossible to converse with; unsociable or unwilling to talk.',synonyms:['uncommunicative','unsociable','taciturn']},
  uncork:{definition:'To remove the cork from a bottle or other container; figuratively, to release or express something forcefully.',synonyms:['unstop','open','uncap','release']},
  uncover:{definition:'To remove a cover from something; to reveal, disclose, or make something known.',synonyms:['reveal','expose','disclose','uncover']},
  uncoward:{definition:'Rare: to make someone less cowardly or to free from cowardice.',synonyms:['embolden','encourage']},
  uncross:{definition:'To undo a crossed position or arrangement; to separate or move apart things that were crossed.',synonyms:['separate','uncross the legs','undo']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['uncontrolled-2','unconversable-2','unconverse','uncook','uncork-2','uncorking','uncover-2','uncover-4','uncover-5','uncover-6','uncover-7','uncover-8','uncover-9','uncover-10','uncover-11','uncovered-4','uncross-2','uncultivated-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
