(()=>{const ids=new Set(['radiation-2','radiator-2','radicalize-2','radicoculture','radioactivity-2','radio-beacon-2','radio-listener-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 radiance:{definition:'A bright or glowing light; also, a quality of great happiness, beauty, or warmth.',synonyms:['brightness','glow','brilliance','luster']},
 radiant:{definition:'Sending out light or heat; shining brightly. Also, showing great happiness, health, or beauty.',synonyms:['shining','glowing','bright','beaming']},
 radiation:{definition:'Energy emitted or transmitted as waves or particles, including electromagnetic waves and particle radiation; some forms can be harmful at sufficient doses.',synonyms:['emitted energy','electromagnetic radiation','particle radiation']},
 radiator:{definition:'A device that transfers heat to a room, commonly using hot water, steam, or electricity; also, a vehicle component that removes heat from engine coolant.',synonyms:['heat emitter','heating unit','engine cooler']},
 radicalism:{definition:'The belief or movement advocating fundamental or far-reaching political or social change.',synonyms:['radical ideology','political extremism (in some contexts)','fundamental reformism']},
 radicality:{definition:'The quality or degree of being radical, fundamental, or far-reaching.',synonyms:['radical character','fundamentality']},
 radicalize:{synonyms:['make more radical','become radicalized','radicalise']},
 radically:{synonyms:['fundamentally','completely','drastically','in a radial direction']},
 radio:{definition:'Noun: the transmission or reception of sound by radio waves; a device that receives radio broadcasts. Adjective: relating to radio waves or radio communication.',synonyms:['wireless broadcasting','radio receiver','radiocommunication']},
 radioactivity:{synonyms:['radioactive decay','nuclear radiation','radioactive emission']},
 'radio-amateur':{definition:'A person who operates radio equipment as a noncommercial hobby, often under a license.',synonyms:['amateur radio operator','ham radio operator']},
 'radio-astronomy':{definition:'The branch of astronomy that studies celestial objects and phenomena by detecting radio waves.',synonyms:['radio astronomy','radio-wave astronomy']},
 'radio-beacon':{definition:'A radio transmitter that continuously or periodically sends signals used to determine position or aid navigation.',synonyms:['navigation beacon','radio transmitter beacon']},
 'radio-direction-finder':{definition:'An electronic device that determines the direction from which a radio signal is received.',synonyms:['radio direction finder','radio compass']},
 radioelectric:{definition:'Of or relating to radio waves, radio-frequency energy, or radio communication.',synonyms:['radio-frequency','radio-related']},
 radioelectricity:{definition:'The generation, propagation, and reception of radio waves; radio-frequency electricity.',synonyms:['radio-frequency energy','radio waves']},
 'radio-galaxy':{definition:'A galaxy that emits unusually strong radio waves, often from regions around its central black hole.',synonyms:['radio-emitting galaxy','radio source galaxy']},
 radioimmunoassay:{definition:'A laboratory technique that measures an antigen or antibody using a radioactive label.',synonyms:['RIA','radioactive immunoassay']},
 radioisotope:{definition:'A radioactive isotope of a chemical element.',synonyms:['radionuclide','radioactive isotope']},
 'radio-link':{definition:'A communication connection that carries information between points by radio waves.',synonyms:['radio connection','wireless link']},
 'radio-listener':{definition:'A person who listens to radio broadcasts.',synonyms:['radio audience member','listener']}
};for(const [id,p] of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
