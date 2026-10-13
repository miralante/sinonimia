(()=>{const u={
  ochavon:{definition:'Persona que, en antiguas clasificaciones raciales, se consideraba de ascendencia africana en una octava parte; término histórico, hoy desaconsejado por su carácter racializante.',synonyms:['término histórico para una categoría racial']},
  octavin:{definition:'Instrumento de viento semejante a una flauta, más pequeño y de sonido una octava más agudo; también, registro de órgano de tesitura aguda.',synonyms:['flautín','octavino','pícolo']},
  octosilabico:{definition:'Que tiene ocho sílabas.',synonyms:['de ocho sílabas']},
  octubrino:{definition:'En Honduras, aguardiente de caña.',synonyms:['guaro (Honduras)']},
  ocultismo:{definition:'Conjunto de conocimientos, prácticas y doctrinas que pretenden descubrir o utilizar fuerzas y fenómenos ocultos o sobrenaturales.',synonyms:['esoterismo','ciencias ocultas']},
  ocurso:{definition:'En México, escrito o petición dirigida a un tribunal, juez, fiscal u otro organismo jurisdiccional.',synonyms:['escrito judicial','petición ante un tribunal']},
  ocelote:{definition:'Felino americano de tamaño mediano (Leopardus pardalis), de pelaje con manchas y hábitos principalmente nocturnos; vive desde el sur de América del Norte, por Centroamérica, hasta buena parte de América del Sur.',synonyms:['cunaguaro','tigrillo (regional)']},
  ocotillo:{definition:'Arbusto espinoso del desierto norteamericano (Fouquieria splendens), de ramas largas y rectas y flores rojas en los extremos.',synonyms:['rotilla','albarda']},
  ocotera:{definition:'En México, Honduras y Nicaragua, perteneciente o relativo al ocote o pino; como sustantivo, terreno poblado de ocotes.',synonyms:['relativo al ocote','ocotal (uso regional)']},
  ocotero:{definition:'En México, Honduras y Nicaragua, perteneciente o relativo al ocote o pino.',synonyms:['relativo al ocote','relativo al pino']},
  obron:{definition:'Coloquial: obra de gran mérito, calidad o importancia.',synonyms:['obra sobresaliente','gran obra']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}const ids=new Set(['ocotepecano']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
