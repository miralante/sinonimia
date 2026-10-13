/* Reviewed English dictionary entries for batch 2006. */
(()=>{
  const reviewed=['fragile','fragment','passage','candidly','frankly','frank','flannel','band','openness','fraternity'];
  for(const id of reviewed){const e=DICCIONARIOS.en.find(x=>x.id===id);if(!e)throw Error('Missing en/'+id);delete e.translation;}
})();
