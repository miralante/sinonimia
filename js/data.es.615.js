(()=>{const u={
  latinidad:{definition:'Carácter o condición de lo latino; conjunto de pueblos, lenguas y culturas de origen latino.',synonyms:['carácter latino','cultura latina','mundo latino']},
  lativo:{definition:'En gramática, caso que expresa generalmente dirección hacia el lugar al que se dirige alguien o algo.',synonyms:['caso lativo']},
  latinamente:{definition:'De manera latina o conforme al estilo o carácter latino.',synonyms:['a la manera latina']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}
const ids=new Set(['latisueldo','latitar']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
