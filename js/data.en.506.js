(()=>{const ids=new Set(['rapturous-3','rapturous-4','rarely-2','rarity-2','rasa','rascacio','rascal-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 'rare-2':{definition:'To make something less dense or more widely spaced; a rare use of the verb rare.',synonyms:['thin out','make less dense','space out']},
 rarefy:{definition:'To make a gas or other substance less dense; also, to become less dense.',synonyms:['thin','make less dense','rarify']},
 rarely:{definition:'Not often; on few occasions.',synonyms:['seldom','infrequently','occasionally']},
 rarificative:{definition:'Making something less dense; causing rarefaction.',synonyms:['rarefying','diluting']},
 rarify:{definition:'Variant spelling of rarefy: to make or become less dense.',synonyms:['rarefy','thin']},
 rarity:{definition:'The state of being uncommon or scarce; an uncommon or scarce thing.',synonyms:['scarcity','uncommonness','rare occurrence']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
