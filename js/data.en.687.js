(()=>{const u={
  tour:{definition:'A journey or excursion, especially one made through several places; also, to travel around or visit places in sequence.',synonyms:['trip','excursion','journey','travel around']},
  tow:{definition:'Coarse fiber of flax, hemp, or jute; also, to pull or haul a vehicle, vessel, or other object behind another.',synonyms:['coarse fiber','haul','pull']},
  towel:{definition:'A piece of absorbent cloth or paper used for drying the body, hands, dishes, or other surfaces.',synonyms:['drying cloth','bath towel','dish towel']},
  tower:{definition:'A tall, narrow structure, often part of a building; also, to rise or extend high above the surroundings.',synonyms:['high structure','spire','rise high']},
  town:{definition:'A populated place that is usually larger than a village and smaller than a city, though the legal meaning and size vary by country.',synonyms:['small urban settlement','municipality']},
  'townhouse':{definition:'A house that forms one of a row or group of attached houses, usually sharing side walls.',synonyms:['row house','terraced house']},
  toupee:{definition:'A small wig or hairpiece worn to cover a bald area; formerly, a lock of hair arranged in a topknot.',synonyms:['hairpiece','small wig']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['toupee-2','toupee-3','tour-2','tour-3','tousle-2','tow-2','tow-3','towel-2','towel-3','townhouse-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
