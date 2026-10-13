(()=>{const ids=new Set(['rabilate','raced','raciovitalism','rack-2','rack-3','racket-bag','rabid-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 rabble:{definition:'A disorderly crowd or noisy group of people; also, a contemptuous term for common people.',synonyms:['mob','crowd','rabblement','riffraff']},
 rabid:{definition:'Affected by rabies; also, extremely violent or fanatical in support of a cause.',synonyms:['rabies-infected','furious','fanatical','zealous']},
 rabies:{definition:'A fatal viral disease of the central nervous system, usually transmitted through the bite of an infected animal.',synonyms:['hydrophobia (older term)','lyssavirus infection']},
 rabona:{definition:'Football. A kick in which the kicking leg is crossed behind the supporting leg to strike the ball.',synonyms:['crossed-leg kick','rabona kick']},
 racer:{definition:'A person, animal, or vehicle that competes in races.',synonyms:['racing driver','competitor','racehorse']},
 rack:{definition:'Noun: a frame, stand, or set of shelves for holding or displaying things; also a framework for drying items. Verb: to place on a rack or cause severe strain or anguish.',synonyms:['stand','shelf unit','framework','torment']},
 racker:{definition:'A person or device that racks, transfers, or arranges something on a rack.',synonyms:['rack operator','rack device','organizer']},
 racket:{definition:'Noun: a loud, confused noise; a fraudulent or illegal activity; or a bat used in certain sports. Verb: to make a noisy disturbance or engage in racketeering.',synonyms:['din','commotion','fraudulent scheme','sports racquet']},
 racking:{definition:'The act of placing something on a rack or transferring it from one vessel or position to another; also, severe strain or torment.',synonyms:['rack transfer','racking off','torment']},
 radian:{definition:'The SI unit of plane angle, equal to the angle subtended at a circle’s center by an arc whose length equals the radius.',synonyms:['SI unit of plane angle','angular measure']}
};for(const [id,p] of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
