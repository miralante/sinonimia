(()=>{const u={
  top:{definition:'The highest or uppermost part of something; the highest point or surface; also, to cover or be at the top of something.',synonyms:['uppermost part','summit','peak','cover']},
  'top-of-sugar-cane':{definition:'The leafy upper part of a sugarcane stalk, often removed during harvesting and used as animal fodder.',synonyms:['sugarcane tops','cane tops']},
  topper:{definition:'A person or thing that is at the top of something or that completes it; also, a device for cutting off the tops of plants.',synonyms:['finishing touch','top piece','topping device']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['toothy-2','toothy-3','toothy-4','top-2','top-3','topia','topil','topon','topping-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
