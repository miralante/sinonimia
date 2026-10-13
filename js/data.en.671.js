(()=>{const u={
  tigress:{definition:'A female tiger.',synonyms:['female tiger']},
  tile:{definition:'A thin, flat piece of baked clay, stone, or another material used to cover a floor, roof, or wall; also, to cover a surface with tiles.',synonyms:['floor tile','roof tile','cover with tiles']},
  tiler:{definition:'A person whose trade is laying tiles.',synonyms:['tile setter','tile layer']},
  till:{definition:'To cultivate land; also, a cash drawer in a shop, or a preposition meaning up to a time or place.',synonyms:['cultivate','cash register','until']},
  tillage:{definition:'The preparation and cultivation of soil for growing crops.',synonyms:['cultivation','cultivating']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['tile-2','tile-3','tile-4','tile-5','tile-6','tile-7','tile-8','tiler-2','tiler-3','tiling-2','tiling-3','till-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
