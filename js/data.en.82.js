(()=>{
 const ids=["injustice","unripe","directly","immediate","immensely","hugely","immensity","immenseness","immense","immigrant"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
