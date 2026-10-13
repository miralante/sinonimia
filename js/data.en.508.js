(()=>{const ids=new Set(['ratchet-2','rate-7','rate-8']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 'rasp-3':{definition:'A notched or ridged object that is scraped to produce a rough, rhythmic sound; a simple percussion instrument.',synonyms:['scraper','friction percussion instrument']},
 raspberry:{definition:'A soft, edible red, purple, or black aggregate fruit of a bramble in the genus Rubus.',synonyms:['raspberry fruit','bramble fruit']},
 rataplan:{definition:'A rhythmic sound made by a drum; also, a word used to imitate that sound.',synonyms:['drum roll','tattoo','rat-a-tat']},
 ratchet:{definition:'Having or using a ratchet: a device that permits motion in one direction while preventing motion in the other.',synonyms:['ratcheted','one-way toothed mechanism']},
 ratcheting:{definition:'The action of moving or advancing in small increments with a ratchet; also, the sound or operation of a ratchet.',synonyms:['incremental movement','ratchet action']},
 'rate-2':{definition:'A schedule or list of prices, charges, duties, or taxes.',synonyms:['price list','schedule of charges','tariff']},
 'rate-3':{definition:'To divide or assign an amount proportionally among several people or things.',synonyms:['apportion','allocate proportionally']},
 'rate-4':{definition:'A proportional distribution or allocation of an amount among several people or things.',synonyms:['apportionment','proportional allocation']},
 'rate-5':{definition:'To set or specify the rate, price, or charge that applies.',synonyms:['set a rate','price']},
 'rate-6':{definition:'To set or apply a rate, price, or tax.',synonyms:['set a price','apply a rate']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
