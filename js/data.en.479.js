(()=>{const ids=new Set(['pulchinella','pull-2','pull-4','pull-7','puller-2','pulper-2','pulpet','pulp-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 puja:{definition:'A Hindu act of worship or ritual offering, usually performed before a deity or sacred image.',synonyms:['Hindu worship','ritual offering','devotional ceremony']},
 pull:{definition:'To exert force on something to draw it toward oneself or in a chosen direction; also, to remove, attract, or make an effort, depending on context.',synonyms:['draw','drag','tug','remove','attract']},
 puller:{definition:'A person or device that pulls; also, a handle designed to be pulled, such as a door pull.',synonyms:['drawer','extractor','pull handle','door pull']},
 pulley:{synonyms:['sheave','block (a pulley assembly)','rope-and-wheel lifting device']},
 pulleys:{definition:'Plural of pulley: wheels with grooved rims over which ropes or chains run.',synonyms:['sheaves','pulley wheels']},
 pulling:{definition:'The act of drawing or exerting force on something; also, an attempt to bargain or haggle.',synonyms:['tugging','drawing','haggling (in bargaining)']},
 'pull-out':{synonyms:['withdraw','leave','withdrawal','extractable section (noun, by context)']},
 'pull-up':{definition:'To lift oneself by the arms until the chin reaches or passes a bar; also, to bring a vehicle to a stop or draw something nearer, depending on context.',synonyms:['chin-up','raise oneself','stop (a vehicle)','draw closer']},
 pulmonary:{synonyms:['lung-related','of the lungs','pulmonic']},
 pulmonate:{definition:'A mollusk, especially a gastropod, that breathes air using a lung-like mantle cavity; also, relating to such mollusks.',synonyms:['air-breathing gastropod','pulmonate mollusk']},
 pulmonologist:{synonyms:['lung specialist','respiratory physician','chest physician']},
 pulmonology:{definition:'The branch of medicine concerned with the lungs and respiratory system.',synonyms:['respiratory medicine','pulmonary medicine']},
 pulp:{definition:'The soft inner part of a fruit or other material; also, to reduce something to pulp or extract its pulp.',synonyms:['soft inner tissue','fruit flesh','mash','crush to pulp']},
 pulper:{definition:'A machine or device that crushes or separates material into pulp.',synonyms:['pulping machine','pulping device']}
};for(const [id,p] of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
