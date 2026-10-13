(()=>{const u={
  traceability:{definition:'The ability to follow the origin, processing, and movement of a product, material, or record through successive stages.',synonyms:['traceable history','tracking capability']},
  tracer:{definition:'A person or device that traces or follows something; also, a substance or marker used to track a process.',synonyms:['tracker','tracking marker']},
  trachea:{definition:'The windpipe: the tube that carries air between the larynx and the bronchi.',synonyms:['windpipe']},
  track:{definition:'A mark or path left by a person, animal, or vehicle; a route, railway line, racing course, music recording, or continuous band around a vehicle’s wheels. As a verb, to follow or monitor someone or something.',synonyms:['trail','footprint','route','racecourse','recording','follow','monitor']},
  tracker:{definition:'A person, device, or program that follows the tracks, location, or progress of someone or something.',synonyms:['tracking device','monitor']},
  tractor:{definition:'A powerful motor vehicle used especially for pulling farm machinery; also, a truck unit designed to pull a trailer.',synonyms:['farm tractor','truck tractor']},
  trade:{definition:'The buying, selling, or exchange of goods and services; a skilled occupation; also, to buy, sell, or exchange goods.',synonyms:['commerce','business','exchange','occupation']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['trache','tracheo','trachy','track-2','track-4','track-5','tract-2','tractor-2','tractor-3','trade-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
