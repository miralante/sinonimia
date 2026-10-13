(()=>{const u={
  longoron:{definition:'En Panamá, molusco bivalvo comestible.',synonyms:['molusco bivalvo','bivalvo comestible']},
  longueria:{definition:'Poco usado: dilación o prolijidad excesiva.',synonyms:['dilación','prolijidad','demora']},
  lonjear:{definition:'En el Cono Sur, hacer lonjas de cuero después de descarnarlo y rasparle el pelo sin levantar la piel; en el noroeste argentino, azotar con una lonja, un chicote o un rebenque.',synonyms:['hacer lonjas de cuero','azotar con una lonja']},
  lopigia:{definition:'Desusado: alopecia o pérdida del cabello.',synonyms:['alopecia','calvicie','pérdida del cabello']},
  loquera:{definition:'Coloquial: acción disparatada o propia de una persona alocada; también, locura.',synonyms:['disparate','locura','desatino']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}
const ids=new Set(['longobardo']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
