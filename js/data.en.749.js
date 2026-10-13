(()=>{const u={
  unknotting:{definition:'The act or process of untying a knot; also, the present participle of unknot.',synonyms:['untying','disentangling','undoing a knot']},
  unleash:{definition:'To release, let loose, or allow something powerful or restrained to act freely.',synonyms:['release','let loose','set free']},
  unlearned:{definition:'Lacking formal education or knowledge; unschooled.',synonyms:['uneducated','unschooled','uninstructed']},
  unleashed:{definition:'Released from restraint or control; allowed to act freely.',synonyms:['released','unrestrained','let loose']},
  'unleashed-2':{definition:'In an uncontrolled or unrestricted manner.',synonyms:['unrestrainedly','freely','without restraint']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}const ids=new Set(['unkempt-2','unlearn-2','unknown-4','unknown-5']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
