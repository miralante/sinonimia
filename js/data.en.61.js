/* Remove free-text translations after review of batch 2025. */
(()=>{
  const ids=["swelling","hindi","hindu","hypnosis","hipocrisy","hypothetical","historically","hearth","household","bonfire"];
  for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
  const hindu=DICCIONARIOS.en.find(e=>e.id==="hindu");
  Object.assign(hindu,{example:{word:"Hindu",text:"The Hindu community celebrated the festival together."},exampleSynonym:{word:"follower of Hinduism",text:"A follower of Hinduism joined the community's celebration."}});
  const hipocrisy=DICCIONARIOS.en.find(e=>e.id==="hipocrisy");
  Object.assign(hipocrisy,{example:{word:"hipocrisy",text:"The historical text uses the obsolete spelling “hipocrisy” for “hypocrisy”."},exampleSynonym:{word:"hypocrisy",text:"The historical text uses the obsolete spelling “hipocrisy” for “hypocrisy”."}});
})();
