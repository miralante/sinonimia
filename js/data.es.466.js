(()=>{const ids=new Set(['expillo']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 explicativo:{definition:'Que sirve para explicar o aclarar algo; en gramática, dicho de un elemento, que añade una precisión sin limitar la referencia del sustantivo.',synonyms:['aclaratorio','ilustrativo','aclarativo']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(!r)throw Error('Missing es/'+id);Object.assign(r,p);delete r.translation;}})();
