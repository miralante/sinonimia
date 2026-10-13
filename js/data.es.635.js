(()=>{const u={
  librera:{definition:'Mujer que vende libros o trabaja en una librería; también, estantería o mueble destinado a guardar libros.',synonyms:['vendedora de libros','librera','estantería']},
  libretear:{definition:'En Nicaragua, tomar una decisión unilateralmente, sin consultar a la autoridad o persona correspondiente.',synonyms:['decidir por cuenta propia']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}
const ids=new Set(['licaon']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
