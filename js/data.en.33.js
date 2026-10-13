/* Reviewed English dictionary entries for batch 1997. */
(()=>{
  const reviewed=['pharaoh','lighthouse','lamppost','fascinating','annoyance','fatidic','fatidical','fauna','auspicious','shanty-town'];
  for(const id of reviewed){const e=DICCIONARIOS.en.find(x=>x.id===id);if(!e)throw Error('Missing en/'+id);delete e.translation;}
})();
