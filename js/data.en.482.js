(()=>{const ids=new Set(['puncture-7','puncture-8','puncture-9','puncture-10','puncture-11','puncture-12','pundonor','punga','punish-2','punishing-beard','punishment-4','punishment-5','punitive-2','punitive-3','puppet-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 'punicaceous':{definition:'Relating to the botanical family Punicaceae, a historical family grouping that included the pomegranate; the genus Punica is now placed in Lythraceae by many modern classifications.',synonyms:['Punicaceae-related','pomegranate-family (historical classification)']},
 pungent:{definition:'Having a sharply strong smell or taste; also, expressed in a biting, forceful, or incisive way.',synonyms:['sharp','strong-smelling','acrid (for taste or smell)','incisive (for remarks)']},
 punish:{synonyms:['penalize','discipline','sanction']},
 punishability:{definition:'The state or quality of being liable to punishment.',synonyms:['liability to punishment','punishableness']},
 punishable:{definition:'Liable or deserving to be punished under a rule or law.',synonyms:['liable to punishment','penalizable','sanctionable']},
 punisher:{definition:'A person or thing that punishes.',synonyms:['disciplinarian','enforcer','one who imposes a penalty']},
 punishment:{definition:'A penalty imposed for breaking a law, rule, or standard of conduct; also, an unpleasant or burdensome experience.',synonyms:['penalty','sanction','discipline','retribution (in some contexts)']},
 punitive:{synonyms:['penalizing','intended as punishment','retributive (in some contexts)']},
 pupil:{synonyms:['student','learner','schoolchild (by age/context)']},
 pupillary:{synonyms:['relating to the pupil of the eye','pupil-related']}
};for(const [id,p] of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
