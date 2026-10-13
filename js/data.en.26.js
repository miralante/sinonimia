/* Reviewed English dictionary updates for batch 1990. */
(()=>{
  const reviewed=['evident','evidently','invoke','exactly','exactness','accuracy','exaggeratedly','exaggerated','exaggerate','overstate'];
  for(const id of reviewed){const e=DICCIONARIOS.en.find(x=>x.id===id);if(!e)throw Error('Missing en/'+id);delete e.translation;}
  const invoke=DICCIONARIOS.en.find(e=>e.id==='invoke');
  invoke.definition="To call upon for help or support; to cite as authority or justification; to bring into effect; or to produce a particular response or memory.";
  invoke.synonyms=['call upon','cite','appeal to','implement','evoke (contextual)'];
  invoke.example={word:"invoke",text:"The lawyer will invoke the statute, while the speaker may invoke the memory of her mentor."};
  invoke.exampleSynonym={word:"cite",text:"The lawyer will cite the statute, while the speaker may evoke the memory of her mentor."};
  const exaggerated=DICCIONARIOS.en.find(e=>e.id==='exaggerated');
  exaggerated.definition="Adjective: represented as greater, more important, or more extreme than the facts warrant; overstated.";
  exaggerated.synonyms=['overstated','inflated','excessive','magnified'];
  exaggerated.example={word:"exaggerated",text:"The headline was exaggerated and gave readers an exaggerated impression of the risks."};
  exaggerated.exampleSynonym={word:"overstated",text:"The headline was overstated and gave readers an exaggerated impression of the risks."};
  for(const lang of ['es','en'])for(const row of DICCIONARIOS[lang]){
    const key=lang==='es'?'en':'es',value=row.translation?.[key],targets=Array.isArray(value)?value:value?[value]:[];
    if(targets.includes('deciocheno')){const remaining=targets.filter(id=>id!=='deciocheno');if(remaining.length)row.translation[key]=Array.isArray(value)?remaining:remaining[0];else delete row.translation[key];if(!Object.keys(row.translation||{}).length)delete row.translation;}
    if(Array.isArray(row.synonyms))row.synonyms=row.synonyms.filter(term=>term!=='deciocheno');
  }
})();
