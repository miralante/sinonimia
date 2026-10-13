(()=>{
 const ids=["marginal","fag","faggot","marijuana","navigation","seamanship","navy","seascape","marina","butterfly"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
