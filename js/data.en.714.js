(()=>{const u={
  trotters:{definition:'Plural of trotter: horses trained for harness racing, or the feet of pigs and some other animals used as food.',synonyms:['harness-racing horses','pig’s feet']},
  troubadour:{definition:'A medieval lyric poet and musician, especially one from southern France who composed and performed songs of courtly love.',synonyms:['medieval poet','minstrel','lyric poet']},
  troubledly:{definition:'In a worried, distressed, or unsettled manner.',synonyms:['anxiously','uneasily','distressfully']},
  troublemaker:{definition:'A person who deliberately causes problems, conflict, or disruption.',synonyms:['agitator','disrupter','instigator','brawler']},
  trough:{definition:'A long, narrow open container for water or animal feed; also, a channel or the lowest point of a wave or economic cycle.',synonyms:['feeding trough','channel','low point']},
  trousers:{definition:'A garment covering the body from the waist to the ankles, with a separate section for each leg.',synonyms:['pants','slacks']},
  trowel:{definition:'A small, flat-bladed hand tool used for spreading or shaping mortar, plaster, or cement, or for digging and planting.',synonyms:['mason’s trowel','hand trowel','bricklayer’s tool']},
  troy:{definition:'Of or relating to the troy system of weights used for precious metals and gemstones.',synonyms:['troy-weight']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['trouble-2','troublemaker-2','troublemaker-3','troublemaker-4','trough-2','trough-3','trough-4','trough-5','trousers-2','trousseau-2','trout-2','iron-digging-tool']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
