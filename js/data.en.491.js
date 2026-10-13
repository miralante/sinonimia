(()=>{const ids=new Set(['quarrel-2','quarrel-3','quarrel-4','quarrelsome-2','quarry-2','quarry-3','quartana','quarter-2','quarter-5','quarter-6','quarter-7','quarter-8','quartering-3','quarterer','quarterly-2','quarterly-3','quartz-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 quarrel:{definition:'Noun: an angry argument or disagreement. Verb: to argue angrily or have a persistent disagreement.',synonyms:['argument','dispute','bicker','fall out']},
 quarreler:{definition:'A person who frequently argues or is inclined to quarrel; US spelling of British “quarreller”.',synonyms:['arguer','disputant','quarreller']},
 quarry:{definition:'A place where stone or other material is extracted from the ground; also, an animal or person pursued by a hunter.',synonyms:['stone pit','open mine','prey','target']},
 quarrying:{definition:'The extraction of stone or other materials from an open pit or quarry.',synonyms:['stone extraction','open-pit extraction']},
 quartanal:{definition:'Of or relating to a quartan fever, one that recurs at intervals of approximately seventy-two hours.',synonyms:['quartan','recurring every fourth day']},
 quarter:{definition:'Noun: one fourth of something; a period of three months; a district or area; accommodation; or mercy. Verb: to divide into four parts, provide lodging, or quarter troops.',synonyms:['fourth','three-month period','district','accommodate','divide into four']},
 quarterly:{definition:'Adjective or adverb: occurring, published, or paid once every three months. Noun: a publication issued every three months.',synonyms:['every three months','four times a year','quarterly publication']},
 quarters:{definition:'Living or working accommodation; also, one fourth of a whole.',synonyms:['lodgings','accommodation','fourths']},
 quartet:{definition:'A group of four performers or instruments; a musical composition for four parts; or any set of four related people or things.',synonyms:['four-part group','four musicians','composition for four']},
 quartodeciman:{definition:'Relating to early Christians who observed Easter on the fourteenth day of Nisan, regardless of the day of the week; also, a follower of this practice.',synonyms:['14 Nisan observance','early Christian Paschal practice']},
 quartz:{synonyms:['silica mineral','quartz crystal','silicon dioxide mineral']},
 quartziferous:{synonyms:['quartz-bearing','quartz-rich','containing quartz']},
 quartzite:{definition:'A hard metamorphic rock composed predominantly of interlocking quartz grains, usually formed from sandstone.',synonyms:['metamorphic quartz rock','quartz-rich rock']},
 'quasi-contract':{definition:'A legal obligation imposed by a court to prevent unjust enrichment when no enforceable contract exists.',synonyms:['implied-in-law contract','restitutionary obligation']}
};for(const [id,p] of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
