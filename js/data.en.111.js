(()=>{
 const ids=["mongoose","hose","mania","maniac","manicure","mannequin","dummy","model","handyman","handful"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
