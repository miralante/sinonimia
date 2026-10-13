/* Remove reviewed free-text translations after batch 2041. */
(()=>{
 const ids=["hopeless","investigate","indecorous","indecent","helpless","independently","undesirable","indigenous","indigent","unworthy"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
