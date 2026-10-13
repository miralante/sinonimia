(()=>{const u={
 exhausto:{definition:'Completamente agotado o privado de algo necesario; dicho de una persona, que ha perdido casi toda su energía.',synonyms:['agotado','exhausto','extenuado']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(!r)throw Error('Missing es/'+id);Object.assign(r,p);delete r.translation;}})();
