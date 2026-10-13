(()=>{const ids=new Set(['rebellion-2','rebind-3','reblag','reboot-3']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 rebind:{definition:'To bind, fasten, or cover something again; especially, to bind a book in a new cover.',synonyms:['bind again','recover','refasten']},
 'rebind-2':{definition:'To bind or cover a book again, usually with a new cover.',synonyms:['re-cover','bind again']},
 rebinding:{definition:'The act or process of binding or covering something again, especially a book.',synonyms:['re-binding','book rebinding']},
 rebit:{definition:'To fasten or repair something again with a rivet; also, a rivet used for such a repair.',synonyms:['rivet again','re-rivet']},
 rebomb:{definition:'To bomb again; to attack a place with bombs a second time.',synonyms:['bomb again','attack again']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
