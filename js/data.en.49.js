/* Reviewed English dictionary updates for batch 2013. */
(()=>{
  const updates={
    geneva:{definition:"A city and canton in southwestern Switzerland, on the Rhône River at the southwestern end of Lake Geneva; Geneva is also the capital of the canton. Lowercase geneva also names a highly aromatic bitter gin originally made in the Netherlands.",synonyms:["Geneva, Switzerland","Canton of Geneva"],example:{word:"Geneva",text:"The conference will take place in Geneva, Switzerland."},exampleSynonym:{word:"Geneva, Switzerland",text:"The conference will take place in Geneva, Switzerland."}},
    gipsy:{definition:"Chiefly British spelling variant of gypsy. When referring to Romani people or their culture, the term is often considered offensive; Romani or Roma is preferred.",synonyms:["gypsy (variant spelling)"],example:{word:"gipsy",text:"The novel uses the chiefly British spelling gipsy, a term often avoided for Romani people."},exampleSynonym:{word:"gypsy",text:"The novel uses the variant spelling gypsy, a term often avoided for Romani people."}}
  };
  const reviewed=['gymnast','geneva','gipsy','glacial','gladiator','global','glutton','wolverine','carcajou','gnome'];
  for(const id of reviewed){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
  for(const[id,fields]of Object.entries(updates)){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);Object.assign(row,fields);}
})();
