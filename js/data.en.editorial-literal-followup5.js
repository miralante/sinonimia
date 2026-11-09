/* Curated literal-example repairs for 10 English records. */
(()=>{
  const d=globalThis.DICCIONARIOS?.en; if(!d)return;
  const set=(id,fields)=>{const entry=d.find(x=>x.id===id);if(entry)Object.assign(entry,fields);};
  set("bounced-cheque", {"example":{"word":"bounced cheque","text":"The bank rejected the bounced cheque."},"exampleSynonym":{"word":"returned cheque","text":"The bank rejected the returned cheque."}});
  set("disinherit", {"example":{"word":"disinherit","text":"The will can disinherit him."},"exampleSynonym":{"word":"exclude someone from an inheritance","text":"The will can exclude someone from an inheritance."}});
  set("blind-spot", {"example":{"word":"blind spot","text":"Check your blind spot before changing lanes."},"exampleSynonym":{"word":"area outside the driver’s view","text":"Check the area outside the driver’s view before changing lanes."}});
  set("emergency-braking", {"example":{"word":"emergency braking","text":"Emergency braking stopped the car."},"exampleSynonym":{"word":"hard braking","text":"Hard braking stopped the car."}});
  set("cancellation", {"example":{"word":"cancellation","text":"The cancellation of the flight upset passengers."},"exampleSynonym":{"word":"calling off","text":"Calling off the flight upset passengers."}});
  set("hyperthyroidism", {"example":{"word":"hyperthyroidism","text":"The patient has hyperthyroidism."},"exampleSynonym":{"word":"overactive thyroid","text":"The patient has an overactive thyroid."}});
  set("arbitrate", {"example":{"word":"arbitrate","text":"They chose to arbitrate a dispute."},"exampleSynonym":{"word":"settle a dispute by arbitration","text":"They chose to settle a dispute by arbitration."}});
  set("infrastructure", {"example":{"word":"infrastructure","text":"The town repaired its infrastructure after flooding."},"exampleSynonym":{"word":"essential facilities","text":"The town repaired its essential facilities after flooding."}});
  set("auction", {"example":{"word":"auction","text":"The auction raised money for the museum."},"exampleSynonym":{"word":"sale by competitive bidding","text":"The sale by competitive bidding raised money for the museum."}});
  set("criminalize", {"example":{"word":"criminalize","text":"The law could criminalize this behavior."},"exampleSynonym":{"word":"make a criminal offence","text":"The law could make a criminal offence of this behavior."}});
})();
