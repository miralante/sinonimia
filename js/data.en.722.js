(()=>{const u={
  turion:{definition:'A young shoot or bud, especially one that grows from the underground stem of a plant.',synonyms:['sprout','young shoot','bud']},
  turn:{definition:'Verb: to rotate, change direction, or cause something to face another way; also, to become or change into something. Noun: an act of turning, a change in direction, or a person’s opportunity to act.',synonyms:['rotate','pivot','change direction','take a turn']},
  turning:{definition:'The act or process of turning; in machining, shaping a rotating workpiece on a lathe by cutting away material. Also, a bend or place where a road changes direction.',synonyms:['rotation','lathe work','bend']},
  turnip:{definition:'A round, edible root vegetable of the mustard family, Brassica rapa, usually white with a purple or green top.',synonyms:['Brassica rapa','root vegetable']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['turbot-2','turkey','turkey-2','turkey-3','turkey-4','turkish-2','turkish-navy-soldier','turmodic','turn-2','turning-2','turning-3','turning-4']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
