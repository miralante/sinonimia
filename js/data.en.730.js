(()=>{const u={
  ugliness:{definition:'The quality or state of being unpleasant or unattractive in appearance; also, something that is ugly.',synonyms:['unattractiveness','unsightliness','hideousness']},
  ugly:{definition:'Unpleasant or unattractive in appearance; also, morally objectionable, unpleasant, or badly made, depending on context.',synonyms:['unattractive','unsightly','hideous','unpleasant']},
  ulcer:{definition:'An open sore or area of tissue breakdown on the skin or on the lining of an organ, such as the stomach or intestine.',synonyms:['open sore','lesion','ulceration']},
  ulcerate:{definition:'To develop an ulcer; or, to cause an ulcer to form.',synonyms:['become ulcerated','form an ulcer']},
  ulcerative:{definition:'Causing or characterized by the formation of ulcers.',synonyms:['ulcer-forming','ulcerous']},
  ulnar:{definition:'Relating to the ulna, the forearm bone on the side opposite the thumb.',synonyms:['of the ulna','ulna-related']},
  ultra:{definition:'Extremely radical or uncompromising; also, a person who holds extreme views, especially in politics or sport.',synonyms:['extremist','radical','hard-liner']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['ugliness-2','ugly-2','ugly-3','ugly-4','ulcer-2','ukrainian-2','ultralight-2','ultramarine-2','ultraports']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
