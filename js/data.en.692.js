(()=>{const u={
  tramline:{definition:'A track or set of rails on which a tram runs; also, a marked lane or route reserved for tram traffic.',synonyms:['tram track','streetcar track']},
  trammel:{definition:'A fishing net made of three layers, with a fine-meshed inner net between two coarser outer nets; also, a restraint or hindrance.',synonyms:['three-panel fishing net','snare','restraint']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['trained-4','trainer-2','trainer-3','training-2','training-3','training-4','training-contract-2','train-yourself','traitor-2','trake-it','tram-2','tramp-2','trample-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
