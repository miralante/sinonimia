(()=>{const u={
  trampoline:{definition:'A strong fabric stretched over a frame with springs or elastic supports, used for jumping and acrobatic exercise.',synonyms:['rebound bed','jumping bed']},
  tranquilizing:{definition:'Causing someone or something to become calm; also, the act of reducing agitation.',synonyms:['calming','soothing']},
  transantier:{definition:'On the day before the day before yesterday; three days ago.',synonyms:['three days ago']},
  transatlantic:{definition:'Crossing, extending across, or relating to the Atlantic Ocean.',synonyms:['across the Atlantic','Atlantic-crossing']},
  transcend:{definition:'To go beyond the limits or range of something; to surpass or exceed; in philosophy, to exist beyond ordinary experience.',synonyms:['surpass','exceed','rise above']},
  transcendental:{definition:'Beyond the limits of ordinary experience or understanding; also, relating to transcendental philosophy.',synonyms:['transcendent','supersensible']},
  transcendentalism:{definition:'A philosophical and literary movement that emphasizes intuition, individual experience, and the spiritual unity of nature and humanity.',synonyms:['transcendental philosophy']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['transaltar','transbending','transcadera','transcantonada','transcend-2','transcribe-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
