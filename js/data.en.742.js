(()=>{const u={
  unembarrassed:{definition:'Not feeling or showing embarrassment; calm and self-assured in a situation that might cause embarrassment.',synonyms:['unabashed','unselfconscious','composed']},
  unembarrassedly:{definition:'Without embarrassment or self-consciousness.',synonyms:['unabashedly','without embarrassment','boldly']},
  unemployed:{definition:'Without paid work while able and available to work; in labor statistics, often defined more narrowly by whether a person is actively seeking work.',synonyms:['jobless','out of work','unemployed']},
  unemployment:{definition:'The state of being without paid work; also, the level or rate of joblessness in a population.',synonyms:['joblessness','lack of employment','unemployment rate (measure)']},
  unequal:{definition:'Not equal in measurement, quantity, number, degree, worth, or status; not uniform or evenly matched.',synonyms:['different','dissimilar','uneven','unmatched']},
  uneven:{definition:'Not level or smooth; varying or irregular in size, quality, shape, or distribution.',synonyms:['rough','irregular','unequal','variable']},
  unexpected:{definition:'Not anticipated, predicted, or foreseen.',synonyms:['unanticipated','surprising','unforeseen']},
  unexpectedly:{definition:'In a way that was not anticipated or predicted.',synonyms:['surprisingly','unforeseenly','without warning']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['unembed-2','unemployed-2','unemployed-3','unemployment-2','unemployment-3','undonate','unequal-2','uneven-2','uneven-3','uneven-4','unexpected-2','unexpected-3','unexpected-4','unexpectedly-2','unexpectedly-3','unexpectedly-4']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
