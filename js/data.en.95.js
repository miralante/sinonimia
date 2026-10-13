(()=>{
 const ids=["kiwifruit","brick","lama","toady","ass-licker","ass-kisser","brown-noser","lamp","wool","spear"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
