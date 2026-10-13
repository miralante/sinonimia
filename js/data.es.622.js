(()=>{const u={
  legar:{definition:'Dejar a alguien en testamento un bien o derecho concreto; por extensión, transmitir o dejar algo a otra persona o a la posteridad.',synonyms:['dejar en herencia','transmitir']},
  legible:{definition:'Que se puede leer con facilidad por la claridad de sus letras o caracteres.',synonyms:['claro','descifrable']},
  legionela:{definition:'Bacteria del género Legionella que puede causar legionelosis.',synonyms:['Legionella']},
  legislador:{definition:'Persona u órgano que tiene autoridad para elaborar y aprobar leyes.',synonyms:['legislante','miembro del poder legislativo']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}
const ids=new Set(['leganal']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
