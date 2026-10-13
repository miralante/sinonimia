/* Reviewed English dictionary updates for batch 2017. */
(()=>{
  const reviewed=['shouting','scream','cry','grotesque','corpulent','stout','bulk','grouch','grump','grumpy'];
  for(const id of reviewed){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
