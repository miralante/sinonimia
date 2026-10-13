(()=>{const ids=new Set(['raise-awareness-3','raised','raised-2','raise-it','rajon','rake-2','rake-5','rake-7','ram-3','ramble-2','gossip-17','ramie-populated-site','ramp-2','ramp-3','rampage']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 'raise-awareness':{definition:'To increase public knowledge or understanding of an issue.',synonyms:['promote awareness','inform the public','bring attention to']},
 raisin:{definition:'A grape that has been dried, either naturally or by processing.',synonyms:['dried grape','sultana (a type)']},
 raja:{definition:'A long, shallow cut or groove made with a sharp object.',synonyms:['slash','gash','incision']},
 rake:{definition:'Noun: a long-handled tool with a row of teeth, used to gather leaves or level soil; also, an old-fashioned term for an immoral man. Verb: to gather, smooth, or search through with a rake; or to move across something with a scraping motion.',synonyms:['garden rake','leaf rake','gather','scrape']},
 'rake-6':{definition:'To gather hay or cut grass into rows with a rake.',synonyms:['rake hay','windrow','gather with a rake']},
 'rake-8':{definition:'Nautical, historical. To search a wreck or seabed for salvage.',synonyms:['salvage from a wreck','search a wreck']},
 rally:{definition:'Noun: a large public meeting, a motor race over a route, or a recovery in sports or markets. Verb: to gather for a common purpose, recover strength, or bring people together.',synonyms:['demonstration','motor race','recover','assemble']},
 ram:{word:'ram',definition:'Noun: a male sheep; a device used for battering or driving something; or, in computing, random-access memory (RAM). Verb: to strike, drive, or force something with great force.',synonyms:['male sheep','battering ram','random-access memory','crash into']},
 ramada:{definition:'A simple open-sided shelter, especially in the American Southwest, made with a roof of branches or other material for shade.',synonyms:['shade shelter','open-sided shelter','arbor']},
 rambling:{definition:'Wandering without a fixed route; or, speaking or writing at length in an unfocused, disorganized way.',synonyms:['meandering','wandering','incoherent','disjointed']},
 ramie:{definition:'A tall Asian plant (Boehmeria nivea) whose strong bast fiber is used to make textiles.',synonyms:['Boehmeria nivea','China grass','ramie fiber']},
 rammer:{definition:'A person or tool used to drive, compact, or force something into place.',synonyms:['compactor','tamper','driver']},
 ramnaceous:{definition:'Botany. Of or relating to the buckthorn family, Rhamnaceae.',synonyms:['Rhamnaceae','buckthorn-family']},
 ramonian:{definition:'Of or relating to the Spanish writer Ramón Gómez de la Serna or his literary style.',synonyms:['Gómez de la Serna-related','Ramonian']},
 ramp:{definition:'A sloping surface connecting different levels; also, a verb meaning to increase or move up a ramp.',synonyms:['access ramp','inclined plane','increase rapidly']},
 'ramp-4':{definition:'To move up or over a ramp or sloping surface; also, to increase rapidly in the phrase “ramp up.”',synonyms:['climb','move up a slope','increase rapidly']}
};for(const [id,p] of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
