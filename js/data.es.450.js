(()=>{const ids=new Set(['exagitado']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 evolutivo:{definition:'Perteneciente o relativo a la evolución o que resulta de ella.',synonyms:['relativo a la evolución','progresivo']},
 exacerbar:{definition:'Aumentar o agravar la intensidad de algo, especialmente de un problema, un síntoma o un sentimiento.',synonyms:['agravar','intensificar','avivar']},
 exactitud:{definition:'Cualidad de ser exacto; precisión y conformidad con la realidad, una medida o una regla.',synonyms:['precisión','fidelidad','corrección']},
 exaltado:{definition:'Que muestra gran intensidad o vehemencia en sus ideas, sentimientos o reacciones.',synonyms:['vehemente','exaltado','apasionado']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(!r)throw Error('Missing es/'+id);Object.assign(r,p);delete r.translation;}})();
