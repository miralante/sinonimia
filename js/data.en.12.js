/* Reviewed English dictionary updates for batch 1976. */
(()=>{
  const updates={
    die:{definition:"Verb: to stop living or to cease functioning or existing. Noun: a small cube used in games, or a tool used to cut or shape material.",synonyms:["perish","expire","cease to exist","cutting tool","game cube"],example:{word:"die",text:"The die stamped the coin, and the machine did not die after the press overheated."},exampleSynonym:{word:"cutting tool",text:"The cutting tool stamped the coin, and the machine did not die after the press overheated."},translation:{es:["fallecer","troquel"]}},
    coupe:{definition:"A car with a fixed roof and usually two doors, often with a sloping rear; also, historically, a closed horse-drawn carriage.",synonyms:["two-door car","sports car","closed carriage"],example:{word:"coupe",text:"They chose a compact coupe with two doors and a sloping roof."},exampleSynonym:{word:"two-door car",text:"They chose a compact two-door car with a sloping roof."},translation:{es:"cupe"}},
    "couplet":{definition:"Two successive lines of verse, usually forming a unit and often rhyming with each other.",synonyms:["pair of lines","rhyming couplet","two-line stanza"],example:{word:"couplet",text:"The poem ends with a couplet whose two lines rhyme."},exampleSynonym:{word:"rhyming couplet",text:"The poem ends with a rhyming couplet."},translation:null},
    tune:{definition:"Noun: a pleasing sequence of musical notes; also, a general attitude or setting. Verb: to adjust an instrument or device to the correct pitch or setting, or to bring something into harmony.",synonyms:["melody","air","attitude","adjust","calibrate","harmonize"],example:{word:"tune",text:"She tuned the guitar before playing a familiar tune."},exampleSynonym:{word:"melody",text:"She adjusted the guitar before playing a familiar melody."},translation:{es:["actitud","ajustar","sintonizar"]}},
    cupressaceous:{definition:"Of or relating to the cypress family, Cupressaceae, a family of evergreen coniferous trees and shrubs that includes cypresses and junipers.",synonyms:["of the cypress family","cupressaceous plant"],example:{word:"cupressaceous",text:"The botanist identified the juniper as a cupressaceous shrub."},exampleSynonym:{word:"of the cypress family",text:"The botanist identified the juniper as a shrub of the cypress family."},translation:{es:"cupresaceo"}},
    chieftain:{definition:"A leader of a people, clan, or tribal group.",synonyms:["chief","leader","head of a clan"],example:{word:"chieftain",text:"The chieftain welcomed the visitors to the village."},exampleSynonym:{word:"chief",text:"The chief welcomed the visitors to the village."},translation:{es:"curaca"}},
    curatorship:{definition:"The position, work, or authority of a curator; in an arts context, the work of selecting and organizing objects for an exhibition.",synonyms:["curatorial work","curator's role"],example:{word:"curatorship",text:"Her curatorship of the exhibition brought together works from several collections."},exampleSynonym:{word:"curatorial work",text:"Her curatorial work on the exhibition brought together works from several collections."},translation:{es:"curaduria"}},
    healing:{definition:"Noun: the process of becoming healthy or whole again after illness or injury. Adjective: tending to heal or promote recovery.",synonyms:["recovery","recuperation","restoration","curative"],example:{word:"healing",text:"The wound is healing well, and the patient has returned to normal activities."},exampleSynonym:{word:"recovery",text:"The recovery from the wound is progressing well, and the patient has returned to normal activities."},translation:{es:"curativo"}},
    "former-political-boss":{translation:null},
    "regarding-priests":{translation:null},
    "tune-3":{translation:null},
    trainer:{translation:{es:["entrenador","instructor"]}},
    coach:{translation:{es:["autocar","vagon","entrenador"]}},
    meanwhile:{translation:null},
    entertain:{translation:{es:["entretener","agasajar","considerar"]}},
    interviewer:{translation:{es:"entrevistador"}},
    interview:{translation:{es:["entrevistar","interrogar"]}},
    meddler:{translation:{es:["entrometido","metomentodo","fisgon"]}},
    enthusiasm:{translation:{es:"entusiasmo"}},
    envoy:{translation:{es:"representante"}},
    envy:{translation:{es:["envidia","envidiar","codiciar"]}}
  };
  for(const[id,fields]of Object.entries(updates)){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);for(const[key,value]of Object.entries(fields)){if(key==='translation'&&value===null)delete row.translation;else row[key]=value;}}
  const removed=['former-political-boss','regarding-priests','tune-3'];
  DICCIONARIOS.en=DICCIONARIOS.en.filter(e=>!removed.includes(e.id));
  for(const language of ['es','en'])for(const row of DICCIONARIOS[language]){const key=language==='es'?'en':'es',value=row.translation?.[key];if(!value)continue;const kept=(Array.isArray(value)?value:[value]).filter(id=>!removed.includes(id));if(kept.length)row.translation={...row.translation,[key]:Array.isArray(value)?kept:kept[0]};else delete row.translation;}
})();
