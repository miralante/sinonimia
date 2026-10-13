(()=>{const u={
 expulsor:{definition:'Que expulsa o sirve para expulsar; dicho de un mecanismo o dispositivo, que hace salir algo de un lugar.',synonyms:['expulsador','mecanismo de expulsión']},
 expurgar:{definition:'Eliminar de un texto, libro o conjunto aquello que se considera incorrecto, inconveniente o superfluo; también, limpiar o purificar.',synonyms:['depurar','censurar','limpiar','purificar']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(!r)throw Error('Missing es/'+id);Object.assign(r,p);delete r.translation;}})();
