(()=>{const ids=new Set(['quadrigrandson','quadriplegic-2','quadrisyllable-2','quadrupedant','quadruple-2','quagmire-2','quagmire-4','quagmire-5']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 quadrillion:{definition:'The number 1,000,000,000,000,000 in modern English (short-scale usage); formerly, in long-scale usage, the number 10²⁴.',synonyms:['one thousand trillion','10¹⁵ (short scale)']},
 quadriplegia:{definition:'Paralysis or severe impairment affecting all four limbs, usually as a result of spinal cord or nervous system injury; also called tetraplegia.',synonyms:['tetraplegia','paralysis of all four limbs']},
 quadriplegic:{definition:'A person with quadriplegia; also, relating to quadriplegia or affecting all four limbs.',synonyms:['tetraplegic','person with quadriplegia']},
 quadrisyllable:{definition:'A word or metrical unit consisting of four syllables.',synonyms:['four-syllable word','quadrisyllabic word']},
 quadruped:{definition:'An animal that walks on four feet.',synonyms:['four-footed animal','four-legged animal']},
 quadrupedal:{definition:'Having four feet or legs; adapted for walking on four legs.',synonyms:['four-footed','four-legged']},
 quadruple:{definition:'Verb: to make or become four times as great or numerous. Adjective: four times as great, or consisting of four parts.',synonyms:['multiply by four','fourfold','four-part']},
 quadruplet:{definition:'One of four children born at the same birth; also, one of a set of four related things.',synonyms:['one of four siblings born together','four-part set']},
 quagmire:{definition:'Soft, boggy ground that yields underfoot; figuratively, a difficult or entangling situation.',synonyms:['bog','mire','morass','predicament']},
 quail:{definition:'Noun: a small, plump game bird of the pheasant family. Verb: to lose heart or draw back in fear.',synonyms:['game bird','lose courage','shrink back']}
};for(const [id,p] of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
