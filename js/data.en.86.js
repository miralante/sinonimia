(()=>{
 const ids=["institutional","instructive","insufficient","unsufficient","insufferable","intolerable","intellectual","purposely","intensity","intensive"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
