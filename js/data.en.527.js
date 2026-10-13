(()=>{const ids=new Set(['reconventional','recooker','record-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 recondemn:{definition:'To condemn or denounce someone or something again.',synonyms:['condemn again','denounce again']},
 reconquer:{definition:'To conquer or regain control of a place, territory, or people that had been lost.',synonyms:['recapture','retake','regain']},
 reconqueror:{definition:'A person who reconquers a place or territory.',synonyms:['reconquerer','conqueror']},
 reconsider:{definition:'To think about or examine something again, especially with a view to changing a decision.',synonyms:['review','rethink','reassess']},
 reconstruct:{definition:'To build or create something again; to reorganize a system; or to use available evidence to form an account of a past event.',synonyms:['rebuild','recreate','restore','piece together']},
 recontented:{definition:'Satisfied or pleased again after a period of dissatisfaction.',synonyms:['satisfied again','content again']},
 reconvalesce:{definition:'To return to convalescence or recover again after a setback in recovery.',synonyms:['recover again','resume convalescence']},
 reconvert:{definition:'To convert or change something back to its previous form, state, or use.',synonyms:['change back','restore','convert again']},
 record:{definition:'A written, electronic, or other account of information or events; a best or highest achievement. As a verb, to write down, capture, or register information, sound, or images.',synonyms:['account','document','register','achievement']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
