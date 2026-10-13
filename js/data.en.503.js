(()=>{const ids=new Set(['rancajada','rancher-2','rancherio','rancid-2','rancid-3','rancid-4','rancid-5']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 rampantly:{definition:'In an unchecked, excessive, or unrestrained way.',synonyms:['uncheckedly','excessively','unrestrainedly']},
 'ramshackle-house':{definition:'A house in poor condition, neglected or falling into disrepair.',synonyms:['dilapidated house','run-down house']},
 rancher:{definition:'A person who owns, manages, or works on a ranch.',synonyms:['ranch owner','ranch hand','ranch manager']},
 rancheria:{definition:'In the western United States, a small settlement or community, especially one historically associated with Native Americans.',synonyms:['small settlement','Native American community']},
 ranching:{definition:'The work or business of raising livestock on a ranch; also, the practice of establishing or operating ranches.',synonyms:['ranch farming','livestock raising']},
 rancid:{definition:'Having an unpleasant smell or taste because its fat or oil has spoiled.',synonyms:['spoiled','off','tainted']},
 rancidity:{definition:'The condition of fats or oils having spoiled and developed an unpleasant smell or taste.',synonyms:['spoilage','taint']},
 rancor:{definition:'Bitter, deep-seated ill will or resentment.',synonyms:['resentment','bitterness','rancour']},
 rancour:{definition:'British spelling of rancor: bitter, deep-seated ill will or resentment.',synonyms:['rancor','resentment','bitterness']},
 rand:{definition:'The basic monetary unit of South Africa.',synonyms:['South African rand','currency unit']},
 randomly:{definition:'Without a predictable pattern, plan, or method; by chance.',synonyms:['haphazardly','by chance','arbitrarily']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
