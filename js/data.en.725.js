(()=>{const u={
  'twenty-fourth':{definition:'The ordinal number after twenty-third; also, one of twenty-four equal parts.',synonyms:['24th','one twenty-fourth']},
  twinable:{definition:'Capable of being paired or made into twins.',synonyms:['pairable','capable of being twinned']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['twin-3','said-of-a-person-who-has-only-one-testicle']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
