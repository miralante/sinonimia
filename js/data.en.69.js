/* Remove free-text translations after review of batch 2033. */
(()=>{
  const ids=["unscathed","unlimited","limitless","illustrious","imam","imitate","impatient","impact","unstoppable","impartial"];
  for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
