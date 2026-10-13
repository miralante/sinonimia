(()=>{const u={
 extremo:{definition:'Que está en el punto más alejado de un lugar o de un límite; también, muy intenso o llevado al grado máximo. Puede funcionar como superlativo de «exterior» en ciertos usos.',synonyms:['máximo','intenso','remoto','extremado']},
 extrovertido:{definition:'Que tiende a dirigir su atención e interés hacia el mundo exterior y a relacionarse con otras personas.',synonyms:['extravertido','sociable','comunicativo']},
 extrudir:{definition:'Variante de extruir: dar forma a un material haciéndolo pasar a presión por una abertura o matriz.',synonyms:['extruir','moldear por extrusión']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(!r)throw Error('Missing es/'+id);Object.assign(r,p);delete r.translation;}})();
