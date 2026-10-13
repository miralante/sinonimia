/* Reviewed English dictionary metadata for batch 2019. */
(()=>{
  const reviewed=['governmental','cheetah','war','ghetto','stew','dish','guru','like','enjoyable','glad'];
  for(const id of reviewed){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
