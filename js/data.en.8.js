/* Reviewed English dictionary updates for batch 1972. */
(()=>{
  const updates={
    lighter:{translation:{es:'encendedor'}},
    light:{translation:{es:['ligero','iluminar','encender']}},
    'turn-on':{definition:"Phrasal verb. To start a device, light, or supply by using its control; to make someone feel interested or excited, especially sexually. As a noun, something that causes such interest or excitement.",synonyms:['switch on','activate','excite','arouse'],example:{word:'turn on',text:'Please turn on the lamp before the guests arrive.'},exampleSynonym:{word:'switch on',text:'Please switch on the lamp before the guests arrive.'},translation:{es:'encender'}},
    encyclopedia:{translation:{es:'enciclopedia'}},
    lazy:{translation:{es:'culero'}},
    over:{translation:null},
    pregnant:{translation:null},
    crossroads:{translation:{es:'encrucijada'}},
    feeble:{translation:{es:'debil'}},
    enemy:{translation:null},
    foe:{translation:null},
    coolie:{word:'coolie',definition:'Historical, now highly offensive. A term used for an Asian manual laborer, especially in colonial contexts; also used as a racial slur.',synonyms:['historical laborer (offensive term)'],example:{word:'coolie',text:'The historian explained that coolie is an offensive historical term for Asian laborers.'},exampleSynonym:{word:'historical laborer (offensive term)',text:'The archive labeled the entry “historical laborer (offensive term)” to explain the old word coolie.'},translation:{es:'culi'}},
    culminate:{translation:{es:'culminar'}},
    culmen:{translation:{es:'culmen'}}
  };
  for(const[id,fields]of Object.entries(updates)){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);for(const[key,value]of Object.entries(fields)){if(key==='translation'&&value===null)delete row.translation;else row[key]=value;}}
  const removed=['lazy-10','evade-2'];
  DICCIONARIOS.en=DICCIONARIOS.en.filter(e=>!removed.includes(e.id));
  for(const language of ['es','en'])for(const row of DICCIONARIOS[language]){const key=language==='es'?'en':'es',value=row.translation?.[key];if(!value)continue;const kept=(Array.isArray(value)?value:[value]).filter(id=>!removed.includes(id));if(kept.length)row.translation={...row.translation,[key]:Array.isArray(value)?kept:kept[0]};else delete row.translation;}
})();
