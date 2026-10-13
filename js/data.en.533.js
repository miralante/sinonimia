(()=>{const ids=new Set(['redeem-2','redeem-3','redeem-4','redeem-5','redeemable-2','redeemer-2','redhead-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 redeem:{definition:'To exchange a voucher, points, or security for money or goods; to recover something pledged; to rescue or free someone, especially by payment; to fulfill a promise; or to compensate for a fault.',synonyms:['exchange','repay','recover','rescue','fulfill','make amends']},
 redeemable:{definition:'Able to be exchanged, recovered, or converted into money or goods; also, capable of being saved or improved.',synonyms:['exchangeable','convertible','recoverable','salvageable']},
 redeemer:{definition:'A person who redeems, rescues, or saves someone or something; in Christianity, a title for Jesus Christ.',synonyms:['rescuer','savior','deliverer']},
 'red-handed':{definition:'Caught in the act of committing a crime or other wrongdoing.',synonyms:['caught in the act','caught committing a crime']},
 redhead:{definition:'A person or animal with red or reddish hair; also, a North American diving duck of the genus Aythya.',synonyms:['red-haired person','ginger','redhead duck']},
 redheaded:{definition:'Having red or reddish hair.',synonyms:['red-haired','ginger-haired']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
