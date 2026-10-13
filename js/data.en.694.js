(()=>{const u={
  transcriber:{definition:'A person or device that transcribes speech, notes, or other material into written or recorded form.',synonyms:['transcriptionist','stenographer (in some contexts)']},
  transept:{definition:'The part of a church that crosses the main body at a right angle, giving the building a cruciform plan.',synonyms:['cross aisle']},
  transfer:{definition:'The act or process of moving someone or something from one place, person, account, or system to another; also, to move or convey something in this way.',synonyms:['move','convey','relocate','reassign','remit']},
  transferable:{definition:'Able to be moved, assigned, or conveyed from one person, place, or system to another.',synonyms:['transmissible','assignable','portable']},
  transference:{definition:'The act or process of transferring something from one person, place, or situation to another.',synonyms:['transfer','conveyance','relocation']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['transfer-2','transfer-3','transfer-4','transfer-5','transfer-7','transfer-8','transfer-9','transfer-10','transfer-11','transfer-12','transfer-14','transfer-15','transfer-16','transfer-17','transfer-18','transferable-2','transferally']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
