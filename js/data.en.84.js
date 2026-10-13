(()=>{
 const ids=["insane","insecticide","insect","unsure","insecure","useless","insinuate","hint","imply","insistent"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
