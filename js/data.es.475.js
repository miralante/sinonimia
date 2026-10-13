(()=>{const u={
 extranjerismo:{definition:'Palabra, expresión o giro tomado de otra lengua; también, influencia de una lengua extranjera en otra.',synonyms:['préstamo lingüístico','voz extranjera','extranjerismo léxico']},
 extranjerizante:{definition:'Que tiende a dar carácter extranjero a algo o que incorpora rasgos, palabras o usos de otras lenguas.',synonyms:['de influencia extranjera','foráneo']},
 extranjerizar:{definition:'Dar carácter extranjero a algo o introducir en una lengua, cultura o práctica rasgos procedentes de otra.',synonyms:['dar carácter extranjero','incorporar rasgos foráneos']},
 extrapolable:{definition:'Que puede extenderse o aplicarse a otros casos a partir de datos, resultados o una tendencia conocida.',synonyms:['generalizable','aplicable a otros casos']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(!r)throw Error('Missing es/'+id);Object.assign(r,p);delete r.translation;}})();
