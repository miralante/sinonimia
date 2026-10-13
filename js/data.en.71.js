/* Remove free-text translations after review of batch 2035. */
(()=>{
  const ids=["raincoat","trenchcoat","unholy","irreligious","relentless","unrelenting","implacable","implicit","implore","unpopular"];
  for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
