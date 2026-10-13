(()=>{const u={
  unapply:{definition:'In computing, to undo an apply operation or remove something that was previously applied.',synonyms:['undo an application','remove an applied setting']},
  unanalyzable:{definition:'Not capable of being analyzed or broken down into component parts.',synonyms:['uninterpretable','indivisible (in some contexts)']},
  unanimous:{definition:'Agreed to or shared by everyone in a group; having no dissent.',synonyms:['in agreement','of one mind','unopposed']},
  unappealable:{definition:'Not subject to appeal; final and unable to be challenged through an appeal.',synonyms:['final','not subject to appeal']},
  unappetizing:{definition:'Not appealing or stimulating the appetite, especially because of its appearance, smell, or taste.',synonyms:['unpalatable','uninviting','unappetizing-looking']},
  unapprehensive:{definition:'Not apprehensive; not fearful or anxious about what may happen.',synonyms:['unafraid','unconcerned','calm']},
  unavoidable:{definition:'Impossible to prevent or avoid; certain to happen or be encountered.',synonyms:['inevitable','inescapable','unpreventable']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['unapply-2','unauthorized-2','unavoidable-2','unback','unbake','unbake-2','unbalance-2','unbalance-3','unbearable-2','unbearable-3','unbearable-4']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
