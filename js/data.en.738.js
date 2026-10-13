(()=>{const u={
  uncurtain:{definition:'To remove or draw back a curtain; figuratively, to reveal or inaugurate something.',synonyms:['draw back the curtains','reveal','unveil']},
  uncut:{definition:'Not cut, trimmed, or divided; also, not edited or censored, and in some contexts not circumcised.',synonyms:['whole','unedited','uncensored','uncircumcised (specific context)']},
  undecided:{definition:'Not yet settled or determined; also, uncertain about what choice to make.',synonyms:['unresolved','undetermined','uncertain']},
  undeceive:{definition:'To free someone from a mistaken belief or impression; to make someone aware of the truth.',synonyms:['disabuse','enlighten','correct a misconception']},
  undecorate:{definition:'To remove decorations or ornamentation from something.',synonyms:['strip of decoration','remove ornaments']},
  undelete:{definition:'In computing, to restore a file or other data that was deleted.',synonyms:['restore deleted data','recover a deleted file']},
  undercooked:{definition:'Not cooked enough; insufficiently cooked.',synonyms:['underdone','insufficiently cooked']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['undecagon-2','undaunted-2','undefeated-2','uncut-2','underbring','undemonize']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
