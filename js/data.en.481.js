(()=>{const ids=new Set(['punch-5','punch-6','punch-7','punch-9','punch-10','punch-11','punch-12','punch-14','punched-2','puncher-2','punching-2','punchout','punctual-2','punctuality-2','puncture-2','puncture-4','puncture-5','puncture-6']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 punch:{definition:'To strike with the fist; also, a forceful blow, a tool for making holes, or a mixed drink, depending on context.',synonyms:['hit','strike','blow','hole punch','mixed drink','impact']},
 'punch-8':{definition:'A hand tool or machine with a sharp or hollow end, used to make holes or cut shapes in material.',synonyms:['hole punch','perforating tool','hollow punch','leather punch']},
 punchbowl:{definition:'A large bowl used for preparing or serving punch.',synonyms:['punch bowl','serving bowl for punch']},
 'punch-bowl':{definition:'Variant spelling of punchbowl: a large bowl used to prepare or serve punch.',synonyms:['punchbowl','punch bowl']},
 puncher:{synonyms:['boxer','perforator','hole-punching tool']},
 'punch-out':{definition:'A hole or piece cut out by punching; also, the act of making such an opening.',synonyms:['cutout','punched opening','punching out']},
 punctuous:{definition:'Overly or affectedly solemn, earnest, or ceremonious; also, oily or greasy in older usage.',synonyms:['unctuous','overly solemn','affectedly earnest']},
 puncture:{definition:'To make a small hole with a sharp object; also, the hole or wound so made. In medicine, a puncture may be performed with a needle to draw fluid or take a sample.',synonyms:['pierce','perforate','small hole','needle puncture']},
 'puncture-3':{definition:'A medical procedure in which a needle or other instrument is inserted through tissue to withdraw fluid or obtain a sample.',synonyms:['needle puncture','aspiration (when fluid is withdrawn)','sampling puncture']}
};for(const [id,p] of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
