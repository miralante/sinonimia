/* Reviewed English dictionary entries for batch 1996. */
(()=>{
  const reviewed=['faena','unsuccessful','falsify','counterfeit','error','fame','fanatic','fanaticism','ghost','phantom'];
  for(const id of reviewed){const e=DICCIONARIOS.en.find(x=>x.id===id);if(!e)throw Error('Missing en/'+id);delete e.translation;}
})();
