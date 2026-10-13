(()=>{const u={
  touch:{definition:'To come into contact with something; to handle or feel; to affect or move emotionally; to reach or be near a point; also, the sense of physical contact or a slight mark or amount.',synonyms:['contact','feel','handle','affect','reach']},
  tote:{definition:'To carry or transport something, often with some effort; also, a large bag used for carrying items.',synonyms:['carry','lug','tote bag']},
  totemic:{definition:'Relating to a totem or totemism.',synonyms:['totem-related']},
  totipotent:{definition:'Having the capacity to develop into any cell type and, under suitable conditions, to form a complete organism.',synonyms:['developmentally unrestricted']},
  touchscreen:{definition:'A display that detects touch input and lets a user control a device by touching the screen.',synonyms:['touch-sensitive screen']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['totonaco','touch-2','touch-3','touch-4','touch-5','touched','touched-2','touch-screen','touch-screen-2','touch-with-feet']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
