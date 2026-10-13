(()=>{const ids=new Set(['purity-2','purple-2','purple-3','purple-5','purple-6','purple-7','purple-8','purplish-2','purpose-2','purpose-3','purpose-4','purr-2','purrage','purse-2','puru']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 purity:{definition:'The state or degree of being pure, clean, or unmixed; also, moral integrity or chastity in some contexts.',synonyms:['cleanliness','freedom from contamination','integrity','chastity (by context)']},
 purple:{definition:'A color between red and blue; also, a dye or cloth of that color. As an adjective, having this color; figuratively, excessively ornate or vivid.',synonyms:['violet (nearby color)','purplish','royal purple (a historical dye)']},
 purplish:{synonyms:['purple-tinged','somewhat purple','violetish']},
 purpose:{definition:'The reason for which something is done, made, or exists; an aim or intended result. As a verb, to intend or resolve to do something.',synonyms:['aim','intention','objective','reason','resolve (verb)']},
 purr:{definition:'To make a low, continuous, vibrating sound, especially the sound a contented cat makes; also, the sound itself.',synonyms:['rumble softly','trill','cat’s vibrating sound']},
 pursuable:{definition:'Capable of being followed, undertaken, or pursued; in law, capable of being pursued as a claim or action.',synonyms:['achievable','followable','actionable (legal context)']},
 pursuer:{definition:'A person or thing that follows, chases, or seeks to attain someone or something.',synonyms:['chaser','follower','seeker']}
};for(const [id,p] of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
