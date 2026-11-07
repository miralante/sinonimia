(()=>{
 const ids=["liqueur","lead","fighting","bullfighting","bullfight","lightly"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
