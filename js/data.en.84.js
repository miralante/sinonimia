(()=>{
 const ids=["insane","insecticide","insect","unsure","insecure","useless","insinuate","imply","insistent"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
