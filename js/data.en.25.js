/* Reviewed English dictionary updates for batch 1989. */
(()=>{
  const reviewed=['eternity','eternal','euphemism','eunuch','eureka','euro','evade','shirk','evaluate','gospel'];
  for(const id of reviewed){const e=DICCIONARIOS.en.find(x=>x.id===id);if(!e)throw Error('Missing en/'+id);delete e.translation;}
  const eternity=DICCIONARIOS.en.find(e=>e.id==='eternity');
  eternity.example={word:"eternity",text:"The wait for the delayed train felt like an eternity."};
  eternity.exampleSynonym={word:"endless time",text:"The wait for the delayed train felt like endless time."};
  const euro=DICCIONARIOS.en.find(e=>e.id==='euro');
  euro.synonyms=['EUR','€','single European currency'];
  euro.example={word:"euro",text:"The museum ticket costs twelve euros."};
  euro.exampleSynonym={word:"EUR",text:"The ticket price is listed as EUR 12."};
  const gospel=DICCIONARIOS.en.find(e=>e.id==='gospel');
  gospel.example={word:"gospel",text:"The exhibit displayed a gospel manuscript, while the team treated the coach's advice as gospel."};
  gospel.exampleSynonym={word:"scripture",text:"The exhibit displayed a scripture manuscript, while the team treated the coach's advice as unquestionable truth."};
})();
