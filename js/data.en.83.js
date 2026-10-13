(()=>{
 const ids=["immoral","motionless","immovable","property","innate","undeniable","harmless","inoxidizable","restlessness","insatiable"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
