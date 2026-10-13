(()=>{
 const ids=["badness","evilness","miscreant","misunderstanding","mali","malice","smelly","malodorous","stinky","malta"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
