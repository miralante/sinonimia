(()=>{
 const ids=["malt","villain","blowjob","cinch","mammoth","drove","stained","tangerine","command","use"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
