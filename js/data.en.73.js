/* Remove free-text translations after review of batch 2037. */
(()=>{
  const ids=["unforeseen","print","unlikely","unsuitable","improper","incorrect","improvise","rash","reckless","foolhardy"];
  for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
