(()=>{const ids=new Set(['recommend-3','recommendant','recommendation-letter-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 recombinant:{definition:'Genetics. Produced by combining genetic material from different sources; also, an organism, cell, or molecule with such a newly combined genetic makeup.',synonyms:['genetically recombined','recombinant organism']},
 recommend:{definition:'To suggest that someone or something is suitable or good for a purpose, or that a particular action should be taken; to praise or endorse someone. In an older or formal sense, to entrust someone to another’s care.',synonyms:['suggest','advise','endorse','commend','entrust']},
 'recommend-2':{definition:'Older or formal: to entrust or commend someone to another person’s care or protection.',synonyms:['entrust','commend to someone’s care']},
 recommendably:{definition:'In a way that is worthy of recommendation or approval.',synonyms:['commendably','admirably']},
 'recommendation-letter':{definition:'A letter in which someone describes a person’s qualifications or character and recommends them for a job, course, or other opportunity.',synonyms:['letter of recommendation','reference letter']},
 recommended:{definition:'Suggested or endorsed as suitable, useful, or worthy of approval; also, recognized as deserving appreciation or esteem.',synonyms:['endorsed','approved','suggested']},
 recompose:{definition:'To compose, arrange, or put something together again; also, to restore one’s composure.',synonyms:['reassemble','reconstruct','regain composure']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
