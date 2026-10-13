/* Remove reviewed free-text translations after batch 2044. */
(()=>{
 const ids=["unfaithful","hell","infinity","influential","informative","informant","engineer","ingest","ungratefulness","ingratitude"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
