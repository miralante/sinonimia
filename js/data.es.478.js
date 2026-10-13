(()=>{const u={
 exturbar:{definition:'Desordenar, perturbar o alterar algo; voz poco usada.',synonyms:['desordenar','perturbar','alterar']},
 exudativo:{definition:'En patología, que produce o se caracteriza por la formación de un exudado, líquido rico en proteínas y células que sale de los vasos hacia los tejidos.',synonyms:['relativo al exudado','que produce exudación']},
 extruir:{definition:'Dar forma a un material haciéndolo pasar a presión por una abertura o matriz.',synonyms:['moldear por extrusión','forzar a través de una matriz']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(!r)throw Error('Missing es/'+id);Object.assign(r,p);delete r.translation;}})();
