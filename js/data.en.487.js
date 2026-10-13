(()=>{const ids=new Set(['pyrgano','pyrography-2','pyromania-2','pyrophylacio','pyroxene-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 pyretology:{definition:'Medicine, obsolete. The study or discussion of fevers.',synonyms:['study of fevers','fever medicine']},
 pyrography:{definition:'The art or process of decorating wood or another material by burning designs into its surface with a heated tool.',synonyms:['wood burning','fire writing']},
 pyrolatry:{definition:'The worship of fire.',synonyms:['fire worship','fire veneration']},
 pyrology:{definition:'The study of fire and its properties.',synonyms:['study of fire','fire science']},
 pyrosphere:{definition:'Geology, historical. A hypothesized hot or molten zone beneath the lithosphere, associated with igneous activity.',synonyms:['hypothetical molten zone','zone of igneous activity']},
 pyromancer:{definition:'A person who practices pyromancy, divination by interpreting fire.',synonyms:['fire diviner','pyromant']},
 pyromania:{definition:'A rare impulse-control disorder involving repeated, deliberate fire-setting associated with inner tension before and relief or gratification afterward.',synonyms:['pathological fire-setting','fire-setting disorder']},
 pyrometry:{definition:'Physics. The measurement of high temperatures, especially by noncontact methods.',synonyms:['high-temperature measurement','temperature measurement']},
 pyrethrum:{definition:'A plant of the genus Tanacetum (formerly Pyrethrum), especially T. cinerariifolium, whose dried flower heads yield a natural insecticide.',synonyms:['insect flower','Tanacetum cinerariifolium']},
 pyrexia:{definition:'Abnormally high body temperature; fever.',synonyms:['fever','febrile condition']},
 pyric:{definition:'Of, relating to, or caused by fire; especially, relating to fireworks.',synonyms:['fiery','fire-related','pyrotechnic']},
 pyrimidine:{definition:'A nitrogen-containing heterocyclic compound that forms the basis of cytosine, thymine, and uracil; also, any derivative of this compound.',synonyms:['nitrogen heterocycle','pyrimidine base']},
 pyrogallic:{definition:'Of or relating to pyrogallol or pyrogallol-based compounds.',synonyms:['related to pyrogallol','pyrogallol-based']},
 pyrogallol:{definition:'A colorless crystalline compound, also called pyrogallic acid, used as a reducing agent and in chemical analysis.',synonyms:['pyrogallic acid','benzene-1,2,3-triol']},
 pyrotechnic:{definition:'Of or relating to fireworks or the art of making them; also, a person skilled in making fireworks.',synonyms:['firework-related','firework maker']},
 pyrotechnics:{definition:'The art, craft, or science of making and using fireworks; also, a fireworks display.',synonyms:['firework making','fireworks display']}
};for(const [id,p] of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
