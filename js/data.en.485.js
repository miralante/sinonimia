(()=>{const ids=new Set(['push-2','push-3','push-4','push-6','push-7','push-8','pusher-2','pusher-3','pusillanimous-2','pussy-2','pussy-3','putaism','puteri']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 push:{definition:'Verb: to exert force to move something away or into a position; to press, urge, persuade, or promote. Noun: an act of pushing, a determined effort, or encouragement.',synonyms:['shove','press','urge','promote','effort','encouragement']},
 'push-5':{definition:'To exert strong or sustained force, especially to move something or make progress.',synonyms:['push forcefully','press hard','make a strong effort']},
 'push-hard':{definition:'To exert strong or sustained effort or pressure.',synonyms:['push forcefully','strive hard','press hard']},
 pushy:{definition:'Aggressively self-assertive or demanding, especially in trying to get one’s way.',synonyms:['overbearing','insistent','aggressive']},
 'push-yourself':{definition:'To make yourself exert more effort or work harder than you otherwise would.',synonyms:['challenge yourself','strive harder','exert yourself']},
 pusinesque:{definition:'In painting or sculpture, represented at about one-third of natural size.',synonyms:['one-third size','reduced scale']},
 pussy:{definition:'Informal and often vulgar: a cat; also a vulgar term for the vulva or vagina, and an insulting term for a person regarded as cowardly or weak.',synonyms:['cat (informal)','vulva (vulgar)','coward (insulting)']},
 pussycat:{definition:'A cat, especially when referred to affectionately or in child-directed speech.',synonyms:['cat','kitty','kitten (by context)']},
 'put-back-the-horse-s-ears':{definition:'To lay a horse’s ears back against its head, usually as a sign of anger, fear, or readiness to threaten.',synonyms:['pin the horse’s ears back','lay the ears back']},
 'put-into-the-fold':{definition:'To bring or welcome someone into a group, organization, or community.',synonyms:['include','welcome into the group','bring in']}
};for(const [id,p] of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
