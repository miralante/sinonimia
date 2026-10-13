(()=>{const ids=new Set(['quaker-2','quaker-3','quaker-4','quaker-5','quakerism-2','qualification-2','quality-2','quantifier-2','quarantine-2','quarantine-3','quarantine-4','quarantine-zone-2','quarango']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 quaker:{definition:'A member of the Religious Society of Friends, a Christian movement founded in seventeenth-century England; lowercase quaker can also mean someone who quakes or trembles.',synonyms:['Friend','member of the Society of Friends','trembler (lowercase, rare)']},
 qualification:{definition:'A skill, experience, or condition that makes someone suitable for a role; a credential such as a degree or certificate; or a detail that limits or modifies a statement.',synonyms:['credential','eligibility','qualification requirement','reservation']},
 qualified:{definition:'Having the training, experience, or credentials required for a particular role; also, limited or modified by a reservation or condition.',synonyms:['eligible','certified','competent','limited (of a statement)']},
 qualify:{definition:'To meet the requirements for something; to make someone eligible; or to modify a statement by adding a limitation or detail.',synonyms:['be eligible','meet the requirements','modify','limit']},
 'qualifying-2':{definition:'Capable of being qualified or made eligible.',synonyms:['eligible','meeting requirements']},
 'qualifying-3':{definition:'Serving to modify or limit the meaning of another word or statement.',synonyms:['modifying','limiting','descriptive']},
 qualifier:{definition:'A word or phrase that modifies or limits another expression; also, a person or thing that meets the requirements for a contest or position.',synonyms:['modifier','limiting expression','qualifying entrant']},
 'quality-of-strength':{definition:'A degree or measure of strength.',synonyms:['strength level','degree of strength']},
 quantifier:{definition:'A word or symbol that indicates quantity or amount; in logic, an operator such as “all” or “some” that specifies how many objects satisfy a statement.',synonyms:['quantity word','logical operator']},
 quantify:{definition:'To measure or express the amount or number of something.',synonyms:['measure','count','express numerically']},
 quantum:{synonyms:['discrete amount','quantum of energy','quantity']},
 quarantine:{definition:'A period of isolation, or the act of isolating people, animals, or goods that may carry an infectious disease to prevent its spread.',synonyms:['isolation','isolation period','separation']},
 'quarantine-zone':{definition:'An area where people, animals, or goods are kept apart to prevent the spread of an infectious disease.',synonyms:['isolation area','restricted area']}
};for(const [id,p] of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
