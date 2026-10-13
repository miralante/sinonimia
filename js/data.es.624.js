(()=>{const u={
  lemniscata:{definition:'Curva plana con forma de ocho acostado, como la lemniscata de Bernoulli; su símbolo se usa para representar el infinito.',synonyms:['curva en forma de ocho','símbolo de infinito']},
  lemnisco:{definition:'Cinta que se colocaba como adorno u honor en coronas y palmas de los vencedores.',synonyms:['cinta honorífica']},
  len:{definition:'Dicho de un hilo o de la seda: formado por hebras dobladas y poco torcidas.',synonyms:['hilo poco torcido']},
  lenador:{definition:'Persona cuyo oficio consiste en cortar o recoger leña.',synonyms:['cortador de leña']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}
const ids=new Set(['lelili','leman','lemanita','leme','lempireno','lemurias']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
