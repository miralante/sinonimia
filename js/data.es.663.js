(()=>{const u={
  localizable:{definition:'Que puede localizarse o cuya ubicación puede determinarse.',synonyms:['ubicable','localizable (referido a software, adaptable a una región)']},
  localizador:{definition:'Que localiza; también, dispositivo o sistema que permite determinar la ubicación de algo o alguien.',synonyms:['dispositivo de localización','rastreador','ubicador']},
  locatis:{definition:'Coloquial: dicho de una persona, alocada o de poco juicio; también se usa como sustantivo.',synonyms:['alocado','chiflado','falto de juicio']},
  loceria:{definition:'En Andalucía y América, fábrica de loza.',synonyms:['alfarería','fábrica de cerámica']},
  locuelo:{definition:'Diminutivo coloquial de loco; persona algo alocada.',synonyms:['loquito','alocado']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}
const ids=new Set(['locato','locuela','lobaton']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
