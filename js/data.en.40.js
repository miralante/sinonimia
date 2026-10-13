/* Reviewed English dictionary entries for batch 2004. */
(()=>{
  const reviewed=['wrought-iron','formally','terrific','marvellous','formidable','formulate','fornicate','strengthen','fortune','force'];
  for(const id of reviewed){const e=DICCIONARIOS.en.find(x=>x.id===id);if(!e)throw Error('Missing en/'+id);delete e.translation;}
})();
