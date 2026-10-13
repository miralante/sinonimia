/* Reviewed English dictionary updates for batch 2010. */
(()=>{
  const updates={
    tick:{definition:"Noun: a bloodsucking arachnid that attaches to warm-blooded animals; also, a light rhythmic sound, a brief moment, or a small mark used to check an item. Verb: to make such a sound, function, or mark an item with a check.",synonyms:["bloodsucking arachnid","rhythmic beat","check mark","moment"],example:{word:"tick",text:"They found a tick attached to the dog after the walk."},exampleSynonym:{word:"bloodsucking arachnid",text:"They found a bloodsucking arachnid attached to the dog after the walk."}},
    gay:{definition:"Adjective: of, relating to, or characterized by romantic or sexual attraction to people of the same sex; also, relating to LGBTQ+ people or culture. In older or literary use, cheerful, lively, or brightly colored. The noun for a person can be considered offensive when applied by others; the adjective is generally preferred.",synonyms:["same-sex attracted","lively (older sense)","bright (older sense)"],example:{word:"gay",text:"The center offers support and social events for gay adults."},exampleSynonym:{word:"same-sex attracted",text:"The survey included adults who are same-sex attracted."}},
    gazpacho:{definition:"A Spanish soup, usually made from raw vegetables such as tomatoes, peppers, and cucumbers, and served cold.",synonyms:["Spanish cold soup","cold vegetable soup"],example:{word:"gazpacho",text:"They served gazpacho with cucumber and crusty bread."},exampleSynonym:{word:"Spanish cold soup",text:"They served Spanish cold soup with cucumber and crusty bread."}}
  };
  const reviewed=['win','grace','tick','gay','gazpacho','geisha','gemini','groan','moan','genealogical'];
  for(const id of reviewed){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
  for(const[id,fields]of Object.entries(updates)){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);Object.assign(row,fields);}
})();
