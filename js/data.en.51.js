/* Reviewed English dictionary updates for batch 2015. */
(()=>{
  const reviewed=['dripping','record','graph','gram','greatness','bigness','granite','hailstone','hail','adipose-tissue'];
  for(const id of reviewed){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
