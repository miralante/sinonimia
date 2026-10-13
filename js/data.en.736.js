(()=>{const u={
  unclose:{definition:'To open something that is closed; also, to reveal or make accessible.',synonyms:['open','unseal','uncover']},
  uncloud:{definition:'To clear away clouds from; figuratively, to make a thought or situation clearer.',synonyms:['clear','brighten','clarify']},
  uncompared:{definition:'Not compared with anything else; having not been examined in comparison.',synonyms:['uncompared','not compared']},
  unconfident:{definition:'Lacking confidence in oneself or in a particular situation.',synonyms:['insecure','unsure','self-doubting']},
  unconscionably:{definition:'In a way that is unreasonable, excessive, or shockingly unfair.',synonyms:['unreasonably','excessively','unfairly']},
  uncontaminated:{definition:'Free from contamination or pollutants.',synonyms:['unpolluted','pure','untainted']},
  uncontested:{definition:'Not disputed, challenged, or opposed.',synonyms:['undisputed','unopposed','unchallenged']},
  uncontrollable:{definition:'Impossible or very difficult to control, restrain, or govern.',synonyms:['unmanageable','irrepressible','unrestrained']},
  unconditioned:{definition:'Not dependent on or limited by a condition; unconditional.',synonyms:['unconditional','unrestricted']},
  unconfessed:{definition:'Not admitted or confessed; kept unacknowledged.',synonyms:['unacknowledged','unadmitted']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['unclogging-2','unclogging-3','unclose-2','uncomfortable-2','unconfident-2','unconscionably-2','uncontrollable-2','uncoating']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
