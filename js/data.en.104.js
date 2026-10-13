(()=>{
 const ids=["lobby","place","locality","logic","logically","successful","lolita","earthworm","stomach-worm","loin"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
