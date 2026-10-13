(()=>{const u={
  tripery:{definition:'A shop or stall where tripe is sold.',synonyms:['tripe shop','offal shop']},
  triple:{definition:'Adjective: threefold or consisting of three parts. Verb: to make or become three times as great.',synonyms:['threefold','three-part','multiply by three']},
  'trip-over':{definition:'To stumble or fall after catching one’s foot on something.',synonyms:['stumble over','catch one’s foot on']},
  triplicity:{definition:'The state or quality of being threefold; in astrology, a group of three zodiac signs sharing an element.',synonyms:['threefoldness','triad','triplicity of signs']},
  triton:{definition:'In Greek mythology, a sea god, son of Poseidon and Amphitrite, often represented with a human upper body and a fish tail.',synonyms:['sea god','son of Poseidon']},
  tritone:{definition:'A musical interval spanning three whole tones, equivalent to an augmented fourth or diminished fifth.',synonyms:['augmented fourth','diminished fifth']},
  triumphalism:{definition:'An attitude of excessive pride in, or insistence on, the triumph or superiority of a cause, belief, or institution.',synonyms:['boastfulness','self-congratulation','triumphal pride']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['triple-2','triplet-2','tripod-2','tripthong','tripping','tris','trisage','triticeus']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
