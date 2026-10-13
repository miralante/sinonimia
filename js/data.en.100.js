(()=>{
 const ids=["lever","lea","dragonfly","liberate","libra","book-store","bookshop","libretto","script","high-school"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
