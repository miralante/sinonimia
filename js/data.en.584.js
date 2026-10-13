(()=>{const ids=new Set(['rescalar']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={rescheme:{definition:'To plan or devise something again; to replan.',synonyms:['replan','devise again','plan anew']}};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
