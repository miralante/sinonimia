(()=>{const u={
 overpopulate:{definition:'To populate an area or environment beyond its capacity to support the population.',synonyms:['overfill with inhabitants','exceed carrying capacity'],example:{word:'overpopulate',text:'Invasive species can overpopulate a small island.'},exampleSynonym:{word:'overfill with inhabitants',text:'Invasive species can overfill a small island with inhabitants.'}},
 overpowering:{definition:'So strong, intense, or compelling that it is difficult to resist or ignore.',synonyms:['overwhelming','intense','irresistible'],example:{word:'overpowering',text:'The room was filled with an overpowering smell of smoke.'},exampleSynonym:{word:'overwhelming',text:'The room was filled with an overwhelming smell of smoke.'}},
 'overprint-2':null,
 'overrate-2':null,
 'overprimed':null
};for(const [id,p] of Object.entries(u)){if(p===null){if(!DICCIONARIOS.en.some(x=>x.id===id))throw Error('Missing en/'+id);DICCIONARIOS.en=DICCIONARIOS.en.filter(x=>x.id!==id);continue;}const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
