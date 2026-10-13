(()=>{const u={
  trick:{definition:'An act or device intended to deceive, mislead, or amuse; a skillful technique; in card games, a round of play; also, to deceive or outwit someone.',synonyms:['ruse','deception','prank','technique','outwit']},
  trickery:{definition:'The use of tricks or deceit to mislead or gain an advantage.',synonyms:['deception','fraud','craftiness']},
  trickster:{definition:'A person who deceives or plays tricks; in folklore, a character who uses cunning to disrupt or challenge established rules.',synonyms:['deceiver','prankster','cunning character']},
  tricorn:{definition:'Having three horns or corners; also, a three-cornered hat with its brim turned up.',synonyms:['three-cornered','tricorne']},
  tricorne:{definition:'A three-cornered hat with the brim turned up on three sides; also, having three horns or corners.',synonyms:['tricorn hat','three-cornered hat']},
  triduan:{definition:'Lasting three days or occurring over a period of three days.',synonyms:['three-day']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['trick-2','trick-3','trick-5','trick-6','trick-7','trick-8','trick-9','trick-10','trickery-2','trickery-3','trickster-2','trickster-3']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
