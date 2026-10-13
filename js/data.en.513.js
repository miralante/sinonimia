(()=>{const ids=new Set(['reaction-2','read-3','read-4','readable-2','readership-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 reaction:{definition:'An action or change that occurs in response to a stimulus, event, or other action; also, opposition to political or social change.',synonyms:['response','repercussion','opposition','backlash']},
 reactor:{definition:'A device or vessel in which a nuclear or chemical reaction is initiated, controlled, or sustained.',synonyms:['nuclear reactor','reaction vessel']},
 readership:{definition:'The readers of a publication, author, or other body of written work; also, the position or office of a reader at a university.',synonyms:['audience','reading public','readers']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
