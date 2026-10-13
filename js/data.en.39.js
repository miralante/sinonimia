/* Reviewed English dictionary entries for batch 2003. */
(()=>{
  const reviewed=['floral','bloom','flourish','prosper','vase','float','fluency','flow','brochure','outlaw'];
  for(const id of reviewed){const e=DICCIONARIOS.en.find(x=>x.id===id);if(!e)throw Error('Missing en/'+id);delete e.translation;}
})();
