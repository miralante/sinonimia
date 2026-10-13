/* Remove reviewed free-text translations after batch 2038. */
(()=>{
  const ids=["imprudent","recklessly","impulse","impure","unacceptable","wireless","unreachable","inaudible","inaugural","incest"];
  for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
