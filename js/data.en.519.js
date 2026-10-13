(()=>{const ids=new Set(['rebotics','rebound-4','rebreaker','rebudiate','rebuke-2','rebuke-3']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 rebound:{definition:'To spring, bounce, or move back after striking a surface; also, a recovery or renewed increase after a decline, and in basketball, a ball recovered after a missed shot.',synonyms:['bounce back','spring back','recovery','basketball rebound']},
 rebounder:{definition:'A person or device that rebounds; in basketball, a player who is especially effective at recovering missed shots.',synonyms:['basketball rebound specialist','rebounding player']},
 rebozo:{definition:'A long, rectangular shawl traditionally worn by women in Mexico; it may also be used to carry a child or bundle.',synonyms:['Mexican shawl','wrap','scarf']},
 rebrand:{definition:'To give a product, company, or organization a new brand identity, name, or public image.',synonyms:['rename','reposition','give a new brand identity']},
 're-break':{definition:'To break something again, or to break it into smaller pieces after it has already been broken.',synonyms:['break again','break into smaller pieces']},
 rebuke:{definition:'To criticize or reprimand someone sharply.',synonyms:['reprimand','scold','reproach']},
 rebuker:{definition:'A person who rebukes or criticizes someone.',synonyms:['critic','reprover','admonisher']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
