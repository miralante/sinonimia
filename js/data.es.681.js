(()=>{const u={
  maderable:{definition:'Dicho de un árbol o un bosque: que proporciona madera aprovechable para obras o construcciones.',synonyms:['aprovechable para madera','maderero (bosque)']},
  maderar:{definition:'Enmaderar: armar o cubrir con madera una construcción.',synonyms:['enmaderar','entablar']},
  maderero:{definition:'Persona que trabaja en la explotación, transporte o comercio de madera; también, relativo a la madera o a esa actividad.',synonyms:['trabajador forestal','comerciante de madera','maderista']},
  madraza:{definition:'Coloquial: madre muy cariñosa y condescendiente, que suele mimar a sus hijos.',synonyms:['madre consentidora','madre muy cariñosa']},
  madrejon:{definition:'En Argentina, cauce seco de un río.',synonyms:['cauce seco','lecho seco de río']},
  madrecilla:{definition:'Huevera de las aves.',synonyms:['huevera','ovario de las aves']},
  madrero:{definition:'Dicho de una persona: muy apegada a su madre.',synonyms:['apegado a su madre','muy maternal (según el contexto)']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}
const ids=new Set(['madianita','madrena']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
