(()=>{
 const ids=["luxury","luxurious","lustful","mole","beauty-spot","polka-dot","magnifying-glass","mourning","macabre","flowerpot"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
