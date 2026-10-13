(()=>{
 const ids=["connect","jurassic","adolescence","kabuki","kaiser","karma","kilo","kilometre","kiwi","little-spotted-kiwi"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
