(()=>{const u={
  tunic:{definition:'A loose garment, usually extending to the hips or knees, worn over the upper body.',synonyms:['robe','loose shirt','long top']},
  tuning:{definition:'The act or process of adjusting an instrument, engine, or device to the desired pitch or operating condition; also, the resulting state of adjustment.',synonyms:['adjustment','calibration','pitch setting']},
  'tuna-boat':{definition:'A fishing boat used to catch tuna.',synonyms:['tuna fishing boat','tuna vessel']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['tunera','tungus','tune-4','tuning-2','tuning-3','tuning-4']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
