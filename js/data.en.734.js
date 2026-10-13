(()=>{const u={
  unburden:{definition:'To relieve someone or something of a burden; figuratively, to disclose a worry or secret.',synonyms:['relieve','free from a burden','confide']},
  unbutton:{definition:'To undo or open the buttons of a garment or other item; also, to remove buttons.',synonyms:['undo the buttons','open','unfasten']},
  unbuttoned:{definition:'Not fastened with buttons; open or undone.',synonyms:['unfastened','open']},
  unbuzz:{definition:'To stop buzzing or to remove a buzzing sound.',synonyms:['stop buzzing','silence']},
  uncalibrate:{definition:'To undo or reverse a calibration.',synonyms:['reverse calibration','decalibrate']},
  uncalmable:{definition:'Impossible or difficult to calm.',synonyms:['unappeasable','inconsolable']},
  uncanton:{definition:'To withdraw troops from a cantonment or temporary quarters.',synonyms:['withdraw from quarters','decamp']},
  uncenter:{definition:'To move something away from its center or central position.',synonyms:['decenter','displace from the center']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['unbreastfeed','unbrown','unbucking','unbridle-2','uncalculate','uncame','uncane','uncanton-2','uncapping','uncasing','uncast','uncatch','uncausted','uncalming','unbutton-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
