(()=>{const u={
  lectivo:{definition:'Dicho de un período o día: destinado oficialmente a la enseñanza o a las actividades escolares.',synonyms:['escolar','académico']},
  leedor:{definition:'Que lee o tiene afición a leer.',synonyms:['lector','leyente']},
  legadura:{definition:'Atadura o ligadura; acción y efecto de ligar.',synonyms:['ligadura','atadura']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}
const ids=new Set(['leco']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
