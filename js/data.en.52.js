/* Reviewed English dictionary updates for batch 2016. */
(()=>{
  const reviewed=['suet','gratis','gratitude','thankfulness','pleasing','freely','gratuitously','gratuitous','gravitational','grail'];
  for(const id of reviewed){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
