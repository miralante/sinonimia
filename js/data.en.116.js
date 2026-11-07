(()=>{
 const ids=["solid","slaughterhouse","material","data","maternity","motherhood","nuance","thicket","maximum"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
