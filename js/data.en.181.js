(()=>{
 const updates={
  overfence:{definition:"A secondary fence or barrier used to reinforce or supplement another fence; chiefly historical or specialized.",synonyms:["reinforcing fence","secondary barrier"],example:{word:"overfence",text:"The overfence strengthened the boundary around the enclosure."},exampleSynonym:{word:"secondary barrier",text:"The secondary barrier strengthened the boundary around the enclosure."}},
  overfill:{definition:"To fill something beyond its capacity or past its brim; to put too much of something into a container or space.",synonyms:["fill too full","fill to overflowing","overload"],example:{word:"overfill",text:"Do not overfill the container, or the liquid may spill."},exampleSynonym:{word:"fill to overflowing",text:"Do not fill the container to overflowing, or the liquid may spill."}},
  overflow:{definition:"Noun: the amount that spills beyond a container or boundary, or anything in excess of capacity. Verb: to flow or spill over the edge, or to be so full that contents spread beyond it; figuratively, to be abundant or filled with emotion.",synonyms:["spillage","excess","spill over","overrun","overflow outlet"],example:{word:"overflow",text:"Heavy rain caused the river to overflow its banks."},exampleSynonym:{word:"spill over",text:"Heavy rain caused the river to spill over its banks."}}
 };
 for(const [id,patch] of Object.entries(updates)){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);Object.assign(row,patch);delete row.translation;}
 for(const id of ['overfill-a-container-with-water','overflow-2','overflow-3','overflow-4','overflow-5','overflow-7','overflow-9'])if(!DICCIONARIOS.en.some(e=>e.id===id))throw Error('Missing en/'+id);
 DICCIONARIOS.en=DICCIONARIOS.en.filter(e=>!['overfill-a-container-with-water','overflow-2','overflow-3','overflow-4','overflow-5','overflow-7','overflow-9'].includes(e.id));
})();
