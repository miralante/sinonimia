(()=>{const u={
  lijoso:{definition:'Sucio o cubierto de mugre; uso regional y poco frecuente.',synonyms:['sucio','mugriento']},
  lilio:{definition:'Lirio: planta bulbosa de flores grandes y vistosas, perteneciente al género Lilium.',synonyms:['lirio','azucena (según la especie)']},
  lilo:{definition:'Arbusto ornamental de la familia de las oleáceas, de flores aromáticas moradas o blancas; también, el color de esas flores.',synonyms:['lila','siríngia']},
  limalla:{definition:'Conjunto de partículas o virutas desprendidas al limar una pieza.',synonyms:['limaduras','virutas metálicas']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}
const ids=new Set(['lilac']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
