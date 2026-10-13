(()=>{const u={
  't-shirt':{definition:'A lightweight, usually short-sleeved shirt with a round neckline and no collar.',synonyms:['tee','tee shirt']},
  truthfulness:{definition:'The quality of being truthful, honest, and accurate.',synonyms:['honesty','veracity','accuracy']},
  try:{definition:'Verb: to attempt or make an effort to do something. Noun: an attempt or trial; in rugby, a score made by grounding the ball in the opponent’s in-goal area.',synonyms:['attempt','endeavor','test','trial']},
  tuatua:{definition:'A New Zealand edible surf clam, Paphies subtriangulata, found on sandy beaches.',synonyms:['surf clam','New Zealand clam']},
  tuberculin:{definition:'A protein extract from Mycobacterium tuberculosis used in skin tests to detect immune response to tuberculosis infection.',synonyms:['tuberculin extract','PPD (in testing)']},
  tuberculosis:{definition:'An infectious disease caused by Mycobacterium tuberculosis, usually affecting the lungs but sometimes other parts of the body.',synonyms:['TB','consumption (historical)']},
  tuberosity:{definition:'A rounded projection or prominence on a bone, usually serving as an attachment site for muscles or ligaments.',synonyms:['bony prominence','tubercle']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['try-about-you','try-it','trypon','tuban']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
