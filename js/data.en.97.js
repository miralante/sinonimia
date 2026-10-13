(()=>{
 const ids=["lateral","heartbeat","whiplash","whip","latin","brass","laudanum","laurel","lava","washbasin"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
