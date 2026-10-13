/* Reviewed English dictionary updates for batch 1986. */
(()=>{
  const reviewed=['sterilise','sterilize','aesthetic','aesthetics','hair-salon','beauty-shop','estimate','stimulus','stimulation','stomachic'];
  for(const id of reviewed){const e=DICCIONARIOS.en.find(x=>x.id===id);if(!e)throw Error('Missing en/'+id);delete e.translation;}
  const estimate=DICCIONARIOS.en.find(e=>e.id==='estimate');
  estimate.example={word:"estimate",text:"We estimate the repairs will cost about two hundred dollars, and the contractor sent us a written estimate."};
  estimate.exampleSynonym={word:"assess",text:"We assess the repairs at about two hundred dollars, and the contractor sent us a written appraisal."};
  const stimulation=DICCIONARIOS.en.find(e=>e.id==='stimulation');
  stimulation.example={word:"stimulation",text:"The bright colors provide visual stimulation for young children."};
  stimulation.exampleSynonym={word:"activation",text:"The bright colors provide visual activation for young children."};
})();
