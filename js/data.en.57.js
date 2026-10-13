/* Reviewed English dictionary metadata for batch 2021. */
(()=>{
  const reviewed=['hamster','hangar','sated','enchantment','homemade','craft','helicopter','chopper','whirlybird','helium'];
  for(const id of reviewed){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
