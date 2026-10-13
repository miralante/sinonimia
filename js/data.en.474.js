(()=>{const ids=new Set(['psychiatry-2','psychiatry-3','psychic-2','psychoanalysis-2','psychological-2','psychologist-2','psychology-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 psychoanalysis:{definition:'A method of psychological treatment and a theory of mental processes that explore unconscious thoughts, feelings, and conflicts.',synonyms:['analytic therapy','Freudian analysis (historical school)','depth psychology (broader)']},
 psychoanalytic:{definition:'Relating to psychoanalysis or its theories and methods.',synonyms:['analytic','Freudian (specific school/context)']},
 psychoanalyze:{definition:'To examine a person’s thoughts, feelings, or behavior using psychoanalytic methods.',synonyms:['analyze psychoanalytically','treat with psychoanalysis']},
 psychodynamic:{definition:'Relating to the interaction of conscious and unconscious mental processes, especially as understood in psychodynamic theories.',synonyms:['psychological (broader)','psychoanalytic (related, not identical)']},
 psychogogy:{definition:'The art or practice of guiding or influencing the mind or inner life; a rare term.',synonyms:['guidance of the mind','mental guidance']},
 psychokinesis:{definition:'The purported ability to affect or move objects through mental activity without a known physical interaction.',synonyms:['telekinesis','PK']},
 psycholinguistic:{definition:'Relating to psycholinguistics, the study of how people acquire, understand, and produce language.',synonyms:['relating to language processing','psycholinguistics-related']},
 'psychological-support':{definition:'Emotional or practical assistance intended to help someone cope with stress or maintain mental well-being; it may be provided by trained professionals or support networks.',synonyms:['emotional support','mental health support','psychosocial support']},
 psychometrics:{definition:'The theory and practice of measuring psychological traits, abilities, and states, often through standardized tests.',synonyms:['psychological measurement','mental testing']},
 psychometrist:{definition:'A specialist who administers, scores, or helps interpret psychological or neuropsychological tests.',synonyms:['psychological testing specialist','psychometrics specialist']},
 'psychomotor-skills':{definition:'Abilities to coordinate movement with sensory and cognitive processes, such as hand-eye coordination or controlled fine movement.',synonyms:['sensorimotor skills','motor coordination skills']},
 psychopath:{definition:'A person described as showing a persistent pattern of callousness, manipulation, and antisocial behavior; “psychopath” is not a standalone formal diagnosis in the DSM.',synonyms:['person with psychopathic traits','person with marked antisocial traits (context-dependent)']}
};for(const [id,p] of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
