/* Reviewed English dictionary updates for batch 1993. */
(()=>{
  const reviewed=['unfold','unfurl','account-for','construe','expound','explicate','explicitly','explicit','explorer','express'];
  for(const id of reviewed){const e=DICCIONARIOS.en.find(x=>x.id===id);if(!e)throw Error('Missing en/'+id);delete e.translation;}
  const accountFor=DICCIONARIOS.en.find(e=>e.id==='account-for');
  accountFor.example={word:'account for',text:'The audit must account for every expense, and shipping costs account for a third of the total.'};
  accountFor.exampleSynonym={word:'explain',text:'The audit must explain every expense, and shipping costs make up a third of the total.'};
  for(const lang of ['es','en'])for(const row of DICCIONARIOS[lang]){
    if(Array.isArray(row.synonyms))row.synonyms=row.synonyms.filter(term=>term!=='dedocrático'&&term!=='dedocratico');
    const key=lang==='es'?'en':'es',value=row.translation?.[key],targets=Array.isArray(value)?value:value?[value]:[];
    if(targets.includes('dedocratico')){const remaining=targets.filter(id=>id!=='dedocratico');if(remaining.length)row.translation[key]=Array.isArray(value)?remaining:remaining[0];else delete row.translation[key];if(!Object.keys(row.translation||{}).length)delete row.translation;}
  }
})();
