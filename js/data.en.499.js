(()=>{const ids=new Set(['radon-detector-2','raffle-2','raffle-3','raft-2','raft-3','raft-4','rag-2','rag-3','rag-4','rag-5','ragday','rage-2','ragged-2','ragged-3','ragged-4','ragged-5','ragged-6','rag-remover','raguso','raid-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 'radon-detector':{definition:'A device used to detect or measure the concentration of radon gas in air.',synonyms:['radon monitor','radon test device']},
 raffle:{definition:'Noun: a prize draw in which numbered tickets are sold for a chance to win. Verb: to offer something as a prize in such a draw.',synonyms:['prize draw','lottery','draw']},
 raffler:{definition:'A person who organizes or conducts a raffle.',synonyms:['raffle organizer','lottery organizer']},
 raft:{definition:'Noun: a flat floating structure, often made of logs or planks, used for transport or support on water. Verb: to travel or transport by raft.',synonyms:['floating platform','flatboat','float']},
 rag:{definition:'A torn or worn piece of cloth; old, torn clothes. As a verb, chiefly informal, to tease or criticize someone, often jokingly.',synonyms:['cloth scrap','tatter','tease','mock']},
 'rag-and-bone-shop':{definition:'Chiefly British. A shop dealing in inexpensive second-hand goods or discarded household items, traditionally collected by a rag-and-bone dealer.',synonyms:['second-hand shop','junk shop','rag shop']},
 ragged:{definition:'Having torn, frayed, or irregular edges; rough or uneven in appearance. Figuratively, disorganized or uneven.',synonyms:['tattered','frayed','jagged','uneven']},
 raggedy:{definition:'Ragged, shabby, or untidy in appearance.',synonyms:['shabby','tattered','scruffy']},
 raglan:{definition:'A sleeve that extends in one piece from the collar to the underarm, leaving a diagonal seam.',synonyms:['raglan sleeve','raglan-sleeved garment']},
 'rag-shop':{definition:'A shop that buys or sells rags, scrap, or inexpensive second-hand goods.',synonyms:['junk shop','second-hand shop','rag-and-bone shop']},
 ragtime:{definition:'A style of American music, especially piano music, characterized by syncopated rhythms.',synonyms:['syncopated piano music','ragtime music']},
 ragu:{definition:'A richly flavored Italian meat or vegetable sauce, usually simmered and served with pasta.',synonyms:['ragù','Italian meat sauce','pasta sauce']},
 'radon-detector':{synonyms:['radon monitor','radon test device']}
};for(const [id,p] of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
