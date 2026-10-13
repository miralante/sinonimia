(()=>{const ids=new Set(['quitu','quiver-2','quota-2','quote-2','quote-3','quote-5','quote-6','rabbit-6','rabbit-7','rabbihorcado','rabbi-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 quixote:{definition:'A person who is impractically idealistic or romantic, in the manner of Don Quixote.',synonyms:['idealist','visionary','romantic']},
 quixotic:{synonyms:['impractically idealistic','romantic','visionary','unrealistic']},
 quixotically:{definition:'In an impractically idealistic or romantic manner, like Don Quixote.',synonyms:['idealistically','romantically','unrealistically']},
 quixotism:{definition:'Impractical idealism or romanticism resembling the character of Don Quixote.',synonyms:['quixotry','impractical idealism','romanticism']},
 quixotry:{definition:'Impractical idealism or romanticism, especially when it appears absurd or presumptuous.',synonyms:['quixotism','impractical idealism','romanticism']},
 quiz:{definition:'Noun: a short test of knowledge. Verb: to question someone, especially closely or informally.',synonyms:['test','question','interrogate']},
 quota:{definition:'A fixed share, number, or amount assigned, allowed, or required; also, a target to be reached.',synonyms:['allocation','allowance','limit','target']},
 quotable:{definition:'Suitable or striking enough to be quoted.',synonyms:['memorable','worth quoting','quoteworthy']},
 quote:{definition:'Verb: to repeat or cite someone’s words; to give a price or estimate; or to refer to a passage as evidence. Noun: a quotation or a price estimate.',synonyms:['cite','repeat','quotation','price estimate']},
 quotidian:{definition:'Occurring every day; ordinary or commonplace.',synonyms:['daily','everyday','ordinary','routine']},
 quranic:{definition:'Of or relating to the Quran, the sacred text of Islam.',synonyms:['Quran-related','Quranic']},
 rabbi:{definition:'A Jewish teacher or religious leader trained to interpret Jewish law and scripture.',synonyms:['Jewish religious teacher','spiritual leader','rabbinic scholar']},
 'rabbinic':{definition:'Of or relating to rabbis, their teachings, or their writings.',synonyms:['rabbinical','relating to rabbis']},
 rabbinical:{definition:'Of or relating to rabbis, their teachings, or their work.',synonyms:['rabbinic','relating to rabbis']},
 rabbinism:{definition:'The teachings, authority, or system of interpretation associated with rabbis.',synonyms:['rabbinical tradition','rabbinic teaching']},
 rabbit:{definition:'A small mammal with long ears and powerful hind legs, which moves by hopping; also, its meat or fur.',synonyms:['bunny','hare (related animal)','rabbit meat']},
 'rabbit-4':{definition:'The fur or hair of a rabbit, used in textiles and craft materials.',synonyms:['rabbit fur','rabbit hair']},
 'rabbit-3':{definition:'Adjective: resembling a rabbit or relating to rabbits.',synonyms:['leporine','rabbit-like']},
 'rabbit-mouthed':{definition:'Having a mouth or upper lip that resembles a rabbit’s.',synonyms:['rabbit-like-mouthed']},
 'rabbit-farming':{definition:'The breeding and raising of rabbits, especially as an agricultural activity.',synonyms:['rabbit husbandry','rabbit breeding']}
};for(const [id,p] of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
