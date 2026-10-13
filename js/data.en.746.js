(()=>{const u={
  unimagine:{definition:'Rare or literary: to dismiss something from the imagination, as if it had never been imagined.',synonyms:['unthink','dismiss from the imagination']},
  uninhabit:{definition:'Rare or historical: to leave a place without inhabitants; to depopulate.',synonyms:['depopulate','abandon']},
  unhoused:{definition:'Without housing or a stable place to live; a respectful term for a person experiencing homelessness.',synonyms:['homeless','without housing']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['unhook-2','unimpose','unimpress','uninhabited-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
