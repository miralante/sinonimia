(()=>{const ids=new Set(['pseudonym-2','pseudopod-2','psoriasis-2','psoriasis-3','psyche-2','psyche-3','psychiatric-2','psychiatrist-2','psychiatrist-3']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 pseudohermaphrodite:{definition:'An older medical term for a person whose external sex characteristics do not align with the sex indicated by their gonads; in current human medicine, “intersex” or “variation in sex characteristics” is generally preferred.',synonyms:['person with a variation in sex characteristics (preferred current wording)','intersex person (in relevant contexts)']},
 pseudohermaphroditism:{definition:'An older medical term for a variation in sex characteristics in which gonadal sex and external genital characteristics differ; the term is no longer used as a diagnostic category in ICD-11.',synonyms:['variation in sex characteristics','intersex variation (in relevant contexts)']},
 pseudology:{definition:'The practice of lying or making false statements; sometimes, the art of lying.',synonyms:['deceit','falsehood','lying']},
 pseudonym:{synonyms:['pen name','assumed name','alias']},
 pseudopod:{definition:'A temporary extension of a cell’s cytoplasm, used for movement or for engulfing food.',synonyms:['pseudopodium','false foot','cytoplasmic projection']},
 psittaciform:{definition:'Belonging to the order Psittaciformes, which includes parrots, cockatoos, and related birds.',synonyms:['parrot-like','of the parrot order']},
 psittacism:{definition:'Mechanical repetition of words or phrases without understanding them, likened to a parrot’s repetition.',synonyms:['parroting','rote repetition','uncomprehending repetition']},
 psittacosis:{definition:'An infectious disease caused by the bacterium Chlamydia psittaci, usually transmitted to people from infected birds.',synonyms:['parrot fever','ornithosis']},
 psoriasis:{synonyms:['chronic inflammatory skin disease','scaly plaque skin disease']},
 psychasthenia:{definition:'An obsolete psychiatric term for a group of symptoms such as phobias, obsessions, compulsions, and excessive anxiety.',synonyms:['historical term for anxiety and obsessive symptoms','psychasthenic neurosis (obsolete)']},
 psyche:{synonyms:['mind','inner life','mental world','soul (in some contexts)']},
 psychedelia:{definition:'Art, music, or culture associated with psychedelic drugs or with experiences and imagery intended to resemble their effects.',synonyms:['psychedelic art','psychedelic culture','psychedelic movement']},
 psychedelic:{definition:'Relating to or resembling the altered perceptions and experiences caused by psychedelic drugs; also, describing the art or culture associated with them.',synonyms:['hallucinogenic','mind-altering','psychedelia-related']},
 psychiatric:{synonyms:['relating to psychiatry','mental-health-related (broader)']},
 psychiatrist:{synonyms:['mental health physician','doctor specializing in psychiatry']}
};for(const [id,p] of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
