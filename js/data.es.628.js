(()=>{const u={
  lentura:{definition:'Flexibilidad o ductilidad de un tallo que puede doblarse sin quebrarse.',synonyms:['flexibilidad','ductilidad']},
  lepisma:{definition:'Insecto pequeño, sin alas y de cuerpo alargado, cubierto de escamas plateadas; suele encontrarse en lugares húmedos y se alimenta de sustancias con almidón.',synonyms:['pececillo de plata','lepismo']},
  leopoldina:{definition:'Cadena de reloj de bolsillo que se sujetaba al chaleco mediante un gancho.',synonyms:['leontina','cadena de reloj']},
  leoneria:{definition:'Actitud o conducta propia de quien presume de valentía o autoridad como un león.',synonyms:['arrogancia','bravuconería']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}
const ids=new Set(['lepidio']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
