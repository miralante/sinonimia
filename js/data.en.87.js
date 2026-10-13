(()=>{
 const ids=["attempt","intermittent","internationally","interpret","interrogate","quiz","call-on","untouchable","intolerant","intrepid"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
