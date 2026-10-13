(()=>{const u={
  malhecho:{definition:'Dicho de una cosa: hecha de manera defectuosa o poco cuidada; también, dicho de una persona, deforme o de aspecto poco agraciado.',synonyms:['mal hecho','defectuoso','chapucero (según el contexto)']},
  malhora:{definition:'En México, coloquialmente, persona amiga de hacer maldades o travesuras.',synonyms:['travieso','malicioso','travesura (persona dada a)']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}const ids=new Set(['malgache']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
