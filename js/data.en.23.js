/* Reviewed English dictionary updates for batch 1987. */
(()=>{
  const reviewed=['sneeze','stressful','stressor','strict','stringent','structure','roar','case','undergraduate'];
  for(const id of reviewed){const e=DICCIONARIOS.en.find(x=>x.id===id);if(!e)throw Error('Missing en/'+id);if(e)if(e)delete e.translation;}
  const sneeze=DICCIONARIOS.en.find(e=>e.id==='sneeze');
  sneeze.synonyms=['sneeze','sternutate'];
  sneeze.example={word:"sneeze",text:"The dust made him sneeze twice in a row."};
  sneeze.exampleSynonym={word:"sternutate",text:"The dust made him sternutate twice in a row."};
})();
