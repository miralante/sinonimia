(()=>{const u={
  undocumented:{definition:'Lacking the official documents required for a particular purpose or status.',synonyms:['without documentation','undocumented']},
  undress:{definition:'To remove one’s clothes, or to remove clothing or coverings from another person or thing; also, to strip someone of a title or dignity.',synonyms:['disrobe','unclothe','strip']},
  undressed:{definition:'Not wearing clothes or not fully dressed; also, uncovered or stripped of an outer covering.',synonyms:['naked','unclothed','uncovered']},
  undue:{definition:'Excessive, unwarranted, or inappropriate in the circumstances.',synonyms:['excessive','unwarranted','unjustified']},
  undular:{definition:'Relating to or resembling waves; having a wavy form or motion.',synonyms:['wavelike','undulating','wave-shaped']},
  uneasily:{definition:'In a way that shows anxiety, discomfort, or lack of ease.',synonyms:['anxiously','nervously','uncomfortably']},
  uneasy:{definition:'Anxious, uncomfortable, or lacking a sense of security or calm.',synonyms:['anxious','uneasy','apprehensive']},
  'uneducated':{definition:'Lacking formal education or knowledge; also, lacking refinement or good manners.',synonyms:['unschooled','untrained','ignorant (context-dependent)']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['undoubted-2','undoubtedly-2','undream','undress-2','undress-3','undress-4','undress-6','undress-7','undone','undulating','unearth-2','uneartheddead','uneasy-2','uneat','uneducated-2','uneducated-4']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
