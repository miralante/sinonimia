(()=>{const ids=new Set(['reciter-2','recklessly-2','recklessly-3','recklessly-4','reclining-old']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 reckless:{definition:'Careless about danger or the possible consequences of one’s actions; rash.',synonyms:['heedless','careless','rash']},
 recklessly:{definition:'In a careless way that ignores danger or possible consequences.',synonyms:['rashly','heedlessly','carelessly']},
 reclaim:{definition:'To get back or recover something previously lost, given away, or taken; also, to make land or waste material usable again.',synonyms:['recover','regain','repossess','restore']},
 'reclean':{definition:'To clean something again, usually to remove dirt or residue left after an earlier cleaning.',synonyms:['clean again','wash again']},
 recline:{definition:'To lean or lie back in a relaxed or resting position.',synonyms:['lie back','lean back','repose']},
 recliner:{definition:'A chair with a back that can be tilted backward, often with a footrest; also, a person who reclines.',synonyms:['reclining chair','adjustable armchair']},
 reclining:{definition:'Leaning or lying back in a relaxed position; also, the act of leaning or lying back.',synonyms:['leaning back','lying back','reclining position']},
 reclose:{definition:'To close something again after it has been opened.',synonyms:['close again','shut again']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
