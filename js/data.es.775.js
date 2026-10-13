(()=>{const u={
  oosfera:{definition:'En botánica, gameto femenino de ciertas plantas y algas, que se une al gameto masculino durante la fecundación.',synonyms:['gameto femenino vegetal','célula sexual femenina']},
  omoto:{definition:'En el norte de Ecuador, persona de baja estatura; uso coloquial y despectivo.',synonyms:['persona de baja estatura (Ecuador, despectivo)']},
  ontina:{definition:'Arbusto aromático del género Artemisia, propio de zonas secas de la península ibérica.',synonyms:['Artemisia herba-alba','santonica (regional)']},
  onoto:{definition:'En Colombia y Venezuela, bija o achiote; también, la planta tropical cuyas semillas se usan para dar color a los alimentos.',synonyms:['bija','achiote']},
  onusto:{definition:'Anticuado: cargado o sobrecargado.',synonyms:['cargado (anticuado)','abrumado']},
  onomastico:{definition:'Perteneciente o relativo a los nombres propios; como sustantivo femenino, día en que se celebra el santo cuyo nombre lleva una persona.',synonyms:['relativo a los nombres propios','día del santo']},
  oncita:{definition:'En México, comadreja (Mustela frenata), mamífero carnívoro de cuerpo alargado y patas cortas.',synonyms:['comadreja de cola larga']},
  onomatopeyico:{definition:'Perteneciente o relativo a la onomatopeya o formado por imitación de un sonido.',synonyms:['imitativo','relativo a la onomatopeya']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}const ids=new Set(['operia']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
