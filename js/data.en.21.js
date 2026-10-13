/* Reviewed English dictionary updates for batch 1985. */
(()=>{
  const reviewed=['erupt','pond','tin','statue','stature','status','stellar','star','steppe','stereotype'];
  for(const id of reviewed){const e=DICCIONARIOS.en.find(x=>x.id===id);if(!e)throw Error('Missing en/'+id);delete e.translation;}
  const erupt=DICCIONARIOS.en.find(e=>e.id==='erupt');
  erupt.example={word:"erupt",text:"The volcano could erupt at any moment."};
  erupt.exampleSynonym={word:"burst forth",text:"The volcano could burst forth at any moment."};
  const stellar=DICCIONARIOS.en.find(e=>e.id==='stellar');
  stellar.example={word:"stellar",text:"After a night of clear skies, the band gave a stellar performance."};
  stellar.exampleSynonym={word:"outstanding",text:"After a night of clear skies, the band gave an outstanding performance."};
})();
