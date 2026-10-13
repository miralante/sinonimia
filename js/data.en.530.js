(()=>{const ids=new Set(['recruiter-2','rectifiable-2','rectony','rectum-intestine','recudero']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 recruiter:{definition:'A person who seeks and attracts candidates for jobs, military service, or membership in an organization.',synonyms:['talent scout','hiring agent','enlistment officer']},
 rectifiable:{definition:'Able to be corrected, repaired, or made straight.',synonyms:['correctable','repairable','capable of being straightened']},
 rectify:{definition:'To correct an error or problem, make something right, or add what is missing.',synonyms:['correct','fix','remedy','make right']},
 rectilinear:{definition:'Characterized by, composed of, or moving in straight lines.',synonyms:['straight-lined','linear']},
 rector:{definition:'The head of a university or college in some countries; also, a member of the clergy who leads a parish or church.',synonyms:['university president','parish priest','church leader']},
 rectory:{definition:'A house provided as the residence of a rector or parish priest.',synonyms:['parsonage','clergy residence']},
 recumbent:{definition:'Lying down or reclining, especially in a position of rest.',synonyms:['reclining','lying down','prostrate']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
