(()=>{const u={
  neutle:{definition:'En México, pulque: bebida alcohólica fermentada que se obtiene del aguamiel del maguey.',synonyms:['pulque','neutli']},
  neutral:{definition:'Que no toma partido por ninguna de las partes en conflicto; también, que no tiene carga o efecto definido en una oposición determinada.',synonyms:['imparcial','independiente','indiferente']},
  neutralismo:{definition:'Doctrina o actitud política que propugna la neutralidad de un Estado frente a bloques o conflictos internacionales.',synonyms:['política de neutralidad','no alineamiento (según el contexto)']},
  neutralizador:{definition:'Que neutraliza o contrarresta el efecto de algo.',synonyms:['neutralizante','contrarrestante']},
  neutronico:{definition:'Perteneciente o relativo a los neutrones.',synonyms:['relativo al neutrón','neutrónico']},
  nevadilla:{definition:'Nombre de varias plantas herbáceas, generalmente de flores blancas o pequeñas; el sentido concreto varía según la región.',synonyms:['planta nevadilla','hierba de flores blancas']},
  nevado:{definition:'Cubierto de nieve; como sustantivo, montaña o cumbre cubierta de nieve permanente o abundante.',synonyms:['cubierto de nieve','montaña nevada']},
  neviza:{definition:'Nieve granular compactada, situada entre la nieve reciente y el hielo glaciar.',synonyms:['firn','nieve granular']},
  newtoniano:{definition:'Perteneciente o relativo a Isaac Newton o a sus teorías, especialmente a la mecánica clásica.',synonyms:['relativo a Newton','de la mecánica clásica']},
  nia:{definition:'En Burgos y Palencia, manojo de mies cortada que se tiende en el suelo para formar gavillas; se usa sobre todo en plural.',synonyms:['gavilla','haz de mies']},
  nial:{definition:'Nido o lugar donde ponen los huevos las aves; también, montón grande de paja o heno, formado a menudo alrededor de un palo vertical.',synonyms:['nido','nidal','almiar']},
  nicarague:{definition:'En Honduras, potaje de carne preparado con rigüe de pinol o harina de maíz tostado.',synonyms:['guiso de carne con pinol','nacarigüe']},
  niche:{definition:'En Honduras, Cuba, Puerto Rico y Ecuador, dicho de una persona: de raza negra o piel oscura, voz que puede ser despectiva; en Venezuela, dicho de persona, cosa o conducta: de mal gusto, vulgar o de baja condición, también despectivo.',synonyms:['vulgar (Venezuela, despectivo)','de piel oscura (regional, puede ser despectivo)']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}const ids=new Set(['nicaraguense','niceno']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
