/* Reviewed English dictionary updates for batch 1982. */
(()=>{
  const reviewed=['specialty','specify','specific','spectacular','spectator','viewer','spectral','mirage','thick','spy'];
  for(const id of reviewed){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
  const viewer=DICCIONARIOS.en.find(e=>e.id==='viewer');
  viewer.definition="A person who watches television, a video, or an event; also, a device used to view images.";
  viewer.synonyms=["observer","spectator","watcher","optical viewer"];
  viewer.example={word:"viewer",text:"Each viewer received a headset before the film began."};
  viewer.exampleSynonym={word:"spectator",text:"Each spectator received a headset before the film began."};
  const spectral=DICCIONARIOS.en.find(e=>e.id==='spectral');
  spectral.synonyms=["ghostly","ghostlike","phantomlike"];
  const removed=new Set(['daguestano']);
  for(const entry of DICCIONARIOS.en){const value=entry.translation?.es;if(!value)continue;const kept=(Array.isArray(value)?value:[value]).filter(id=>!removed.has(id));if(kept.length)entry.translation={...entry.translation,es:Array.isArray(value)?kept:kept[0]};else delete entry.translation;}
})();
