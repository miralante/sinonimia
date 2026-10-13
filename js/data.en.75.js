/* Remove reviewed free-text translations after batch 2039. */
(()=>{
 const ids=["incestuous","uncertain","include","incoherent","discomfort","uncomfortable","uncomparable","incomparable","incomplete","incomprehensible"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
