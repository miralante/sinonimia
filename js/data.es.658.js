(()=>{const u={
  llagar:{definition:'Producir o causar llagas.',synonyms:['ulcerar','herir']},
  llamadera:{definition:'Acción de llamar repetidamente.',synonyms:['llamada insistente','acción de llamar']},
  llamaron:{definition:'En Andalucía, Colombia y Ecuador, llamarada grande.',synonyms:['llamarada','flamarada']},
  llantera:{definition:'En varios países de América, llorera o llanto ruidoso y prolongado.',synonyms:['llorera','llantina','berreadera']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}})();
