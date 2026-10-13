(()=>{
 const ids=["ladybird","maritime","martyrdom","march","massacre","chew","masque","masquerade","masculinity","massive"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
