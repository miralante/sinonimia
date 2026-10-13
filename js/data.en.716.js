(()=>{const u={
  trumpeter:{definition:'A person who plays the trumpet; also, a bird such as a trumpeter swan.',synonyms:['trumpet player','trumpeter swan (in compound names)']},
  'trumpet-tree':{definition:'A tropical American tree of the genus Cecropia, with a hollow trunk and large, lobed leaves.',synonyms:['Cecropia','trumpetwood']},
  truncated:{definition:'Cut short by removing part of the end; in geometry, having a vertex or vertices cut off by a plane.',synonyms:['shortened','cut off','beveled (in geometry)']},
  truncheon:{definition:'A short, thick stick carried by police as a weapon; also, a baton or staff symbolizing authority.',synonyms:['baton','nightstick','club']},
  trunk:{definition:'The main stem of a tree; the torso of a person or animal; a large storage chest; a car’s rear luggage compartment; or an elephant’s long, flexible nose.',synonyms:['tree stem','torso','chest','boot (UK, car)','elephant’s nose']},
  trunking:{definition:'A system of channels or ducts used to enclose and route electrical cables or pipes; in telecommunications, the use or arrangement of trunk lines.',synonyms:['cable ducting','cable trunk','trunk-line system']},
  trust:{definition:'Noun: confidence in someone or something, or a legal arrangement for managing property for beneficiaries. Verb: to believe in someone’s reliability or to place property or responsibility in someone’s care.',synonyms:['confidence','reliance','rely on','entrust']},
  trustee:{definition:'A person or organization legally appointed to hold or manage property or assets for another person or group, including beneficiaries or creditors.',synonyms:['fiduciary','administrator','trust manager']},
  trustor:{definition:'A person who creates a trust and transfers property or assets to it.',synonyms:['settlor','grantor']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['truncated-2','truncated-4','truncheon-2','trunk-2','trunk-3','trunk-4','trunk-8','trunk-9','trust-2','trustee-2','trustee-3','trustee-4','trustee-5']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
