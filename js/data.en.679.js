(()=>{const u={
  tomato:{definition:'The edible fruit of the tomato plant, usually red but also found in other colors; also, the plant itself (Solanum lycopersicum).',synonyms:['tomato fruit','tomato plant']},
  'tomato-tree':{definition:'A small evergreen tree, Solanum betaceum, cultivated for its edible, egg-shaped fruit; also called tamarillo.',synonyms:['tamarillo','tree tomato']},
  tone:{definition:'The sound quality or pitch of a voice or instrument; a particular attitude or manner; a shade of color; also, to give a particular quality or shade, or to tune an instrument.',synonyms:['pitch','timbre','manner','shade','tune']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['tomato-2','tomato-3','tomato-4','tomato-5','tomato-6','tomato-7','tomato-8','tombilla','tomboy-2','tomboy-3','tondino']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
