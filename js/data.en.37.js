/* Reviewed English dictionary entries for batch 2001. */
(()=>{
  const reviewed=['fidelity','felt','philanthropist','seam','philosophical','late','firmament','physically','flaccid','flabby'];
  for(const id of reviewed){const e=DICCIONARIOS.en.find(x=>x.id===id);if(!e)throw Error('Missing en/'+id);delete e.translation;}
})();
