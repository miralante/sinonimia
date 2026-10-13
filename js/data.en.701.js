(()=>{const u={
  trapezoidal:{definition:'Having the shape of a trapezoid, or relating to a trapezoid.',synonyms:['trapezoid-shaped']},
  trapper:{definition:'A person who catches wild animals with traps, especially for their fur or meat.',synonyms:['animal trapper','fur trapper']},
  trapping:{definition:'The act or practice of catching animals with traps; also, material or accessories used as trim or ornament.',synonyms:['trapping animals','furnishings','trimmings']},
  trappist:{definition:'A member of a Roman Catholic Cistercian order known for a strict monastic observance; also, relating to this order.',synonyms:['Cistercian of the Strict Observance']},
  trash:{definition:'Discarded or worthless material; something of very poor quality. As a verb, to damage a place or criticize something harshly.',synonyms:['rubbish','garbage','junk','vilify']},
  'trash-can':{definition:'A container for rubbish or waste; chiefly North American.',synonyms:['garbage can','waste bin','rubbish bin']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['trapezoidal-2','trapiche','trap-it','trapped-6','trapper-2','trapping-2','trasalpine','trascode','trascount','trasfretano','trasfuguism','trash-2','trash-3','trash-4','trash-5','trash-8','trashboard','trash-can-2','trash-can-3']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
