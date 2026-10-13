(()=>{const u={
  tonsure:{definition:'The act or result of shaving part of the head, especially as a religious rite; also, the circular patch of hair left by such shaving. As a verb, to shave the head in this way.',synonyms:['shaved crown','religious tonsure']},
  tooling:{definition:'Tools or equipment used in a manufacturing process; also, the design or preparation of such tools, especially for machining or production.',synonyms:['tooling equipment','production tools']},
  toot:{definition:'To make or cause a short, high-pitched sound, especially on a horn; also, the sound itself.',synonyms:['honk','sound a horn','short blast']},
  tooth:{definition:'One of the hard structures in the mouth used for biting and chewing; also, a projecting part on a gear, comb, or similar object.',synonyms:['dental structure','gear cog']},
  'toothpick-holder':{definition:'A small container or stand for keeping toothpicks.',synonyms:['toothpick dispenser']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['tonsure-2','tool-2','tooling-2','too-much-2','tooth-2','tooth-3','tooth-4','toothless-2','toothless-3','toothpaste-2','toothpick-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
