(()=>{const u={
  lolio:{definition:'Planta herbácea del género Lolium, especialmente la cizaña o ballico.',synonyms:['cizaña','ballico','Lolium']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}
const ids=new Set(['lojano','lojeno','loguer']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
