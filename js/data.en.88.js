(()=>{
 const ids=["intrigue","intuitive","uselessly","invader","invention","greenhouse","hibernal","wintry","wintery","winterlike"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
