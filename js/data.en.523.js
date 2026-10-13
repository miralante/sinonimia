(()=>{const ids=new Set(['recidivism-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 recessive:{definition:'Genetics. Of or relating to an allele or trait that is expressed only when no dominant allele masks it; more generally, tending to recede or diminish.',synonyms:['genetically recessive','non-dominant']},
 recipe:{definition:'A set of instructions for preparing a particular dish, including its ingredients and method; also, a formula or procedure for achieving a result.',synonyms:['cooking instructions','formula','method']},
 'recipe-2':{definition:'A medical prescription or, more broadly, a formula or set of directions for preparing something.',synonyms:['prescription','formula']},
 reciprocate:{definition:'To respond to a feeling, action, or favor by doing or feeling the same in return; also, to move or act in a corresponding way.',synonyms:['return','respond in kind','mutually correspond']},
 reciprocity:{definition:'A relationship in which two people, groups, or countries give and receive equivalent benefits or treatment.',synonyms:['mutual exchange','mutuality','give-and-take']},
 recitative:{definition:'A style of musical composition, especially in opera, in which singing follows the rhythms and inflections of speech.',synonyms:['speech-like singing','operatic recitation']},
 recite:{definition:'To say a passage, poem, speech, or list aloud, often from memory.',synonyms:['rehearse','repeat from memory','deliver']},
 reciter:{definition:'A person who recites a passage, poem, speech, or other text, often from memory.',synonyms:['reader','performer','speaker']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
