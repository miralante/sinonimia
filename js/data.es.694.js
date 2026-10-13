(()=>{const u={
  maquiladora:{definition:'Fábrica que ensambla o transforma productos, a menudo con insumos importados y para exportación; el término se usa especialmente en México y Centroamérica.',synonyms:['planta maquiladora','fábrica de ensamblaje']},
  maquilon:{definition:'Desusado: hombre encargado de cobrar la maquila por la molienda.',synonyms:['cobrador de maquila','molinero cobrador']},
  maquisapa:{definition:'Mono araña de la Amazonía, de extremidades largas y cola prensil.',synonyms:['mono araña','coatá (regional)']},
  manzillero:{definition:'',synonyms:[]},
  manzanita:{definition:'Diminutivo de manzana; también, nombre de un arbusto norteamericano del género Arctostaphylos.',synonyms:['manzana pequeña','Arctostaphylos (planta)']},
  mapeo:{definition:'Acción y resultado de mapear; elaboración de un mapa, esquema o correspondencia entre elementos.',synonyms:['cartografía (representación espacial)','asignación de correspondencias','elaboración de un mapa']},
  mapurite:{definition:'Nombre regional de varias mofetas o zorrillos americanos, mamíferos que pueden expulsar una secreción de olor intenso.',synonyms:['mofeta','zorrillo','zorrino (según la región)']},
  maquiavelico:{definition:'Perteneciente o relativo a Maquiavelo o al maquiavelismo; dicho de una conducta, astuta y carente de escrúpulos.',synonyms:['maquiavélico','astuto y sin escrúpulos']},
  manutergio:{definition:'Paño de lino que usa el sacerdote para secarse las manos durante la misa.',synonyms:['paño de manos litúrgico','toalla litúrgica']},
  manzanillero:{definition:'',synonyms:[]},
  marati:{definition:'Lengua indoaria hablada principalmente en Maharashtra, India.',synonyms:['maratí','marathi']},
  maratoniano:{definition:'Perteneciente o relativo al maratón; también, persona que corre maratones.',synonyms:['maratonista','corredor de maratón']},
  maratonico:{definition:'Perteneciente o relativo al maratón; también, muy largo o agotador, como un esfuerzo.',synonyms:['maratoniano','extenuante (sentido figurado)']},
  maravedi:{definition:'Moneda española de origen medieval, acuñada en distintas épocas y metales; también fue unidad de cuenta.',synonyms:['maravedí','moneda histórica española']},
  marchoso:{definition:'Alegre, animado y aficionado a la fiesta o al baile; dicho también de algo que tiene ritmo o viveza.',synonyms:['animado','fiestero','marchoso']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}const ids=new Set(['maquiritare','manzanillero','mapuche','manteno']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
