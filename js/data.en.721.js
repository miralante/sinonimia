(()=>{const u={
  turbit:{definition:'A breed of domestic pigeon with a short beak, a peaked crest, and a ruffled breast.',synonyms:['crested pigeon','frilled pigeon']},
  turbid:{definition:'Cloudy or opaque because of suspended particles; figuratively, confused or obscure.',synonyms:['cloudy','murky','opaque','confused (figurative)']},
  turbidity:{definition:'The degree to which a liquid is cloudy or opaque because of suspended particles; also, a confused or obscure quality.',synonyms:['cloudiness','murkiness','opacity']},
  turbocharger:{definition:'A device that uses a turbine driven by exhaust gases to compress air entering an internal-combustion engine, increasing its power.',synonyms:['turbo','exhaust-gas turbocharger']},
  turbopump:{definition:'A pump driven by a turbine, especially one that supplies propellant to a rocket engine.',synonyms:['turbine-driven pump']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['tuno','tupamaro','tupplen','turbider','turbidity-2','turbidity-3','turbine-2','turbo','tune-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
