/* Reviewed English dictionary updates for batch 1991. */
(()=>{
  const reviewed=['exam','excavate','eccentric','excentric','exceptional','exclusively','exclusive','exhausted','exhibitionism','exacting'];
  for(const id of reviewed){const e=DICCIONARIOS.en.find(x=>x.id===id);if(!e)throw Error('Missing en/'+id);delete e.translation;}
  const exhausted=DICCIONARIOS.en.find(e=>e.id==='exhausted');
  exhausted.example={word:'exhausted',text:'After the final climb, the exhausted hikers rested beside the trail.'};
  exhausted.exampleSynonym={word:'worn out',text:'After the final climb, the worn out hikers rested beside the trail.'};
})();
