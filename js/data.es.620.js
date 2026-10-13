(()=>{const u={
  lebrillo:{definition:'Vasija ancha, generalmente de barro, poco profunda y de forma troncocónica, usada para lavar o contener cosas.',synonyms:['jofaina','barreño']},
  lechigada:{definition:'Conjunto de crías nacidas en un mismo parto, especialmente las de ciertos mamíferos.',synonyms:['camada','cría']},
  lechazo:{definition:'Cordero que todavía mama; también, plato preparado con la carne de ese cordero.',synonyms:['cordero lechal']},
  lechugado:{definition:'De color verde parecido al de las hojas de la lechuga.',synonyms:['verde lechuga']},
  lechuguina:{definition:'Mujer afectada en el vestir o en los modales, por analogía con lechuguino.',synonyms:['coqueta','afectada']},
  lechuguino:{definition:'Hombre joven excesivamente preocupado por vestir a la moda o por sus modales afectados.',synonyms:['petimetre','pisaverde']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}
const ids=new Set(['lechigado']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
