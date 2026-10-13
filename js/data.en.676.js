(()=>{const u={
  toasted:{definition:'Browned or crisped by exposure to heat.',synonyms:['browned','crisped']},
  toaster:{definition:'An appliance for browning or crisping slices of bread.',synonyms:['bread toaster']},
  'toast-2':{definition:'A brief expression of good wishes or honor made before people drink together; the act of raising a glass in this way.',synonyms:['salute','tribute']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['titi','titiritain','tlaco','tlacoyo','toast-3']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
