(()=>{const ids=new Set(['ratify-2','ratimeter','ratinate','rat-killer']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 rater:{definition:'A person or device that assigns a rating, rate, or value.',synonyms:['evaluator','assessor','rating device']},
 raticide:{definition:'A substance used to kill rats.',synonyms:['rat poison','rodenticide']},
 ratification:{definition:'The act or process of formally approving or confirming an agreement, treaty, or decision.',synonyms:['formal approval','confirmation','validation']},
 rational:{definition:'Based on or consistent with reason or logic; able to think clearly and make reasoned decisions.',synonyms:['logical','reasonable','sensible']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
