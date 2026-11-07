(()=>{const u={
  unfailing:{definition:'Reliable, constant, or not likely to fail; also, certain to occur.',synonyms:['reliable','constant','unfaltering']},
  
  unfigurable:{definition:'Difficult or impossible to represent in a figure, image, or concrete form.',synonyms:['unrepresentable','unimageable']},
  unfindable:{definition:'Impossible or very difficult to find.',synonyms:['undiscoverable','unlocatable']},
  unflood:{definition:'To remove floodwater from an area; to drain a flooded place.',synonyms:['drain','clear of floodwater']},
  unfold:{definition:'To open or spread something that was folded; figuratively, to develop or become known gradually.',synonyms:['open out','spread out','unroll','develop']},
  
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);if(r)if(r)delete r.translation;}}
const ids=new Set(['unfailingly-2','unfindable-2','unfindable-3','unfold-2','unfailing-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
