/* Reviewed English dictionary updates for batch 1988. */
(()=>{
  const reviewed=['studious','stove','thunderstruck','stupidly','swastika','gammadion','fylfot','et-cetera','and-so-on','eternally'];
  for(const id of reviewed){const e=DICCIONARIOS.en.find(x=>x.id===id);if(!e)throw Error('Missing en/'+id);delete e.translation;}
  const stove=DICCIONARIOS.en.find(e=>e.id==='stove');
  stove.example={word:"stove",text:"She left the soup simmering on the stove while an electric stove heated the cabin."};
  stove.exampleSynonym={word:"cooker",text:"She left the soup simmering on the cooker while an electric stove heated the cabin."};
})();
