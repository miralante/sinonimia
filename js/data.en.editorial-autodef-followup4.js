/* Curated replacements for literal auto-definition examples.
 * Batch size: 9 paired records from the B section.
 */
(()=>{
  const d=globalThis.DICCIONARIOS?.en; if(!d)return;
  const set=(id,fields)=>{const entry=d.find(x=>x.id===id);if(entry)Object.assign(entry,fields);};
  set("beach-flag-2", {"example":{"word":"beach flag","text":"The beach flag, a lifesaving flag, warned swimmers to stay out of the water."},"exampleSynonym":{"word":"lifesaving flag","text":"The lifesaving flag warned swimmers to stay out of the water."}});
  set("bluetooth-2", {"example":{"word":"Bluetooth","text":"Bluetooth creates a wireless connection between the phone and the speaker."},"exampleSynonym":{"word":"wireless connection","text":"The wireless connection linked the phone and the speaker."}});
  set("box-office-4", {"example":{"word":"Box office","text":"The box office clerk, a person who sells tickets for a show, handed us two tickets."},"exampleSynonym":{"word":"person who sells tickets for a show","text":"The person who sells tickets for a show handed us two tickets."}});
  set("boyish-2", {"example":{"word":"boyish","text":"His boyish jokes seemed immature during the formal dinner."},"exampleSynonym":{"word":"immature","text":"His immature jokes seemed out of place during the formal dinner."}});
  set("breakable-2", {"example":{"word":"Breakable","text":"The breakable glass is an item that can be broken easily."},"exampleSynonym":{"word":"That can be broken","text":"The glass is an item that can be broken easily."}});
  set("busy-6", {"example":{"word":"Busy","text":"The busy market is frequented by local shoppers each morning."},"exampleSynonym":{"word":"frequented","text":"The market is frequented by local shoppers each morning."}});
  set("burrito", {"example":{"word":"Burrito","text":"The burrito is a typical Mexican delicacy filled with beans and cheese."},"exampleSynonym":{"word":"typical Mexican delicacy","text":"This typical Mexican delicacy is filled with beans and cheese."}});
  set("bye-2", {"example":{"word":"Bye","text":"She waved bye and said goodbye at the station."},"exampleSynonym":{"word":"goodbye","text":"She waved and said goodbye at the station."}});
  set("bonus-2", {"example":{"word":"Bonus","text":"The company gave staff a bonus as a Christmas extra payment."},"exampleSynonym":{"word":"Christmas extra payment","text":"The company gave staff a Christmas extra payment at year-end."}});
})();
