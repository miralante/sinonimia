/* Reviewed English dictionary updates for batch 2007. */
(()=>{
  const reviewed=['frequent','frequently','wash-up','frier','brake','coldly','icily','frivolity','frivolous','flippant'];
  for(const id of reviewed){const e=DICCIONARIOS.en.find(x=>x.id===id);if(!e)throw Error('Missing en/'+id);delete e.translation;}
})();
