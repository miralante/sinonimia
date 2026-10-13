(()=>{const ids=new Set(['rattle-7','rattle-8','rattle-9']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 rattle:{definition:'To make a rapid series of short, hard sounds; to shake or move something so that it makes such sounds; also, a device or toy that makes a rattling sound.',synonyms:['clatter','shake','clatter noisily','rattle toy']},
 'rattle-3':{definition:'A percussion instrument that produces sound when shaken or struck, often by means of loose pieces inside or attached to it.',synonyms:['percussion rattle','shaker','idiophone']},
 'rattle-4':{definition:'To shake or move something so that it makes a rapid series of short, hard sounds.',synonyms:['shake','clatter']},
 'rattle-5':{definition:'A toy for an infant, usually with small loose objects that make a rattling sound when shaken.',synonyms:['baby rattle','infant shaker']},
 'rattle-6':{definition:'A rapid series of short, hard sounds; also, the act or sound of rattling.',synonyms:['clatter','rattling sound']},
 rattler:{definition:'A person or thing that rattles; especially, a rattlesnake.',synonyms:['rattlesnake','clattering object']},
 rattling:{definition:'A rapid series of short, hard sounds; making such sounds; also, very brisk or impressive in informal use.',synonyms:['clattering','brisk','impressive']},
 raucous:{definition:'Making a loud, harsh, or rough sound, especially of a voice or crowd.',synonyms:['harsh','raucous-sounding','boisterous']},
 ravager:{definition:'A person, force, or thing that causes severe damage or destruction.',synonyms:['destroyer','devastator','despoiler']},
 rave:{definition:'To speak or write wildly, excitedly, or angrily; also, to praise something with great enthusiasm.',synonyms:['rant','rhapsodize','praise enthusiastically']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
