(()=>{
 const ids=["mental","mind","liar","merely","prowler","marauder","countertop","worktop","metaphysics","metaphor"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
