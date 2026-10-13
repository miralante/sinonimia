(()=>{const u={
  tremor:{definition:'An involuntary, rhythmic shaking movement of part of the body; also, a slight vibration or shaking of the ground.',synonyms:['shaking','quivering','vibration','earth tremor']},
  tremulous:{definition:'Marked by trembling or slight shaking; also, nervous, timid, or wavering in manner or sound.',synonyms:['shaky','quivering','wavering','timid']},
  trend:{definition:'A general direction or pattern of change or development; also, something currently popular. As a verb, to develop or move in a particular direction.',synonyms:['tendency','pattern','direction','fashion','develop toward']},
  trench:{definition:'A long, narrow excavation in the ground, especially for drainage, military protection, or construction; also, a deep, narrow depression on the ocean floor.',synonyms:['ditch','excavation','cut','oceanic trench']},
  trespass:{definition:'To enter or remain on another person’s property without permission; also, to violate a law, rule, or moral boundary.',synonyms:['intrude','encroach','violate','unlawful entry']},
  treponema:{definition:'A genus of spiral-shaped bacteria, some species of which are parasitic or pathogenic, including the bacterium that causes syphilis.',synonyms:['spirochete genus']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['tremis','tremoline','tremor-2','tremorin','tremulous-2','tremulous-3','trench-2','trench-4','trench-coat','trespasser-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
