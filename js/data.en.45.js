/* Reviewed English dictionary updates for batch 2009. */
(()=>{
  const reviewed=['fury','furious','mad','crop','gazelle','doddering','bagpipes','gamma','livestock','winner'];
  for(const id of reviewed){const e=DICCIONARIOS.en.find(x=>x.id===id);if(!e)throw Error('Missing en/'+id);delete e.translation;}
})();
