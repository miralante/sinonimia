(()=>{
 const updates={
  ova:{definition:"Plural of ovum: egg cells or female reproductive cells.",synonyms:["egg cells","ova (plural of ovum)"],example:{word:"ova",text:"The laboratory examined the ova under a microscope."},exampleSynonym:{word:"egg cells",text:"The laboratory examined the egg cells under a microscope."}},
  oval:{definition:"Adjective: shaped like an oval. Noun: an oval shape or object. Verb: to form or shape something into an oval.",synonyms:["elliptical","egg-shaped","ellipse (noun, related shape)"],example:{word:"oval",text:"They planted flowers around the oval lawn."},exampleSynonym:{word:"elliptical",text:"They planted flowers around the elliptical lawn."}},
  ovarian:{definition:"Relating to an ovary or the ovaries.",synonyms:["ovarial","relating to an ovary"],example:{word:"ovarian",text:"The scan showed a small ovarian cyst."},exampleSynonym:{word:"relating to an ovary",text:"The scan showed a small cyst relating to an ovary."}},
  ovariotomy:{definition:"A surgical incision into an ovary; in historical use, sometimes used for an operation involving removal of an ovary.",synonyms:["ovary incision","ovariotomy (historical operation)"],example:{word:"ovariotomy",text:"The historical case report described an ovariotomy to treat an ovarian cyst."},exampleSynonym:{word:"ovary incision",text:"The historical case report described an ovary incision to treat an ovarian cyst."}},
  oven:{definition:"An enclosed heated compartment used for cooking or baking food; also, a small furnace or kiln used for heating materials such as metals.",synonyms:["cooking oven","baking oven","furnace (specialized use)","kiln (specialized use)"],example:{word:"oven",text:"She baked the bread in a hot oven."},exampleSynonym:{word:"baking oven",text:"She baked the bread in a hot baking oven."}}
 };
 for(const [id,patch] of Object.entries(updates)){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);Object.assign(row,patch);delete row.translation;}
 for(const id of ['oval-2','oval-3','oven-2','oven-3','oven-4'])if(!DICCIONARIOS.en.some(e=>e.id===id))throw Error('Missing en/'+id);
 DICCIONARIOS.en=DICCIONARIOS.en.filter(e=>!['oval-2','oval-3','oven-2','oven-3','oven-4'].includes(e.id));
})();
