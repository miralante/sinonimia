(()=>{const u={
  ninot:{definition:'En Valencia, cada una de las figuras que forman parte de una falla.',synonyms:['figura de falla','muñeco fallero']},
  niquiscocio:{definition:'Coloquial y poco usado: negocio de poca importancia o cosa despreciable que se trae entre manos.',synonyms:['negocio insignificante','asunto despreciable']},
  nitrogenado:{definition:'Que contiene nitrógeno o ha sido combinado con nitrógeno.',synonyms:['nitrogenífero','con nitrógeno']},
  nixquear:{definition:'En Honduras, cocer el maíz con cal o ceniza para prepararlo para su consumo.',synonyms:['nisquezar','cocer maíz con cal']},
  niste:{definition:'En Nicaragua, dicho especialmente de la piel: de color ceniciento.',synonyms:['ceniciento','grisáceo']},
  nixte:{definition:'En Honduras, dicho de una persona: de tez pálida o de color ceniciento.',synonyms:['pálido','ceniciento']},
  nito:{definition:'Helecho de Filipinas, de tallo casi voluble y hojas que nacen ladeadas sobre un pecíolo pequeño y están divididas.',synonyms:['helecho filipino']},
  nochebueno:{definition:'Torta de almendras, piñones y otros ingredientes que se prepara para Nochebuena; también, leño grande que se quema esa noche.',synonyms:['torta navideña','leño de Nochebuena']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r&&p.definition)Object.assign(r,p);}const ids=new Set(['niquira','niscome']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
