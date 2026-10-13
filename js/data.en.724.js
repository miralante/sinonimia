(()=>{const u={
  tutorial:{definition:'A lesson, demonstration, or guide that explains how to do or understand something; also, relating to such instruction.',synonyms:['guide','lesson','how-to']},
  tweet:{definition:'Noun: a short post published on a social-media platform; also, a short, high-pitched sound made by a small bird. Verb: to publish such a post or make that sound.',synonyms:['social-media post','chirp','twitter']},
  twenty:{definition:'The number 20; also, the numeral or quantity represented by it.',synonyms:['20','score (group of twenty)']},
  'twenty-first':{definition:'The ordinal number after twentieth; also, one of twenty-one equal parts.',synonyms:['21st','one twenty-first']},
  'twenty-four':{definition:'The number 24; also, the numeral or quantity represented by it.',synonyms:['24','two dozen']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['tv-movie-2','tweet-2','tweety','twelfth-2','twelfth-3','twelfth-4','twenty-2','twenty-3','twenty-4','twenty-four-2','twenty-four-3']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
