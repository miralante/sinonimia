(()=>{const u={
  laringoscopio:{definition:'Instrumento que permite examinar visualmente la laringe.',synonyms:['laringoscopio']},
  laringotomia:{definition:'Incisión quirúrgica en la laringe, realizada para acceder a su interior o mantener abierta la vía respiratoria.',synonyms:['incisión laríngea']},
  lasana:{definition:'Plato de pasta formado por láminas anchas superpuestas con relleno, generalmente horneado; también, cada lámina de pasta.',synonyms:['lasaña']},
  lastimador:{definition:'Que causa daño, dolor o lesión.',synonyms:['dañino','hiriente']},
  lastimada:{definition:'Que ha recibido daño, una lesión o una ofensa; en algunos países, herida o lesión.',synonyms:['herida','lesionada','ofendida']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}
const ids=new Set(['lasarse']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
