(()=>{
 const ids=["implausible","unbeaten","undefeated","invisible","invite","involve","ire","irascible","irony","unreasonable"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
