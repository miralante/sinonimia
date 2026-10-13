(()=>{const ids=new Set(['recent-3','recently-2','receptionist-2','recess-3','recess-5','recess-6']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 'recent-2':{definition:'Having been acquired, obtained, or added not long ago.',synonyms:['newly acquired','recently obtained']},
 recently:{definition:'Not long ago; in the recent past.',synonyms:['lately','not long ago','of late']},
 receptionist:{definition:'A person who welcomes visitors, answers enquiries, and handles communications at an office or other organization.',synonyms:['front desk clerk','reception desk staff']},
 recess:{definition:'A break or pause in activity, especially in a court or legislative session; also, a hollow or indentation. As a verb, to suspend proceedings temporarily or set something into a surrounding surface.',synonyms:['break','pause','indentation','suspend a session']},
 recessed:{definition:'Set back into a wall, ceiling, or other surrounding surface.',synonyms:['set back','sunken','built-in']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
