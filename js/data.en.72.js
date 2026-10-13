/* Remove free-text translations after review of batch 2036. */
(()=>{
  const ids=["matter","import","impostor","imposter","unprecise","inaccurate","indispensable","impressionable","impressive","unforeseeable"];
  for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
