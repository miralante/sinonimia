(()=>{const u={
  limera:{definition:'En náutica, abertura de la bovedilla de popa por la que pasa la cabeza del timón.',synonyms:['abertura del timón']},
  limero:{definition:'Persona que vende limas; también, árbol cítrico que produce limas.',synonyms:['vendedor de limas','limero']},
  limazo:{definition:'Viscosidad o babaza.',synonyms:['babaza','baba viscosa']},
  limicola:{definition:'Ave que vive y se alimenta en las orillas fangosas de lagos, lagunas y costas.',synonyms:['ave limícola','ave zancuda (algunas especies)']},
  limitador:{definition:'Que limita o sirve para fijar un límite; como sustantivo, dispositivo que restringe un valor, movimiento o funcionamiento.',synonyms:['restrictor','dispositivo limitador','tope']},
  limitrofe:{definition:'Que limita con otro territorio o se encuentra junto a él; también, relativo a una frontera común.',synonyms:['colindante','fronterizo','contiguo']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}
const ids=new Set(['limarino']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
