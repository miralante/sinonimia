(()=>{const ids=new Set(['recoco','recognize-2','recognize-3','recoil-2','recoil-3']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 recoct:{definition:'To cook, boil, or prepare something again; also, to heat a substance again in a process such as metallurgy.',synonyms:['cook again','boil again','reheat']},
 recode:{definition:'To encode or convert data, text, or a program into a different code or format; to encode it again.',synonyms:['encode again','convert code','rewrite']},
 recognize:{definition:'To identify someone or something from previous experience; to acknowledge a fact, achievement, or right; or to formally accept or approve something.',synonyms:['identify','acknowledge','admit','accept']},
 recognized:{definition:'Known, acknowledged, or officially accepted; also, appreciative of a kindness or favor in a less common use.',synonyms:['acknowledged','established','appreciative']},
 recognizer:{definition:'A person or device that identifies or acknowledges someone or something.',synonyms:['identifier','detection system','acknowledger']},
 recoil:{definition:'A sudden backward movement or reaction; as a verb, to spring or move back, often from shock, fear, or impact.',synonyms:['spring back','rebound','flinch']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
