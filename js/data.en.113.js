(()=>{
 const ids=["raccoon","mara","patagonian-cavy","patagonian-hare","patagonian-mara","wonderfully","lovely","dizziness","ivory","marl"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
