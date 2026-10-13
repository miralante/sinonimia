(()=>{const u={
  traverse:{definition:'To cross, pass through, or move across an area or obstacle; also, a route or movement across something, or a crosspiece in a structure.',synonyms:['cross','pass over','crossing','crosspiece']},
  trawler:{definition:'A fishing vessel that catches fish by towing a trawl net through the water.',synonyms:['trawling vessel','fishing trawler']},
  treasure:{definition:'A valuable collection of money, jewels, or other possessions; a person or thing greatly valued. As a verb, to keep or regard something as precious.',synonyms:['valuables','wealth','cherish','prize']},
  treasurer:{definition:'A person responsible for managing the money and financial records of an organization or public body.',synonyms:['financial officer','finance officer']},
  treasury:{definition:'A government department responsible for public finances; also, the funds or valuables held by a government or organization, or a place where valuables are kept.',synonyms:['finance ministry','public funds','exchequer','storehouse']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['traverse-2','traverse-3','traverse-4','traverse-5','trawl-2','trawler-2','trawler-3','tray-2','treacherous-2','treacherous-3','treacherous-4','treacherously-2','treasury-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
