(()=>{const u={
  lebeche:{definition:'Viento del suroeste que sopla en el Mediterráneo occidental y el sureste de la península ibérica.',synonyms:['lebeche','garbí']},
  lebeni:{definition:'Bebida fermentada de yogur o leche cultivada, propia de Oriente Medio.',synonyms:['laban','bebida de yogur']},
  lazrar:{definition:'Padecer trabajos, privaciones o miserias; uso antiguo.',synonyms:['sufrir','padecer']},
  lealdad:{definition:'Lealtad; fidelidad a una persona, causa o compromiso.',synonyms:['lealtad','fidelidad']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}
const ids=new Set(['lebaniego','lebraston']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
