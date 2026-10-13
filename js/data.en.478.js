(()=>{const ids=new Set(['puff-8','puffins','puff-pastry-3','puff-pastry-4']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 publishable:{synonyms:['fit to publish','suitable for publication','publication-ready']},
 publishing:{definition:'The industry or activity of preparing and distributing books, periodicals, and other works in print or digital form.',synonyms:['publication industry','book publishing','publishing trade']},
 pucara:{definition:'A fortified settlement or stronghold built by Indigenous peoples of the Andes, often at a strategically important location.',synonyms:['Andean fort','pukara','hill fort']},
 puchinella:{definition:'Variant spelling of Pulcinella or Punchinello, a stock comic character in Italian and European puppet theatre.',synonyms:['Pulcinella','Punchinello','puppet character']},
 puchito:{definition:'Diminutive of pucho; a small cigarette or, regionally, a small amount or fragment.',synonyms:['small cigarette','little bit','small fragment']},
 pudding:{definition:'A sweet or savory dish whose meaning varies by region; in Britain it can refer broadly to a cooked dessert or dish, while in North America it often means a soft, spoonable dessert.',synonyms:['dessert (by context)','sweet dish','pudding dessert']},
 'pudding-bowl':{definition:'A bowl or basin used to cook or serve pudding.',synonyms:['pudding basin','pudding dish']},
 puddle:{synonyms:['small pool','shallow pool of water','pool']},
 puddler:{definition:'A worker who stirred molten iron in a furnace during the historical puddling process to remove impurities and produce wrought iron.',synonyms:['iron puddler','puddling-furnace worker']},
 puerperal:{definition:'Relating to the period after childbirth, especially the weeks in which the body recovers from pregnancy and birth.',synonyms:['postpartum','after childbirth']},
 'puerto-ricanism':{definition:'A word, expression, or usage characteristic of Spanish as spoken in Puerto Rico.',synonyms:['Puerto Rican Spanish usage','Puerto Rican expression','puertorriqueñismo']},
 puff:{definition:'A short burst of air, breath, smoke, or vapor; also, to blow or breathe in short bursts, swell, or become rounded.',synonyms:['burst','breath','blow','billow','swelling']},
 'puff-pastry-2':{definition:'Made with puff pastry, a laminated dough that rises into light, flaky layers when baked.',synonyms:['made of puff pastry','flaky-pastry']}
};for(const [id,p] of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
