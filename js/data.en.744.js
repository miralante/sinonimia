(()=>{const u={
  unfriend:{definition:'To remove someone from one’s list of friends on a social networking service; more broadly, to end a friendship.',synonyms:['remove from friends list','unfriend someone']},
  unfriendly:{definition:'Not friendly or welcoming; hostile, cold, or lacking kindness.',synonyms:['hostile','unkind','unwelcoming']},
  unfurl:{definition:'To unroll, open, or spread out something that was rolled or folded, especially a flag or sail.',synonyms:['unroll','unfold','open out','spread']},
  ungainliness:{definition:'The quality of being awkward or clumsy in movement or appearance; lack of grace.',synonyms:['awkwardness','clumsiness','lack of grace']},
  ungainly:{definition:'Awkward or clumsy in movement or appearance; lacking grace.',synonyms:['clumsy','awkward','inelegant']},
  ungodly:{definition:'Contrary to religious principles or morality; also, informal, extremely great or excessive.',synonyms:['wicked','impious','excessive (informal)']},
  ungraspable:{definition:'Impossible or difficult to grasp physically or to understand mentally.',synonyms:['incomprehensible','intangible','elusive']},
  unflock:{definition:'Rare or historical: to disperse or separate from a flock or group.',synonyms:['disperse','scatter','separate from the flock']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['unforgiving-2','unfortunately-2','unfortunately-3','unfortunately-4','unfortunately-5','unfucking','unfurl-2','unfurl-3','unfurl-4','ungainly-2','ungainly-3','unglue-2','ungraspable-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
