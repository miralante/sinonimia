(()=>{
 const ids=["flamethrower","headstone","tombstone","pencil","lasagna","lascivious","lewd","wanton","pity","ruth"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
