(()=>{
 const ids=["hierarchy","jeremiah","sherry","jesus","chi","hee","giraffe","fuck-with","fuck-up","home-run"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
