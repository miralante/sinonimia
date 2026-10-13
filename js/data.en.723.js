(()=>{const u={
  turntable:{definition:'A rotating platform used to play records; also, a rotating platform used to turn railway vehicles or other heavy equipment.',synonyms:['record player platter','rotating platform','railway turntable']},
  'turn-yellow':{definition:'To become yellow or discolored.',synonyms:['yellow','turn yellowish','become discolored']},
  'turn-red':{definition:'To become red or reddish, as from heat, embarrassment, or a change in color.',synonyms:['redden','blush','become red']},
  turtle:{definition:'A reptile of the order Testudines, with a protective shell; the word can refer to aquatic, marine, or land-dwelling species.',synonyms:['testudine','terrapin (regional)']},
  turpentine:{definition:'A resinous oleoresin obtained from certain trees, especially pines, or the volatile oil distilled from it and used as a solvent.',synonyms:['oil of turpentine','pine resin','turps (informal, usually the solvent)']},
  tutelage:{definition:'Instruction, guidance, or protection provided by a tutor or guardian; the state of being under such guidance.',synonyms:['guidance','instruction','guardianship']},
  tutor:{definition:'Noun: a person who gives individual or small-group instruction or guidance. Verb: to teach or instruct; in gardening, to support a plant with a stake.',synonyms:['private instructor','academic adviser','teach','stake a plant']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['turn-on-2','turn-on-3','turn-on-4','turn-on-5','turn-yellow-2','turpentine-2','turquoise-3','turquoise-4','turra','tute','tutor-2','tutor-3','tutor-4']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
