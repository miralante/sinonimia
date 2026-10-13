(()=>{
 const ids=["left","wild-boar","soap","jade","jaguar","ham","japan","jazz","leadership","sheikh"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
 const left=DICCIONARIOS.en.find(e=>e.id==='left');
 Object.assign(left,{definition:"The side or direction opposite to right; situated on that side. Also used for the left-hand side or part of something.",synonyms:["left-hand side","sinistral","port (nautical)"],example:{word:"left",text:"Turn left at the next street."},exampleSynonym:{word:"left-hand side",text:"Keep to the left-hand side of the road."}});
})();
