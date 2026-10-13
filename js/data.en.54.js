/* Reviewed English dictionary updates for batch 2018. */
(()=>{
  const reviewed=['grouchy','growler','grumbler','grotto','cavern','mudguard','save','den','lair','woof'];
  for(const id of reviewed){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
