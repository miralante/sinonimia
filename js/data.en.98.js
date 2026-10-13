(()=>{
 const ids=["lector","legitimacy","league","far","lye","bleach","lemur","firewood","linen","slowness"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
