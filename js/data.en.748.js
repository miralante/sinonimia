(()=>{const u={
  unjam:{definition:'To remove an obstruction or jam from a mechanism, passage, printer, or other device; also, to become free of a jam.',synonyms:['clear a jam','unblock','free']},
  univocality:{definition:'The quality of having only one meaning or interpretation; unambiguity.',synonyms:['unambiguity','single meaning']},
  universalize:{definition:'To make something universal or applicable to everyone or everywhere; to generalize.',synonyms:['generalize','make universal','extend universally']},
  'unimpeachable':{definition:'Beyond doubt or criticism; trustworthy and of unquestionable integrity.',synonyms:['irreproachable','incontestable','trustworthy']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['university-degree-2','univocate']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
