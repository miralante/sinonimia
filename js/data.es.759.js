(()=>{const u={
  navicular:{definition:'De forma semejante a una nave; en anatomía, relativo a un hueso del pie o de la muñeca con forma parecida a una barca.',synonyms:['escafoideo (anatomía)','con forma de barca']},
  nayuribe:{definition:'Planta herbácea de la familia de las amarantáceas, con flores moradas en espigas; sus cenizas se han usado para teñir de rojo.',synonyms:['planta tintórea','amarantácea']},
  nazula:{definition:'En el habla rural de Toledo, cuajada o requesón obtenido de los residuos de la leche tras elaborar queso.',synonyms:['requesón','cuajada']},
  ne:{definition:'Pronombre adverbial arcaico o dialectal, equivalente a «de ello», «de eso» o «de allí».',synonyms:['de ello','de eso']},
  nebi:{definition:'Variante antigua de «neblí»: halcón empleado en cetrería.',synonyms:['neblí','halcón neblí']},
  nebladura:{definition:'Daño que causa la niebla en las plantas y los sembrados; también, enfermedad del ganado lanar que produce aturdimiento.',synonyms:['daño por niebla','modorra (en ganado)']},
  nebli:{definition:'Halcón neblí, ave rapaz usada tradicionalmente en cetrería.',synonyms:['neblí','halcón neblí']},
  neblinero:{definition:'En Chile y Cuba, faro o luz auxiliar de un vehículo que mejora la visibilidad cuando hay neblina.',synonyms:['faros antiniebla','luz antiniebla']},
  necear:{definition:'Actuar con necedad o insistir en algo propio de una persona necia.',synonyms:['hacer tonterías','obstinarse','porfiar']},
  neceser:{definition:'Estuche o bolso pequeño para guardar artículos de aseo, tocador o viaje.',synonyms:['estuche de aseo','bolsa de tocador']},
  nebulizar:{definition:'Pulverizar un líquido en gotas muy finas que forman una especie de nube.',synonyms:['atomizar','pulverizar']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}const ids=new Set(['naviego','neapolitano','nea','nebeda','nebel','nazora','nebulon']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
