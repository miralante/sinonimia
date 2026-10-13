(()=>{const u={
  tinderbox:{definition:'A small box formerly used to keep tinder and tools for making fire; figuratively, a place or situation likely to erupt into conflict.',synonyms:['fire-making kit','volatile situation']},
  tingle:{definition:'To feel or cause a slight prickling or stinging sensation; also, the sensation itself.',synonyms:['prickle','tingle sensation']},
  tinker:{definition:'A person, traditionally a traveling worker, who mends metal utensils; also, to make small adjustments or repairs, often experimentally.',synonyms:['repairer','fiddle with','adjust']},
  tinkerer:{definition:'A person who enjoys making small repairs or experimental adjustments to machines or devices.',synonyms:['amateur repairer','experimenter']},
  tinner:{definition:'A person who works with tin or tinplate, especially one who coats or repairs metal vessels.',synonyms:['tin worker','tinplate worker']},
  tinsel:{definition:'Shiny, thin strips of material used as a bright decoration; also, something showy but of little real value.',synonyms:['glittering decoration','glitz']},
  'tinea':{definition:'A fungal infection of the skin, scalp, or nails; ringworm.',synonyms:['ringworm','dermatophytosis']},
  'tin-plating':{definition:'The process of coating iron, steel, or another material with a thin layer of tin.',synonyms:['tinning','tin coating']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['tincada','tincar','tincazo','tindalo','tinellar','tinker-bell','tinkerer-2','tinner-2','tingling-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
