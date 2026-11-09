/* Curated replacements for literal auto-definition examples.
 * Batch size: 15 paired records from mixed alphabet sections.
 */
(()=>{
  const d=globalThis.DICCIONARIOS?.en; if(!d)return;
  const set=(id,fields)=>{const entry=d.find(x=>x.id===id);if(entry)Object.assign(entry,fields);};
  set("mortuary-2", {"example":{"word":"Mortuary","text":"The mortuary prepared the room before the family arrived."},"exampleSynonym":{"word":"funeral home","text":"The funeral home prepared the room before the family arrived."}});
  set("gentle-2", {"example":{"word":"Gentle","text":"The gentle nurse spoke softly to the child."},"exampleSynonym":{"word":"nice","text":"The nice nurse spoke softly to the child."}});
  set("hurt-2", {"example":{"word":"hurt","text":"The fall hurt his knee badly."},"exampleSynonym":{"word":"cause serious injury","text":"The fall could cause serious injury to his knee."}});
  set("competition-2", {"example":{"word":"Competition","text":"The competition drew teams from five schools."},"exampleSynonym":{"word":"contest","text":"The contest drew teams from five schools."}});
  set("soda-2", {"example":{"word":"soda","text":"She poured soda into a glass of ice."},"exampleSynonym":{"word":"drink","text":"She poured a drink into a glass of ice."}});
  set("chiltepe", {"example":{"word":"Chiltepe","text":"Chiltepe is a variety of hot chili used in the regional salsa."},"exampleSynonym":{"word":"A variety of hot chili","text":"A variety of hot chili gave the regional salsa a sharp bite."}});
  set("company-committee", {"example":{"word":"company committee","text":"The company committee negotiated a safer work schedule."},"exampleSynonym":{"word":"worker representatives","text":"Worker representatives negotiated a safer work schedule."}});
  set("semasiological", {"example":{"word":"Semasiological","text":"The semasiological analysis traces how the word's meaning changed over time."},"exampleSynonym":{"word":"related to semasiology","text":"The analysis related to semasiology traces how the word's meaning changed over time."}});
  set("shroud-2", {"example":{"word":"Shroud","text":"The attendants had to shroud the body before the funeral."},"exampleSynonym":{"word":"put a shroud on the deceased","text":"The attendants had to put a shroud on the deceased before the funeral."}});
  set("low-ground-3", {"example":{"word":"low ground","text":"The low ground flooded after days of rain."},"exampleSynonym":{"word":"Low, uncultivated land, populated with wild and dense vegetation, such as bushes and undergrowth","text":"The low, uncultivated land, populated with wild and dense vegetation, such as bushes and undergrowth, flooded after days of rain."}});
  set("slug-4", {"example":{"word":"slug","text":"A slug crossed the garden path after the rain."},"exampleSynonym":{"word":"Pulmonary gastropod mollusk, without shell or with a rudimentary shell, which secretes a clear and sticky slime as it moves","text":"A pulmonary gastropod mollusk, without shell or with a rudimentary shell, which secretes a clear and sticky slime as it moves crossed the garden path after the rain."}});
  set("cornuto", {"example":{"word":"Cornuto","text":"The cornuto figure appeared on the old seal."},"exampleSynonym":{"word":"that has horns","text":"An animal that has horns appeared on the old seal."}});
  set("coronal", {"example":{"word":"Coronal","text":"The coronal suture is visible on the skull model."},"exampleSynonym":{"word":"related to crown","text":"The ridge related to crown anatomy is visible on the skull model."}});
  set("servitude-2", {"example":{"word":"Servitude","text":"He escaped servitude under the cruel governor."},"exampleSynonym":{"word":"state of submission to an authority","text":"He escaped a state of submission to an authority under the cruel governor."}});
  set("bullfighting-8", {"example":{"word":"Bullfighting","text":"The bullfighting poster hung beside the arena entrance."},"exampleSynonym":{"word":"related to bullfighting","text":"The poster was related to bullfighting and hung beside the arena entrance."}});
})();
