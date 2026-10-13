(()=>{const u={
  tree:{definition:'A perennial woody plant, usually with a trunk and branches, that grows to a considerable height; also, a diagram or structure with branching parts. As a verb, to force an animal up a tree or raise something into a tree-like position.',synonyms:['woody plant','branching diagram','force into a tree']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['tree-2','tree-3','tree-4','tree-of-the-sapotaceae-family']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
