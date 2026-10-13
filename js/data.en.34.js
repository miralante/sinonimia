/* Reviewed English dictionary entries for batch 1998. */
(()=>{
  const reviewed=['favorable','fax','faith','fecal','federal','joy','happiness','feline','blessedly','blissfully'];
  for(const id of reviewed){const e=DICCIONARIOS.en.find(x=>x.id===id);if(!e)throw Error('Missing en/'+id);delete e.translation;}
})();
