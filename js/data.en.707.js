(()=>{const u={
  triangularly:{definition:'In a triangular shape or manner.',synonyms:['in a triangle shape']},
  tribalism:{definition:'Strong loyalty to one’s own tribe, group, or community, sometimes combined with hostility toward outsiders; also, social organization based on tribes.',synonyms:['group loyalty','clannishness (in some contexts)']},
  tribunal:{definition:'A court or other body authorized to hear and decide legal or administrative disputes.',synonyms:['court','judicial body','panel']},
  tribunate:{definition:'In ancient Rome, the office or term of office of a tribune; also, the collective body of tribunes.',synonyms:['tribuneship','office of tribune']},
  tribune:{definition:'An elevated platform for public speaking; in ancient Rome, a magistrate or representative of the people; also, a newspaper or journal, especially one representing a particular viewpoint.',synonyms:['platform','Roman magistrate','newspaper']},
  tribadism:{definition:'Sexual activity involving genital contact between women.',synonyms:[]},
  trichinosis:{definition:'A parasitic disease caused by eating meat containing larvae of Trichinella worms; it can cause muscle pain and other symptoms.',synonyms:['trichinellosis']},
  trichloride:{definition:'A chemical compound containing three atoms of chlorine for each atom of another element.',synonyms:['trichloride compound']},
  trichotomy:{definition:'A division or classification into three parts or branches.',synonyms:['three-way division','three-part classification']},
  trichromy:{definition:'A printing process that reproduces colors by combining three primary color inks.',synonyms:['three-color printing','three-colour printing']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['tribune-2','tribute-2','tribute-3']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
