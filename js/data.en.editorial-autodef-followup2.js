/* Curated replacements for literal auto-definition examples.
 * Batch size: 8 paired records selected for clear, natural usage.
 */
(()=>{
  const d=globalThis.DICCIONARIOS?.en; if(!d)return;
  const set=(id,fields)=>{const entry=d.find(x=>x.id===id);if(entry)Object.assign(entry,fields);};
  set("habit-2", {"example":{"word":"Habit","text":"The habit of checking the lock before bed became a custom in the household."},"exampleSynonym":{"word":"custom","text":"Checking the lock before bed became a custom in the household."}});
  set("cheerful-3", {"example":{"word":"cheerful","text":"A cheerful welcome felt joyful, pleasant, and sincere."},"exampleSynonym":{"word":"Joyful, pleasant","text":"A cheerful welcome felt joyful, pleasant, and sincere."}});
  set("justice-2", {"example":{"word":"Justice","text":"Justice requires the judicial system to hear both sides."},"exampleSynonym":{"word":"judicial system","text":"The judicial system must hear both sides before ruling."}});
  set("challenge-3", {"example":{"word":"Challenge","text":"The challenge between the rivals turned into a duel at dawn."},"exampleSynonym":{"word":"duel","text":"The rivals settled their dispute with a duel at dawn."}});
  set("courage-2", {"example":{"word":"Courage","text":"She showed courage and boldness in the face of danger."},"exampleSynonym":{"word":"boldness in the face of danger","text":"Her boldness in the face of danger inspired the whole crew."}});
  set("connect-4", {"example":{"word":"Connect","text":"Researchers connect the two findings and put together a shared explanation."},"exampleSynonym":{"word":"put together","text":"Researchers put together the two findings into a shared explanation."}});
  set("expand-4", {"example":{"word":"Expand","text":"The library will expand its hours and increase evening access."},"exampleSynonym":{"word":"increase","text":"The library will increase its hours for evening visitors."}});
  set("contain", {"example":{"word":"contain","text":"This box can contain six books and have room for a notebook."},"exampleSynonym":{"word":"have","text":"This box can have six books inside, with room for a notebook."}});
})();
