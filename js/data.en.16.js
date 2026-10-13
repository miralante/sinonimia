/* Reviewed English dictionary updates for batch 1980. */
(()=>{
  const row=DICCIONARIOS.en.find(e=>e.id==='slave');
  if(!row)throw Error('Missing en/slave');
  row.definition="Noun: a person held in slavery and forced to work or serve without freedom. Verb: to work very hard or under harsh conditions, or to make someone a slave. When referring to a person, «enslaved person» is often more precise and respectful.";
  row.synonyms=["enslaved person","bondsperson","work very hard","toil"];
  row.example={word:"slave",text:"The archive records the life of an enslaved person, while the researchers had to slave over the damaged manuscript."};
  row.exampleSynonym={word:"enslaved person",text:"The archive records the life of an enslaved person, while the researchers had to work very hard over the damaged manuscript."};
  delete row.translation;
  const reviewed=['escort','hide-and-seek','shotgun','cleavage','scribe','written','scrotum','sculpture','slippery'];
  for(const id of reviewed){const entry=DICCIONARIOS.en.find(e=>e.id===id);if(!entry)throw Error('Missing en/'+id);delete entry.translation;}
  DICCIONARIOS.en=DICCIONARIOS.en.filter(e=>e.id!=='cushite');
  for(const language of ['es','en'])for(const entry of DICCIONARIOS[language]){const key=language==='es'?'en':'es',value=entry.translation?.[key];if(!value)continue;const kept=(Array.isArray(value)?value:[value]).filter(id=>id!=='cushite');if(kept.length)entry.translation={...entry.translation,[key]:Array.isArray(value)?kept:kept[0]};else delete entry.translation;}
})();
