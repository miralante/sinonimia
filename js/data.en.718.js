(()=>{const u={
  tuck:{definition:'Verb: to push, fold, or put something neatly into a particular place; also, to make a tuck in fabric. Noun: a fold or pleat in fabric.',synonyms:['fold','push in','put away','pleat']},
  'tuck-in':{definition:'Phrasal verb: to eat eagerly; also, to tuck someone into bed or arrange bedding around them.',synonyms:['eat heartily','put to bed','wrap in bedding']},
  tufa:{definition:'A porous rock, usually calcium carbonate, deposited by springs or streams; distinct from volcanic tuff.',synonyms:['calcareous tufa','spring-deposited limestone']},
  tuff:{definition:'A relatively soft rock formed from compacted volcanic ash and other volcanic fragments.',synonyms:['volcanic tuff','pyroclastic rock']},
  tuft:{definition:'A small bunch or cluster of hair, feathers, grass, or similar material; as a verb, to decorate or furnish with tufts.',synonyms:['clump','bunch','crest','decorate with tufts']},
  tufted:{definition:'Having one or more tufts, especially a small raised bunch of hair, feathers, or fibers.',synonyms:['tuft-bearing','crested','cushioned (of furniture)']},
  tug:{definition:'To pull something hard or repeatedly; also, a strong pull or a small powerful boat used for towing.',synonyms:['pull','yank','haul','towboat']},
  tulip:{definition:'A spring-flowering bulbous plant of the genus Tulipa, typically with a single cup-shaped flower.',synonyms:['Tulipa','bulbous flower']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['tuck-2','tuck-3','tuck-4','tuft-2','tuft-3','tufted-2','tufted-3','tufted-4','tufted-5']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
