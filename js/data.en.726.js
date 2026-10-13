(()=>{const u={
  twining:{definition:'The act or process of twisting or interlacing strands, fibres, or similar things; also, growing or extending in a winding manner.',synonyms:['interlacing','winding','interweaving']},
  twinning:{definition:'The formation or production of twins; also, the pairing of two places or institutions, especially in a formal partnership.',synonyms:['production of twins','twinning of towns','pairing']},
  twist:{definition:'Verb: to turn or bend something into a different shape, wind strands together, turn the body, or distort meaning; also, to twist several candles together into a torch. Noun: a turn, coil, bend, or unexpected change in a story or situation; the action or result of twisting or writhing.',synonyms:['turn','coil','bend','wind','distort','writhe']},
  twisted:{definition:'Bent, turned, or wound out of its usual shape; also, distorted, complicated, or morally perverse.',synonyms:['bent','wound','contorted','distorted','perverse']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['twinkle-3','twister-2','twist-2','twist-3','twist-4','twist-5','twist-6','twist-7','twist-8','twist-10','twist-11','twist-12','twist-14','twist-15','twist-16','twisted-5','twinned-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
