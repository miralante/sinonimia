(()=>{const u={
 excomulgador:{definition:'Persona que impone o declara la excomunión de alguien.',synonyms:['persona que excomulga','autor de una excomunión']},
 excrementoso:{definition:'Dicho de un alimento: que produce muchos residuos fecales y aporta relativamente pocos nutrientes.',synonyms:['de bajo aprovechamiento nutritivo','que produce muchos residuos fecales']},
 excretor:{definition:'Perteneciente o relativo a la excreción; dicho de un conducto u órgano, que elimina residuos del organismo.',synonyms:['excretorio','relativo a la excreción']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(!r)throw Error('Missing es/'+id);Object.assign(r,p);delete r.translation;}})();
