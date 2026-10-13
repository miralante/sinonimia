(()=>{const u={
  uncia:{definition:'An ancient Roman unit equal to one twelfth of a libra, roughly 27 grams; also, a small fractional unit in other historical systems.',synonyms:['Roman ounce','one-twelfth of a libra']},
  uncial:{definition:'Relating to a style of handwriting used especially in ancient manuscripts, consisting mainly of large, rounded capital letters.',synonyms:['uncial script','rounded majuscule']},
  unclog:{definition:'To clear or remove an obstruction from a pipe, passage, drain, or other system.',synonyms:['unblock','clear','unstop']},
  unclip:{definition:'To release or remove a clip fastening something.',synonyms:['unfasten','release','detach']},
  'uncertainty':{definition:'The state of being unsure or not fully informed; also, an unknown or variable factor.',synonyms:['doubt','unpredictability','indeterminacy']},
  'uncircumscribed':{definition:'Not limited, bounded, or enclosed within a particular perimeter or restriction.',synonyms:['unbounded','unrestricted','unlimited']},
  'uncivil':{definition:'Rude or discourteous; lacking politeness.',synonyms:['impolite','rude','discourteous']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['uncertainty-2','uncertainty-3','uncertainty-4','unchabar','unchap','uncharging','unchild','uncircumscribed-2','uncivil-2','unclean-2','unclip-2','unclog-2','unclog-3','unclog-4','unclog-5','unclog-6']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
