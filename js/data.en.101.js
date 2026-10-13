(()=>{
 const ids=["liqueur","lead","fighting","bullfighting","bullfight","lightly","ably","capably","cleverly","skilfully"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
