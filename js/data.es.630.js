(()=>{const u={
  'letra-de-cambio':{definition:'Documento mercantil por el que una persona ordena a otra pagar una suma determinada a un beneficiario, en un lugar y fecha establecidos.',synonyms:['giro cambiario','efecto cambiario']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}
const ids=new Set(['lesothense','lessueste','lestrigon','letigio','letradura']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
