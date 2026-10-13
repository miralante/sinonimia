(()=>{const u={
  tinsmith:{definition:'A person who makes, repairs, or works with tinware and thin sheet metal.',synonyms:['tin worker','metalworker']},
  tiredness:{definition:'The state of feeling tired or in need of rest.',synonyms:['fatigue','weariness','exhaustion']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['tinted-2','tiny-3','tip-2','tipunter','tired-5','tired-7','tirer']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
