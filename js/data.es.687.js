(()=>{const u={
  majadero:{definition:'Barra corta y gruesa, generalmente de madera, que se usa para machacar o moler sustancias en un mortero.',synonyms:['mano de mortero','pistilo']},
  majarete:{definition:'En Cuba y Venezuela, dulce preparado con maíz tierno, leche y azúcar; en Venezuela también puede llevar coco.',synonyms:['dulce de maíz','postre de maíz']},
  majasear:{definition:'En Cuba, holgazanear o no hacer nada.',synonyms:['holgazanear','vaguear']},
  majorette:{definition:'Bailarina que desfila o actúa con uniforme y maneja una vara o bastón, especialmente en una banda o desfile.',synonyms:['bastonera','bailarina de desfile']},
  madrugon:{definition:'Acción de madrugar o levantarse muy temprano.',synonyms:['madrugada','levantarse temprano']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}
const ids=new Set(['majaderico','majaderillo','majaderito','majiadero','majorca']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
