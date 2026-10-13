(()=>{const ids=new Set(['psychopath-2','psychopedagogue','psychosis-2','psychotherapy-2','ptolemaic-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 psychopathic:{definition:'Relating to psychopathy or to traits such as persistent callousness, manipulation, and antisocial behavior.',synonyms:['callous and manipulative (by context)','antisocial (not an exact synonym)','psychopathy-related']},
 psychopedagogy:{definition:'A field combining psychological and educational approaches to understand and support learning and development; the term is especially used in some educational traditions.',synonyms:['educational psychology (related field)','psychology of education']},
 psychopharmaceutical:{definition:'Relating to or denoting a drug that affects mental processes or is used in treating a mental disorder.',synonyms:['psychotropic drug','psychoactive medication','psychiatric medication']},
 psychophony:{definition:'A purported recording of voices or sounds attributed to spirits or the dead; a paranormal claim rather than an established communication method.',synonyms:['electronic voice phenomenon','spirit voice recording (claimed)']},
 psychophysical:{synonyms:['relating to psychophysics','mind-body-related']},
 psychophysics:{definition:'The branch of psychology that studies relationships between physical stimuli and the sensations or perceptions they produce.',synonyms:['psychological measurement of sensation','study of stimulus and perception']},
 psychophysiology:{synonyms:['physiological psychology (related field)','study of mind-body processes']},
 psychosis:{synonyms:['psychotic state','loss of contact with reality (description)','psychotic episode (one form)']},
 psychotechnician:{definition:'A person trained to administer or work with psychological or aptitude tests; a historical or regional occupational term.',synonyms:['psychological testing technician','test administrator']},
 psychotechnics:{definition:'Historical branch of applied psychology concerned with assessing abilities and aptitudes, especially for guidance or occupational selection.',synonyms:['applied psychological testing','vocational aptitude testing']},
 psychotherapist:{definition:'A trained professional who provides psychotherapy to help people address emotional, behavioral, or mental health concerns.',synonyms:['therapy provider','psychological therapist']},
 psychotropic:{definition:'Affecting the mind or mental processes; also, a drug that has such an effect.',synonyms:['psychoactive','mind-affecting','psychotropic drug']},
 psychrometer:{definition:'An instrument that estimates air humidity by comparing readings from dry-bulb and wet-bulb thermometers.',synonyms:['wet-and-dry-bulb hygrometer','humidity psychrometer']},
 pteridophyte:{definition:'A seedless vascular plant, such as a fern or horsetail, that reproduces by spores.',synonyms:['spore-producing vascular plant','fern ally (broader group)']},
 pterodactyl:{synonyms:['pterosaur (broadly)','Pterodactylus (the genus)']},
 ptomaine:{definition:'An older term for basic nitrogen-containing compounds formed during the bacterial decomposition of animal matter; the term is not a general synonym for food poisoning.',synonyms:['decomposition amine (historical term)','cadaverine or putrescine (examples, not exact synonyms)']},
 ptosis:{definition:'Abnormal drooping or downward displacement of an organ or body part, especially the upper eyelid.',synonyms:['drooping','eyelid droop (common type)','prolapse (some organs)']},
 ptyalin:{definition:'An older name for salivary alpha-amylase, the enzyme that begins the digestion of starch in the mouth.',synonyms:['salivary amylase','alpha-amylase']},
 puberal:{definition:'Relating to puberty or to the period when a person becomes sexually mature.',synonyms:['pubertal','adolescent (broader)']}
};for(const [id,p] of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
