(()=>{const u={
  trash:{definition:'Discarded or worthless material; something of very poor quality. As a verb, to damage a place, throw something away, or criticize something harshly.',synonyms:['rubbish','garbage','junk','vilify','damage']},
  trashing:{definition:'The act of damaging or wrecking something, or of criticizing it harshly.',synonyms:['vandalism','destruction','harsh criticism']},
  trauma:{definition:'A serious physical injury or a deeply distressing experience that can have lasting psychological effects; also, the resulting physical or psychological harm.',synonyms:['injury','psychological distress','emotional shock']},
  traumatic:{definition:'Causing or relating to physical injury or severe psychological distress.',synonyms:['distressing','injurious','traumatizing']},
  traumatizing:{definition:'Causing severe emotional distress or psychological trauma.',synonyms:['distressing','traumatic']},
  traumatologist:{definition:'A physician who specializes in the diagnosis and treatment of traumatic injuries.',synonyms:['trauma physician','trauma specialist']},
  travel:{definition:'To go from one place to another, especially over a distance; a journey or journeys from place to place; also, the movement of a part or object through space.',synonyms:['journey','trip','voyage','go from place to place']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['trasher','trashy-2','trasmediterranean','traspirenaic','trasunt','trature','trauma-2','trauma-3','traumatized-2','travel-2','travel-3','traveled']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
