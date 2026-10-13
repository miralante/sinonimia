(()=>{
 const ids=["magnate","tycoon","magnesium","magnificent","great","grand","magnum","magician","wizard","evil"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
