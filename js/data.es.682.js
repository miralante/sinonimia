(()=>{const u={
  madrona:{definition:'Desusado: cloaca o conducto principal de desagüe.',synonyms:['cloaca maestra','alcantarilla principal']},
  madronero:{definition:'En Murcia, madroño: arbusto o árbol del género Arbutus.',synonyms:['madroño','Arbutus unedo']},
  madrugonazo:{definition:'En Cuba y Venezuela, levantamiento o golpe militar repentino.',synonyms:['asonada militar','golpe de Estado']},
  maesa:{definition:'Abeja reina de una colmena.',synonyms:['abeja reina','reina de la colmena']},
  maeso:{definition:'Desusado: maestro.',synonyms:['maestro','preceptor']},
  maestradamente:{definition:'Antiguo: con maestría o destreza.',synonyms:['con maestría','hábilmente']},
  maestradgo:{definition:'Desusado: maestrazgo, dignidad, cargo o territorio de un maestre.',synonyms:['maestrazgo','dignidad de maestre']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}
const ids=new Set(['madriz','maeno','maesil']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
