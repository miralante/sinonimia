(()=>{const u={
  triangularly:{definition:'In a triangular shape or manner.',synonyms:['in a triangular form']},
  triathlete:{definition:'An athlete who competes in triathlons.',synonyms:['triathlon competitor','triathlon athlete']},
  triflingly:{definition:'In a trivial or insignificant manner.',synonyms:['trivially','insignificantly']},
  triflorus:{definition:'Having three flowers; three-flowered.',synonyms:['three-flowered']},
  trifurcate:{definition:'To divide or branch into three parts.',synonyms:['divide into three','branch into three']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r)Object.assign(r,p);}
const ids=new Set(['triennial-2','trient','trifle-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
