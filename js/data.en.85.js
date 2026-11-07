(()=>{
 const ids=["insist","insolent","unusual","inhale","arouse","inspire","influence","enlighten","instinct"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
