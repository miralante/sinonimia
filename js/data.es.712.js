(()=>{const u={
  mohedal:{definition:'Terreno poblado de mohedas, monte bajo de jaras y maleza.',synonyms:['moheda','jaral','monte bajo']},
  mohena:{definition:'Perteneciente o relativo a una moheda.',synonyms:['moheño','de la moheda']},
  mohено:{definition:'Perteneciente o relativo a una moheda.',synonyms:['moheño','de la moheda']},
  mohiento:{definition:'Mohoso; cubierto o afectado por moho. Uso antiguo.',synonyms:['mohoso','enmohecido']},
  mohin:{definition:'Gesto o mueca, especialmente de disgusto o desagrado.',synonyms:['mueca','gesto de disgusto']},
  mohina:{definition:'Persona triste, melancólica o de mal humor; también, femenino de «mohíno».',synonyms:['melancólica','malhumorada','triste']},
  mohindad:{definition:'Mohína: tristeza o mal humor; voz antigua.',synonyms:['mohína','malhumor']},
  moho:{definition:'Capa de hongos microscópicos que crece sobre materia orgánica o superficies húmedas; también, verdín u óxido en ciertos usos.',synonyms:['hongo','enmohecimiento','verdín']},
  mohoso:{synonyms:['enmohecido','cubierto de moho']},
  mohur:{definition:'Antigua moneda de oro o plata de la India.',synonyms:['moneda india antigua']},
  moises:{definition:'Cuna pequeña y portátil, tradicionalmente hecha de mimbre.',synonyms:['cuna portátil','cuna de mimbre']},
  mojabana:{definition:'Torta hecha con harina y queso.',synonyms:['torta de queso','pan de queso']},
  mojada:{definition:'Acción y efecto de mojar o mojarse; también, en Cataluña, antigua medida agraria de superficie.',synonyms:['mojadura','medida agraria catalana']},
  mojado:{definition:'Impregnado o cubierto de líquido; en algunos países de América, persona que cruza ilegalmente una frontera, especialmente la de Estados Unidos.',synonyms:['empapado','húmedo','inmigrante indocumentado (América)']},
  mojador:{definition:'Que moja o sirve para mojar; también, instrumento usado para aplicar líquido.',synonyms:['humedecedor','aplicador']},
  mojadura:{synonyms:['acción de mojar','empapamiento']},
  mojama:{definition:'Carne de atún salada y secada al aire, típica de algunas zonas del litoral español.',synonyms:['atún curado','atún salado']},
  mojarra:{definition:'Nombre de varios peces, especialmente de la familia Sparidae, de cuerpo comprimido y alto.',synonyms:['pez espárido','sargo (según la especie)']}
};for(const[id,p]of Object.entries(u)){const fixed=id==='mohено'?'mोहено':id;const r=DICCIONARIOS.es.find(x=>x.id===id)||DICCIONARIOS.es.find(x=>x.id==='moheno');if(r)Object.assign(r,p);}
const ids=new Set(['mojadedo']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
