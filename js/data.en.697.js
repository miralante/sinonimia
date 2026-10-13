(()=>{const u={
  translucency:{definition:'The quality of allowing light to pass through while scattering it so that objects on the other side are not seen clearly.',synonyms:['semi-transparency','translucent quality']},
  transmitter:{definition:'A person or device that sends or conveys a signal, message, or other material; in electronics, a device that sends radio or other signals.',synonyms:['sender','broadcasting device','signal transmitter']},
  transmarine:{definition:'Located beyond the sea or coming from across the sea.',synonyms:['overseas','across the sea']},
  transmediterranean:{definition:'Crossing, extending across, or relating to the Mediterranean Sea.',synonyms:['across the Mediterranean']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['translucent-2','translucent-3','translucent-4','translucent-5','translucent-6','transmatte','transmigrate-2','transmorning']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
