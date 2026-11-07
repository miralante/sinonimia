/* Reviewed English dictionary updates for batch 2008. */
(()=>{
  const reviewed=["frustrating","frustrate","strawberry","flee","jane-doe","fulgor","smoker","fundamental"];
  for(const id of reviewed){const e=DICCIONARIOS.en.find(x=>x.id===id);if(!e)throw Error('Missing en/'+id);if(e)if(e)delete e.translation;}
})();
