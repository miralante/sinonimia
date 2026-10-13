(()=>{const u={
  licoroso:{definition:'Dicho de un vino: de sabor dulce y cuerpo o graduación alcohólica relativamente altos, parecido a un licor.',synonyms:['generoso','dulce y alcohólico']},
  liderizar:{definition:'En Venezuela, liderar: dirigir o guiar un grupo, organización o actividad.',synonyms:['liderar','dirigir','encabezar']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}})();
