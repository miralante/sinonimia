(()=>{const u={
 extraer:{definition:'Sacar algo de donde está, separarlo de un conjunto o conseguirlo mediante una operación; también, obtener información o una conclusión.',synonyms:['sacar','retirar','obtener','deducir']},
 extramarital:{definition:'Que ocurre o se mantiene fuera del matrimonio; especialmente, referido a una relación sentimental o sexual.',synonyms:['extramatrimonial','fuera del matrimonio']},
 extranamente:{definition:'De manera extraña o inusual; con extrañeza.',synonyms:['extrañamente','de forma inusual']},
 extranar:{definition:'En el uso antiguo, apartar o privar a alguien del trato que mantenía con otra persona; en el uso actual, echar de menos o encontrar algo extraño.',synonyms:['apartar','privar del trato','echar de menos','hallar extraño']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(!r)throw Error('Missing es/'+id);Object.assign(r,p);delete r.translation;}})();
