(()=>{const u={
  latrocinar:{definition:'Robar o cometer un latrocinio.',synonyms:['robar','hurtar']},
  launa:{definition:'Arcilla esquistosa, impermeable y de color gris azulado, usada tradicionalmente para cubrir tejados en algunas zonas de Andalucía.',synonyms:['arcilla impermeable']},
  laureado:{definition:'Que ha recibido una distinción o premio, especialmente por sus méritos o logros.',synonyms:['galardonado','premiado']},
  laurear:{definition:'Premiar u honrar a alguien, originalmente ciñéndole una corona de laurel.',synonyms:['galardonar','premiar']},
  laureola:{definition:'Corona pequeña de laurel; también, resplandor circular que en el arte rodea la cabeza de una figura sagrada.',synonyms:['corona de laurel','nimbo']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}
const ids=new Set(['laurente']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
