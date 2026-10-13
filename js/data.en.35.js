/* Reviewed English dictionary entries for batch 1999. */
(()=>{
  const reviewed=['femininity','feminity','feminism','phoenix','firebird','phenomenal','ferocity','ferocious','ferociously','fiercely'];
  for(const id of reviewed){const e=DICCIONARIOS.en.find(x=>x.id===id);if(!e)throw Error('Missing en/'+id);delete e.translation;}
})();
