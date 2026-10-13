(()=>{const u={
  moare:{definition:'Tela cuyo acabado produce dibujos ondulados o aguas, tradicionalmente de seda.',synonyms:['muaré','tela con aguas']},
  moaxaja:{definition:'Composición poética culta de la España andalusí, escrita en árabe o hebreo y a menudo rematada por una jarcha.',synonyms:['composición poética andalusí','muwaššaḥ']},
  mobbing:{definition:'Acoso psicológico reiterado en el ámbito laboral, ejercido por una persona o un grupo contra otra.',synonyms:['acoso laboral','hostigamiento laboral']},
  moblar:{definition:'Amueblar o dotar de muebles; uso antiguo.',synonyms:['amueblar','equipar']},
  moble:{definition:'Variante antigua de «mueble», especialmente en el sentido de bien mueble.',synonyms:['mueble','bien mueble']},
  moca:{definition:'Café de sabor o aroma a chocolate; también, bebida preparada con café y chocolate.',synonyms:['café moca','café con chocolate']},
  mocador:{definition:'Moquero o pañuelo para sonarse la nariz.',synonyms:['moquero','pañuelo']},
  mocar:{definition:'Sonar y limpiar los mocos; uso coloquial.',synonyms:['sonarse la nariz','limpiarse los mocos']},
  mocarra:{definition:'Niño o muchacho que se entromete o se atreve a intervenir en asuntos de personas mayores; uso coloquial.',synonyms:['muchacho entrometido','niño atrevido']},
  mocarro:{definition:'Moco que cuelga de la nariz por descuido; voz coloquial.',synonyms:['moco colgante','moco']},
  mocear:{synonyms:['comportarse como joven','hacer cosas propias de la juventud']},
  mocedad:{synonyms:['juventud','edad juvenil']},
  moceril:{synonyms:['juvenil','propio de los mozos']},
  mocerio:{synonyms:['juventud','grupo de jóvenes','moza y mozos']},
  mocero:{definition:'Dado a la lascivia o al trato frecuente con mujeres; uso antiguo.',synonyms:['lascivo','mujeriego']},
  mocete:{synonyms:['muchacho','mozo','joven']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}const ids=new Set(['mocano','mocejon']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
