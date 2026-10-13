/* Reviewed English dictionary updates for batch 2014. */
(()=>{
  const reviewed=['sweet','lolly','run-across','encounter','find','score','run-up-against','knock','stub','wallop'];
  for(const id of reviewed){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
