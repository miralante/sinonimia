/* Remove free-text translations after review of batch 2030. */
(()=>{
  const ids=["flight","rubber","humanity","human","humane","moist","humid","humbleness","humiliating","humor"];
  for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
  const human=DICCIONARIOS.en.find(e=>e.id==='human');
  human.exampleSynonym={word:"human being",text:"The discovery changed how a human being understands human biology."};
})();
