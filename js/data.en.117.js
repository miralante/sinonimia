(()=>{
 const ids=["capital-letter","piss","pee","mechanism","patron","medal","median","midnight","media","measure"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
