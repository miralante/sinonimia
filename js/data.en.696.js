(()=>{const u={
  transhumant:{definition:'Moving seasonally from one region or pasture to another, especially of herders and their livestock.',synonyms:['migratory','seasonally nomadic']},
  transit:{definition:'The act or process of passing from one place or state to another; the movement of people or goods through a place; public transportation; also, to pass or travel through or across an area.',synonyms:['passage','movement','transportation','travel through']},
  transition:{definition:'A change or passage from one state, condition, subject, or stage to another; also, the process of making such a change.',synonyms:['changeover','shift','passage']},
  transitivity:{definition:'The quality of being transitive; in grammar, the property of a verb that takes a direct object, and in mathematics, a relation in which aRb and bRc imply aRc.',synonyms:['transitive property']},
  transistor:{definition:'A semiconductor device used to amplify or switch electronic signals and electrical power.',synonyms:['semiconductor device','electronic switch']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['transhumar','transgressor-2','transience-2','transient-2','transit-2','transit-3','transit-4','translatally','translator-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
