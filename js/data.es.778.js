(()=>{const u={
 osmazomo:{definition:'Mezcla de sustancias nitrogenadas procedentes de la carne, responsable del olor y sabor característicos del caldo.',synonyms:['extracto de carne']},
 ostial:{definition:'Entrada de un puerto o canal.',synonyms:['bocana','entrada del puerto']},
 ostiariado:{definition:'En el catolicismo, antigua orden sagrada de ostiario, encargado de abrir y cerrar las puertas de la iglesia.',synonyms:['orden del ostiario']},
 ostilla:{definition:'Palabra desusada para ajuar: conjunto de muebles, ropas y enseres de una casa.',synonyms:['ajuar']},
 ostero:{definition:'En marina, obrero que maneja la osta, cabo usado para orientar o sujetar una vela.',synonyms:['marinero (aproximado)']},
 osteictio:{definition:'Pez de la clase Osteichthyes, caracterizado por tener esqueleto principalmente óseo.',synonyms:['pez óseo']},
 orquesta:{definition:'Conjunto numeroso de músicos que interpretan obras con instrumentos variados; también, espacio del teatro griego antiguo situado ante la escena.',synonyms:['conjunto instrumental']},
 orquestar:{definition:'Preparar o adaptar una composición musical para su interpretación por una orquesta.',synonyms:['instrumentar','arreglar']},
 orquestina:{definition:'Orquesta pequeña, generalmente dedicada a música popular o ligera.',synonyms:['orquesta pequeña','conjunto musical']},
 osifraga:{definition:'Ave rapaz diurna, denominada también osífrago.',synonyms:['osífrago']},
 osifrago:{definition:'Ave rapaz diurna; nombre aplicado históricamente a distintas aves, entre ellas el quebrantahuesos.',synonyms:['osífraga']},
 ostentador:{definition:'Que ostenta o muestra algo, especialmente una cualidad, un título o una posición.',synonyms:['exhibidor','poseedor']},
 ostentativo:{definition:'Que hace ostentación o está destinado a exhibir algo.',synonyms:['ostentoso','exhibicionista']},
 ostentoso:{definition:'Que muestra ostentación, especialmente por su lujo o apariencia.',synonyms:['lujoso','aparatoso','presuntuoso']},
 oscutantismo:{definition:'Doctrina o actitud contraria a la difusión del conocimiento y al progreso intelectual.',synonyms:['obscurantismo']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}const ids=new Set(['osco','oseta']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
