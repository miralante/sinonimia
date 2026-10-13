(()=>{const u={
  libertadamente:{definition:'Con libertad o sin coacción; también, con desenfreno o falta de moderación.',synonyms:['libremente','sin restricciones','desenfrenadamente']},
  librador:{definition:'En una operación cambiaria, persona que expide una letra de cambio u otro título de pago.',synonyms:['emisor de la letra de cambio','girador']},
  letraduria:{definition:'Dicho vano o inútil, pronunciado con cierta presunción o afectación.',synonyms:['palabrería','dicho presuntuoso']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}
const ids=new Set(['libertado','liberteno','libico','libon','librano']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
