/* Reviewed English dictionary updates for batch 1973. */
(()=>{
  const updates={
    cultivatedly:{definition:'Rare. In a cultured, educated, or refined manner.',synonyms:['refinedly','with cultivation'],example:{word:'cultivatedly',text:'She spoke cultivatedly about the history of the paintings.'},exampleSynonym:{word:'refinedly',text:'She spoke refinedly about the history of the paintings.'},translation:{es:'cultamente'}},
    culture:{word:'culture',definition:'The shared customs, beliefs, arts, knowledge, and social practices of a group; also, the cultivation or development of the mind, tastes, or a living organism.',synonyms:['customs','traditions','civilization','cultivation'],example:{word:'culture',text:'The museum explores the culture and traditions of the region.'},exampleSynonym:{word:'traditions',text:'The museum explores the traditions and shared practices of the region.'},translation:null},
    culteranist:{definition:'Relating to culteranism, the ornate and erudite literary style associated with Spanish Baroque writing; also, a writer who practices that style.',synonyms:['culteranism practitioner','Gongorist'],example:{word:'culteranist',text:'The critic described the poem as culteranist because of its elaborate syntax and learned allusions.'},exampleSynonym:{word:'Gongorist',text:'The critic described the poem as Gongorist because of its elaborate syntax and learned allusions.'},translation:{es:'culterano'}},
    cultivator:{definition:'A person who grows crops or tends plants; also, a farm implement used to loosen soil and control weeds.',synonyms:['farmer','grower','tiller','farm implement'],example:{word:'cultivator',text:'The cultivator prepared the soil before the spring planting.'},exampleSynonym:{word:'tiller',text:'The tiller prepared the soil before the spring planting.'},translation:{es:'cultor'}},
    madden:{translation:{es:['enfurecer','exasperar','enloquecer']}},
    emphasize:{translation:{es:'enfatizar'}},
    disease:{translation:{es:'enfermedad'}},
    illness:{translation:{es:['enfermedad','dolencia']}},
    sickness:{translation:{es:['enfermedad','mareo']}},
    sickly:{translation:{es:['enfermizo','debil','empalagoso']}},
    ill:{translation:null},
    unwell:{translation:null},
    ailing:{translation:{es:'achacoso'}},
    focus:{translation:{es:['enfoque','centrar','enfocar','concentrar']}}
  };
  for(const[id,fields]of Object.entries(updates)){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);for(const[key,value]of Object.entries(fields)){if(key==='translation'&&value===null)delete row.translation;else row[key]=value;}}
  const removed=['cultry','cultivator-2'];
  DICCIONARIOS.en=DICCIONARIOS.en.filter(e=>!removed.includes(e.id));
  for(const language of ['es','en'])for(const row of DICCIONARIOS[language]){const key=language==='es'?'en':'es',value=row.translation?.[key];if(!value)continue;const kept=(Array.isArray(value)?value:[value]).filter(id=>!removed.includes(id));if(kept.length)row.translation={...row.translation,[key]:Array.isArray(value)?kept:kept[0]};else delete row.translation;}
})();
