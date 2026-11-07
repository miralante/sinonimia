/* Remove free-text translations after review of batch 2026. */
(()=>{
  const ids=["tinplate","lounge","holocaust","hologram","homophobic","homosexual","homosexuality","sling"];
  for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
  const sling=DICCIONARIOS.en.find(e=>e.id==="sling");
  Object.assign(sling,{example:{word:"sling",text:"He used a sling to support his injured arm and then used it to sling the bag over his shoulder."},exampleSynonym:{word:"strap",text:"He used a strap to support his injured arm and then slung the bag over his shoulder."}});
})();
