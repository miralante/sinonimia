(()=>{const u={
 eurocentrismo:{synonyms:['visión eurocéntrica','centralidad de Europa']},
 eurocomunismo:{definition:'Corriente política de partidos comunistas de Europa occidental que defendió una vía democrática y autónoma respecto de la Unión Soviética.',synonyms:['comunismo europeo','corriente comunista occidental']},
 eurodiputado:{definition:'Miembro del Parlamento Europeo elegido para representar a los ciudadanos de un Estado miembro.',synonyms:['miembro del Parlamento Europeo','parlamentario europeo']},
 euroesceptico:{definition:'Que expresa desconfianza, crítica u oposición hacia la Unión Europea o el proceso de integración europea.',synonyms:['crítico de la Unión Europea','contrario a la integración europea']},
 europeizar:{definition:'Dar carácter europeo a algo o a alguien; también, adquirir ese carácter.',synonyms:['dar carácter europeo','adaptar a Europa']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(!r)throw Error('Missing es/'+id);Object.assign(r,p);delete r.translation;}})();
