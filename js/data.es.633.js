(()=>{const u={
  ley:{definition:'Regla o disposición jurídica, establecida por la autoridad competente, que ordena, permite o prohíbe algo y cuyo cumplimiento puede exigirse.',synonyms:['norma jurídica','disposición legal','regla']},
  lezda:{definition:'Impuesto o derecho que antiguamente se cobraba por el tránsito o la venta de mercancías.',synonyms:['tributo de tránsito','derecho de mercado']},
  lezdero:{definition:'En la Edad Media, persona encargada de cobrar la lezda.',synonyms:['recaudador de lezda']},
  liberalizar:{definition:'Hacer más libre o menos regulado un sector, mercado o actividad; reducir restricciones o controles.',synonyms:['desregular','abrir a la competencia']},
  liberalidad:{definition:'Generosidad al dar o repartir bienes sin esperar recompensa; también, disposición o concesión hecha con esa generosidad.',synonyms:['generosidad','desprendimiento']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}
const ids=new Set(['liberamente']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
