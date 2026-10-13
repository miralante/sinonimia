/* Remove free-text translations after review of batch 2034. */
(()=>{
  const ids=["unbiased","impartiality","impassible","impediment","unthinkable","unforgivable","imperialism","empire","waterproof","impervious"];
  for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
