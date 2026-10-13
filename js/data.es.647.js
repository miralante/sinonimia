(()=>{const u={
  limosnadero:{definition:'Variante poco frecuente de limosnero: persona o cargo encargado de recoger o distribuir limosnas.',synonyms:['limosnero']},
  limosnero:{definition:'Persona que da o distribuye limosnas; también, quien las pide, según el contexto.',synonyms:['donante de limosnas','mendigo (cuando las pide)']},
  limpiadura:{definition:'Acción y efecto de limpiar; en algunos usos, limpieza o purificación ritual.',synonyms:['limpieza','lavado','purificación']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}
const ids=new Set(['limosin']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
