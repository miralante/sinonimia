(()=>{const ids=new Set(['redundant-2','redundant-3','reed-3','reed-4','reed-5','reedifier','reed-or-wicker-basket']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 redundant:{definition:'Unnecessary because something else performs the same function; excessive or repeated without need. In UK employment, also describing a worker whose job has been eliminated.',synonyms:['superfluous','unnecessary','surplus','repetitive']},
 redwing:{definition:'A thrush, Turdus iliacus, with red-orange patches beneath its wings and along its flanks; it is a winter visitor to Britain and much of western Europe.',synonyms:['Turdus iliacus','redwing thrush']},
 reedbed:{definition:'An area of wet ground covered mainly with reeds.',synonyms:['reed bed','reed marsh','reed swamp']},
 'reed-bed':{definition:'An area of wet ground where reeds grow densely.',synonyms:['reedbed','reed marsh']},
 reedit:{definition:'To edit something again, especially to revise or improve an earlier version.',synonyms:['edit again','revise','re-edit']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
