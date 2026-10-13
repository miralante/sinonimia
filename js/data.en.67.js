/* Remove free-text translations after review of batch 2031. */
(()=>{
  const ids=["hooray","sniff","argh","oh","ideal","idealism","devise","identic","identical","identifier"];
  for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
  const sniff=DICCIONARIOS.en.find(e=>e.id==='sniff');
  sniff.exampleSynonym={word:"snuffle",text:"She gave a soft snuffle as she smelled the flowers."};
})();
