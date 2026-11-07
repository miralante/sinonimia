(()=>{
 const ids=["mediterranean-sea","jellyfish","enhancement","improvement","mention","beg","panhandler","panhandle","wiggle"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
