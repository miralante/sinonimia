(()=>{const u={
  timbrologist:{definition:'A person who studies or collects postage stamps; a philatelist.',synonyms:['philatelist','stamp collector']},
  timbrophile:{definition:'A person who is enthusiastic about postage stamps and stamp collecting.',synonyms:['philatelist','stamp enthusiast']},
  timbrophilia:{definition:'An interest in or enthusiasm for postage stamps and stamp collecting.',synonyms:['philately','stamp collecting']},
  timothy:{definition:'A tall grass, Phleum pratense, widely grown for hay and pasture.',synonyms:['timothy grass','meadow cat’s-tail']},
  timeshare:{definition:'A property, usually a holiday accommodation, whose use is divided among several owners or members for specified periods.',synonyms:['shared holiday ownership']},
  timidly:{definition:'In a shy, hesitant, or fearful manner.',synonyms:['shyly','hesitantly','fearfully']},
  'timer-3':{definition:'A person or device that measures or records time.',synonyms:['timekeeper']},
  'tin-2':{definition:'To coat or plate with tin.',synonyms:['tin-plate']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['timeless-2','timeless-3','time-and-time-again','time-to-water-plants','time-zone-2','timid-2','timid-3','timple','tina','tinada','tinaja']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
