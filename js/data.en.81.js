/* Remove reviewed free-text translations after batch 2045. */
(()=>{
 const ids=["unthankfulness","unthankful","ungrateful","ingredient","uninhabitable","initial","initiate","beginning","unmatchable","unintelligible"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
