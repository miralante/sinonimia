(()=>{const u={
 excedencia:{definition:'Situación en la que una persona trabajadora suspende temporalmente la prestación de servicios y conserva, cuando corresponda, determinados derechos de reincorporación.',synonyms:['suspensión temporal del trabajo','licencia prolongada']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(!r)throw Error('Missing es/'+id);Object.assign(r,p);delete r.translation;}})();
