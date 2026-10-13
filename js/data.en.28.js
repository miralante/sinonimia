/* Reviewed English dictionary updates for batch 1992. */
(()=>{
  const reviewed=['demanding','require','existential','exist','exorcism','expand','expectation','experiment','atone','explain'];
  for(const id of reviewed){const e=DICCIONARIOS.en.find(x=>x.id===id);if(!e)throw Error('Missing en/'+id);delete e.translation;}
  const expand=DICCIONARIOS.en.find(e=>e.id==='expand');
  expand.example={word:'expand',text:'The clinic plans to expand its hours and open a second location.'};
  expand.exampleSynonym={word:'extend',text:'The clinic plans to extend its hours and open a second location.'};
})();
