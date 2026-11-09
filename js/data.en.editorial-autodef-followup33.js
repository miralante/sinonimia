/* Curated replacements for literal auto-definition examples.
 * Batch size: 15 paired records from mixed alphabet sections.
 */
(()=>{
  const d=globalThis.DICCIONARIOS?.en; if(!d)return;
  const set=(id,fields)=>{const entry=d.find(x=>x.id===id);if(entry)Object.assign(entry,fields);};
  set("modifiable", {"example":{"word":"Modifiable","text":"The design is modifiable, so the shelves can be rearranged."},"exampleSynonym":{"word":"capable of being modified","text":"The design is capable of being modified, so the shelves can be rearranged."}});
  set("mountainous", {"example":{"word":"Mountainous","text":"The mountainous route was closed after the snowfall."},"exampleSynonym":{"word":"related to mountains","text":"The route related to mountains was closed after the snowfall."}});
  set("superciliary", {"example":{"word":"Superciliary","text":"The superciliary ridge is visible above the eye."},"exampleSynonym":{"word":"what belongs to the eyebrows","text":"The report describes what belongs to the eyebrows as the superciliary region."}});
  set("supletism", {"example":{"word":"Supletism","text":"The linguistics class discussed supletism in irregular verb forms."},"exampleSynonym":{"word":"It is the use of a different form than the regular one for the same meaning","text":"The textbook explains supletism: it is the use of a different form than the regular one for the same meaning."}});
  set("colorimetric", {"example":{"word":"Colorimetric","text":"The lab used a colorimetric test to measure the dye concentration."},"exampleSynonym":{"word":"of or relating to colorimetry","text":"The lab used a method of or relating to colorimetry to measure the dye concentration."}});
  set("seismologist", {"example":{"word":"seismologist","text":"The seismologist examined the records after the earthquake."},"exampleSynonym":{"word":"earthquake","text":"The earthquake prompted the seismologist to examine the records."}});
  set("squeezer", {"example":{"word":"Squeezer","text":"The squeezer extracted juice from the last orange."},"exampleSynonym":{"word":"that squeezes or exerts pressure","text":"The device that squeezes or exerts pressure extracted juice from the last orange."}});
  set("reminder", {"example":{"word":"Reminder","text":"She set a reminder to call the clinic in the morning."},"exampleSynonym":{"word":"that serves to remember something or someone","text":"She set a note that serves to remember something or someone, then called the clinic in the morning."}});
  set("serpentiger", {"example":{"word":"Serpentiger","text":"The museum displayed a serpentiger figure carved from ivory."},"exampleSynonym":{"word":"that carries snakes","text":"The museum displayed a figure that carries snakes, carved from ivory."}});
  set("shield-2", {"example":{"word":"Shield","text":"The thick curtain helped shield the room from the afternoon sun."},"exampleSynonym":{"word":"protect strongly","text":"The thick curtain helped protect strongly against the afternoon sun."}});
  set("lighten-2", {"example":{"word":"Lighten","text":"They chose a pale paint to lighten the narrow hallway."},"exampleSynonym":{"word":"make something lighter","text":"They chose a pale paint to make something lighter in the narrow hallway."}});
  set("leaden-2", {"example":{"word":"Leaden","text":"A leaden sky hung over the harbor all morning."},"exampleSynonym":{"word":"Grayish in color, like lead","text":"The clouds were grayish in color, like lead, and covered the harbor all morning."}});
  set("gurgle-5", {"example":{"word":"gurgle","text":"Water began to gurgle through the old pipes."},"exampleSynonym":{"word":"produce gurgling","text":"Water began to produce gurgling sounds as it moved through the old pipes."}});
  set("manufacturer-2", {"example":{"word":"Manufacturer","text":"The manufacturer recalled the faulty kettle."},"exampleSynonym":{"word":"producer","text":"The producer recalled the faulty kettle."}});
  set("instrument-2", {"example":{"word":"Instrument","text":"The technician calibrated each instrument before the test."},"exampleSynonym":{"word":"tool","text":"The technician calibrated each tool before the test."}});
})();
