(()=>{const u={
  trigon:{definition:'An archaic or technical term for a triangle; also, an ancient triangular harp or lyre.',synonyms:['triangle','triangular lyre']},
  trihedron:{definition:'A geometric figure formed by three planes meeting at a point.',synonyms:['three-plane angle']},
  trill:{definition:'A rapid alternation between two musical notes; also, to produce such a sound, as a bird may.',synonyms:['warble','quaver','trillate']},
  trim:{definition:'Noun: decorative edging or material used to finish an edge; also, neat condition or arrangement. Verb: to cut, make neat, decorate, or adjust.',synonyms:['edging','border','cut','neaten','adjust']},
  trimer:{definition:'A molecule formed by the combination of three monomer units.',synonyms:['three-unit polymer']},
  trimmings:{definition:'Decorative borders or accessories used to finish clothing or furnishings; also, small pieces cut off in trimming.',synonyms:['edgings','ornamentation','cuttings']},
  trio:{definition:'A group or set of three people or things; also, a musical composition for three performers or parts.',synonyms:['triple','threesome','ensemble']},
  tripartite:{definition:'Adjective: divided into or consisting of three parts, or shared among three parties. Verb: to divide into three parts.',synonyms:['three-part','three-way','divide into three']},
  tripe:{definition:'The edible lining of the stomach of a ruminant, especially a cow; informal nonsense or rubbish.',synonyms:['offal','stomach lining','nonsense']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['trigger-2','trigger-3','trigonal-2','triliter','trillionth-2','trinket-2','trinket-3','trip-2','trip-3','trip-4','tripad']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
