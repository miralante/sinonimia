/* Reviewed English dictionary updates for batch 1971. */
(()=>{
  const updates={
    thrust:{translation:{es:"empujar"}},
    hilt:{translation:{es:"empunadura"}},
    "in-love":{translation:null},
    enamor:{translation:{es:"enamorar"}},
    dwarf:{translation:{es:"enano"}},
    header:{translation:{es:"encabezado"}},
    enchase:{translation:{es:"engastar"}},
    alluring:{translation:{es:"atractivo"}},
    charming:{definition:"Pleasant or delightful in a way that inspires affection or admiration.",synonyms:["delightful","engaging","winsome","captivating"],example:{word:"charming",text:"The charming village welcomed visitors with its old stone bridge."},exampleSynonym:{word:"delightful",text:"The delightful village welcomed visitors with its old stone bridge."},translation:{es:"encantador"}},
    hooded:{translation:{es:"encapuchado"}},
    wriggle:{definition:"To twist or move with short, irregular, writhing movements; to get free by twisting the body.",synonyms:["squirm","twist","writhe","wiggle"],example:{word:"wriggle",text:"The puppy tried to wriggle out of the child's arms."},exampleSynonym:{word:"squirm",text:"The puppy tried to squirm out of the child's arms."},translation:{es:"culebrear"}},
    caring:{definition:"Showing kindness, concern, or attention to other people.",synonyms:["kind","compassionate","considerate","concerned"],example:{word:"caring",text:"A caring neighbor checked on the family during the storm."},exampleSynonym:{word:"compassionate",text:"A compassionate neighbor checked on the family during the storm."},translation:null},
    "fuck-3":{definition:"Extremely vulgar. To have sexual intercourse with someone; also used in other vulgar senses, often as an expletive or insult.",synonyms:["have sex with","sleep with","screw"],example:{word:"fuck",text:"The novel uses the vulgar verb fuck in dialogue between the characters."},exampleSynonym:{word:"sleep with",text:"The novel uses the phrase sleep with in dialogue between the characters."},translation:{es:"culear"}},
    "timid":{translation:{es:"cuitado"}},
    "soap-opera":{translation:{es:"culebron"}}
  };
  for(const[id,fields]of Object.entries(updates)){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);for(const[key,value]of Object.entries(fields)){if(key==='translation'&&value===null)delete row.translation;else row[key]=value;}}
  const removed=['cuis','work-10','butt-2','wandering-2','ancient-artillery-piece'];
  DICCIONARIOS.en=DICCIONARIOS.en.filter(e=>!removed.includes(e.id));
  const culverin={id:'culverin',word:'culverin',image:{id:7024,alt:'A dictionary word'},definition:'Historical. A long-range cannon used mainly from the 15th through the 17th centuries; the word also referred to an early hand-held firearm.',synonyms:['historical cannon','long-range cannon','early musket'],example:{word:'culverin',text:'The museum displayed a 16th-century culverin beside the other naval guns.'},exampleSynonym:{word:'historical cannon',text:'The museum displayed a 16th-century historical cannon beside the other naval guns.'},situacion:'vida-diaria',translation:{es:'culebrina'}};
  if(DICCIONARIOS.en.some(e=>e.id===culverin.id))throw Error('Duplicate en/culverin');
  DICCIONARIOS.en.push(culverin);
  for(const language of ['es','en'])for(const row of DICCIONARIOS[language]){const key=language==='es'?'en':'es',value=row.translation?.[key];if(!value)continue;const kept=(Array.isArray(value)?value:[value]).filter(id=>!removed.includes(id));if(kept.length)row.translation={...row.translation,[key]:Array.isArray(value)?kept:kept[0]};else delete row.translation;}
})();
