(()=>{const ids=new Set(['realillo']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 ream:{definition:'A standard quantity of paper, usually 500 sheets; informally, a very large amount. As a verb, to put paper into reams or to enlarge and smooth a hole with a reamer.',synonyms:['paper bundle','large quantity','bore out','ream up']},
 'ream-2':{definition:'To arrange or package sheets of paper in reams.',synonyms:['package in reams','bundle paper']},
 'ream-3':{definition:'To enlarge or smooth a hole with a reamer, a cutting tool.',synonyms:['bore out','enlarge a hole','ream out']},
 reanimate:{definition:'To restore consciousness, activity, or apparent life to someone or something; in fiction, to bring a dead person back to life.',synonyms:['revive','resuscitate','restore to life']},
 reappropriate:{definition:'To take back or appropriate again; especially, to reclaim a cultural object, practice, or term for a new use or meaning.',synonyms:['reclaim','take back','appropriate anew']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
