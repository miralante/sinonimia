/* Remove reviewed free-text translations after batch 2042. */
(()=>{
 const ids=["indiscreet","indisputable","individuality","individually","individual","indomitable","industrial","inert"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
