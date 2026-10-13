(()=>{const u={
  necrofilico:{definition:'Perteneciente o relativo a la necrofilia.',synonyms:['necrófilo','relativo a la necrofilia']},
  necrologia:{definition:'Noticia o breve biografía de una persona fallecida recientemente; también, sección de una publicación dedicada a estas noticias.',synonyms:['nota necrológica','semblanza póstuma','obituario']},
  necropolis:{definition:'Cementerio extenso, especialmente uno monumental o de una antigua ciudad.',synonyms:['cementerio','ciudad de los muertos']},
  nefelometro:{definition:'Instrumento que mide la luz dispersada por partículas suspendidas en un líquido; en meteorología, instrumento de observación de nubes.',synonyms:['medidor de turbidez','instrumento nefelométrico']},
  nefrectomia:{definition:'Extirpación quirúrgica total o parcial de un riñón.',synonyms:['extirpación renal','ablación de riñón']},
  nefropatia:{definition:'Enfermedad o afección del riñón.',synonyms:['enfermedad renal','afección renal']},
  nefrosis:{definition:'Término médico para diversas afecciones renales, especialmente las que afectan los túbulos; su uso clínico depende del contexto.',synonyms:['afección renal','enfermedad renal']},
  nectarina:{definition:'Fruto del melocotonero de piel lisa, sin la pelusa característica del melocotón.',synonyms:['melocotón de piel lisa','pelón (según el país)']},
  nectarino:{definition:'Variedad de melocotonero que produce nectarinas, frutos de piel lisa.',synonyms:['melocotonero de nectarina','árbol de nectarina']},
  neciamente:{definition:'Con necedad; de manera tonta, imprudente u obstinada.',synonyms:['tontamente','imprudentemente','obstinadamente']},
  nefritico:{definition:'Perteneciente o relativo a los riñones; dicho de una persona, que padece una afección renal.',synonyms:['renal','nefrítico']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}const ids=new Set(['nefelismo']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
