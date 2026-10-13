/* Remove reviewed free-text translations after batch 2040. */
(()=>{
 const ids=["unconscious","irresponsible","unconsciously","uncontrollable","incorporate","incredulity","incredible","unbelievably","innocent","incurable"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
