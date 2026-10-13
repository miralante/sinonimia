(()=>{const u={
  lentilla:{definition:'Lente pequeña, especialmente una lente de contacto que se coloca directamente sobre el ojo.',synonyms:['lente de contacto']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}
const ids=new Set(['lepe','lepero','lepasil','leperada']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
