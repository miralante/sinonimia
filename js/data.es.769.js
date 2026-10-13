(()=>{const u={
  nube:{definition:'Masa visible de gotitas de agua o cristales de hielo suspendidos en la atmósfera; también, en informática, servicio remoto para almacenar y acceder a datos por internet.',synonyms:['masa nubosa','almacenamiento en la nube (informática)']},
  nuboso:{definition:'Cubierto de nubes o con abundancia de nubes.',synonyms:['nublado','cubierto']},
  nuche:{definition:'En Colombia, larva de una mosca que se desarrolla bajo la piel de personas o animales.',synonyms:['gusano de monte (regional)','larva subcutánea']},
  nucleido:{definition:'Especie de átomo caracterizada por un número determinado de protones y neutrones en su núcleo.',synonyms:['núclido','especie nuclear']},
  nucleon:{definition:'Cada una de las partículas que componen el núcleo atómico: el protón o el neutrón.',synonyms:['protón o neutrón','partícula nuclear']},
  numericamente:{definition:'De manera numérica; mediante números o en lo relativo a los números.',synonyms:['en cifras','mediante números']},
  numismatico:{definition:'Perteneciente o relativo a la numismática; como sustantivo, persona experta en el estudio y coleccionismo de monedas y medallas.',synonyms:['relativo a la numismática','experto en monedas y medallas']},
  numo:{definition:'Moneda de la antigua Roma.',synonyms:['moneda romana antigua']},
  nuncio:{definition:'Representante diplomático de la Santa Sede, especialmente el que ejerce como embajador ante un Estado.',synonyms:['representante pontificio','embajador de la Santa Sede']},
  nupcialidad:{definition:'Frecuencia de los matrimonios en una población durante un período determinado, expresada habitualmente como tasa.',synonyms:['tasa de matrimonios','frecuencia matrimonial']},
  nutriente:{definition:'Sustancia que un organismo necesita para vivir y que obtiene de los alimentos o del medio.',synonyms:['sustancia nutritiva','principio nutritivo']},
  nutriz:{definition:'Mujer que amamanta o cría a un niño ajeno; nodriza.',synonyms:['nodriza','ama de cría']},
  nutual:{definition:'Dicho de una capellanía u otro cargo: que puede ser revocado a voluntad de quien lo confiere.',synonyms:['revocable a voluntad','amovible']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}const ids=new Set(['nubiense','nubio','nuevoleones','numida']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
