/* Remove reviewed free-text translations after batch 2042. */
(()=>{
 const ids=["indirectly","indiscreet","indisputable","individuality","individually","individual","indomitable","undoubtedly","industrial","inert"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
