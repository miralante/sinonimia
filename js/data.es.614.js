(()=>{const u={
  lateralidad:{definition:'Preferencia espontánea por usar un lado del cuerpo, especialmente la mano, el ojo o el pie, en actividades habituales.',synonyms:['dominancia lateral','preferencia lateral']},
  lateralizar:{definition:'Convertir en lateral una consonante que no lo era; también, desplazar o localizar algo hacia un lado.',synonyms:['hacer lateral','desplazar lateralmente']},
  laterio:{definition:'Conjunto o abundancia de latas, especialmente de conservas.',synonyms:['montón de latas']},
  latifundismo:{definition:'Sistema de propiedad agraria caracterizado por el predominio de grandes fincas o latifundios.',synonyms:['concentración de la propiedad agraria']},
  latigo:{definition:'Instrumento flexible, por lo común de cuero o cuerda, usado para azotar; también, correa o tira larga y flexible.',synonyms:['fusta','azote','correa']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}
const ids=new Set(['lataz']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
