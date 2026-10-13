(()=>{const u={
 existencialismo:{definition:'Corriente o conjunto de corrientes filosóficas que estudian la existencia concreta, la libertad y la responsabilidad del individuo, y que suelen cuestionar la prioridad de las esencias abstractas.',synonyms:['filosofía de la existencia','filosofía existencial']},
 exocrino:{definition:'Dicho de una glándula: que vierte sus secreciones mediante un conducto hacia una superficie o cavidad del organismo.',synonyms:['de secreción externa','relativo a una glándula exocrina']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(!r)throw Error('Missing es/'+id);Object.assign(r,p);delete r.translation;}})();
