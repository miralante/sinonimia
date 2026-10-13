/* Remove free-text translations after review of batch 2032. */
(()=>{
  const ids=["identify","ideology","capable","able","igloo","ignorant","equalize","equally","likewise","unharmed"];
  for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
  const identify=DICCIONARIOS.en.find(e=>e.id==='identify');
  identify.example={word:"identify",text:"The witness could identify the driver from a photograph."};
  identify.exampleSynonym={word:"recognize",text:"The witness could recognize the driver from a photograph."};
})();
