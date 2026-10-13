(()=>{
 const updates={
  orc:{definition:"A mythical monster or goblin-like humanoid in fantasy; in older usage, a whale or other sea monster.",synonyms:["goblin","mythical monster","sea monster"],example:{word:"orc",text:"The orc guarded the entrance to the mountain fortress."},exampleSynonym:{word:"goblin",text:"The goblin guarded the entrance to the mountain fortress."}},
  orca:{definition:"A large toothed whale (Orcinus orca) in the dolphin family, also called a killer whale.",synonyms:["killer whale","Orcinus orca"],example:{word:"orca",text:"An orca surfaced beside the research vessel."},exampleSynonym:{word:"killer whale",text:"A killer whale surfaced beside the research vessel."}},
  orchard:{definition:"An area of land where fruit or nut trees are grown.",synonyms:["fruit-tree plantation","fruit grove"],example:{word:"orchard",text:"They planted apple trees throughout the orchard."},exampleSynonym:{word:"fruit grove",text:"They planted apple trees throughout the fruit grove."}},
  orchestra:{definition:"A large group of musicians who play different instruments together, usually under a conductor; also, the musicians or seating area on a theatre's main floor, and the chorus space in an ancient Greek theatre.",synonyms:["musical ensemble","symphony orchestra","theatre stalls"],example:{word:"orchestra",text:"The orchestra rehearsed before the performance."},exampleSynonym:{word:"musical ensemble",text:"The musical ensemble rehearsed before the performance."}},
  'orchestra-2':{definition:"The semicircular space in front of the stage in an ancient Greek theatre, where the chorus performed.",synonyms:["chorus space","Greek theatre orchestra"],example:{word:"orchestra",text:"The chorus danced in the orchestra of the ancient theatre."},exampleSynonym:{word:"chorus space",text:"The chorus danced in the chorus space of the ancient theatre."}}
 };
 for(const [id,patch] of Object.entries(updates)){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);Object.assign(row,patch);delete row.translation;}
 for(const id of ['orchard-2','orchard-3','orchard-4','orchard-5','orchestra-3']){if(!DICCIONARIOS.en.some(e=>e.id===id))throw Error('Missing en/'+id);}
 DICCIONARIOS.en=DICCIONARIOS.en.filter(e=>!['orchard-2','orchard-3','orchard-4','orchard-5','orchestra-3'].includes(e.id));
})();
