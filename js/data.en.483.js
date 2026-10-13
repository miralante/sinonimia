(()=>{const ids=new Set(['puppet-3','puppet-4','puppet-condition-or-character','puppeteered','puppy-2','puppy-3','puppy-4','puquio','purchase-2','purchased-2','purifier-2','purifier-3']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 puppet:{definition:'A model of a person or animal moved by strings, rods, a hand, or another mechanism; figuratively, a person or government controlled by another.',synonyms:['marionette','hand puppet','controlled figure','figurehead']},
 puppeteer:{definition:'A person who operates or manipulates puppets in a performance.',synonyms:['puppet operator','puppet performer','puppeteer']},
 puppy:{definition:'A young dog; more broadly, a young animal of certain mammals.',synonyms:['pup','young dog','whelp (dated)']},
 purchase:{definition:'The act or process of buying something; something bought; also, to obtain or acquire something by paying for it.',synonyms:['buying','acquisition','purchase (the item bought)']},
 'purchase-and-sale':{definition:'A transaction or agreement involving the transfer of property or goods from a seller to a buyer in exchange for payment.',synonyms:['sale and purchase','buying and selling','sales transaction']},
 'purchase-and-sale-contract':{definition:'A contract setting out the terms on which a seller agrees to transfer property or goods to a buyer for payment.',synonyms:['sale and purchase agreement','purchase agreement','sales contract']},
 purchaser:{synonyms:['buyer','customer','acquirer']},
 puree:{definition:'To reduce food to a smooth, thick paste; also, a smooth preparation made this way.',synonyms:['mash','blend until smooth','purée']},
 purgative:{definition:'Having the effect of clearing the bowels; also, a substance used to produce that effect.',synonyms:['laxative','cathartic','bowel-clearing']},
 'purification-plant':{definition:'A facility or system that treats water or another substance to remove impurities.',synonyms:['water treatment plant','purifying facility','treatment works']},
 purifier:{definition:'A person, device, or substance that removes impurities or contaminants.',synonyms:['filter','purifying device','cleanser']},
 purify:{definition:'To remove impurities or contaminants from something; also, to make something morally or symbolically pure.',synonyms:['cleanse','refine','filter','purge']},
 purifying:{definition:'Removing impurities or contaminants; serving to purify.',synonyms:['cleansing','purifying agent','filtering']}
};for(const [id,p] of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
