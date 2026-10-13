(()=>{
 const ids=["medieval","half","middle","mid","standard","generic","environmental","noon","midday","noontime"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
