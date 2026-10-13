(()=>{const ids=new Set(['proximity-sensor-2','prude-2','prudence-2','prudery-2','pruning-3','pruning-4','pruning-6','pry-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 'proximity-sensor':{definition:'A device that detects the presence or approach of an object without making physical contact.',synonyms:['proximity detector','presence sensor','near-field sensor'],example:{word:'proximity sensor',text:'The proximity sensor turns off the phone screen when the user lifts it to their ear.'},exampleSynonym:{word:'presence sensor',text:'The presence sensor turns off the phone screen when the user lifts it to their ear.'}},
 prudential:{definition:'Relating to or exercising prudence, especially in practical or financial decisions.',synonyms:['prudent','cautious','careful']},
 prudentially:{synonyms:['prudently','cautiously','with good judgment']},
 prudery:{definition:'Excessive or affected concern for propriety, especially in matters involving sex or nudity.',synonyms:['prudishness','excessive modesty','primness']},
 'pruning':{definition:'The act or practice of cutting away unwanted or excessive branches or growth from a plant; also, the time when this work is done.',synonyms:['trimming','cutting back','branch removal']},
 prurigo:{definition:'An itchy skin disorder marked by persistent papules or nodules, often worsened by scratching.',synonyms:['itchy papular skin disorder','pruritic eruption']},
 prybar:{definition:'A sturdy metal bar with a flattened end, used as a lever to force objects apart or remove nails.',synonyms:['pry bar','crowbar','wrecking bar']},
 psalmody:{definition:'The singing or musical setting of psalms, especially in public worship.',synonyms:['psalm singing','chanting of psalms']}
};for(const [id,p] of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
