(()=>{const u={
  transgangetic:{definition:'Situated across or beyond the Ganges River.',synonyms:['beyond the Ganges']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['transferred','transfix-2','transflower','transflower-2','transflower-3','transfocus','transfold','transformative-2','transformer-2','transfretano','transfuseable','transfuser-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
