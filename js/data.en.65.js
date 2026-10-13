/* Remove free-text translations after review of batch 2029. */
(()=>{
  const ids=["hospitality","lodging-house","hostile","hostility","dimple","footprint","vegetable-garden","orchard","guest","bony"];
  for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
