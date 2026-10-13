(()=>{const u={
 enrejadura:{definition:'Herida causada por la reja del arado en los pies de bueyes o caballerías.',synonyms:['herida de arado','lesión por la reja'],example:{word:'enrejadura',text:'La enrejadura obligó a curar la pata del animal.'},exampleSynonym:{word:'herida de arado',text:'La herida de arado obligó a curar la pata del animal.'}},
 enrobinarse:{definition:'En Aragón y Albacete, cubrirse de robín u óxido; enmohecerse.',synonyms:['oxidarse','enmohecerse','cubrirse de herrumbre'],example:{word:'enrobinarse',text:'La herramienta empezó a enrobinarse al quedar a la intemperie.'},exampleSynonym:{word:'oxidarse',text:'La herramienta empezó a oxidarse al quedar a la intemperie.'}}
};for(const [id,p] of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(!r)throw Error('Missing es/'+id);Object.assign(r,p);delete r.translation;}})();
(()=>{const ids=new Set(['enrobrescido']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
