(()=>{const u={
  traffic:{definition:'The movement of vehicles, people, or aircraft along a route; the exchange or dealing of goods; especially illegal trade; or the volume of visitors or data moving through a place or network. As a verb, to trade or deal in goods, or to move through an area.',synonyms:['road traffic','movement','trade','illegal trade','network activity']},
  'traffic-circle':{definition:'A circular road junction where vehicles travel around a central island before taking an exit.',synonyms:['roundabout','rotary']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['traffic-2','traffic-4','traffic-5','traffic-6','traffic-cone-2','traffic-diversion-2','traffic-light-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
