(()=>{const u={
 explicotear:{definition:'Explicar algo con claridad y desenfado, en un registro coloquial.',synonyms:['explicar con claridad','aclarar coloquialmente']},
 explosimetro:{definition:'Instrumento que mide la concentración de gases o vapores inflamables en el aire y permite evaluar el riesgo de explosión.',synonyms:['medidor de gases inflamables','detector de explosividad']},
 exponer:{definition:'Presentar o mostrar algo para que sea visto; explicar o manifestar una idea; también, someter algo o a alguien a una situación o riesgo.',synonyms:['mostrar','presentar','explicar','someter']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(!r)throw Error('Missing es/'+id);Object.assign(r,p);delete r.translation;}})();
