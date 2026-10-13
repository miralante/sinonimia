(()=>{const u={
 extrasensorial:{definition:'Que supuestamente se percibe o conoce por medios distintos de los sentidos ordinarios.',synonyms:['paranormal','perceptible sin los sentidos habituales']},
 extrasistole:{definition:'Latido cardíaco prematuro que interrumpe el ritmo habitual y suele ir seguido de una pausa compensatoria.',synonyms:['latido prematuro','contracción cardíaca prematura']},
 extratempora:{synonyms:['dispensa para recibir órdenes fuera del tiempo señalado','autorización eclesiástica extraordinaria']},
 extravertido:{definition:'Que tiende a dirigir su atención e interés hacia el mundo exterior y a relacionarse con otras personas; variante de extrovertido.',synonyms:['extrovertido','sociable','comunicativo']},
 extravio:{definition:'Acción y efecto de extraviar o extraviarse; también, pérdida de algo cuyo paradero se desconoce.',synonyms:['pérdida','desorientación','extravío de un objeto']},
 extravenar:{definition:'Hacer salir sangre de una vena, generalmente mediante una sangría; voz médica antigua.',synonyms:['sangrar una vena','practicar una sangría']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(!r)throw Error('Missing es/'+id);Object.assign(r,p);delete r.translation;}})();
