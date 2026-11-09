/* Curated literal-example repairs for 15 English records. */
(()=>{
  const d=globalThis.DICCIONARIOS?.en; if(!d)return;
  const set=(id,fields)=>{const entry=d.find(x=>x.id===id);if(entry)Object.assign(entry,fields);};
  set("headboard", {"exampleSynonym":{"word":"bed panel","text":"She rested against the bed panel."}});
  set("autoimmunity", {"exampleSynonym":{"word":"self-reactivity","text":"Autoimmunity is immune self-reactivity."}});
  set("anaphylactic", {"exampleSynonym":{"word":"anaphylaxis-related","text":"The patient had an anaphylaxis-related reaction."}});
  set("beatify", {"exampleSynonym":{"word":"declare someone blessed","text":"The church can declare someone blessed."}});
  set("falchion", {"exampleSynonym":{"word":"curved single-edged sword","text":"A falchion is a curved single-edged sword."}});
  set("bronchorrhage", {"exampleSynonym":{"word":"bronchial hemorrhage","text":"The report described a bronchial hemorrhage."}});
  set("bronchial", {"exampleSynonym":{"word":"relating to the bronchi","text":"Bronchial means relating to the bronchi."}});
  set("knighthood", {"exampleSynonym":{"word":"honorary title","text":"A knighthood is an honorary title."}});
  set("cabochon", {"exampleSynonym":{"word":"cabochon-cut gem","text":"The ring held a cabochon-cut gem."}});
  set("caddy", {"exampleSynonym":{"word":"tea caddy","text":"She stored tea in a tea caddy."}});
  set("biliary", {"exampleSynonym":{"word":"relating to the biliary tract","text":"The condition is biliary, relating to the biliary tract."}});
  set("disinheritance", {"exampleSynonym":{"word":"excluding an heir from an inheritance","text":"The will included a clause excluding an heir from an inheritance."}});
  set("exoneration", {"example":{"word":"exoneration","text":"New evidence led to exoneration."},"exampleSynonym":{"word":"clearing someone of blame","text":"New evidence helped in clearing someone of blame for the theft."}});
  set("defenselessness", {"example":{"word":"defenselessness","text":"Defenselessness can make legal proceedings unfair."},"exampleSynonym":{"word":"inability to defend oneself","text":"Inability to defend oneself can be frightening."}});
  set("interoperability", {"exampleSynonym":{"word":"exchange data between systems","text":"Interoperability lets agencies exchange data between systems."}});
})();
