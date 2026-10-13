(()=>{const u={
 exaltar:{definition:'Elevar a alguien o algo en dignidad, estima o importancia; también, alabarlo con entusiasmo o excitar intensamente un sentimiento.',synonyms:['ensalzar','enaltecer','alabar','excitar']},
 exarco:{definition:'En la Iglesia oriental, prelado que ejerce autoridad sobre una región o una circunscripción eclesiástica; históricamente, también, gobernador bizantino de un exarcado.',synonyms:['prelado oriental','gobernador de un exarcado']},
 exarico:{definition:'En el régimen agrario histórico, persona que cultivaba una tierra ajena y entregaba al propietario una parte de los frutos.',synonyms:['colono aparcero','cultivador a medias']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(!r)throw Error('Missing es/'+id);Object.assign(r,p);delete r.translation;}})();
