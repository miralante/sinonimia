(()=>{const ids=new Set(['range-2','range-3','randomness-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 rangefinder:{definition:'An optical, electronic, or other instrument used to measure the distance to an object.',synonyms:['distance-measuring device','distance meter']},
 rank:{definition:'A position in a hierarchy or scale; a row or line of people or things. As a verb, to assign a position or to have a particular position.',synonyms:['position','standing','grade','classify']},
 'rant-2':{definition:'A long, tedious, or unwelcome speech or line of reasoning.',synonyms:['tirade','long-winded speech','diatribe']},
 'rant-4':{definition:'To speak at length in an angry, loud, or uncontrolled way.',synonyms:['rave','rail','hold forth']},
 rapacity:{definition:'Aggressive greed for wealth, power, or possessions.',synonyms:['greed','avarice','rapaciousness']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
