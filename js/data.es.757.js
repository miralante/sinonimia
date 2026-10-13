(()=>{const u={
  naranjado:{definition:'De color parecido al de la naranja.',synonyms:['anaranjado','naranja']},
  naranjera:{definition:'Mujer que vende naranjas; también, recipiente o utensilio destinado a contenerlas, según el contexto.',synonyms:['vendedora de naranjas','frutera']},
  naranjillada:{definition:'Bebida refrescante preparada con naranjilla, agua y azúcar.',synonyms:['refresco de naranjilla','jugo de naranjilla']},
  narigada:{definition:'En Aragón, cantidad de rapé o cocaína que se aspira de una vez; en Ecuador, cantidad que se toma con las yemas de dos dedos.',synonyms:['pulgarada (Ecuador)','dosis aspirada']},
  naricera:{definition:'En Honduras y Venezuela, aro metálico que se coloca en el tabique nasal de una res para conducirla.',synonyms:['nariguera para ganado','aro nasal']},
  nariguera:{definition:'Adorno que se lleva atravesado en la nariz o colgado de ella; también, pieza que sujeta el hocico de un animal.',synonyms:['adorno nasal','aro nasal']},
  narigueta:{definition:'Dicho de una persona: que tiene la nariz grande.',synonyms:['narigón','narigudo']},
  narigueto:{definition:'Dicho de una persona: que tiene la nariz grande.',synonyms:['narigón','narigudo']},
  nariguilla:{definition:'Persona que tiene la nariz grande o prominente.',synonyms:['narigón','narigudo']},
  napolitana:{definition:'En algunos países, preparación de carne empanada cubierta con salsa de tomate, jamón y queso, y gratinada.',synonyms:['milanesa napolitana','milanesa a la napolitana']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}const ids=new Set(['napeno']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
