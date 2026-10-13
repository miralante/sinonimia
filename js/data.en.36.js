/* Reviewed English dictionary entries for batch 2000. */
(()=>{
  const reviewed=['fertile','fertilizer','celebrate','feast','festivity','festive','fetishism','phi','fiasco','fictitious'];
  for(const id of reviewed){const e=DICCIONARIOS.en.find(x=>x.id===id);if(!e)throw Error('Missing en/'+id);delete e.translation;}
})();
