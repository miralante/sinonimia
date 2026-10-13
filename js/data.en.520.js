(()=>{const ids=new Set(['rebuker-2','rebure','reburr','rebut-2','rebuttar','rebuttal-old','recall-2','recall-3','recamer','recananilla']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 rebus:{definition:'A puzzle in which words or phrases are represented by pictures, symbols, letters, or their arrangement.',synonyms:['picture puzzle','word puzzle']},
 rebut:{definition:'To refute an argument or accusation by presenting evidence or reasoning against it.',synonyms:['refute','counter','disprove']},
 rebuttal:{definition:'An argument or piece of evidence that refutes or counters a claim or accusation.',synonyms:['refutation','counterargument','reply']},
 recalcitrate:{definition:'To resist authority, control, or an established rule stubbornly.',synonyms:['resist stubbornly','rebel','be obstinate']},
 'recast-2':{definition:'To melt and cast metal again, often in a different form.',synonyms:['remelt','cast again','reform']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
