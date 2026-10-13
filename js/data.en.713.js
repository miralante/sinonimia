(()=>{const u={
  trolley:{definition:'A small wheeled cart; also, a trolleybus or the pole or wheel that connects an electric vehicle to overhead wires.',synonyms:['cart','trolleybus','collector pole']},
  troop:{definition:'A group of soldiers or other people; also, a cavalry unit or a group of scouts.',synonyms:['squad','company','group','cavalry unit']},
  tropical:{definition:'Of, relating to, or characteristic of the tropics or the hot, humid regions near the equator.',synonyms:['equatorial','torrid','hot-climate']},
  troposphere:{definition:'The lowest layer of Earth’s atmosphere, extending from the surface to the tropopause and containing most weather.',synonyms:['lower atmosphere']},
  trotter:{definition:'A horse trained to trot in harness races; also, a pig’s or other animal’s foot used as food.',synonyms:['harness-racing horse','pig’s foot']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['troll-2','trolling','tromper','tromping','tronancin','troop-2','troop-3','trooping','tropical-america-tree','trotter-2','trivia-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));
const r=DICCIONARIOS.en.find(x=>x.id==='tropical');if(r)r.synonyms=r.synonyms.filter(s=>s!=='pompous');})();
