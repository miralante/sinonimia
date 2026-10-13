/* Reviewed English dictionary metadata for batch 2023. */
(()=>{
  const reviewed=['heroicly','heroic','heroin','heroism','boil','seethe','heterosexual','straight','hidalgo','sea-serpent'];
  for(const id of reviewed){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
