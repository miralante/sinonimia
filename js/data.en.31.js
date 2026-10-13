/* Reviewed English dictionary updates for batch 1995. */
(()=>{
  const reviewed=['manufacture','fabricate','fable','fabulous','facet','facility','facilitate','easily','feasible','doable'];
  for(const id of reviewed){const e=DICCIONARIOS.en.find(x=>x.id===id);if(!e)throw Error('Missing en/'+id);delete e.translation;}
})();
