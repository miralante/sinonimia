(()=>{const u={
 evacuacion:{definition:'Acción de desalojar o trasladar personas de un lugar; también, vaciamiento de un órgano o conducto del cuerpo.',synonyms:['desalojo','salida','vaciamiento']},
 evadir:{definition:'Evitar una dificultad, obligación o peligro; también, eludir a alguien o escapar de su control.',synonyms:['eludir','esquivar','evitar']},
 evaluacion:{definition:'Acción de examinar y valorar algo o a alguien según determinados criterios.',synonyms:['valoración','apreciación','estimación']},
 evanescer:{definition:'Desvanecerse o desaparecer poco a poco, como si se disipara.',synonyms:['desvanecerse','disiparse','esfumarse']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(!r)throw Error('Missing es/'+id);Object.assign(r,p);delete r.translation;}})();
