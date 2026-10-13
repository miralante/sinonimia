(()=>{const u={
  toner:{definition:'A fine powder used in laser printers and photocopiers; also, a liquid cosmetic or hair product used to refresh, color, or condition.',synonyms:['printer toner','toning lotion']},
  tongs:{definition:'A gripping tool made of two arms joined at one end, used to pick up, hold, or manipulate objects.',synonyms:['pincers','gripping tool','pair of tongs']},
  tongue:{definition:'The muscular organ in the mouth used for tasting, swallowing, and speech; also, a language, a manner of speaking, or a projecting part shaped like a tongue.',synonyms:['lingual organ','language','speech']},
  tonic:{definition:'An invigorating or restorative medicine or drink; a carbonated drink flavored with quinine; also, relating to or providing tone or vigor.',synonyms:['restorative','tonic water','invigorating']},
  tonicity:{definition:'The state of muscular tension or firmness; in physiology, the relative osmotic pressure of a solution compared with another.',synonyms:['muscle tone','osmotic pressure']},
  toning:{definition:'The act or process of giving something a particular tone, color, or degree of firmness.',synonyms:['coloring','firming']},
  'tonsillitis':{definition:'Inflammation of one or both tonsils, often caused by a viral or bacterial infection.',synonyms:['inflamed tonsils']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['toner-2','tongs-2','tongs-3','tongs-4','tongue-2','tongue-3','tongue-4','tongue-5','tongue-6','tongued','tongued-2','tongue-shop','tonsillitis-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
