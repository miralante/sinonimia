(()=>{const ids=new Set(['pumbaa','pumpkin-3','pumpkin-7','pumpkin-8','pumpkin-9','pumpkin-10','pun-2','pun-3','punch-2','punch-4']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 pulpous:{definition:'Soft and pulpy in texture or consistency.',synonyms:['pulpy','soft','mushy']},
 pulque:{definition:'A mildly alcoholic Mexican drink made by fermenting the sap of the agave plant.',synonyms:['fermented agave drink','Mexican pulque']},
 pulqueria:{definition:'A shop or tavern that sells pulque, a traditional fermented agave drink.',synonyms:['pulque tavern','pulque shop']},
 pulsatile:{definition:'Pulsating or beating in a regular rhythm.',synonyms:['pulsating','throbbing','rhythmic']},
 pulsative:{definition:'Relating to a pulse or pulsation; pulsating.',synonyms:['pulsatile','pulsating','rhythmic']},
 pultaceous:{synonyms:['soft and pulpy','mushy','porridge-like']},
 puma:{synonyms:['cougar','mountain lion','panther (regional name)']},
 pumice:{synonyms:['pumice stone','volcanic pumice','porous volcanic rock']},
 pump:{definition:'To move or raise a fluid by means of a pump; to operate a pump; also, to inflate, draw out, or move something in repeated strokes. Slang: to have sex with someone.',synonyms:['draw or raise fluid','operate a pump','inflate','extract','have sex with (vulgar slang)']},
 pumping:{definition:'The act or process of operating a pump or moving a fluid by repeated strokes.',synonyms:['pump operation','fluid transfer','pumping action']},
 pumpkin:{definition:'A large, rounded edible fruit of plants in the genus Cucurbita, usually with orange flesh and a hard rind; also, the plant that bears it.',synonyms:['winter squash (related varieties)','pumpkin fruit','pumpkin plant']},
 'pumpkin-2':{definition:'A patch or field where pumpkins are grown.',synonyms:['pumpkin patch','pumpkin field']},
 'pumpkin-6':{definition:'A small variety of pumpkin.',synonyms:['small pumpkin','miniature pumpkin']},
 pun:{synonyms:['wordplay','play on words','paronomasia']},
 puna:{definition:'A high, cold plateau or grassland region of the central Andes, above the tree line.',synonyms:['Andean high plateau','high-altitude grassland','puna region']},
 punch:{definition:'To strike with the fist; also, a forceful blow, a tool for making holes, or a mixed drink, depending on context.',synonyms:['hit','strike','blow','hole punch','mixed drink']}
};for(const [id,p] of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
