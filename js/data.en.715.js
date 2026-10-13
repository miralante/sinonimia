(()=>{const u={
  truffle:{definition:'A highly prized edible underground fungus; as a verb, to search for truffles.',synonyms:['fungus','search for truffles']},
  truffler:{definition:'A person or animal that searches for truffles.',synonyms:['truffle hunter','forager']},
  truism:{definition:'A statement so obviously true or familiar that it may add little new information.',synonyms:['platitude','obvious truth','self-evident statement']},
  trumpet:{definition:'A brass wind instrument with a mouthpiece and flared bell; also, to play it or proclaim something loudly.',synonyms:['brass instrument','blare','proclaim']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['trucked','true-2','true-3','true-top-quality-diamond','truism-2','truism-3','truly-2','truly-3','trump-2','trumpet-2','trumpet-3','trumpet-4','trumpet-5','trumpet-6']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
