(()=>{
 const ids=["mach-number","male","stepmother","mature","maturity","instructor","mafia","magenta","magic","magnanimous"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
