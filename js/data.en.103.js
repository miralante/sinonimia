(()=>{
 const ids=["litre","fickle","llama","call","crying","arrival","weep","whimper","weeping-willow","babylon-willow"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
