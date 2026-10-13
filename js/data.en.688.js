(()=>{const u={
  toxicologist:{definition:'A scientist or specialist who studies poisons, toxins, and their effects on living organisms.',synonyms:['poison scientist']},
  toxicosis:{definition:'A pathological condition caused by exposure to a toxin or poisonous substance.',synonyms:['toxic poisoning']},
  toxify:{definition:'To make something toxic or contaminate it with a toxic substance.',synonyms:['poison','contaminate']},
  toymaker:{definition:'A person or company that designs or makes toys.',synonyms:['toy manufacturer']},
  trace:{definition:'A small sign or amount remaining; a mark or path left behind; to follow or discover something by investigation; to copy an outline by drawing over it.',synonyms:['vestige','track','sign','follow','investigate','copy an outline']},
  toxicity:{definition:'The degree to which a substance or condition can cause harm; also, the harmful effects produced.',synonyms:['harmfulness','poisonousness']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['toxic-2','toxic-gas-detector-2','toxicity-2','trabea','trabucator','tracate','trace-2','trace-3']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
