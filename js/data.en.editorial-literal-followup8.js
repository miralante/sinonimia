/* Curated literal-example repairs for 17 English records. */
(()=>{
  const d=globalThis.DICCIONARIOS?.en; if(!d)return;
  const set=(id,fields)=>{const entry=d.find(x=>x.id===id);if(entry)Object.assign(entry,fields);};
  set("diagnose", {"exampleSynonym":{"word":"identify a condition","text":"The clinician used the test to identify a condition."}});
  set("annihilate", {"exampleSynonym":{"word":"completely destroy","text":"The storm could completely destroy the old pier."}});
  set("anonymity", {"exampleSynonym":{"word":"without giving their names","text":"The survey lets participants respond without giving their names."}});
  set("antisocial", {"exampleSynonym":{"word":"unsociable","text":"He became more unsociable after moving to the village."}});
  set("formalize", {"exampleSynonym":{"word":"make the partnership official","text":"They will make the partnership official."}});
  set("automaticity", {"exampleSynonym":{"word":"automatic character","text":"Practice gave the movements an automatic character."}});
  set("ashen", {"exampleSynonym":{"word":"ashy","text":"His face looked ashy when he heard the news."}});
  set("entrench", {"exampleSynonym":{"word":"fortify the town with trenches","text":"The defenders chose to fortify the town with trenches."}});
  set("ballistic", {"exampleSynonym":{"word":"projectile-related","text":"They requested a projectile-related analysis of the bullet."}});
  set("barcarolle", {"example":{"word":"barcarolle","text":"The pianist played a barcarolle."},"exampleSynonym":{"word":"barcarole","text":"The pianist played a barcarole."}});
  set("ambush", {"exampleSynonym":{"word":"surprise attack","text":"The soldiers planned a surprise attack beside the road."}});
  set("biliterate", {"exampleSynonym":{"word":"literate in two languages","text":"She is literate in two languages."}});
  set("biodynamics", {"exampleSynonym":{"word":"biodynamic agriculture","text":"The vineyard uses biodynamic agriculture."}});
  set("bioelement", {"exampleSynonym":{"word":"biological element","text":"Carbon is a biological element."}});
  set("bitters", {"exampleSynonym":{"word":"herbal bitters","text":"The bartender served herbal bitters."}});
  set("bovid", {"exampleSynonym":{"word":"member of the Bovidae family","text":"An antelope is a member of the Bovidae family."}});
  set("legal-interdiction", {"example":{"word":"legal interdiction","text":"The court reviewed the legal interdiction."},"exampleSynonym":{"word":"judicial interdiction","text":"The judge reviewed a judicial interdiction."}});
})();
