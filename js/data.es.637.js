(()=>{const u={
  liderato:{definition:'Condición o posición de quien dirige o encabeza un grupo; también, situación de ocupar el primer puesto en una competición o ámbito.',synonyms:['liderazgo','dirección','primer puesto']},
  licuefactible:{definition:'Que puede licuarse o convertirse en líquido.',synonyms:['licuable']},
  licuefactivo:{definition:'Que produce o facilita la licuefacción de una sustancia.',synonyms:['licuante','licuador']},
  liencillo:{definition:'En Venezuela, tela delgada y rústica de algodón sin blanquear.',synonyms:['lienzo de algodón']},
  liendra:{definition:'En Venezuela, liendre: huevo de piojo adherido al cabello.',synonyms:['liendre']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}
const ids=new Set(['licurgo','lidon']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
