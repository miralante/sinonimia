(()=>{
 const ids=["lilac","alms","cleanliness","lynx","pretty","linguistics","liquid","clever","bunk-bed","literature"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
