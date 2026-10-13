/* Reviewed English dictionary entries for batch 2002. */
(()=>{
  const reviewed=['floppy','thin','creme-caramel','flan','arrow','fringe','bangs','fool-around','loose','flora'];
  for(const id of reviewed){const e=DICCIONARIOS.en.find(x=>x.id===id);if(!e)throw Error('Missing en/'+id);delete e.translation;}
})();
