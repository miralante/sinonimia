(()=>{const ids=new Set(['excava']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 excedencia:{definition:'Situación administrativa o laboral en la que una persona deja temporalmente de desempeñar su puesto. Sus efectos sobre el salario, la antigüedad y la reincorporación dependen del tipo de excedencia y de la normativa aplicable.',synonyms:['licencia','permiso prolongado','suspensión temporal del puesto']},
 exceder:{definition:'Sobrepasar un límite, una cantidad o lo que se considera adecuado; también, superar a alguien o algo en una cualidad.',synonyms:['sobrepasar','superar','rebasar']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(!r)throw Error('Missing es/'+id);Object.assign(r,p);delete r.translation;}})();
