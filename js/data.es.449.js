(()=>{const u={
 evangelizar:{definition:'Difundir la enseñanza del Evangelio y la fe cristiana.',synonyms:['predicar el Evangelio','difundir el cristianismo']},
 evasor:{definition:'Que elude una obligación o evita cumplirla; especialmente, quien evita ilegalmente el pago de impuestos.',synonyms:['elusivo','defraudador fiscal (en el contexto tributario)']},
 evo:{definition:'Tiempo o duración de una época o de la vida de alguien; en filosofía, duración que no es temporal en el sentido ordinario.',synonyms:['época','duración']},
 evocar:{definition:'Traer algo a la memoria o a la imaginación; también, en una acepción tradicional, invocar a espíritus o muertos.',synonyms:['recordar','rememorar','invocar']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(!r)throw Error('Missing es/'+id);Object.assign(r,p);delete r.translation;}})();
