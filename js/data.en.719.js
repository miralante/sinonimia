(()=>{const u={
  tumor:{definition:'An abnormal mass or growth of tissue; a tumor may be benign or malignant and is not necessarily cancerous. As an adjective, relating to a tumor.',synonyms:['neoplasm','growth','mass','tumoral']},
  tumult:{definition:'Noun: noisy confusion or disorder, especially among a crowd; a violent uprising; or intense agitation. Verb: to create a tumult or commotion.',synonyms:['uproar','commotion','disorder','agitate']},
  tuna:{definition:'A large, fast-swimming marine fish of the mackerel family, valued as food; also, the edible fruit of some prickly pear cacti.',synonyms:['tunny','prickly pear fruit (regional)']},
  'tuna-boat':{definition:'A fishing boat used to catch tuna.',synonyms:['tuna fishing boat','tuna vessel']},
  tuina:{definition:'A form of traditional Chinese therapeutic massage involving pressing, kneading, and other manual techniques.',synonyms:['Chinese therapeutic massage','tui na']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['tullify','tumbagovernment','tummy-2','tumor-2','tumor-3','tumor-4','tumult-2','tuna-2','tuna-3','tuna-fish']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
