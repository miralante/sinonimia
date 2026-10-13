(()=>{const u={
 excusabaraja:{definition:'Cesta de mimbre con tapa, usada antiguamente para llevar o guardar objetos.',synonyms:['cesta con tapa','canasta de mimbre']},
 excusali:{word:'Excusalí',definition:'Delantal pequeño que se coloca sobre otro delantal o sobre la falda.',synonyms:['delantal corto','delantal superpuesto']},
 excusada:{definition:'Acción de excusar o disculpar; también, forma femenina del participio de excusar.',synonyms:['disculpa','justificación','exculpación']},
 excusadamente:{definition:'Sin necesidad; de manera excusada o innecesaria.',synonyms:['innecesariamente','sin necesidad']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(!r)throw Error('Missing es/'+id);Object.assign(r,p);delete r.translation;}})();
