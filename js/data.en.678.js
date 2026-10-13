(()=>{const u={
  tole:{definition:'Decorative objects or artwork made from painted, lacquered, or enameled sheet metal; also, the metal used for such work.',synonyms:['painted tinware','enameled metalwork']},
  tokamak:{definition:'A device that uses powerful magnetic fields to confine hot plasma in a doughnut-shaped chamber, chiefly for research into controlled nuclear fusion.',synonyms:['magnetic-confinement fusion device']},
  tolerability:{definition:'The quality or degree of being bearable or acceptable.',synonyms:['bearableness','acceptability']},
  tolerate:{definition:'To allow or endure something disliked or unpleasant; to withstand a condition or substance; also, to charge or ring a bell (archaic).',synonyms:['endure','put up with','withstand','permit']},
  toll:{definition:'A fee for using a road, bridge, or route; the number of people killed or affected by an event; also, the sound of a bell or the act of sounding one.',synonyms:['road fee','charge','casualty count','bell chime']},
  toller:{definition:'A person who collects a toll; also, something that tolls or rings a bell.',synonyms:['toll collector','bell ringer']},
  toluene:{definition:'A colorless, flammable aromatic hydrocarbon (C₇H₈) used as an industrial solvent and in chemical manufacture.',synonyms:['methylbenzene']},
  tomatillo:{definition:'A small round fruit of the plant Physalis philadelphica, enclosed in a papery husk and used in Mexican cooking.',synonyms:['Mexican husk tomato','husk tomato']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['tojosite','tola','tolu','tolerate-2','toll-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
