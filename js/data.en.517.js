(()=>{const ids=new Set(['reasonably-2','reasonably-3','reassure-2','rebel-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 reasonably:{definition:'In a sensible, fair, or moderate way; to a satisfactory or fairly good degree; or at a price that is not too high.',synonyms:['sensibly','fairly','moderately','inexpensively']},
 'reasonable-adjustment':{definition:'A change to a rule, practice, environment, or support that helps remove a substantial disadvantage for a disabled person; legal duties and terminology vary by jurisdiction.',synonyms:['disability accommodation','workplace adjustment','reasonable accommodation']},
 reasoned:{definition:'Based on careful thought, logical argument, or evidence.',synonyms:['considered','logical','well-founded']},
 reasoner:{definition:'A person who thinks logically or draws conclusions by reasoning.',synonyms:['thinker','logician']},
 reasoning:{definition:'The process or ability of thinking logically and drawing conclusions.',synonyms:['inference','logical thought','reason']},
 reassure:{definition:'To restore or strengthen someone’s confidence or reduce their fear by saying or doing something comforting.',synonyms:['comfort','put at ease','allay someone’s fears']},
 reata:{definition:'In the southwestern United States, a long rope or lariat used for catching livestock.',synonyms:['lariat','lasso']},
 reattachment:{definition:'The act or result of attaching something again; in medicine, the surgical restoration of a severed or detached body part.',synonyms:['reattaching','reconnection','surgical replantation']},
 rebel:{definition:'A person who resists established authority; as a verb, to resist or rise up against authority or control.',synonyms:['insurgent','revolutionary','resist','revolt']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
