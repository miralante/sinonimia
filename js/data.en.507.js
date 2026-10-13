(()=>{const ids=new Set(['rascal-7','rascality-2','rash-3','rash-4','rash-5','rash-on-lips']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 'rascal-3':{definition:'An idle or disreputable person; an older sense of rascal.',synonyms:['idler','rogue','scoundrel']},
 'rascal-4':{definition:'A mean or dishonest act typical of a rascal.',synonyms:['rascality','mischief','dishonest act']},
 'rascal-5':{definition:'Roguish or characteristic of a rascal.',synonyms:['roguish','mischievous','dishonest']},
 'rascal-6':{definition:'Roguish, dishonest, or mischievous in character.',synonyms:['roguish','mischievous','dishonest']},
 'rash-2':{definition:'A temporary outbreak of irritated or inflamed spots on the skin.',synonyms:['skin eruption','skin irritation']},
 rasp:{definition:'To scrape or smooth a surface with a rasp; also, to make a harsh grating sound.',synonyms:['file','scrape','grate']},
 'rasp-2':{definition:'A coarse file with raised, pointed teeth, used especially for shaping wood.',synonyms:['coarse file','wood rasp']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
