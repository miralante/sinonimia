(()=>{const u={
  trellis:{definition:'A framework of latticework or open supports, usually used for climbing plants; also, the leafy canopy formed over such a frame.',synonyms:['plant support','lattice','arbor']},
  trematode:{definition:'A parasitic flatworm of the class Trematoda, many species of which live in the bodies of vertebrate or invertebrate hosts.',synonyms:['fluke','parasitic flatworm']},
  tremble:{definition:'To shake involuntarily, as from fear or cold; to vibrate or move with a quivering motion; also, a slight shaking movement.',synonyms:['quiver','shiver','shake','vibration']},
  trembling:{definition:'A shaking or quivering movement, often involuntary; also, shaking or quivering.',synonyms:['quiver','shaking','tremor']},
  tremendous:{definition:'Very great in size, amount, degree, or intensity; also, inspiring awe or admiration.',synonyms:['immense','enormous','remarkable','extraordinary']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['trellis-3','trellis-6','trellis-7','trellis-8','trellis-9','tremble-2','tremble-3','tremble-4','tremble-5','tremble-6','trembling-2','trembling-3','trembling-4','trembling-5','trembling-6','trembling-7','tremendism','tremendous-2','tremendous-3']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
