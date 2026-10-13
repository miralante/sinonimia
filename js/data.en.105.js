(()=>{
 const ids=["canvas","longevity","batch","lottery","lsd","lucidity","lucidness","lucid","firefly","lugubrious"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
