(()=>{
 const ids=["unreal","unrecognizable","unrecognisable","irrefutable","irrelevant","disrespectful","irresponsibility","abrasive","unbreakable","burst-in"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
