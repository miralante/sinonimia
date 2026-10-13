/* Reviewed English dictionary updates for batch 1979. */
(()=>{
  const updates={
    scrabble:{definition:"Verb: to scrape or scratch with the hands or claws, or to struggle awkwardly to reach or obtain something. Noun: a hurried or awkward search or attempt; also, the word game Scrabble.",synonyms:["scratch","scrape","grope","struggle","scramble"],example:{word:"scrabble",text:"The puppy began to scrabble at the door, while the players started a game of Scrabble."},exampleSynonym:{word:"scratch",text:"The puppy began to scratch at the door, while the players started a game of Scrabble."}},
    poke:{definition:"Verb: to jab or prod with a finger or pointed object, to push something through an opening, or informally to make fun of someone. Noun: a jab or prod.",synonyms:["prod","jab","nudge","prick","tease"],example:{word:"poke",text:"She used a stick to poke the ashes and check whether the fire was out."},exampleSynonym:{word:"prod",text:"She used a stick to prod the ashes and check whether the fire was out."}},
    rare:{definition:"Adjective: uncommon or infrequently occurring; unusually good or valuable. Of meat, cooked only lightly, with the center still red.",synonyms:["uncommon","scarce","infrequent","exceptional","underdone"],example:{word:"rare",text:"The museum displayed a rare manuscript, and the chef served the steak rare."},exampleSynonym:{word:"uncommon",text:"The museum displayed an uncommon manuscript, and the chef served the steak lightly cooked."}}
  };
  for(const[id,fields]of Object.entries(updates)){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);Object.assign(row,fields);delete row.translation;}
  const reviewed=['escape','pry','frost','rime','scarcity','scenic','skepticism'];
  for(const id of reviewed){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
