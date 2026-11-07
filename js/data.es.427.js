(()=>{const ids=new Set(['establecedor']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 
 
 
 
 esquinsuche:{definition:'En El Salvador y Honduras, esquisuche: árbol ornamental de flores fragantes y la flor de este árbol.',synonyms:['esquisuche','Bourreria huanita']},
 esquizofrenico:{definition:'Relacionado con la esquizofrenia; dicho de una persona, que tiene este trastorno.',synonyms:['relativo a la esquizofrenia','persona con esquizofrenia']},
 esquizoide:{definition:'Que tiene relación con el trastorno esquizoide de la personalidad o presenta rasgos asociados a él.',synonyms:['relativo al trastorno esquizoide','con rasgos esquizoides']}
};for(const [id,p] of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r){Object.assign(r,p);if(r)if(r)delete r.translation;}}})();
