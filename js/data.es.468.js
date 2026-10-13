(()=>{const u={
 exposimetro:{definition:'Fotómetro usado en fotografía para medir la luz incidente o reflejada y ayudar a determinar la exposición adecuada.',synonyms:['fotómetro fotográfico','medidor de exposición']},
 expositivo:{definition:'Perteneciente o relativo a la exposición de un tema; que presenta o explica información de forma organizada.',synonyms:['explicativo','informativo','descriptivo']},
 expositor:{definition:'Persona que expone o presenta un tema ante un público; también, soporte o vitrina donde se muestran objetos o productos.',synonyms:['presentador','ponente','vitrina','soporte de exhibición']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(!r)throw Error('Missing es/'+id);Object.assign(r,p);delete r.translation;}})();
