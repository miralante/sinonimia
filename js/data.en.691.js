(()=>{const u={
  trail:{definition:'A path or track through the countryside; a mark or series of signs left behind; also, to follow or come behind someone or something, or to drag loosely along a surface.',synonyms:['path','track','footpath','follow','drag']},
  trailer:{definition:'A vehicle designed to be pulled by another vehicle; also, a short promotional preview of a film or programme, or a person or thing that follows behind.',synonyms:['towed vehicle','film preview','one that follows']},
  train:{definition:'A connected series of rail vehicles pulled or powered as a unit; also, to teach or prepare a person or animal through instruction and practice.',synonyms:['railway train','instruct','coach','prepare']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['traganickel','tragontine','tragonery','tragony','trail-2','trail-3','trailer-2','trailer-3','trailer-4','train-2','train-3','train-4','train-5','train-6','train-7']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
