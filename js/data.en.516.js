(()=>{const ids=new Set(['rearguard-2','rearguard-3','rearrange-2','reason-2','reason-3','reason-4','reasonable-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 'rear-camera':{definition:'A camera mounted at the rear of a vehicle that shows the area behind it, especially while reversing.',synonyms:['backup camera','reversing camera','rearview camera']},
 rearguard:{definition:'The soldiers or other members of a force positioned at the rear, especially to protect the main body during movement or retreat.',synonyms:['rear guard','rear security force']},
 reargue:{definition:'To argue a point again or present new arguments about an issue already discussed.',synonyms:['argue again','debate again','reopen an argument']},
 rearing:{definition:'The act of raising or bringing up a person or animal; also, the action of a horse rising onto its hind legs.',synonyms:['raising','upbringing','standing on hind legs']},
 'rear-view-mirror':{definition:'A mirror inside a vehicle that allows the driver to see the area behind the vehicle.',synonyms:['rearview mirror','rear vision mirror']},
 reason:{definition:'A cause or explanation for an action, event, or belief; the faculty of logical thought. As a verb, to think logically or draw conclusions.',synonyms:['cause','explanation','rationale','logic','think logically']},
 reasonable:{definition:'Fair, sensible, or acceptable in the circumstances; not excessive in amount, degree, or cost; based on reason.',synonyms:['fair','sensible','moderate','rational']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
