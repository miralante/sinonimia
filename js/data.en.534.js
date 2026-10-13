(()=>{const ids=new Set(['redouble-2','redred','redress-2','redrohair','red-snapper-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 redouble:{definition:'To double or increase something again or to twice its previous amount; in bridge, to double an opponent’s double; also, to fold or bend something twice.',synonyms:['double again','increase twofold','redouble a bid','fold twice']},
 redpepper:{word:'red pepper',definition:'A red variety of the pepper plant, eaten as a vegetable or dried and ground as a spice.',synonyms:['red bell pepper','red chili pepper','cayenne (spice, in some contexts)']},
 redshank:{definition:'A wading bird, Tringa totanus, of the sandpiper family, with long red legs and a slender bill.',synonyms:['common redshank','Tringa totanus']},
 'red-snapper':{definition:'A fish called a red snapper, especially Lutjanus campechanus, a marine food fish found in the western Atlantic and Gulf of Mexico; the common name can refer to other species in different regions.',synonyms:['Lutjanus campechanus','snapper']},
 redstart:{definition:'Any of several small songbirds called redstarts; Old World redstarts are flycatchers in the family Muscicapidae, while New World redstarts belong to other families.',synonyms:['common redstart','American redstart (a different bird)']},
 'redstem-filaree':{definition:'An annual flowering plant, Erodium cicutarium, in the geranium family, native to the Mediterranean region and now widespread.',synonyms:['Erodium cicutarium','redstem stork’s-bill','common storksbill','alfilaria']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
