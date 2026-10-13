(()=>{const u={
  transverter:{definition:'A radio-frequency device that converts a signal from one frequency band to another, often between microwave frequencies and a lower intermediate frequency.',synonyms:['frequency converter']},
  transvestite:{definition:'A dated term for a person who wears clothing traditionally associated with a different gender; it may be offensive when used of others. “Cross-dresser” is generally preferred in neutral current usage.',synonyms:['cross-dresser (preferred current term)']},
  trap:{definition:'A device for catching or holding an animal or person; a difficult situation from which it is hard to escape; or a deceptive trick. As a verb, to catch, confine, or ensnare.',synonyms:['snare','pitfall','ruse','entrap','confine']},
  trapdoor:{definition:'A small hinged or sliding door in a floor or ceiling that provides access to the space below or above; also, a hidden opening or mechanism.',synonyms:['hatch','access panel']},
  trapeze:{definition:'A short horizontal bar suspended by ropes or straps, used by acrobats for swinging and aerial performances.',synonyms:['aerial bar']},
  trapezohedron:{definition:'A polyhedron whose faces are congruent kite-shaped quadrilaterals; a 24-faced trapezohedron has twenty-four such faces.',synonyms:['tetragonal trapezohedron (specific type)']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['transverse-2','transverse-3','transvestite-2','transvestite-3','trap-2','trap-3','trap-4','trap-5','trap-6','trap-7','trap-8','trap-9','trapal','trap-door','trapezery']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
