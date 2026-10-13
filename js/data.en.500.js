(()=>{const ids=new Set(['railera','railing-2','railway-2','rain-2','raincoat-2','raincoat-3','rainy-2','rainy-3','rainy-4','rainy-5','raise-2','raise-3','raise-4','raise-5','raise-6']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 rail:{definition:'A bar or series of bars used as a barrier, support, or guide; also, a railway track or a slender marsh bird of the family Rallidae.',synonyms:['barrier','bar','handrail','railway track','rail bird']},
 'rail-2':{definition:'A marsh bird of the family Rallidae, typically with a laterally compressed body and long toes.',synonyms:['water rail','marsh bird','Rallidae']},
 railing:{definition:'Noun: a barrier or framework of rails. Verb: criticizing or complaining forcefully, usually with “against” or “about.”',synonyms:['balustrade','guardrail','denouncing','complaining']},
 railroad:{definition:'A railway system or track; chiefly North American. As a verb, to force someone through a process unfairly or hastily.',synonyms:['railway','railroad track','rail system','force through']},
 railway:{definition:'A system of tracks and trains used to transport passengers or goods; in British English, also the track or line itself.',synonyms:['railroad','rail system','rail line']},
 railwaybus:{definition:'A light rail vehicle, often powered by an internal-combustion engine, used for passenger service on railway lines.',synonyms:['railbus','light railcar']},
 railwayman:{definition:'A person who works for or on a railway.',synonyms:['railway worker','railman','railroad worker']},
 rain:{definition:'Noun: water falling from clouds in drops. Verb: to fall as rain or to send down in a shower or stream.',synonyms:['rainfall','precipitation','shower']},
 rainbow:{synonyms:['coloured arc in the sky','spectrum of colours','bow']},
 raincoat:{definition:'A waterproof or water-resistant coat worn to keep rain off the body and clothing.',synonyms:['rain jacket','waterproof coat']},
 rainfall:{definition:'The amount of rain that falls in a place over a given period.',synonyms:['precipitation','rain amount']},
 rainforest:{definition:'A forest receiving abundant rainfall; tropical rainforests occur in warm regions, while temperate rainforests occur in cooler climates.',synonyms:['rain forest','tropical rainforest (one type)','high-rainfall forest']},
 'rain-gauge':{definition:'An instrument that collects and measures the amount of rainfall over a period.',synonyms:['rain gauge','pluviometer']},
 'rain-heavily':{definition:'To rain in large amounts or with great intensity.',synonyms:['pour down','rain hard','bucket down']},
 'rain-shower':{definition:'A brief period of rain, sometimes heavy.',synonyms:['shower','brief spell of rain']},
 rainwater:{definition:'Water that has fallen as rain, especially when collected for use.',synonyms:['collected rain','rain-derived water']},
 rainy:{definition:'Characterized by or receiving a considerable amount of rain.',synonyms:['wet','showery','rain-filled']},
 raise:{definition:'Verb: to lift or move something upward; to increase an amount; to bring up a child; to collect funds; or to bring up a topic. Noun: an increase in pay, chiefly North American.',synonyms:['lift','elevate','increase','bring up','pay increase']}
};for(const [id,p] of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
