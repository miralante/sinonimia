/* Remove free-text translations after review of batch 2024. */
(()=>{
  const ids=["hydraulic","hydrogen","hyena","hygienic","fig","stepchild","stepson","emphasis","hooligan","puffy"];
  for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
  const fig=DICCIONARIOS.en.find(e=>e.id==="fig");
  Object.assign(fig,{example:{word:"fig",text:"She sliced a ripe fig and added it to the salad."},exampleSynonym:{word:"edible fig",text:"She picked an edible fig from the tree."}});
})();
