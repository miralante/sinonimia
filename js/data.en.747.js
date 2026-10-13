(()=>{const u={
  uninvite:{definition:'To withdraw or cancel an invitation previously given to someone.',synonyms:['withdraw an invitation','disinvite']},
  union:{definition:'The state of being joined together; also, an organized association, especially of workers formed to protect their shared interests.',synonyms:['joining','association','labor union']},
  unionism:{definition:'Support for or the principles of a unionist movement; especially, advocacy of maintaining a political union, or support for trade unions, depending on context.',synonyms:['unionist doctrine','trade unionism (in labor context)']},
  unionist:{definition:'A person who supports maintaining a political union, especially the union between Great Britain and Northern Ireland; also, in labor contexts, a trade union member or supporter.',synonyms:['supporter of political union','trade unionist (labor context)']},
  unison:{definition:'The simultaneous performance or utterance of the same sound, note, or words; also, agreement or harmony.',synonyms:['simultaneously','in harmony','accord']},
  unintelligibility:{definition:'The quality or state of being impossible or very difficult to understand.',synonyms:['incomprehensibility','obscurity','unclearness']},
  unintentionally:{definition:'Without conscious intention or deliberate choice; accidentally.',synonyms:['inadvertently','accidentally','without intending to']},
  univalve:{definition:'Having a single shell or valve; also, a mollusk with a single shell.',synonyms:['single-shelled','univalvular']},
  unite:{definition:'To bring people or things together as a group or whole, or to become joined; also, to agree or act together toward a common purpose.',synonyms:['join together','combine','bring together','come together']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['uniron','unison-2','unite-2','unite-with-gonces','unintentionally-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
