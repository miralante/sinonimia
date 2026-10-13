(()=>{const ids=new Set(['rapacity-2','rapafoot','rape-2','rapid-and-sudden-movement','rapid-fire-speaker','rapping-2','rapture-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 rapist:{definition:'A person who commits rape.',synonyms:['perpetrator of rape','sexual offender']},
 rapturous:{definition:'Feeling or expressing great joy, delight, or enthusiasm.',synonyms:['ecstatic','overjoyed','exultant']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
