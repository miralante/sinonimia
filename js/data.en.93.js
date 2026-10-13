(()=>{
 const ids=["jewellery","judaism","judas","judicial","juice","juicy","toy","toy-shop","jungle","june"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
 const row=DICCIONARIOS.en.find(e=>e.id==='judaism');
 Object.assign(row,{definition:"A dated spelling variant of Judaism, the religion of the Jewish people.",synonyms:["Judaism"],example:{word:"Judaïsm",text:"Some dated English texts spell Judaism as Judaïsm."},exampleSynonym:{word:"Judaism",text:"Some dated English texts spell Judaism as Judaïsm."}});
})();
