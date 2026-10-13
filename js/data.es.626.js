(()=>{const u={
  lemnicola:{definition:'Dicho de un organismo: que vive en aguas dulces estancadas o en lagos.',synonyms:['limnícola','organismo lacustre']},
  lengueteria:{definition:'Elocuencia o arte de hablar con soltura.',synonyms:['elocuencia','facundia']},
  lentecer:{definition:'Hacer más lento un proceso o movimiento; también, volverse lento.',synonyms:['ralentizar','enlentecer']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}
const ids=new Set(['lentejuelar','lenizar']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
