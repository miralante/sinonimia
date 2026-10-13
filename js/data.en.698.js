(()=>{const u={
  transparent:{definition:'Allowing light to pass through so that objects behind can be seen clearly; easy to understand; or open and honest in actions or communication.',synonyms:['clear','see-through','understandable','open','honest']},
  transplant:{definition:'The surgical transfer of an organ, tissue, or cells from one person or part of the body to another; also, to move a plant or thing to another place. As a verb, to perform such a transfer or move something to a new place.',synonyms:['transplantation','graft','relocate']},
  transponder:{definition:'An electronic device that receives a signal and automatically sends back a response, often identifying the device or providing information.',synonyms:['radio transceiver','identification transmitter']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['transmount','transmute-2','transname','transpadane','transparent-2','transparent-3','transparent-4','transparent-5','transphobia-2','transplant-3','transpoint','transponder-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
