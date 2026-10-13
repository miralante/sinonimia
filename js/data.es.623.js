(()=>{const u={
  leguleyo:{definition:'Persona que ejerce el derecho sin la debida preparación o que se ocupa de cuestiones legales con exceso de formalismo; suele tener sentido despectivo.',synonyms:['picapleitos','abogadillo']},
  leismo:{definition:'Uso de le o les como complemento directo, especialmente cuando sustituye a lo o los; en ciertas zonas y contextos se admite para referentes masculinos de persona.',synonyms:['uso de le como complemento directo']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}
const ids=new Set(['legon','legrimo']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
