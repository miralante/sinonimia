(()=>{const ids=new Set(['recovery-2','recovery-3','recreate-2','recreate-3','recreated','recreation-2','recrossed']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 recovery:{definition:'The process of returning to a normal or improved state after illness, injury, loss, or difficulty; also, the act of getting back something lost, spent, or owed.',synonyms:['recuperation','regaining','restoration','recovery of assets']},
 recreate:{definition:'To create something again or in a new form; also, to provide someone with recreation or amusement.',synonyms:['create again','rebuild','entertain','refresh']},
 recreation:{definition:'Activity done for enjoyment, relaxation, or refreshment during free time; also, the act of recreating or refreshing someone.',synonyms:['leisure activity','pastime','diversion','relaxation']},
 recreational:{definition:'Related to activities done for enjoyment or relaxation in one’s free time.',synonyms:['leisure-related','for recreation','non-work']},
 recrement:{definition:'A residue or waste product left after a process of production, refinement, or separation.',synonyms:['residue','waste product','dross']},
 recriminate:{definition:'To respond to an accusation by making an accusation in return.',synonyms:['counteraccuse','retaliate with accusations']},
 recriminator:{definition:'A person who makes accusations in response to accusations made against them.',synonyms:['counteraccuser','accuser in return']},
 recross:{definition:'To cross something again or to cross back over it.',synonyms:['cross again','re-cross']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
