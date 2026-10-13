/* Reviewed English dictionary updates for batch 1983. */
(()=>{
  const reviewed=['spirit','splendid','splendor','sponge','spongy','spontaneity','husband','mate','frothy','foamy'];
  for(const id of reviewed){const e=DICCIONARIOS.en.find(x=>x.id===id);if(!e)throw Error('Missing en/'+id);delete e.translation;}
  const spirit=DICCIONARIOS.en.find(e=>e.id==='spirit');
  spirit.definition="Noun: the nonphysical life or vital principle of a person; also, a supernatural being, a person's mood or energy, the essential character or intent of something, or a distilled alcoholic drink. Verb: to carry someone or something away, usually secretly or mysteriously.";
  spirit.synonyms=["soul","essence","morale","ghost","liquor","carry away secretly"];
  spirit.example={word:"spirit",text:"The team's spirit stayed high throughout the match."};
  spirit.exampleSynonym={word:"morale",text:"The team's morale stayed high throughout the match."};
  const splendid=DICCIONARIOS.en.find(e=>e.id==='splendid');
  splendid.definition="Adjective: magnificent or impressive in appearance, quality, or performance; also, excellent, very bright, or shining.";
  splendid.synonyms=["magnificent","excellent","brilliant","marvelous"];
  const sponge=DICCIONARIOS.en.find(e=>e.id==='sponge');
  sponge.example={word:"sponge",text:"The sponge soaked up the spill while divers photographed a living sponge on the reef."};
  sponge.exampleSynonym={word:"absorbent pad",text:"The absorbent pad soaked up the spill while divers photographed a marine poriferan on the reef."};
})();
