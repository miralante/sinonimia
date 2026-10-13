(()=>{const u={
  'two-hundred':{definition:'The cardinal number 200, equivalent to twenty tens.',synonyms:['200','two hundred']},
  'two-seater':{definition:'A vehicle, aircraft, or other item designed for two people.',synonyms:['two-person vehicle','two-seat vehicle']},
  type:{definition:'A kind, class, or category of people or things with shared features; a person or thing with characteristic qualities; printed characters or their design. As a verb, to write or enter text using a keyboard or typewriter.',synonyms:['kind','sort','category','class','variety','write','key in']},
  typeable:{definition:'Capable of being typed on a keyboard; also, capable of being classified as a type.',synonyms:['typable','classifiable']},
  tyndalize:{definition:'To sterilize a substance by repeated heating at a moderate temperature, with intervals that allow surviving spores to germinate before later heating.',synonyms:['tyndallize','sterilize by intermittent heating']},
  typhaceous:{definition:'Relating to typhus or resembling the symptoms of typhus.',synonyms:['typhus-related']},
  typhlology:{definition:'The branch of knowledge concerned with blindness and the care of blind people.',synonyms:['study of blindness','science of blindness']},
  typhlotechnology:{definition:'The study and use of technology that supports people who are blind or have low vision.',synonyms:['assistive technology for visual impairment','technology for blind people']},
  typing:{definition:'The act or skill of entering text by means of a keyboard or typewriter; also, relating to that activity.',synonyms:['keyboarding','keying']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['type-2','type-3','type-4','typecast-2','typing-3','typho']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
