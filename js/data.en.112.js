(()=>{
 const ids=["fistful","meek","butter","lard","shortening","tablecloth","cloak","mantle","mantra","apple-tree"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
