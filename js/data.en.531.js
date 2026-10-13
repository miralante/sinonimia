(()=>{const ids=new Set(['recycle-2','recycling-2','recycling-3','red-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 recurrence:{definition:'The act or fact of happening, appearing, or occurring again; in medicine, the return of a disease or symptom after improvement.',synonyms:['repetition','return','resurgence','relapse (medical context)']},
 recusal:{definition:'The act of a judge, official, or other decision-maker withdrawing from a case or proceeding because of a conflict of interest, possible bias, or another reason for disqualification.',synonyms:['disqualification','withdrawal from a case','stepping aside']},
 recusant:{definition:'A person who refuses to obey an authority, comply with a requirement, or conform to an accepted practice; historically, especially one who refused to attend services of the established Church of England.',synonyms:['nonconformist','dissenter','resister']},
 recuse:{definition:'To remove oneself or another from a legal or official proceeding because of possible bias, conflict of interest, or another disqualifying reason.',synonyms:['disqualify','withdraw from a case','step aside']},
 recut:{definition:'To cut something again, especially to alter or improve its shape, fit, or edit.',synonyms:['cut again','trim again','edit again']},
 recycle:{definition:'To process used materials so they can be made into new products; also, to reuse or adapt something for another purpose.',synonyms:['reuse','reprocess','repurpose']},
 recycling:{definition:'The process of collecting and processing used materials so they can be made into new products; also, the reuse or adaptation of something.',synonyms:['reuse','reprocessing','repurposing']},
 red:{definition:'A color at the long-wavelength end of the visible spectrum; also, something of that color, a red cosmetic, or a political designation associated with left-wing or communist movements, depending on context.',synonyms:['scarlet','crimson','vermilion','rouge (cosmetic)']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
