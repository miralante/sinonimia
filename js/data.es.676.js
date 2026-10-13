(()=>{const u={
  lustrador:{definition:'En varios países de América, persona que limpia y lustra calzado.',synonyms:['limpiabotas','lustrabotas','bolero (regional)']},
  lustrin:{definition:'En Chile, persona que limpia y lustra calzado.',synonyms:['limpiabotas','lustrabotas']},
  mable:{definition:'En Honduras, canica o bola pequeña usada en juegos infantiles.',synonyms:['canica','bola']},
  macabi:{definition:'En Cuba, pez marino comestible, de cuerpo cilíndrico y plateado, conocido también como macabí.',synonyms:['macabí','pez macabí']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}
const ids=new Set(['lusitanico','luvia']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
