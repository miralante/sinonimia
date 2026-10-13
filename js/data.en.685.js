(()=>{const u={
  tortilla:{definition:'A thin, round flatbread made from corn or wheat flour, common in Mexican and Central American cooking; also, a Spanish omelet made with eggs and often potatoes.',synonyms:['corn tortilla','flour tortilla','Spanish omelet']},
  'tortilla-2':{definition:'In heraldry, a roundel or circular charge on a shield.',synonyms:['roundel']},
  torture:{definition:'The infliction of severe physical or mental suffering to punish, coerce, or obtain information; also, to cause such suffering or to strain or distort something.',synonyms:['torment','agony','severe pain','anguish']},
  toss:{definition:'To throw something lightly or carelessly; to throw or fling with force; to move or turn something from side to side; also, an act of tossing.',synonyms:['throw','fling','flip','hurl']},
  'toss-and-turn':{definition:'To move restlessly in bed while trying to sleep.',synonyms:['turn restlessly','shift about in bed']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['torte-2','tortuously-2','torture-2','torture-3']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
