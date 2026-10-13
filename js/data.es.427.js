(()=>{const ids=new Set(['establecedor']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 esquero:{definition:'Bolsa de cuero que se llevaba sujeta al cinto y servía para guardar yesca y pedernal, dinero u otros objetos.',synonyms:['yesquero','bolsa de cuero','bolsa de cintura']},
 esquiraza:{definition:'Antigua embarcación de transporte aparejada con velas cuadradas.',synonyms:['nave de carga','embarcación de carga']},
 esquisto:{definition:'Roca metamórfica de grano medio, foliada y fácilmente divisible en láminas, compuesta principalmente por cuarzo y minerales laminares como las micas.',synonyms:['roca metamórfica foliada','roca esquistosa']},
 esquisuche:{definition:'En Honduras, El Salvador y otros países de Centroamérica, árbol ornamental de flores pequeñas, blancas y fragantes; también, flor de ese árbol.',synonyms:['esquinsuche','flor de esquite','Bourreria huanita']},
 esquinsuche:{definition:'En El Salvador y Honduras, esquisuche: árbol ornamental de flores fragantes y la flor de este árbol.',synonyms:['esquisuche','Bourreria huanita']},
 esquizofrenico:{definition:'Relacionado con la esquizofrenia; dicho de una persona, que tiene este trastorno.',synonyms:['relativo a la esquizofrenia','persona con esquizofrenia']},
 esquizoide:{definition:'Que tiene relación con el trastorno esquizoide de la personalidad o presenta rasgos asociados a él.',synonyms:['relativo al trastorno esquizoide','con rasgos esquizoides']}
};for(const [id,p] of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(!r)throw Error('Missing es/'+id);Object.assign(r,p);delete r.translation;}})();
