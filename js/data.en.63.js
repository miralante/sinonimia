/* Remove free-text translations after review of batch 2027. */
(()=>{
  const ids=["honesty","fungus","honor","gallows","gibbet","horde","horizontal","horizon","ant","emmet"];
  for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
