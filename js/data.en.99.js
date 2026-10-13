(()=>{
 const ids=["lumber","leopard","leprous","lesbian","lethal","deadly","lethargy","literate","heave","hoist"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
