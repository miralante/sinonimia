/* Remove reviewed free-text translations after batch 2043. */
(()=>{
 const ids=["inevitable","inexistent","nonexistent","unexistent","inexplicably","unexplainably","infallible","infantile","inferiority","infidelity"];
 for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
 const row=DICCIONARIOS.en.find(e=>e.id==='nonexistent');
 row.synonyms=['non-existing','imaginary','absent','not real'];
 row.exampleSynonym={word:'imaginary',text:'The report criticized the plan for relying on an imaginary legal requirement.'};
})();
