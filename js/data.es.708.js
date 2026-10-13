(()=>{const u={
  modelado:{definition:'Acción y efecto de modelar; también, forma o representación obtenida al modelar.',synonyms:['modelización','representación','figurado']},
  modelador:{definition:'Que modela o da forma; persona o aparato que realiza esa tarea.',synonyms:['escultor','formador','modelista']},
  modelar:{definition:'Dar forma a una materia o crear una representación o modelo de algo.',synonyms:['moldear','dar forma','representar']},
  modelico:{definition:'Que sirve de modelo por su perfección o por ser digno de imitación.',synonyms:['ejemplar','paradigmático']},
  modelismo:{definition:'Afición o actividad que consiste en construir modelos a escala.',synonyms:['construcción de modelos a escala','maquetismo']},
  modelizar:{definition:'Construir o formular un modelo que represente un sistema, proceso o fenómeno.',synonyms:['modelar','representar mediante un modelo']},
  modelo:{definition:'Ejemplar o representación que sirve de referencia; persona o cosa digna de imitación; diseño de un objeto; también, formulario o impreso que se completa con datos.',synonyms:['prototipo','ejemplar','patrón','formulario']},
  moderante:{definition:'Que modera o contribuye a moderar algo.',synonyms:['moderador','atenuante']},
  moderar:{definition:'Reducir la intensidad, la cantidad o los excesos de algo; actuar con mesura.',synonyms:['atemperar','regular','contener']},
  moderativo:{synonyms:['moderador','que modera','relativo a moderar']},
  moderato:{definition:'En música, indicación de tempo moderado.',synonyms:['tempo moderado','andante moderado']},
  modernamente:{synonyms:['de modo moderno','en la actualidad']},
  modernez:{definition:'Cualidad de moderno; a veces, modernidad afectada o excesiva.',synonyms:['modernidad','modernismo']},
  modernidad:{definition:'Cualidad o condición de moderno; época histórica o cultural caracterizada por la modernidad.',synonyms:['carácter moderno','época moderna']},
  modernizador:{synonyms:['renovador','actualizador','reformador']},
  modernizar:{synonyms:['actualizar','renovar','poner al día']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}const ids=new Set(['modelo-lexical1']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
