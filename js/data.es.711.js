(()=>{const u={
  mogate:{synonyms:['cesto de cañas','canasto']},
  mogato:{definition:'Que simula o exagera humildad o cobardía; también, persona que lo hace.',synonyms:['fingido','hipócrita','cobarde fingido']},
  mogolla:{definition:'En Colombia, pan moreno elaborado con salvado.',synonyms:['pan de salvado','pan moreno']},
  mogollon:{definition:'En gran cantidad o abundancia; también, cantidad muy abundante de algo.',synonyms:['en abundancia','muchísimo','gran cantidad']},
  mogon:{definition:'Grande o de gran tamaño; voz regional.',synonyms:['grande','voluminoso']},
  mogote:{synonyms:['montículo aislado','cerro cónico']},
  mogrollo:{definition:'Persona ingenua o tonta; uso coloquial y regional.',synonyms:['ingenuo','tonto']},
  moharra:{definition:'Punta metálica de una lanza, formada por la cuchilla y el cubo que la une al asta.',synonyms:['hierro de la lanza','punta de lanza']},
  moharracho:{definition:'Persona de aspecto grotesco o ridículo, especialmente por su vestido o ademanes.',synonyms:['mamarracho','persona grotesca']},
  mohatrar:{definition:'Hacer mohatras: vender algo fingiendo una operación comercial, con engaño o artificio.',synonyms:['hacer una mohatra','engañar en una venta']},
  mohatrero:{definition:'Que hace mohatras o engaña mediante operaciones de compraventa.',synonyms:['estafador','embaucador']},
  mohatron:{definition:'Engaño o fraude cometido mediante una venta fingida; voz poco usada.',synonyms:['fraude','engaño comercial']},
  mohecer:{definition:'Cubrirse de moho o producir moho; forma antigua o regional relacionada con «enmohecer».',synonyms:['enmohecer','llenarse de moho']},
  moheda:{synonyms:['monte bajo','jaral','matorral']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}const ids=new Set(['mogo','mogol','mogolico','moguereno','mohada','moharrache']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
