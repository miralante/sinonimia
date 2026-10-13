/* Reviewed English dictionary updates for batch 2011. */
(()=>{
  const updates={
    generosity:{definition:"The quality or fact of being generous; a generous act; also, abundance.",synonyms:["kindness","liberality","munificence","unselfishness","abundance"],example:{word:"generosity",text:"Their generosity helped the shelter buy warm blankets."},exampleSynonym:{word:"kindness",text:"Their kindness helped the shelter buy warm blankets."}},
    genetic:{definition:"Adjective: relating to or determined by origin, development, or causal history; relating to genes or genetics, or caused or controlled by genes.",synonyms:["hereditary","inherited","inheritable","genetics-related"],example:{word:"genetic",text:"The study examined genetic differences between the two populations."},exampleSynonym:{word:"hereditary",text:"The study examined hereditary differences between the two populations."}},
    genital:{definition:"Adjective: of, relating to, or being a sexual or reproductive organ; also, in psychoanalytic theory, relating to the genital stage of psychosexual development.",synonyms:["reproductive","sexual (anatomical)"],example:{word:"genital",text:"The doctor explained how a genital infection can be treated."},exampleSynonym:{word:"reproductive",text:"The doctor explained how a reproductive infection can be treated."}},
    genitalia:{definition:"Plural noun: the organs of the reproductive system, especially the external genital organs.",synonyms:["genitals","reproductive organs"],example:{word:"genitalia",text:"The medical diagram labels the external genitalia."},exampleSynonym:{word:"genitals",text:"The medical diagram labels the external genitals."}}
  };
  const reviewed=['generally','generate','generosity','generous','genetic','geniality','genital','genitalia','gentile','gentleness'];
  for(const id of reviewed){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
  for(const[id,fields]of Object.entries(updates)){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);Object.assign(row,fields);}
})();
