(()=>{const ids=new Set(['quick-and-sharp-movement-2','quickly-2','quickly-3','quickly-4','quickly-5','quiet-2','quiet-3','quiet-4','quiet-7','quiet-8','quietly-2','quietly-3','quilator','quilet','quiloliter','quilosous','quilt-2','quilting-3','quimba']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 quickie:{definition:'Informal. Something done quickly or lasting only a short time; especially, a brief sexual encounter.',synonyms:['short-lived event','brief sexual encounter (informal)']},
 quickly:{definition:'At a fast speed or after only a short time; without delay.',synonyms:['rapidly','swiftly','promptly','soon']},
 quidam:{definition:'A person whose name is unknown or deliberately not stated; a certain person.',synonyms:['some person','unnamed person','someone']},
 quiet:{definition:'Noun: tranquility or little activity. Adjective: making little or no noise; calm, peaceful, unobtrusive, or not inclined to speak. Verb: to make or become quiet.',synonyms:['silence','tranquility','calm','peaceful','hushed','still']},
 'quiet-6':{definition:'Not speaking much; reserved or taciturn.',synonyms:['reserved','taciturn','uncommunicative']},
 quieter:{definition:'Comparative of quiet: making less noise or being calmer, more peaceful, or less talkative.',synonyms:['calmer','less noisy','more subdued']},
 quietly:{definition:'With little or no noise; calmly, discreetly, or without attracting attention.',synonyms:['silently','calmly','softly','discreetly']},
 quietness:{synonyms:['silence','stillness','tranquility','calm']},
 quiliferous:{definition:'Biology. Carrying or conveying chyle, the milky fluid formed during digestion.',synonyms:['chyle-carrying','chyliferous']},
 quill:{definition:'A large feather, especially one used as a writing pen; also, the hollow shaft of a feather or a similar slender tube.',synonyms:['feather pen','feather shaft','writing quill']},
 quilombo:{definition:'In Brazil and other parts of Latin America, a settlement founded by escaped enslaved people; in modern usage, a community descended from such settlers.',synonyms:['maroon settlement','community of escaped enslaved people','palenque (regional equivalent)']},
 quilt:{definition:'A bed covering made of layers of fabric stitched together, often with padding between them.',synonyms:['bed quilt','coverlet','bedcover']},
 quilted:{definition:'Made of layers of fabric stitched together, often with padding between them; also, stitched in a decorative quilted pattern.',synonyms:['padded','stitched in a quilt pattern','quilt-like']},
 quilting:{definition:'The process or craft of stitching layers of fabric together to make a quilt; also, the resulting stitching or pattern.',synonyms:['quilt making','quilting stitch','patchwork quilting']}
};for(const [id,p] of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
