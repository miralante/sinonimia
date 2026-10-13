(()=>{const u={
  topstitch:{definition:'To sew a line of visible stitches on the right side of a garment or other item, usually near a seam or edge; also, the visible stitching itself.',synonyms:['edge-stitch','decorative stitching']},
  torch:{definition:'A portable light, especially a battery-powered hand light in British English; also, a stick or other object bearing a flame, or to set fire to something.',synonyms:['flashlight (North American)','flaming torch','set fire to']},
  'torch-holder':{definition:'A bracket or stand designed to hold a torch or other portable flame.',synonyms:['torch bracket']},
  torculus:{definition:'A press used for squeezing or printing, especially an ancient screw press.',synonyms:['press','screw press']},
  torment:{definition:'Severe physical or mental suffering; to cause someone great physical or mental suffering.',synonyms:['anguish','agony','torture','distress']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['topstitch-2','topstitch-3','toqui','toquilla','torch-2','torch-3','torculated','tores','toriondo-quality','torment-2','torment-3','torment-4','torment-5','tormenting-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
