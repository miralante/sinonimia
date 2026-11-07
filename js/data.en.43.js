/* Reviewed English dictionary updates for batch 2007. */
(()=>{
  const reviewed=["frequent","wash-up","frier","brake","frivolity","frivolous","flippant"];
  for(const id of reviewed){const e=DICCIONARIOS.en.find(x=>x.id===id);if(!e)throw Error('Missing en/'+id);if(e)if(e)delete e.translation;}
})();
