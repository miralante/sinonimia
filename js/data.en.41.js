/* Reviewed English dictionary entries for batch 2005. */
(()=>{
  const reviewed=['fossil','ditch','trench','moat','fosse','photocopier','photography','photographic','photographer','fragrant'];
  for(const id of reviewed){const e=DICCIONARIOS.en.find(x=>x.id===id);if(!e)throw Error('Missing en/'+id);delete e.translation;}
})();
