(()=>{const u={
 evaporar:{definition:'Convertir un líquido en vapor, generalmente por efecto del calor; también, disiparse o pasar lentamente a estado gaseoso.',synonyms:['vaporizar','volatilizar','disiparse']},
 evasivo:{definition:'Que evita responder de forma directa o que elude un asunto, una obligación o una persona.',synonyms:['elusivo','esquivo','indirecto']},
 eventualmente:{definition:'De manera eventual o contingente; en algunos usos, posiblemente o en algún momento futuro.',synonyms:['posiblemente','de manera contingente','en algún momento']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(!r)throw Error('Missing es/'+id);Object.assign(r,p);delete r.translation;}})();
