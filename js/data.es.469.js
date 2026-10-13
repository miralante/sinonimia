(()=>{const u={
 exprimidor:{definition:'Utensilio o aparato utilizado para extraer el jugo de frutas u otros alimentos mediante presión.',synonyms:['juguera','prensa para cítricos','extractor de jugos']},
 exprimir:{definition:'Apretar o presionar algo para extraer su jugo o líquido; también, aprovechar algo o a alguien hasta el límite.',synonyms:['estrujar','apretar','extraer el jugo','explotar (sentido figurado)']},
 expuesto:{definition:'Sometido o sujeto a una situación, influencia o riesgo; también, presentado o puesto a la vista.',synonyms:['sometido','sujeto a riesgo','presentado','a la vista']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(!r)throw Error('Missing es/'+id);Object.assign(r,p);delete r.translation;}})();
