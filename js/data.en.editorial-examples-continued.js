(()=>{const d=globalThis.DICCIONARIOS?.en;if(!d)throw Error("missing en");
{const i=d.findIndex(e=>e.id==="hemisphere");if(i>=0)d[i].exampleSynonym.word="half-sphere";}
{const i=d.findIndex(e=>e.id==="judicial-writ");if(i>=0)d[i].example.word="judicial writ";}
{const i=d.findIndex(e=>e.id==="deserving");if(i>=0)d[i].example.word="deserving";}
{const i=d.findIndex(e=>e.id==="deserving");if(i>=0)d[i].exampleSynonym.word="worthy";}
{const i=d.findIndex(e=>e.id==="commit");if(i>=0)d[i].example.word="commit";}
{const i=d.findIndex(e=>e.id==="commit");if(i>=0)d[i].exampleSynonym.word="pledge";}
{const i=d.findIndex(e=>e.id==="illegal");if(i>=0)d[i].example.word="illegal";}
{const i=d.findIndex(e=>e.id==="headboard");if(i>=0)d[i].exampleSynonym.word="bed panel";}
{const i=d.findIndex(e=>e.id==="trawl");if(i>=0)d[i].exampleSynonym.word="fished with a trawl";}
{const i=d.findIndex(e=>e.id==="knighthood");if(i>=0)d[i].exampleSynonym.word="honorary title";}
{const i=d.findIndex(e=>e.id==="label-maker");if(i>=0)d[i].example.word="label maker";}
{const i=d.findIndex(e=>e.id==="label-maker");if(i>=0)d[i].exampleSynonym.word="label printer";}
{const i=d.findIndex(e=>e.id==="burrow");if(i>=0)d[i].exampleSynonym.word="underground shelter";}
{const i=d.findIndex(e=>e.id==="scared-4");if(i>=0)d[i].exampleSynonym.word="timid";}
{const i=d.findIndex(e=>e.id==="lop-plant");if(i>=0)d[i].exampleSynonym.word="pruned";}
{const i=d.findIndex(e=>e.id==="displace-4");if(i>=0)d[i].exampleSynonym.word="uprooted";}
{const i=d.findIndex(e=>e.id==="divert-2");if(i>=0)d[i].exampleSynonym.word="use funds for another purpose";}
{const i=d.findIndex(e=>e.id==="divest-2");if(i>=0)d[i].exampleSynonym.word="take rights away";}
})();

/* B15: apply reviewed English rewrites and clarify separate senses. */
(()=>{
  const d=globalThis.DICCIONARIOS?.en;
  if(!d)throw Error("missing en");
  const set=(id,fields)=>{const entry=d.find(item=>item.id===id);if(!entry)throw Error(`Missing source entry ${id}`);Object.assign(entry,fields);};

  set("surveillance",{
    definition:"Watching a place or person for safety or to learn what happens.",
    synonyms:["monitoring"],
    example:{word:"surveillance",text:"The company used surveillance to protect the warehouse overnight."},
    exampleSynonym:{word:"monitoring",text:"The company used monitoring to protect the warehouse overnight."}
  });
  set("rowan",{
    definition:"A small tree with red berries that grow in clusters.",
    synonyms:["mountain ash"],
    example:{word:"rowan",text:"We planted a rowan beside the gate."},
    exampleSynonym:{word:"mountain ash",text:"We planted a mountain ash beside the gate."}
  });
  set("millenarianism",{
    definition:"Belief in a future time of peace and happiness.",
    synonyms:["belief in a future age of peace"],
    example:{word:"Millenarianism",text:"Millenarianism promises peace."},
    exampleSynonym:{word:"Belief in a future age of peace",text:"Belief in a future age of peace promises peace."}
  });
  set("round2549-millenarianism-christian",{
    definition:"Christian belief that Jesus will rule during a future time of peace.",
    synonyms:["belief in Christ's future rule"],
    example:{word:"millenarianism",text:"The book explains Christian millenarianism."},
    exampleSynonym:{word:"belief in Christ's future rule",text:"The book explains Christian belief in Christ's future rule."}
  });
  set("stigmatizer",{
    definition:"A person who marks someone as different or bad.",
    synonyms:["person who unfairly labels others"],
    example:{word:"stigmatizer",text:"A stigmatizer can harm a person's reputation."},
    exampleSynonym:{word:"person who unfairly labels others",text:"A person who unfairly labels others can harm a person's reputation."}
  });
  set("telemetry",{
    definition:"A system that measures things far away and sends the results back.",
    synonyms:["remote monitoring"],
    example:{word:"telemetry",text:"The team used telemetry to track the drone."},
    exampleSynonym:{word:"remote monitoring",text:"The team used remote monitoring to track the drone."}
  });
})();

/* Curated literal-example repairs for 30 English records. */
(()=>{
  const d=globalThis.DICCIONARIOS?.en; if(!d)return;
  const set=(d,id,fields)=>{for(const entry of d)if(entry.id===id)Object.assign(entry,fields);};
  set(d,"flare-7", {"exampleSynonym":{"word":"burn with a bright light","text":"The candle began to burn with a bright light in the wind."}});
  set(d,"racism-2", {"example":{"word":"racism","text":"The report condemned racism at work."},"exampleSynonym":{"word":"belief in racial superiority","text":"The report condemned the belief in racial superiority."}});
  set(d,"bimetal", {"exampleSynonym":{"word":"two-metal material","text":"The two-metal material bends when heated."}});
  set(d,"bisector", {"exampleSynonym":{"word":"dividing line","text":"The dividing line splits the angle in half."}});
  set(d,"bock", {"exampleSynonym":{"word":"beer glass","text":"The waiter served beer in a small beer glass."}});
  set(d,"cacumen", {"exampleSynonym":{"word":"insight","text":"Her insight helped her solve the puzzle."}});
  set(d,"calimocho", {"exampleSynonym":{"word":"wine and cola","text":"They mixed wine and cola at the festival."}});
  set(d,"candor", {"example":{"word":"candor","text":"She answered with candor during the interview."},"exampleSynonym":{"word":"frankness","text":"She answered with frankness during the interview."}});
  set(d,"cantonal", {"exampleSynonym":{"word":"regional","text":"The regional council met on Monday."}});
  set(d,"judaica", {"exampleSynonym":{"word":"Jewish cultural materials","text":"The museum catalogued Jewish cultural materials."}});
  set(d,"pearl", {"exampleSynonym":{"word":"bead with droplets","text":"The cool glass began to bead with droplets."}});
  set(d,"palmar", {"exampleSynonym":{"word":"palmar surface","text":"The palmar surface felt sore after the fall."}});
  set(d,"rotunda", {"exampleSynonym":{"word":"circular building","text":"The circular building has a glass dome."}});
  set(d,"canton", {"exampleSynonym":{"word":"territorial division","text":"Each territorial division held a local vote."}});
  set(d,"parental", {"exampleSynonym":{"word":"of a parent","text":"The school requires consent of a parent."}});
  set(d,"santa", {"exampleSynonym":{"word":"female saint","text":"The old church honored a female saint."}});
  set(d,"plagal", {"exampleSynonym":{"word":"of a plagal mode","text":"The melody is of a plagal mode."}});
})();



/* Curated literal-example repairs for 21 English fields. */
(()=>{
  const d=globalThis.DICCIONARIOS?.en; if(!d)return;
  const set=(id,fields)=>{for(const entry of d)if(entry.id===id)Object.assign(entry,fields);};
  set("radiator", {"example":{"word":"radiator","text":"The radiator warmed the room before dawn."}});
  set("funeral-insurance", {"example":{"word":"funeral insurance","text":"She compared funeral insurance policies online."},"exampleSynonym":{"word":"burial insurance","text":"The family chose burial insurance for peace of mind."}});
  set("installment-plan", {"example":{"word":"installment plan","text":"They paid for the sofa through an installment plan."}});
  set("bounced-cheque", {"example":{"word":"bounced cheque","text":"The shop rejected his bounced cheque."},"exampleSynonym":{"word":"returned cheque","text":"The bank marked it as a returned cheque."}});
  set("disinherit", {"exampleSynonym":{"word":"cut off","text":"They threatened to cut off her inheritance."}});
  set("challenge-a-decision", {"example":{"word":"challenge a decision","text":"They voted to challenge a decision."},"exampleSynonym":{"word":"contest a decision","text":"The union moved to contest a decision."}});
  set("electrical-earthing", {"example":{"word":"electrical earthing","text":"The electrician checked the electrical earthing before repairs."}});
  set("blind-spot", {"example":{"word":"blind spot","text":"A cyclist entered the car's blind spot."},"exampleSynonym":{"word":"unseen area","text":"A cyclist entered the unseen area beside the car."}});
  set("driver-fatigue", {"example":{"word":"driver fatigue","text":"Driver fatigue caused the truck to drift."}});
  set("emergency-braking", {"exampleSynonym":{"word":"sudden braking","text":"The driver used sudden braking to avoid a crash."}});
  set("cancellation", {"exampleSynonym":{"word":"calling off","text":"Calling off the concert disappointed the fans."}});
  set("ex-officio-procedure", {"exampleSynonym":{"word":"authority-led process","text":"The agency began an authority-led process."}});
  set("register-for-social-security", {"example":{"word":"register with social security","text":"New hires register with social security before their first shift."},"exampleSynonym":{"word":"enrol with social security","text":"New hires enrol with social security before their first shift."}});
  set("furlough", {"exampleSynonym":{"word":"temporary layoff","text":"Workers faced a temporary layoff during the factory shutdown."}});
  set("boiler-inspection", {"example":{"word":"boiler inspection","text":"The boiler inspection found a loose valve."},"exampleSynonym":{"word":"boiler examination","text":"A boiler examination revealed a cracked pipe."}});
  set("court-appointed-defender", {"example":{"word":"court-appointed counsel","text":"The court-appointed counsel met the defendant before trial."}});
  set("insolvent", {"exampleSynonym":{"word":"bankrupt","text":"The company became bankrupt after its debts mounted."}});
  set("juvenile", {"exampleSynonym":{"word":"young person","text":"The court treated the young person as a juvenile."}});
  set("larceny", {"example":{"word":"larceny","text":"The report classified the theft as larceny."}});
  set("loanshark", {"example":{"word":"loan shark","text":"The loan shark charged illegal interest."}});
})();

/* A108: keep selected English example forms literal. */
(()=>{
  const d=globalThis.DICCIONARIOS?.en; if(!d)return;
  const set=(id,fields)=>{for(const entry of d)if(entry.id===id)Object.assign(entry,fields);};
  set("roll-4", {"exampleSynonym":{"word":"rotate","text":"The wheel will rotate freely after the cart stops."}});
  set("rush", {"exampleSynonym":{"word":"hurry","text":"She had to hurry to catch the train."}});
  set("snuggle-up", {"exampleSynonym":{"word":"cuddle up","text":"They chose to cuddle up under a blanket during the storm."}});
  set("toss", {"exampleSynonym":{"word":"throw","text":"She had to throw the keys onto the counter."}});
})();

/* B14: replace literal `undefined` example fields for reviewed retained senses. */
(()=>{
  const es=globalThis.DICCIONARIOS?.es;
  const en=globalThis.DICCIONARIOS?.en;
  if(!es||!en)throw Error("missing dictionary language");
  const set=(entries,id,fields)=>{const entry=entries.find(item=>item.id===id);if(!entry)throw Error(`Missing source entry ${id}`);Object.assign(entry,fields);};
  const add=(entries,entry)=>{if(entries.some(item=>item.id===entry.id))throw Error(`Duplicate source entry ${entry.id}`);entries.push(entry);};

  set(es,"cateto",{
    definition:"En geometría, cada uno de los dos lados que forman el ángulo recto en un triángulo rectángulo.",
    synonyms:["lado del triángulo rectángulo"],
    example:{word:"cateto",text:"El cateto mide cinco centímetros en el dibujo."},
    exampleSynonym:{word:"lado del triángulo rectángulo",text:"El lado del triángulo rectángulo mide cinco centímetros en el dibujo."}
  });
  delete es.find(item=>item.id==="cateto").translation;
  add(es,{
    id:"cateto-2",word:"Cateto",image:{id:7024,alt:"Una palabra del diccionario"},
    definition:"Dicho de una persona: de pueblo o de modales rústicos, en sentido despectivo.",
    synonyms:["palurdo","rústico"],
    example:{word:"cateto",text:"En la novela, llaman cateto al protagonista por su origen rural."},
    exampleSynonym:{word:"palurdo",text:"En la novela, llaman palurdo al protagonista por su origen rural."},
    situacion:"conocimiento"
  });
  set(es,"caustica",{translation:{en:"caustic-3"}});

  set(es,"round2422-epidural-anesthetic",{
    definition:"Anestesia que se pone cerca de la columna para aliviar el dolor.",
    example:{word:"epidural",text:"La médica explicó la epidural antes de usarla durante el parto."},
    exampleSynonym:{word:"anestesia epidural",text:"La médica explicó la anestesia epidural antes de usarla durante el parto."}
  });
  set(es,"round2423-epigrafiar-title",{
    example:{word:"epigrafiar",text:"La autora decidió epigrafiar el capítulo para su artículo."},
    exampleSynonym:{word:"titular",text:"La autora decidió titular el capítulo para su artículo."}
  });
  set(es,"round2422-epifisis-pineal",{
    example:{word:"epífisis",text:"La epífisis ayuda a regular el sueño."},
    exampleSynonym:{word:"glándula pineal",text:"La glándula pineal ayuda a regular el sueño."}
  });
  set(es,"round2421-epidemia-figurative",{
    example:{word:"epidemia",text:"La epidemia de rumores se extendió por el barrio."},
    exampleSynonym:{word:"propagación masiva",text:"La propagación masiva de rumores se extendió por el barrio."}
  });
  set(es,"round2419-eoceno-adjective",{
    example:{word:"eoceno",text:"Los sedimentos eocenos contienen fósiles."},
    exampleSynonym:{word:"eocénico",text:"Los sedimentos eocénicos contienen fósiles."}
  });
  set(es,"round2421-epicentro-figurative",{
    example:{word:"epicentro",text:"El epicentro del debate fue la falta de agua."},
    exampleSynonym:{word:"foco principal",text:"El foco principal del debate fue la falta de agua."}
  });
  set(es,"round2423-epileptico-person",{
    example:{word:"persona epiléptica",text:"La persona epiléptica anotó cada crisis."},
    exampleSynonym:{word:"persona con epilepsia",text:"La persona con epilepsia anotó cada crisis."}
  });
  set(es,"round2423-epigramatico-style",{
    example:{word:"epigramático",text:"El estilo epigramático fue breve."},
    exampleSynonym:{word:"ingenioso y conciso",text:"El estilo ingenioso y conciso fue breve."}
  });
  set(es,"round2419-eon-gnostic",{
    definition:"Entidad divina que, según el gnosticismo, emana de la divinidad suprema.",
    synonyms:["inteligencia eterna","entidad divina"],
    example:{word:"eón",text:"Cada eón emanaba de la divinidad suprema."},
    exampleSynonym:{word:"entidad divina",text:"Cada entidad divina emanaba de la divinidad suprema."}
  });
  set(es,"round2421-epicureo-pleasure",{
    example:{word:"epicúreo",text:"El epicúreo disfrutó de una buena comida con sus amigos."},
    exampleSynonym:{word:"amante de los placeres",text:"El amante de los placeres disfrutó de una buena comida con sus amigos."}
  });
  set(es,"round2419-enzurronar-enclose",{
    example:{word:"enzurronar",text:"La familia quiso enzurronar la manta dentro del zurrón."},
    exampleSynonym:{word:"encerrar",text:"La familia quiso encerrar la manta dentro del zurrón."}
  });

  set(en,"round2421-lineament-characteristic",{
    example:{word:"lineament",text:"A lineament of her face helped the artist recognize her."},
    exampleSynonym:{word:"characteristic",text:"A characteristic of her face helped the artist recognize her."}
  });
  set(en,"round2419-lime-soil",{
    synonyms:["apply lime to","treat soil with lime","add lime to soil"],
    example:{word:"lime",text:"Farmers lime the field before planting."},
    exampleSynonym:{word:"apply lime to","text":"Farmers apply lime to the field before planting."}
  });
  set(en,"round2421-linearity-physics",{
    example:{word:"linearity",text:"The experiment showed linearity between force and movement."},
    exampleSynonym:{word:"direct proportionality",text:"The experiment showed direct proportionality between force and movement."}
  });
  set(en,"round2421-liner-lining",{
    example:{word:"liner",text:"The coat's liner kept rain off the wool."},
    exampleSynonym:{word:"lining",text:"The coat's lining kept rain off the wool."}
  });
  set(en,"round2418-lilliputian-adjective-petty",{
    example:{word:"Lilliputian",text:"The editor called the complaint Lilliputian because it concerned one detail."},
    exampleSynonym:{word:"trivial",text:"The editor called the complaint trivial because it concerned one detail."}
  });
  set(en,"round2421-lingual-articulated",{
    example:{word:"lingual",text:"The speaker made a lingual sound with the tip of her tongue."},
    exampleSynonym:{word:"tongue-articulated",text:"The speaker made a tongue-articulated sound with the tip of her tongue."}
  });
  set(en,"round2421-liner-person",{
    example:{word:"liner",text:"The liner repaired the torn coat lining."},
    exampleSynonym:{word:"lining fitter",text:"The lining fitter repaired the torn coat lining."}
  });
  set(en,"round2421-linger-stay",{
    example:{word:"linger",text:"They can linger by the gate after the concert."},
    exampleSynonym:{word:"stay on",text:"They can stay on by the gate after the concert."}
  });
  set(en,"round2421-linger-saunter",{
    example:{word:"linger",text:"They lingered along the path after lunch."},
    exampleSynonym:{word:"saunter",text:"They sauntered along the path after lunch."}
  });
  set(en,"round2421-linger-dither",{
    example:{word:"linger",text:"She can linger over the answer for hours."},
    exampleSynonym:{word:"dither",text:"She can dither over the answer for hours."}
  });
  set(en,"round2420-limp-noun",{
    example:{word:"limp",text:"After surgery, the patient's limp was obvious."},
    exampleSynonym:{word:"uneven walk",text:"After surgery, the patient's uneven walk was obvious."}
  });
  set(en,"round2420-limp-falter",{
    synonyms:["falter","struggle","struggle along","move laboriously"],
    example:{word:"limp",text:"He can limp along the path after surgery."},
    exampleSynonym:{word:"struggle",text:"He can struggle along the path after surgery."}
  });
  set(en,"round2420-limp-adjective-body",{
    definition:"Lacking strength or control, as an injured or unconscious arm may be.",
    synonyms:["weak","without strength"],
    example:{word:"limp",text:"After the injury, his arm seemed limp."},
    exampleSynonym:{word:"weak",text:"After the injury, his arm seemed weak."}
  });
  set(en,"round2422-lining-anatomy",{
    example:{word:"lining",text:"The lining protects the stomach wall."},
    exampleSynonym:{word:"inner tissue layer",text:"The inner tissue layer protects the stomach wall."}
  });
  set(en,"round2421-lineman-utility",{
    example:{word:"lineman",text:"The lineman repaired the power line after the storm."},
    exampleSynonym:{word:"power-line technician",text:"The power-line technician repaired the power line after the storm."}
  });
  set(en,"round2422-linker-grammar",{
    example:{word:"linker",text:"The linker «but» joined two clauses."},
    exampleSynonym:{word:"connecting word",text:"The connecting word «but» joined two clauses."}
  });
  set(en,"round2421-lingual-consonant",{
    synonyms:["tongue-made consonant","consonant made with the tongue"],
    example:{word:"lingual consonant",text:"The /t/ sound is a lingual consonant."},
    exampleSynonym:{word:"consonant made with the tongue",text:"The /t/ sound is a consonant made with the tongue."}
  });
  set(en,"round2418-lilliputian-noun-petty",{
    example:{word:"Lilliputian",text:"The editor called him a Lilliputian over small details."},
    exampleSynonym:{word:"petty person",text:"The editor called him a petty person over small details."}
  });
  set(en,"round2418-lilliputian-adjective-size",{
    example:{word:"Lilliputian",text:"The statue looked Lilliputian beside the full-size building."},
    exampleSynonym:{word:"tiny",text:"The statue looked tiny beside the full-size building."}
  });
  set(en,"round2419-limelight-public-attention",{
    synonyms:["spotlight","public attention"],
    example:{word:"limelight",text:"The singer enjoyed the limelight after winning the award."},
    exampleSynonym:{word:"spotlight",text:"The singer enjoyed the spotlight after winning the award."}
  });
  set(en,"round2421-lingual-language",{
    example:{word:"lingual",text:"The lingual rules explain how language changes."},
    exampleSynonym:{word:"linguistic",text:"The linguistic rules explain how language changes."}
  });
  set(en,"round2421-lineament-geology",{
    example:{word:"lineament",text:"The aerial image showed a lineament crossing the plateau."},
    exampleSynonym:{word:"geological feature",text:"The aerial image showed a geological feature crossing the plateau."}
  });
  set(en,"round2421-linearity-electronics",{
    example:{word:"linearity",text:"The meter's linearity matched each change in input."},
    exampleSynonym:{word:"proportional response",text:"The meter's proportional response matched each change in input."}
  });
  set(en,"round2421-lineman-platelayer",{
    example:{word:"lineman",text:"The lineman repaired the track before trains returned."},
    exampleSynonym:{word:"railway track worker",text:"The railway track worker repaired the track before trains returned."}
  });
  set(en,"round2421-lineman-surveyor",{
    example:{word:"lineman",text:"The lineman marked each survey point across the field."},
    exampleSynonym:{word:"survey assistant",text:"The survey assistant marked each survey point across the field."}
  });
  set(en,"round2421-liner-tracing",{
    example:{word:"liner",text:"The liner drew a straight border on the map."},
    exampleSynonym:{word:"line marker",text:"The line marker drew a straight border on the map."}
  });
  set(en,"round2421-linguistic-study",{
    example:{word:"linguistic",text:"The linguistic study compared words from two languages."},
    exampleSynonym:{word:"linguistics-related",text:"The linguistics-related study compared words from two languages."}
  });
  set(en,"round2421-liner-line-drive",{
    example:{word:"liner",text:"The batter hit a liner over the second baseman."},
    exampleSynonym:{word:"line drive",text:"The batter hit a line drive over the second baseman."}
  });
  set(en,"round2422-lining-protective",{
    example:{word:"lining",text:"The box's lining kept the photographs dry."},
    exampleSynonym:{word:"protective inner layer",text:"The box's protective inner layer kept the photographs dry."}
  });
  set(en,"round2421-lineage-derivation",{
    synonyms:["origin","history","derivation"],
    example:{word:"lineage",text:"The lineage of the custom goes back to the village."},
    exampleSynonym:{word:"history",text:"The history of the custom goes back to the village."}
  });
  set(en,"round2421-liner-engineering",{
    example:{word:"liner",text:"The pump's liner reduced wear inside the machine."},
    exampleSynonym:{word:"protective sleeve",text:"The pump's protective sleeve reduced wear inside the machine."}
  });
  set(en,"caustic",{
    definition:"Able to burn or damage tissue through a chemical reaction.",
    synonyms:["corrosive"],
    example:{word:"caustic",text:"The cleaner contains a caustic chemical."},
    exampleSynonym:{word:"corrosive",text:"The cleaner contains a corrosive chemical."},
    translation:{es:"corrosivo"}
  });
  add(en,{
    id:"caustic-2",word:"caustic",image:{id:7024,alt:"A dictionary word"},
    definition:"Very critical or sarcastic in a hurtful way.",synonyms:["cutting","bitter"],
    example:{word:"caustic",text:"The reviewer made a caustic remark about the design."},
    exampleSynonym:{word:"cutting",text:"The reviewer made a cutting remark about the design."},
    situacion:"conocimiento",translation:{es:"mordaz-3"}
  });
  add(en,{
    id:"caustic-3",word:"caustic",image:{id:7024,alt:"A dictionary word"},
    definition:"A bright curve formed when a curved surface reflects or bends light.",synonyms:["bright curve","light curve"],
    example:{word:"caustic",text:"A caustic appeared on the wall when the curved mirror focused the light."},
    exampleSynonym:{word:"bright curve",text:"A bright curve appeared on the wall when the curved mirror focused the light."},
    situacion:"conocimiento",translation:{es:"caustica"}
  });
})();

/* B15 continued: apply the remaining reviewed English rewrites. */
(()=>{
  const d=globalThis.DICCIONARIOS?.en;
  if(!d)throw Error("missing en");
  const set=(id,fields)=>{const entry=d.find(item=>item.id===id);if(!entry)throw Error(`Missing source entry ${id}`);Object.assign(entry,fields);};

  set("tax-5",{
    definition:"To put a heavy demand or burden on someone or something.",
    synonyms:["burden"],
    example:{word:"tax",text:"The extra duties taxed the small team."},
    exampleSynonym:{word:"burden",text:"The extra duties burdened the small team."}
  });
  set("late-medieval-2",{
    definition:"From the final centuries of the Middle Ages.",
    synonyms:["from the late Middle Ages"],
    example:{word:"late medieval",text:"Late medieval art used bright colors."},
    exampleSynonym:{word:"from the late Middle Ages",text:"Art from the late Middle Ages used bright colors."}
  });
  set("shrinkage-2",{
    definition:"A reduction in the size or amount of something.",
    synonyms:["decrease"],
    example:{word:"shrinkage",text:"The store tracked shrinkage in its stock."},
    exampleSynonym:{word:"decrease",text:"The store tracked the decrease in its stock."}
  });
  set("invigorate-2",{
    definition:"To give someone or something more energy or strength.",
    synonyms:["energize"],
    example:{word:"invigorate",text:"A short walk can invigorate you."},
    exampleSynonym:{word:"energize",text:"A short walk can energize you."}
  });
  set("lunge-3",{
    definition:"A sudden forward attack, often made with a weapon.",
    synonyms:["thrust"],
    example:{word:"lunge",text:"The guard made a lunge at the intruder."},
    exampleSynonym:{word:"thrust",text:"The guard made a thrust at the intruder."}
  });
  set("civet-3",{
    definition:"A strong-smelling substance from a civet, used in some perfumes.",
    synonyms:["scent from a civet"],
    example:{word:"civet",text:"Some perfumes contain civet."},
    exampleSynonym:{word:"scent from a civet",text:"Some perfumes contain scent from a civet."}
  });
  set("operational-2",{
    definition:"Working and ready to be used.",
    synonyms:["working"],
    example:{word:"operational",text:"The backup generator is operational."},
    exampleSynonym:{word:"working",text:"The backup generator is working."}
  });
  set("co-defendant",{
    definition:"One of two or more people accused in the same court case.",
    synonyms:["another accused person in the case"],
    example:{word:"the co-defendant",text:"The judge questioned the co-defendant."},
    exampleSynonym:{word:"another accused person in the case",text:"The judge questioned another accused person in the case."}
  });
  set("gastrovascular",{
    definition:"Relating to a body cavity that digests and moves food.",
    synonyms:["cavity for digestion and food movement"],
    example:{word:"gastrovascular cavity",text:"The animal has a gastrovascular cavity."},
    exampleSynonym:{word:"cavity for digestion and food movement",text:"The animal has a cavity for digestion and food movement."}
  });
  set("anosognosia",{
    definition:"Not realizing that you have an illness or disability.",
    synonyms:["lack of awareness of an illness"],
    example:{word:"Anosognosia",text:"Anosognosia can affect someone’s health decisions."},
    exampleSynonym:{word:"lack of awareness of an illness",text:"Lack of awareness of an illness can affect a person’s health decisions."}
  });
  set("cordoba-2",{
    word:"córdoba",
    definition:"The unit of money used in Nicaragua.",
    synonyms:["Nicaraguan currency"],
    example:{word:"córdobas",text:"The price is listed in córdobas."},
    exampleSynonym:{word:"Nicaraguan currency",text:"The price is listed in Nicaraguan currency."}
  });
  set("commercial-registry",{
    definition:"An office where companies register their details.",
    synonyms:["company registration office"],
    example:{word:"commercial registry",text:"The company filed its documents with the commercial registry."},
    exampleSynonym:{word:"company registration office",text:"The company filed its documents with the company registration office."}
  });
  set("confluent",{definition:"Describes skin or cells that join without gaps between them.",synonyms:["joined together"],example:{word:"confluent",text:"The skin lesions were confluent."},exampleSynonym:{word:"joined together",text:"The skin lesions were joined together."}});
  set("scrubber",{definition:"A machine that removes harmful substances from gas.",synonyms:["gas-cleaning device"],example:{word:"scrubber",text:"The plant installed a scrubber to clean its exhaust gases."},exampleSynonym:{word:"gas-cleaning device",text:"The plant installed a gas-cleaning device to clean its exhaust gases."}});
  set("neurophysiology",{definition:"The study of how the brain, spinal cord, and nerves work.",synonyms:["the physiology of the nervous system"],example:{word:"neurophysiology",text:"She studies neurophysiology."},exampleSynonym:{word:"the physiology of the nervous system",text:"She studies the physiology of the nervous system."}});
  set("confluent-2",{definition:"A stream that joins another, usually of similar size.",synonyms:["joining stream"],example:{word:"confluent",text:"We followed the confluent to the main river."},exampleSynonym:{word:"joining stream",text:"We followed the joining stream to the main river."}});
  set("lift-3",{translation:{es:"round5096-solevantar-lift"}});
  set("saxifrage",{definition:"A flowering plant, often small, that grows among rocks.",synonyms:["small rock-growing flower"],example:{word:"saxifrage",text:"The saxifrage grows among mountain rocks."},exampleSynonym:{word:"small rock-growing flower",text:"The small rock-growing flower grows among mountain rocks."}});
  set("chronobiology",{definition:"The study of biological rhythms, such as daily sleep and wake cycles.",synonyms:["biological timing"],example:{word:"chronobiology",text:"Researchers study chronobiology to understand daily rhythms."},exampleSynonym:{word:"biological timing",text:"Researchers study biological timing to understand daily rhythms."}});
{
  const addSense=(baseId,card)=>{const base=d.find(x=>x.id===baseId);if(!base)throw Error("Missing split source "+baseId);if(d.some(x=>x.id===card.id))throw Error("Duplicate split card "+card.id);const entry={...base,id:card.id,definition:card.definition,synonyms:[card.synonym],example:{word:card.marker,text:card.example},exampleSynonym:{word:card.synonym,text:card.exampleSynonymText}};delete entry.translation;delete entry.usageLabel;d.push(entry);};
  set("revalue",{definition:"To calculate the value of something again.",synonyms:["reassess"],example:{word:"revalue",text:"Companies often revalue their assets."},exampleSynonym:{word:"reassess",text:"Companies often reassess their assets."}});
  addSense("revalue",{id:"round5097-revalue-currency",definition:"To raise a country's currency value against other currencies.",synonym:"strengthen",marker:"revalue",example:"The bank plans to revalue the currency against the dollar.",exampleSynonymText:"The bank plans to strengthen the currency against the dollar."});
}
  set("colluder",{definition:"A person who secretly works with others to commit fraud.",synonyms:["fraud conspirator"],example:{word:"colluder",text:"The colluder helped plan the false claims."},exampleSynonym:{word:"fraud conspirator",text:"The fraud conspirator helped plan the false claims."}});
  set("metric",{definition:"A function that assigns a distance to each pair of points.",synonyms:["distance function"],example:{word:"metric",text:"The mathematician defined a metric on the space."},exampleSynonym:{word:"distance function",text:"The mathematician defined a distance function on the space."}});
  set("round2541-metric-noun",{definition:"A way to measure or judge something.",synonyms:["measure"],example:{word:"metric",text:"The team chose a new metric to track customer satisfaction."},exampleSynonym:{word:"measure",text:"The team chose a new measure to track customer satisfaction."}});
  set("superior-2",{definition:"The leader of a community in a religious order.",synonyms:["head of the religious community"],example:{word:"superior",text:"We asked the superior to lead the community."},exampleSynonym:{word:"head of the religious community",text:"We asked the head of the religious community to lead the community."}});
  set("corpus",{definition:"An organized collection of texts or data used for study.",synonyms:["research collection"],example:{word:"corpus",text:"The team searched a corpus of news articles."},exampleSynonym:{word:"research collection",text:"The team searched a research collection of news articles."}});
  set("cloying-2",{definition:"So sweet or sentimental that it feels unpleasant.",synonyms:["overdone"],example:{word:"cloying",text:"The film’s ending felt cloying."},exampleSynonym:{word:"overdone",text:"The film’s ending felt overdone."}});
  set("metallography",{definition:"The study of the structure and makeup of metals and alloys.",synonyms:["the study of metal structure"],example:{word:"metallography",text:"Researchers use metallography to inspect damaged steel."},exampleSynonym:{word:"the study of metal structure",text:"Researchers use the study of metal structure to inspect damaged steel."}});
  set("monograph",{definition:"A detailed book or study focused on one subject.",synonyms:["single-subject study"],example:{word:"monograph",text:"She published a monograph about local birds."},exampleSynonym:{word:"single-subject study",text:"She published a single-subject study about local birds."}});
  set("phosgene",{definition:"A colorless, highly poisonous gas used to make some chemicals.",synonyms:["toxic gas"],example:{word:"phosgene",text:"Workers once used phosgene to make dyes."},exampleSynonym:{word:"toxic gas",text:"Workers once used toxic gas to make dyes."}});
  set("microcopy",{definition:"Brief text that guides users through an app or website.",synonyms:["interface text"],example:{word:"microcopy",text:"Clear microcopy helped users finish the form."},exampleSynonym:{word:"interface text",text:"Clear interface text helped users finish the form."}});
  set("seismometer",{definition:"An instrument that detects and records movement of the ground.",synonyms:["seismograph"],example:{word:"seismometer",text:"The seismometer recorded the earthquake overnight."},exampleSynonym:{word:"seismograph",text:"The seismograph recorded the earthquake overnight."}});
  set("tempter",{definition:"A person or thing that tries to persuade someone to do wrong.",synonyms:["person who tempts"],example:{word:"tempter",text:"A tempter can make a bad choice seem appealing."},exampleSynonym:{word:"person who tempts",text:"A person who tempts can make a bad choice seem appealing."}});
  set("hyperthyroidism-2",{definition:"A condition in which the thyroid gland makes too much hormone.",synonyms:["a condition caused by an overactive thyroid"],example:{word:"hyperthyroidism",text:"The patient received treatment for hyperthyroidism."},exampleSynonym:{word:"a condition caused by an overactive thyroid",text:"The patient received treatment for a condition caused by an overactive thyroid."}});
  set("incest-2",{definition:"Sexual activity between close family members.",synonyms:["sex between close relatives"],example:{word:"incest",text:"Some laws prohibit incest."},exampleSynonym:{word:"sex between close relatives",text:"Some laws prohibit sex between close relatives."}});
  set("mortar-5",{definition:"A bowl used with a pestle to crush herbs, spices, or grain.",synonyms:["grinding bowl"],example:{word:"mortar",text:"She crushed pepper in the mortar."},exampleSynonym:{word:"grinding bowl",text:"She crushed pepper in the grinding bowl."}});
  set("general-power",{definition:"A legal document that lets someone act for you in many matters.",synonyms:["general power of attorney"],example:{word:"general power",text:"She signed a general power for her brother."},exampleSynonym:{word:"general power of attorney",text:"She signed a general power of attorney for her brother."}});
  set("revalidation",{definition:"A new check that a licence, qualification, or document is still valid.",synonyms:["a new validity check"],example:{word:"revalidation",text:"The agency requires revalidation each year."},exampleSynonym:{word:"a new validity check",text:"The agency requires a new validity check each year."}});
  set("geophysics",{word:"Geophysics",definition:"Science that uses physics to study Earth's structure and natural forces.",synonyms:["The study of Earth's physical features"],example:{word:"Geophysics",text:"Geophysics helps explain earthquakes."},exampleSynonym:{word:"The study of Earth's physical features",text:"The study of Earth's physical features helps explain earthquakes."}});

  set("norway-lobster",{word:"Norway lobster",definition:"A small sea crustacean that people catch for food.",synonyms:["langoustine"],example:{word:"Norway lobster",text:"We ordered Norway lobster for dinner."},exampleSynonym:{word:"langoustine",text:"We ordered langoustine for dinner."}});
})();

(()=>{
  const dictionaries=globalThis.DICCIONARIOS;
  const set=(lang,id,fields)=>{const row=dictionaries[lang].find(x=>x.id===id);if(!row)throw Error("Missing source entry "+lang+"/"+id);Object.assign(row,fields);};
  const split=(lang,baseId,cards)=>{const d=dictionaries[lang],i=d.findIndex(x=>x.id===baseId);if(i<0)throw Error("Missing split source "+lang+"/"+baseId);const base={...d[i]};d.splice(i,1);for(const c of cards){if(d.some(x=>x.id===c.id))throw Error("Duplicate split card "+c.id);const row={...base,id:c.id,word:(c.word||base.word),definition:c.definition,synonyms:[c.synonym],example:{word:c.marker,text:c.example},exampleSynonym:{word:c.synonym,text:c.exampleSynonymText}};delete row.translation;d.push(row);}};
set("es","socarron",{"definition":"Que se burla de alguien con disimulo y humor.","synonyms":["irónico"],"example":{"word":"socarrón","text":"El socarrón respondió con una sonrisa irónica."},"exampleSynonym":{"word":"irónico","text":"El irónico respondió con una sonrisa irónica."}});
set("en","tamale",{"definition":"A Mexican dish of cornmeal dough wrapped around a filling and steamed.","synonyms":["cornmeal parcel"],"example":{"word":"tamale","text":"We ordered a tamale for lunch."},"exampleSynonym":{"word":"cornmeal parcel","text":"We ordered a cornmeal parcel for lunch."}});
set("en","catechist",{"definition":"Person who teaches people the beliefs and practices of a religion.","synonyms":["religious teacher"],"example":{"word":"catechist","text":"The catechist prepared the children for baptism."},"exampleSynonym":{"word":"religious teacher","text":"The religious teacher prepared the children for baptism."}});
split("es","glasear",[{"id":"glasear","word":"glasear","definition":"Cubrir un pastel con una capa de almíbar o azúcar glas.","synonym":"cubrir con glaseado","marker":"glasear","example":"Antes de servirlo, es necesario glasear el pastel.","exampleSynonymText":"Antes de servirlo, es necesario cubrir con glaseado el pastel."},{"id":"b15-glasear-food-shine","word":"glasear","definition":"Hacer que un alimento brille usando distintos medios.","synonym":"dar brillo a","marker":"glasear","example":"Es fácil glasear la carne con su jugo.","exampleSynonymText":"Es fácil dar brillo a la carne con su jugo."},{"id":"b15-glasear-material-surface","word":"glasear","definition":"Dar brillo a una superficie, por ejemplo, de papel o tela.","synonym":"dar brillo a","marker":"glasear","example":"Se puede glasear una superficie de papel para mejorar su acabado.","exampleSynonymText":"Se puede dar brillo a una superficie de papel para mejorar su acabado."}]);
split("es","sondar",[{"id":"sondar","word":"sondar","definition":"Introducir una sonda en el cuerpo de alguien, por ejemplo, para alimentarlo.","synonym":"introducirle una sonda","marker":"sondar","example":"El médico decidió sondar al paciente para alimentarlo.","exampleSynonymText":"El médico decidió introducirle una sonda al paciente para alimentarlo."},{"id":"b15-sondar-water-depth","word":"sondar","definition":"Medir la profundidad del agua con una sonda.","synonym":"medir la profundidad de","marker":"sondar","example":"El barco debe sondar la laguna antes de entrar.","exampleSynonymText":"El barco debe medir la profundidad de la laguna antes de entrar."},{"id":"b15-sondar-ground","word":"sondar","definition":"Examinar el terreno para buscar agua o saber qué hay debajo.","synonym":"explorar","marker":"sondar","example":"Es necesario sondar la zona antes de perforar.","exampleSynonymText":"Es necesario explorar la zona antes de perforar."},{"id":"b15-sondar-opinion","word":"sondar","definition":"Preguntar o investigar para saber qué piensa alguien.","synonym":"averiguar","marker":"sondar","example":"La periodista quiso sondar la opinión del alcalde.","exampleSynonymText":"La periodista quiso averiguar la opinión del alcalde."}]);
split("en","revert",[{"id":"revert","word":"revert","definition":"Return to an earlier state, system, or way of behaving.","synonym":"go back","marker":"revert","example":"Some phones revert to their factory settings after an update.","exampleSynonymText":"Some phones go back to their factory settings after an update."},{"id":"b15-revert-topic","word":"revert","definition":"Start talking or thinking about an earlier subject again.","synonym":"return","marker":"revert","example":"The speaker may revert to the earlier topic.","exampleSynonymText":"The speaker may return to the earlier topic."},{"id":"b15-revert-language","word":"revert","definition":"Start using a language you used before.","synonym":"return","marker":"revert","example":"The speaker may revert to her first language during the interview.","exampleSynonymText":"The speaker may return to her first language during the interview."},{"id":"b15-revert-property","word":"revert","definition":"Become the property of an earlier owner again.","synonym":"pass back","marker":"revert","example":"The property will revert to its former owner when the lease ends.","exampleSynonymText":"The property will pass back to its former owner when the lease ends."}]);
})();

(()=>{const d=globalThis.DICCIONARIOS.es;const z=d.find(x=>x.id==='zumbon');if(!z)throw Error('Missing source entry es/zumbon');Object.assign(z,{"definition":"Persona que suele burlarse de otros o gastar bromas.","synonyms":["burlón"],"example":{"word":"zumbón","text":"El zumbón hizo reír a sus amigos con sus bromas."},"exampleSynonym":{"word":"burlón","text":"El burlón hizo reír a sus amigos con sus bromas."}});const i=d.findIndex(x=>x.id==='voragine');if(i<0)throw Error('Missing split source es/voragine');const base={...d[i]};d.splice(i,1);for(const c of [{"id":"voragine","word":"vorágine","definition":"Remolino fuerte que forma el agua de un río, lago o mar.","synonym":"corriente giratoria","marker":"vorágine","example":"La vorágine arrastró la pequeña barca.","exampleSynonymText":"La corriente giratoria arrastró la pequeña barca."},{"id":"b15-voragine-emotion","word":"vorágine","definition":"Pasión intensa o mezcla de sentimientos muy fuertes.","synonym":"mezcla intensa","marker":"vorágine","example":"La vorágine de emociones le impidió pensar con claridad.","exampleSynonymText":"La mezcla intensa de emociones le impidió pensar con claridad."},{"id":"b15-voragine-crowd","word":"vorágine","definition":"Aglomeración confusa de personas o cosas que se mueven.","synonym":"aglomeración confusa","marker":"vorágine","example":"El tráfico formó una vorágine de coches y peatones.","exampleSynonymText":"El tráfico formó una aglomeración confusa de coches y peatones."}]){if(d.some(x=>x.id===c.id))throw Error('Duplicate split card '+c.id);const row={...base,id:c.id,word:(c.word||base.word),definition:c.definition,synonyms:[c.synonym],example:{word:c.marker,text:c.example},exampleSynonym:{word:c.synonym,text:c.exampleSynonymText}};delete row.translation;d.push(row);}})();

(()=>{const dictionaries=globalThis.DICCIONARIOS;const set=(lang,id,fields)=>{const row=dictionaries[lang].find(x=>x.id===id);if(!row)throw Error('Missing source entry '+lang+'/'+id);Object.assign(row,fields);};const split=(lang,baseId,cards)=>{const d=dictionaries[lang],i=d.findIndex(x=>x.id===baseId);if(i<0)throw Error('Missing split source '+lang+'/'+baseId);const base={...d[i]};d.splice(i,1);for(const c of cards){if(d.some(x=>x.id===c.id))throw Error('Duplicate split card '+c.id);const row={...base,id:c.id,word:(c.word||base.word),definition:c.definition,synonyms:[c.synonym],example:{word:c.marker,text:c.example},exampleSynonym:{word:c.synonym,text:c.exampleSynonymText}};delete row.translation;d.push(row);}};
set("es","andas",{"definition":"Plataforma con varas que varias personas llevan para transportar una imagen.","synonyms":["plataformas portátiles"],"example":{"word":"andas","text":"Los costaleros llevaron andas por las calles."},"exampleSynonym":{"word":"plataformas portátiles","text":"Los costaleros llevaron plataformas portátiles por las calles."}});
set("es","centurion",{"definition":"Jefe de un grupo de soldados del ejército romano.","synonyms":["oficial romano"],"example":{"word":"centurión","text":"El centurión reunió a sus soldados antes de la marcha."},"exampleSynonym":{"word":"oficial romano","text":"El oficial romano reunió a sus soldados antes de la marcha."}});
split("es","comprometer",[{"id":"comprometer","word":"comprometer","definition":"Poner a alguien o algo en riesgo al involucrarlo en una acción.","synonym":"poner en riesgo","marker":"comprometer","example":"La maniobra puede comprometer la seguridad del puente.","exampleSynonymText":"La maniobra puede poner en riesgo la seguridad del puente."},{"id":"b15-comprometer-obligation","word":"comprometer","definition":"Hacer que alguien sea responsable de una obligación o tarea.","synonym":"obligar","marker":"comprometer","example":"El contrato puede comprometer a las dos empresas.","exampleSynonymText":"El contrato puede obligar a las dos empresas."},{"id":"b15-comprometer-promise","word":"comprometer","definition":"Asumir una obligación o prometer hacer algo.","synonym":"obligar","marker":"comprometer","example":"Ambos deben comprometerse a cumplir el acuerdo.","exampleSynonymText":"Ambos deben obligarse a cumplir el acuerdo."},{"id":"b15-comprometer-arbitration","word":"comprometer","definition":"Confiar a un árbitro la decisión de una disputa.","synonym":"someter a arbitraje","marker":"comprometer","example":"Las partes pueden comprometer la disputa.","exampleSynonymText":"Las partes pueden someter a arbitraje la disputa."}]);
split("es","descompuesto",[{"id":"descompuesto","word":"descompuesto","definition":"Que se comporta sin modestia, respeto o educación.","synonym":"descortés","marker":"descompuesto","example":"Fue descompuesto con los invitados.","exampleSynonymText":"Fue descortés con los invitados."},{"id":"b15-descompuesto-drunk","word":"descompuesto","definition":"Que ha bebido demasiado alcohol.","synonym":"borracho","marker":"descompuesto","example":"El hombre llegó descompuesto a casa.","exampleSynonymText":"El hombre llegó borracho a casa."},{"id":"b15-descompuesto-in-heat","word":"descompuesto","definition":"Dicho de una hembra de mamífero: que está en celo.","synonym":"en celo","marker":"descompuesto","example":"El registro dice «descompuesto» para indicar que la vaca está en celo.","exampleSynonymText":"El registro dice «en celo» para indicar que la vaca está en celo."}]);
split("es","desdicha",[{"id":"desdicha","word":"desdicha","definition":"Suerte muy mala o hecho que causa mucho sufrimiento.","synonym":"desgracia","marker":"desdicha","example":"La desdicha golpeó a la familia tras la inundación.","exampleSynonymText":"La desgracia golpeó a la familia tras la inundación."},{"id":"b15-desdicha-poverty","word":"desdicha","definition":"Pobreza extrema, con falta de recursos para vivir.","synonym":"miseria","marker":"desdicha","example":"La familia vivía en la desdicha.","exampleSynonymText":"La familia vivía en la miseria."}]);
split("es","gamuza",[{"id":"gamuza","word":"gamuza","definition":"Antílope de montaña, parecido a una cabra, que vive en Europa.","synonym":"camuza","marker":"gamuza","example":"La gamuza vive en los Alpes y los Pirineos.","exampleSynonymText":"La camuza vive en los Alpes y los Pirineos."},{"id":"b15-gamuza-leather","word":"gamuza","definition":"Piel curtida y suave, de tacto parecido al terciopelo.","synonym":"ante","marker":"gamuza","example":"Los guantes de gamuza son suaves.","exampleSynonymText":"Los guantes de ante son suaves."},{"id":"b15-gamuza-fabric","word":"gamuza","definition":"Tejido de lana que se parece a la piel de la gamuza.","synonym":"tejido de lana parecido al ante","marker":"gamuza","example":"La tienda vende gamuza para fabricar abrigos.","exampleSynonymText":"La tienda vende tejido de lana parecido al ante para fabricar abrigos."},{"id":"b15-gamuza-cleaning-cloth","word":"gamuza","definition":"Paño suave que se usa para limpiar o sacar brillo.","synonym":"bayeta","marker":"gamuza","example":"Limpió el polvo con una gamuza.","exampleSynonymText":"Limpió el polvo con una bayeta."}]);
split("es","requerir",[{"id":"requerir","word":"requerir","definition":"Necesitar algo para poder hacer o conseguir otra cosa.","synonym":"necesitar","marker":"requerir","example":"La operación puede requerir más tiempo.","exampleSynonymText":"La operación puede necesitar más tiempo."},{"id":"b15-requerir-formal-notice","word":"requerir","definition":"Avisar con autoridad que alguien debe cumplir una obligación.","synonym":"notificar formalmente","marker":"requerir","example":"El juez decidió requerir al testigo para que declare.","exampleSynonymText":"El juez decidió notificar formalmente al testigo para que declare."}]);
})();

(()=>{const dictionaries=globalThis.DICCIONARIOS;const set=(lang,id,fields)=>{const row=dictionaries[lang].find(x=>x.id===id);if(!row)throw Error('Missing source entry '+lang+'/'+id);Object.assign(row,fields);};const split=(lang,baseId,cards)=>{const d=dictionaries[lang],i=d.findIndex(x=>x.id===baseId);if(i<0)throw Error('Missing split source '+lang+'/'+baseId);const base={...d[i]};d.splice(i,1);for(const c of cards){if(d.some(x=>x.id===c.id))throw Error('Duplicate split card '+c.id);const row={...base,id:c.id,word:(c.word||base.word),definition:c.definition,synonyms:[c.synonym],example:{word:c.marker,text:c.example},exampleSynonym:{word:c.synonym,text:c.exampleSynonymText}};delete row.translation;d.push(row);}};
set("es","rimel",{"definition":"Producto que se aplica a las pestañas para oscurecerlas y alargarlas.","synonyms":["máscara de pestañas"],"example":{"word":"rímel","text":"Ella se puso rímel antes de salir."},"exampleSynonym":{"word":"máscara de pestañas","text":"Ella se puso máscara de pestañas antes de salir."}});
set("es","soto",{"definition":"Pequeño bosque de árboles y arbustos, sobre todo junto a un río.","synonyms":["bosque"],"example":{"word":"soto","text":"El soto da sombra junto al río."},"exampleSynonym":{"word":"bosque","text":"El bosque da sombra junto al río."}});
set("es","subnormal",{"definition":"Que está por debajo del nivel o valor considerado normal.","synonyms":["inferior a lo normal"],"example":{"word":"subnormal","text":"El nivel subnormal activó la alarma."},"exampleSynonym":{"word":"inferior a lo normal","text":"El nivel inferior a lo normal activó la alarma."}});
set("es","trimestre",{"definition":"Período de tres meses.","synonyms":["período de tres meses"],"example":{"word":"trimestre","text":"El trimestre termina en junio."},"exampleSynonym":{"word":"período de tres meses","text":"El período de tres meses termina en junio."}});
set("es","unificar",{"definition":"Hacer que varias partes formen una sola cosa o unidad.","synonyms":["unir"],"example":{"word":"unificar","text":"El equipo quiere unificar las dos listas."},"exampleSynonym":{"word":"unir","text":"El equipo quiere unir las dos listas."}});
set("es","varonil",{"definition":"Relacionado con los hombres o con rasgos que se consideran masculinos.","synonyms":["masculino"],"example":{"word":"varonil","text":"Le atribuyeron un gesto varonil."},"exampleSynonym":{"word":"masculino","text":"Le atribuyeron un gesto masculino."}});
set("en","bulldozer-4",{"definition":"A heavy vehicle with a wide blade used for pushing earth.","synonyms":["earth-moving machine"],"example":{"word":"bulldozer","text":"The bulldozer cleared the road after the storm."},"exampleSynonym":{"word":"earth-moving machine","text":"The earth-moving machine cleared the road after the storm."}});
set("en","stagger-2",{"definition":"Arrange events or times so they happen at different moments.","synonyms":["space out"],"example":{"word":"stagger","text":"The clinic will stagger appointment times to reduce waiting."},"exampleSynonym":{"word":"space out","text":"The clinic will space out appointment times to reduce waiting."}});
set("en","successful-3",{"definition":"Achieving the result or goal someone wanted.","synonyms":["effective"],"example":{"word":"successful","text":"The campaign was successful in reaching new voters."},"exampleSynonym":{"word":"effective","text":"The campaign was effective in reaching new voters."}});
set("en","vase-2",{"definition":"A container, often decorative, used to hold flowers.","synonyms":["vessel"],"example":{"word":"vase","text":"She placed fresh roses in a vase."},"exampleSynonym":{"word":"vessel","text":"She placed fresh roses in a vessel."}});
set("en","regret-2",{"definition":"Feel sorry or disappointed about something that happened or was done.","synonyms":["feel sorry about"],"example":{"word":"regret","text":"I regret leaving the lights on all night."},"exampleSynonym":{"word":"feel sorry about","text":"I feel sorry about leaving the lights on all night."}});
split("es","sede",[{"id":"sede","word":"sede","definition":"Lugar donde una organización tiene su oficina principal.","synonym":"oficina central","marker":"sede","example":"La sede de la empresa está en Madrid.","exampleSynonymText":"La oficina central de la empresa está en Madrid."},{"id":"b15-sede-episcopal","word":"sede","definition":"Asiento oficial de un obispo en su iglesia principal.","synonym":"cátedra episcopal","marker":"sede","example":"La sede del obispo está en la catedral.","exampleSynonymText":"La cátedra episcopal del obispo está en la catedral."}]);
split("es","tenido",[{"id":"tenido","word":"teñido","definition":"Acción de dar color a una tela, cabello u otra cosa.","synonym":"tintura","marker":"teñido","example":"El proceso de teñido duró varias horas.","exampleSynonymText":"El proceso de tintura duró varias horas."},{"id":"b15-tenido-result","word":"teñido","definition":"Color que queda en algo después de teñirlo.","synonym":"color","marker":"teñido","example":"Un teñido azul claro destaca en la tela.","exampleSynonymText":"Un color azul claro destaca en la tela."}]);
split("es","vagar",[{"id":"vagar","word":"vagar","definition":"Andar de un lugar a otro sin un rumbo fijo.","synonym":"deambular","marker":"vagar","example":"El viajero empezó a vagar por el pueblo.","exampleSynonymText":"El viajero empezó a deambular por el pueblo."},{"id":"b15-vagar-thoughts","word":"vagar","definition":"En la mente, pasar de un tema a otro sin rumbo fijo.","synonym":"divagar","marker":"vagar","example":"Mi mente empezó a vagar durante la reunión.","exampleSynonymText":"Mi mente empezó a divagar durante la reunión."}]);
})();

(()=>{const d=globalThis.DICCIONARIOS;const set=(lang,id,fields)=>{const row=d[lang].find(x=>x.id===id);if(!row)throw Error('Missing source entry '+lang+'/'+id);Object.assign(row,fields);};
set("es","desenvolver",{"definition":"Deshacer los nudos o enredos de algo.","synonyms":["desenredar"],"example":{"word":"desenvolver","text":"Tuvo que desenvolver el hilo enredado."},"exampleSynonym":{"word":"desenredar","text":"Tuvo que desenredar el hilo enredado."}});
set("es","desfibrador",{"definition":"Máquina o instrumento que separa las fibras de un material.","synonyms":["dispositivo para desfibrar"],"example":{"word":"desfibrador","text":"El desfibrador separa las fibras del tallo."},"exampleSynonym":{"word":"dispositivo para desfibrar","text":"El dispositivo para desfibrar separa las fibras del tallo."}});
set("es","azadonazo",{"definition":"Golpe dado con una azada.","synonyms":["golpe de azada"],"example":{"word":"azadonazo","text":"El trabajador dio un azadonazo al suelo."},"exampleSynonym":{"word":"golpe de azada","text":"El trabajador dio un golpe de azada al suelo."}});
set("en","stab-5",{"definition":"A wound caused by a sharp object such as a knife.","synonyms":["knife wound"],"example":{"word":"stab","text":"The stab was deep but did not damage an organ."},"exampleSynonym":{"word":"knife wound","text":"The knife wound was deep but did not damage an organ."}});
set("en","climb-4",{"definition":"The act of moving upward using your hands and feet.","synonyms":["ascent"],"example":{"word":"climb","text":"The climb to the summit took three hours."},"exampleSynonym":{"word":"ascent","text":"The ascent to the summit took three hours."}});
set("en","marijuana-3",{"definition":"Related to marijuana or made from it.","synonyms":["cannabis-related"],"example":{"word":"marijuana","text":"The marijuana policy changed this year."},"exampleSynonym":{"word":"cannabis-related","text":"The cannabis-related policy changed this year."}});
set("en","repellent-2",{"definition":"Causing a strong feeling of dislike or disgust.","synonyms":["off-putting"],"example":{"word":"repellent","text":"The smell was repellent to most visitors."},"exampleSynonym":{"word":"off-putting","text":"The smell was off-putting to most visitors."}});
set("en","christmas-3",{"definition":"Typical of or connected with Christmas.","synonyms":["holiday-themed"],"example":{"word":"Christmas","text":"The Christmas songs filled the hall."},"exampleSynonym":{"word":"holiday-themed","text":"The holiday-themed songs filled the hall."}});
set("en","police-3",{"definition":"Connected with the police or their work.","synonyms":["law-enforcement"],"example":{"word":"police","text":"The police report arrived yesterday."},"exampleSynonym":{"word":"law-enforcement","text":"The law-enforcement report arrived yesterday."}});
set("en","late-5",{"definition":"Happening after the expected or usual time.","synonyms":["delayed"],"example":{"word":"late","text":"The late train arrived before noon."},"exampleSynonym":{"word":"delayed","text":"The delayed train arrived before noon."}});
set("en","shoot-6",{"definition":"Use a gun to send a bullet toward someone or something.","synonyms":["fire a gun"],"example":{"word":"shoot","text":"The guard did not shoot at the target."},"exampleSynonym":{"word":"fire a gun","text":"The guard did not fire a gun at the target."}});
})();

(()=>{const dictionaries=globalThis.DICCIONARIOS;const set=(lang,id,fields)=>{const row=dictionaries[lang].find(x=>x.id===id);if(!row)throw Error('Missing source entry '+lang+'/'+id);Object.assign(row,fields);};const split=(lang,baseId,cards)=>{const d=dictionaries[lang],i=d.findIndex(x=>x.id===baseId);if(i<0)throw Error('Missing split source '+lang+'/'+baseId);const base={...d[i]};d.splice(i,1);for(const c of cards){if(d.some(x=>x.id===c.id))throw Error('Duplicate split card '+c.id);const row={...base,id:c.id,word:(c.word||base.word),definition:c.definition,synonyms:[c.synonym],example:{word:c.marker,text:c.example},exampleSynonym:{word:c.synonym,text:c.exampleSynonymText}};delete row.translation;d.push(row);}};
set("es","consignador",{"definition":"Persona que entrega mercancías a otra para que las venda o transporte.","synonyms":["expedidor"],"example":{"word":"consignador","text":"El consignador envió la carga al puerto."},"exampleSynonym":{"word":"expedidor","text":"El expedidor envió la carga al puerto."}});
set("en","inventor-2",{"definition":"A person who creates a new device, method, or process.","synonyms":["creator"],"example":{"word":"inventor","text":"The inventor patented a new battery."},"exampleSynonym":{"word":"creator","text":"The creator patented a new battery."}});
set("en","celsius",{"definition":"Swedish astronomer after whom the Celsius temperature scale is named.","synonyms":["Anders Celsius"],"example":{"word":"Celsius","text":"Celsius proposed a temperature scale in 1742."},"exampleSynonym":{"word":"Anders Celsius","text":"Anders Celsius proposed a temperature scale in 1742."}});
split("en","strangler",[{"id":"strangler","word":"strangler","definition":"A person who kills by squeezing someone’s neck.","synonym":"killer","marker":"strangler","example":"Police arrested the strangler after months of investigation.","exampleSynonymText":"Police arrested the killer after months of investigation."},{"id":"b15-strangler-plant","word":"strangler","definition":"A plant that grows around a tree and may eventually kill it.","synonym":"strangler fig","marker":"strangler","example":"A strangler grew around the old tree.","exampleSynonymText":"A strangler fig grew around the old tree."}]);
})();

(()=>{const dictionaries=globalThis.DICCIONARIOS;const set=(lang,id,fields)=>{const row=dictionaries[lang].find(x=>x.id===id);if(!row)throw Error('Missing source entry '+lang+'/'+id);Object.assign(row,fields);};const split=(lang,baseId,cards)=>{const d=dictionaries[lang],i=d.findIndex(x=>x.id===baseId);if(i<0)throw Error('Missing split source '+lang+'/'+baseId);const base={...d[i]};d.splice(i,1);for(const c of cards){if(d.some(x=>x.id===c.id))throw Error('Duplicate split card '+c.id);const row={...base,id:c.id,word:(c.word||base.word),definition:c.definition,synonyms:[c.synonym],example:{word:c.marker,text:c.example},exampleSynonym:{word:c.synonym,text:c.exampleSynonymText}};delete row.translation;d.push(row);}};
set("es","cotizable",{"definition":"Que puede negociarse o venderse en un mercado.","synonyms":["negociable"],"example":{"word":"cotizable","text":"Las acciones cotizables pueden comprarse en bolsa."},"exampleSynonym":{"word":"negociable","text":"Las acciones negociables pueden comprarse en bolsa."}});
set("es","desmenguar",{"definition":"Reducirse poco a poco, sobre todo una cosa no material.","synonyms":["disminuir"],"example":{"word":"desmenguar","text":"La tensión empezó a desmenguar."},"exampleSynonym":{"word":"disminuir","text":"La tensión empezó a disminuir."}});
set("es","desovillar",{"definition":"Desenrollar el hilo de un ovillo.","synonyms":["desenrollar"],"example":{"word":"desovillar","text":"Tuvo que desovillar el hilo antes de tejer."},"exampleSynonym":{"word":"desenrollar","text":"Tuvo que desenrollar el hilo antes de tejer."}});
set("es","resenable",{"definition":"Que merece destacarse en una reseña o comentario.","synonyms":["destacable"],"example":{"word":"reseñable","text":"Ese dato es reseñable en el informe."},"exampleSynonym":{"word":"destacable","text":"Ese dato es destacable en el informe."}});
set("en","row-3",{"definition":"Move a boat through water by pulling on oars.","synonyms":["propel the boat with oars"],"example":{"word":"row","text":"They row across the lake every morning."},"exampleSynonym":{"word":"propel the boat with oars","text":"They propel the boat with oars across the lake every morning."}});
set("en","nonsense-15",{"definition":"Something foolish or not worth serious attention.","synonyms":["trivial matter"],"example":{"word":"nonsense","text":"Do not waste time on that nonsense."},"exampleSynonym":{"word":"trivial matter","text":"Do not waste time on that trivial matter."}});
set("en","musty",{"definition":"Having an old, damp smell, often from mold.","synonyms":["stale-smelling"],"example":{"word":"musty","text":"The musty room needed fresh air."},"exampleSynonym":{"word":"stale-smelling","text":"The stale-smelling room needed fresh air."}});
set("en","snack-12",{"definition":"A small amount of food eaten between or instead of meals.","synonyms":["light bite"],"example":{"word":"snack","text":"We had a snack before dinner."},"exampleSynonym":{"word":"light bite","text":"We had a light bite before dinner."}});
split("en","jewel-2",[{"id":"b15-jewel-gem","word":"jewel","definition":"A precious stone used to decorate valuable objects.","synonym":"gem","marker":"jewel","example":"She chose a jewel for her ring.","exampleSynonymText":"She chose a gem for her ring."},{"id":"jewel-2","word":"jewel","definition":"A decorative object made with precious metal or stones.","synonym":"piece of jewelry","marker":"jewel","example":"She wore a jewel around her neck.","exampleSynonymText":"She wore a piece of jewelry around her neck."},{"id":"b15-jewel-figurative","word":"jewel","definition":"A person or thing valued for being excellent or beautiful.","synonym":"treasure","marker":"jewel","example":"The small museum is a jewel of the city.","exampleSynonymText":"The small museum is a treasure of the city."}]);
})();

(()=>{const dictionaries=globalThis.DICCIONARIOS;const set=(lang,id,fields)=>{const row=dictionaries[lang].find(x=>x.id===id);if(!row)throw Error('Missing source entry '+lang+'/'+id);Object.assign(row,fields);};const split=(lang,baseId,cards)=>{const d=dictionaries[lang],i=d.findIndex(x=>x.id===baseId);if(i<0)throw Error('Missing split source '+lang+'/'+baseId);const base={...d[i]};d.splice(i,1);for(const c of cards){if(d.some(x=>x.id===c.id))throw Error('Duplicate split card '+c.id);const row={...base,id:c.id,word:(c.word||base.word),definition:c.definition,synonyms:[c.synonym],example:{word:c.marker,text:c.example},exampleSynonym:{word:c.synonym,text:c.exampleSynonymText}};delete row.translation;d.push(row);}};
set("es","sartal",{"definition":"Serie de objetos ensartados en un hilo o una cuerda.","synonyms":["conjunto de cuentas"],"example":{"word":"sartal","text":"El sartal quedó en la mesa."},"exampleSynonym":{"word":"conjunto de cuentas","text":"El conjunto de cuentas quedó en la mesa."}});
set("es","talegada",{"definition":"Cantidad que cabe en una talega o saco.","synonyms":["carga"],"example":{"word":"talegada","text":"Una talegada de trigo llegó al molino."},"exampleSynonym":{"word":"carga","text":"Una carga de trigo llegó al molino."}});
set("es","tapapecho",{"definition":"Corte de carne de vacuno tomado del pecho del animal.","synonyms":["pecho de vacuno"],"example":{"word":"tapapecho","text":"El tapapecho se cocina a fuego lento."},"exampleSynonym":{"word":"pecho de vacuno","text":"El pecho de vacuno se cocina a fuego lento."}});
set("es","tomadero",{"definition":"Parte de un objeto que sirve para sujetarlo.","synonyms":["asa"],"example":{"word":"tomadero","text":"El tomadero sirve para sujetar la jarra."},"exampleSynonym":{"word":"asa","text":"El asa sirve para sujetar la jarra."}});
set("es","traqueal",{"definition":"Que tiene relación con la tráquea.","synonyms":["de la tráquea"],"example":{"word":"traqueal","text":"La irritación traqueal puede causar tos."},"exampleSynonym":{"word":"de la tráquea","text":"La irritación de la tráquea puede causar tos."}});
set("en","moonlighting",{"definition":"Working at a second job while holding a main job.","synonyms":["working a second job"],"example":{"word":"moonlighting","text":"He is moonlighting as a driver this summer."},"exampleSynonym":{"word":"working a second job","text":"He is working a second job as a driver this summer."}});
set("en","neology",{"definition":"The study or creation of new words.","synonyms":["word formation"],"example":{"word":"neology","text":"The course covers neology in modern English."},"exampleSynonym":{"word":"word formation","text":"The course covers word formation in modern English."}});
set("en","tasseled",{"definition":"Decorated with one or more hanging tassels.","synonyms":["fringed"],"example":{"word":"tasseled","text":"The tasseled curtain framed the window."},"exampleSynonym":{"word":"fringed","text":"The fringed curtain framed the window."}});
split("es","taberneria",[{"id":"taberneria","word":"tabernería","definition":"Trabajo de quien atiende o dirige una taberna.","synonym":"ocupación de tabernero","marker":"tabernería","example":"La tabernería fue el sustento de su familia.","exampleSynonymText":"La ocupación de tabernero fue el sustento de su familia."},{"id":"b15-taberneria-establishment","word":"tabernería","definition":"Local donde se sirven bebidas y, a veces, comidas.","synonym":"taberna","marker":"tabernería","example":"Abrieron una tabernería en la plaza.","exampleSynonymText":"Abrieron una taberna en la plaza."}]);
split("es","vampirismo",[{"id":"vampirismo","word":"vampirismo","definition":"Conducta atribuida a los vampiros, como extraer sangre de sus víctimas.","synonym":"hábito de beber sangre","marker":"vampirismo","example":"El vampirismo se atribuye a los vampiros.","exampleSynonymText":"El hábito de beber sangre se atribuye a los vampiros."},{"id":"b15-vampirismo-figurative","word":"vampirismo","definition":"Aprovechamiento abusivo de recursos o energía ajenos.","synonym":"explotación","marker":"vampirismo","example":"Se habló de vampirismo en la reunión.","exampleSynonymText":"Se habló de explotación en la reunión."}]);
split("en","rubric",[{"id":"rubric","word":"rubric","definition":"Instructions that explain how to complete an exam or task.","synonym":"directions","marker":"rubric","example":"Read the rubric before answering the questions.","exampleSynonymText":"Read the directions before answering the questions."},{"id":"b15-rubric-heading","word":"rubric","definition":"A heading that names a section or category.","synonym":"heading","marker":"rubric","example":"The rubric above the table names the section.","exampleSynonymText":"The heading above the table names the section."},{"id":"b15-rubric-grading","word":"rubric","definition":"A set of standards used to grade a piece of work.","synonym":"scoring guide","marker":"rubric","example":"The teacher shared the rubric before the essay was due.","exampleSynonymText":"The teacher shared the scoring guide before the essay was due."}]);
split("en","saffron",[{"id":"saffron","word":"saffron","definition":"Dried part of a crocus flower used to flavor and color food.","synonym":"spice","marker":"saffron","example":"A little saffron gives the rice a golden color.","exampleSynonymText":"A little spice gives the rice a golden color."},{"id":"b15-saffron-colour","word":"saffron","definition":"A dark yellow color, like the spice saffron.","synonym":"dark yellow","marker":"saffron","example":"She wore a saffron scarf.","exampleSynonymText":"She wore a dark yellow scarf."}]);
})();

(()=>{const dictionaries=globalThis.DICCIONARIOS;const set=(lang,id,fields)=>{const row=dictionaries[lang].find(x=>x.id===id);if(!row)throw Error('Missing source entry '+lang+'/'+id);Object.assign(row,fields);};const split=(lang,baseId,cards)=>{const d=dictionaries[lang],i=d.findIndex(x=>x.id===baseId);if(i<0)throw Error('Missing split source '+lang+'/'+baseId);const base={...d[i]};d.splice(i,1);for(const c of cards){if(d.some(x=>x.id===c.id))throw Error('Duplicate split card '+c.id);const row={...base,id:c.id,word:(c.word||base.word),definition:c.definition,synonyms:[c.synonym],example:{word:c.marker,text:c.example},exampleSynonym:{word:c.synonym,text:c.exampleSynonymText}};delete row.translation;d.push(row);}};
set("es","derechito",{"definition":"De forma directa y sin desviarse del camino.","synonyms":["directamente"],"example":{"word":"derechito","text":"El camino va derechito al río."},"exampleSynonym":{"word":"directamente","text":"El camino va directamente al río."}});
set("en","commissure",{"definition":"A point where two similar parts of the body join.","synonyms":["junction"],"example":{"word":"commissure","text":"The commissure joins two parts of the brain."},"exampleSynonym":{"word":"junction","text":"The junction joins two parts of the brain."}});
set("en","messenger",{"definition":"A person who carries messages from one person to another.","synonyms":["courier"],"example":{"word":"messenger","text":"The messenger delivered the letter before noon."},"exampleSynonym":{"word":"courier","text":"The courier delivered the letter before noon."}});
set("en","compiler",{"definition":"A person who gathers material from different sources into one work.","synonyms":["editor"],"example":{"word":"compiler","text":"The compiler assembled poems from several old books."},"exampleSynonym":{"word":"editor","text":"The editor assembled poems from several old books."}});
set("en","pickiness",{"definition":"The habit of being hard to please about small details.","synonyms":["fussiness"],"example":{"word":"pickiness","text":"Her pickiness about food frustrated her friends."},"exampleSynonym":{"word":"fussiness","text":"Her fussiness about food frustrated her friends."}});
set("en","spooky",{"definition":"Strange and frightening, as if something ghostly is nearby.","synonyms":["eerie"],"example":{"word":"spooky","text":"The empty house felt spooky at night."},"exampleSynonym":{"word":"eerie","text":"The empty house felt eerie at night."}});
set("en","scullery",{"definition":"A room beside a kitchen used for washing dishes and preparing food.","synonyms":["washing-up room"],"example":{"word":"scullery","text":"The old house has a scullery beside the kitchen."},"exampleSynonym":{"word":"washing-up room","text":"The old house has a washing-up room beside the kitchen."}});
split("es","blandicia",[{"id":"blandicia","word":"blandicia","definition":"Caricia o gesto suave que muestra cariño.","synonym":"caricia","marker":"blandicia","example":"La blandicia calmó al niño.","exampleSynonymText":"La caricia calmó al niño."},{"id":"b15-blandicia-flattery","word":"blandicia","definition":"Halago usado para agradar o convencer a alguien.","synonym":"palabras aduladoras","marker":"blandicia","example":"Usó blandicia para convencer al juez.","exampleSynonymText":"Usó palabras aduladoras para convencer al juez."}]);
split("en","scrupulous",[{"id":"scrupulous","word":"scrupulous","definition":"Very careful to do something correctly and thoroughly.","synonym":"meticulous","marker":"scrupulous","example":"The scrupulous editor checked every citation.","exampleSynonymText":"The meticulous editor checked every citation."},{"id":"b15-scrupulous-honest","word":"scrupulous","definition":"Honest and guided by strong moral principles.","synonym":"ethical","marker":"scrupulous","example":"The judge was scrupulous in every decision.","exampleSynonymText":"The judge was ethical in every decision."}]);
split("en","stagnate",[{"id":"stagnate","word":"stagnate","definition":"When liquid stagnates, it stops flowing and stays still.","synonym":"stop flowing","marker":"stagnate","example":"Dirty water can stagnate in a blocked pipe.","exampleSynonymText":"Dirty water can stop flowing in a blocked pipe."},{"id":"b15-stagnate-progress","word":"stagnate","definition":"When progress stagnates, it stops growing or improving.","synonym":"stop growing","marker":"stagnate","example":"Without investment, the local economy may stagnate.","exampleSynonymText":"Without investment, the local economy may stop growing."}]);
})();

(()=>{const dictionaries=globalThis.DICCIONARIOS;const set=(lang,id,fields)=>{const row=dictionaries[lang].find(x=>x.id===id);if(!row)throw Error('Missing source entry '+lang+'/'+id);Object.assign(row,fields);};const split=(lang,baseId,cards)=>{const d=dictionaries[lang],i=d.findIndex(x=>x.id===baseId);if(i<0)throw Error('Missing split source '+lang+'/'+baseId);const base={...d[i]};d.splice(i,1);for(const c of cards){if(d.some(x=>x.id===c.id))throw Error('Duplicate split card '+c.id);const row={...base,id:c.id,word:(c.word||base.word),definition:c.definition,synonyms:[c.synonym],example:{word:c.marker,text:c.example},exampleSynonym:{word:c.synonym,text:c.exampleSynonymText}};delete row.translation;d.push(row);}};
set("es","desconsolar",{"definition":"Causar gran tristeza o quitar el consuelo.","synonyms":["afligir"],"example":{"word":"desconsolar","text":"La noticia logró desconsolar a su familia."},"exampleSynonym":{"word":"afligir","text":"La noticia logró afligir a su familia."}});
set("es","geta",{"definition":"Calzado japonés de madera que se sujeta con correas.","synonyms":["calzado japonés"],"example":{"word":"geta","text":"El geta se lleva con kimono."},"exampleSynonym":{"word":"calzado japonés","text":"El calzado japonés se lleva con kimono."}});
set("es","sobrebota",{"definition":"Calzado impermeable que cubre otro zapato para protegerlo del agua.","synonyms":["funda impermeable para el zapato"],"example":{"word":"sobrebota","text":"La sobrebota evitó que entrara agua."},"exampleSynonym":{"word":"funda impermeable para el zapato","text":"La funda impermeable para el zapato evitó que entrara agua."}});
set("es","subprefectura",{"definition":"Oficina o territorio dirigido por un subprefecto.","synonyms":["oficina del subprefecto"],"example":{"word":"subprefectura","text":"La subprefectura supervisa varios municipios."},"exampleSynonym":{"word":"oficina del subprefecto","text":"La oficina del subprefecto supervisa varios municipios."}});
set("en","non-delegable",{"definition":"A duty or task that cannot be passed to another person.","synonyms":["nontransferable"],"example":{"word":"non-delegable","text":"This responsibility is non-delegable."},"exampleSynonym":{"word":"nontransferable","text":"This responsibility is nontransferable."}});
set("en","savage",{"definition":"Very violent, cruel, or uncontrolled.","synonyms":["brutal"],"example":{"word":"savage","text":"The savage attack shocked the town."},"exampleSynonym":{"word":"brutal","text":"The brutal attack shocked the town."}});
set("en","semi-cylinder",{"definition":"Half of a cylinder cut lengthwise through its central axis.","synonyms":["half-cylinder"],"example":{"word":"semi-cylinder","text":"The pipe had a semi-cylinder shape."},"exampleSynonym":{"word":"half-cylinder","text":"The pipe had a half-cylinder shape."}});
set("en","snide",{"definition":"Containing indirect and unkind criticism.","synonyms":["sneering"],"example":{"word":"snide","text":"She made a snide remark about his clothes."},"exampleSynonym":{"word":"sneering","text":"She made a sneering remark about his clothes."}});
set("en","saccharify",{"definition":"Convert starch or another substance into sugar.","synonyms":["convert"],"example":{"word":"saccharify","text":"Enzymes saccharify starch into sugar."},"exampleSynonym":{"word":"convert","text":"Enzymes convert starch into sugar."}});
split("en","skimming",[{"id":"skimming","word":"skimming","definition":"Reading something quickly to understand its main points.","synonym":"scanning","marker":"skimming","example":"She was skimming the report before the meeting.","exampleSynonymText":"She was scanning the report before the meeting."},{"id":"b15-skimming-surface","word":"skimming","definition":"Removing fat or another substance from a liquid surface.","synonym":"removing","marker":"skimming","example":"He is skimming fat from the soup.","exampleSynonymText":"He is removing fat from the soup."},{"id":"b15-skimming-fraud","word":"skimming","definition":"Secretly taking small amounts of money from an account.","synonym":"stealing small amounts","marker":"skimming","example":"The manager was arrested for skimming from customer accounts.","exampleSynonymText":"The manager was arrested for stealing small amounts from customer accounts."}]);
split("en","scratchy",[{"id":"scratchy","word":"scratchy","definition":"Rough or uncomfortable against the skin.","synonym":"rough","marker":"scratchy","example":"This wool sweater feels scratchy against my skin.","exampleSynonymText":"This wool sweater feels rough against my skin."},{"id":"b15-scratchy-sound","word":"scratchy","definition":"Producing a harsh, unclear sound.","synonym":"harsh-sounding","marker":"scratchy","example":"The old speaker made a scratchy sound.","exampleSynonymText":"The old speaker made a harsh-sounding sound."},{"id":"b15-scratchy-throat","word":"scratchy","definition":"Causing an irritated feeling in the throat.","synonym":"irritated","marker":"scratchy","example":"My throat feels scratchy after the concert.","exampleSynonymText":"My throat feels irritated after the concert."}]);
})();

(()=>{const dictionaries=globalThis.DICCIONARIOS;const set=(lang,id,fields)=>{const row=dictionaries[lang].find(x=>x.id===id);if(!row)throw Error('Missing source entry '+lang+'/'+id);Object.assign(row,fields);};const split=(lang,baseId,cards)=>{const d=dictionaries[lang],i=d.findIndex(x=>x.id===baseId);if(i<0)throw Error('Missing split source '+lang+'/'+baseId);const base={...d[i]};d.splice(i,1);for(const c of cards){if(d.some(x=>x.id===c.id))throw Error('Duplicate split card '+c.id);const row={...base,id:c.id,word:(c.word||base.word),definition:c.definition,synonyms:[c.synonym],example:{word:c.marker,text:c.example},exampleSynonym:{word:c.synonym,text:c.exampleSynonymText}};delete row.translation;d.push(row);}};
set("es","villaneria",{"definition":"Acción o dicho grosero o propio de alguien malvado.","synonyms":["maldad"],"example":{"word":"villanería","text":"La villanería del comentario ofendió a todos."},"exampleSynonym":{"word":"maldad","text":"La maldad del comentario ofendió a todos."}});
set("es","criptoanalisis",{"definition":"Estudio de cómo descifrar mensajes cifrados sin conocer la clave.","synonyms":["análisis criptográfico"],"example":{"word":"criptoanálisis","text":"El criptoanálisis permitió leer el mensaje secreto."},"exampleSynonym":{"word":"análisis criptográfico","text":"El análisis criptográfico permitió leer el mensaje secreto."}});
set("en","surplice",{"definition":"A loose white garment worn by clergy over other clothes.","synonyms":["liturgical vestment"],"example":{"word":"surplice","text":"The priest wore a surplice over his robe."},"exampleSynonym":{"word":"liturgical vestment","text":"The priest wore a liturgical vestment over his robe."}});
set("en","misanthropic",{"definition":"Disliking people and preferring to avoid them.","synonyms":["hostile"],"example":{"word":"misanthropic","text":"His misanthropic attitude made group events difficult."},"exampleSynonym":{"word":"hostile","text":"His hostile attitude made group events difficult."}});
set("en","mussel-farmer",{"definition":"A person who raises and harvests mussels for food.","synonyms":["mussel grower"],"example":{"word":"mussel farmer","text":"The mussel farmer checks the beds at low tide."},"exampleSynonym":{"word":"mussel grower","text":"The mussel grower checks the beds at low tide."}});
set("en","nightfall",{"definition":"The time when it becomes dark at the beginning of night.","synonyms":["dusk"],"example":{"word":"nightfall","text":"They reached the village just before nightfall."},"exampleSynonym":{"word":"dusk","text":"They reached the village just before dusk."}});
set("en","penitential",{"definition":"Showing regret for wrongdoing or relating to penance.","synonyms":["remorseful"],"example":{"word":"penitential","text":"His penitential prayers showed his regret."},"exampleSynonym":{"word":"remorseful","text":"His remorseful prayers showed his regret."}});
split("es","tijeretear",[{"id":"tijeretear","word":"tijeretear","definition":"Cortar algo con tijeras, a menudo en varios trozos.","synonym":"recortar","marker":"tijeretear","example":"La costurera tuvo que tijeretear la tela.","exampleSynonymText":"La costurera tuvo que recortar la tela."},{"id":"b15-tijeretear-criticize","word":"tijeretear","definition":"Criticar o murmurar sobre alguien de forma coloquial.","synonym":"criticar","marker":"tijeretear","example":"En la oficina empezaron a tijeretear a la jefa.","exampleSynonymText":"En la oficina empezaron a criticar a la jefa."}]);
split("en","corporate",[{"id":"corporate","word":"corporate","definition":"Relating to a company or large business.","synonym":"company","marker":"corporate","example":"The corporate records are open to the public.","exampleSynonymText":"The company records are open to the public."},{"id":"b15-corporate-legal","word":"corporate","definition":"Formed or managed as a legally registered corporation.","synonym":"incorporated","marker":"corporate","example":"The corporate business owns the property.","exampleSynonymText":"The incorporated business owns the property."}]);
split("en","mentality",[{"id":"mentality","word":"mentality","definition":"A person’s usual way of thinking or seeing things.","synonym":"mindset","marker":"mentality","example":"Her positive mentality helped the team recover.","exampleSynonymText":"Her positive mindset helped the team recover."},{"id":"b15-mentality-ability","word":"mentality","definition":"A person’s ability to think, understand, and learn.","synonym":"mental ability","marker":"mentality","example":"Stress can affect a person’s mentality.","exampleSynonymText":"Stress can affect a person’s mental ability."}]);
split("en","sperm",[{"id":"sperm","word":"sperm","definition":"A male reproductive cell that can fertilize an egg.","synonym":"sperm cell","marker":"sperm","example":"A sperm can fertilize an egg.","exampleSynonymText":"A sperm cell can fertilize an egg."},{"id":"b15-sperm-fluid","word":"sperm","definition":"The fluid containing sperm cells released during ejaculation.","synonym":"semen","marker":"sperm","example":"The lab tested the sperm sample.","exampleSynonymText":"The lab tested the semen sample."}]);
})();

(()=>{const row=globalThis.DICCIONARIOS.en.find(x=>x.id==='b15-scratchy-sound');if(!row)throw Error('Missing source entry en/b15-scratchy-sound');row.example={word:'scratchy',text:'The old speaker made a scratchy noise.'};row.exampleSynonym={word:'harsh-sounding',text:'The old speaker made a harsh-sounding noise.'};})();

(()=>{const dictionaries=globalThis.DICCIONARIOS;const set=(lang,id,fields)=>{const row=dictionaries[lang].find(x=>x.id===id);if(!row)throw Error('Missing source entry '+lang+'/'+id);Object.assign(row,fields);};const split=(lang,baseId,cards)=>{const d=dictionaries[lang],i=d.findIndex(x=>x.id===baseId);if(i<0)throw Error('Missing split source '+lang+'/'+baseId);const base={...d[i]};d.splice(i,1);for(const c of cards){if(d.some(x=>x.id===c.id))throw Error('Duplicate split card '+c.id);const row={...base,id:c.id,word:(c.word||base.word),definition:c.definition,synonyms:[c.synonym],example:{word:c.marker,text:c.example},exampleSynonym:{word:c.synonym,text:c.exampleSynonymText}};delete row.translation;d.push(row);}};
set("es","virtuosistico",{"definition":"Que muestra gran habilidad técnica, sobre todo artística.","synonyms":["virtuoso"],"example":{"word":"virtuosístico","text":"La pianista ofreció un pasaje virtuosístico."},"exampleSynonym":{"word":"virtuoso","text":"La pianista ofreció un pasaje virtuoso."}});
set("es","retiniano",{"definition":"Que tiene relación con la retina.","synonyms":["retinal"],"example":{"word":"retiniano","text":"El examen retiniano reveló una lesión."},"exampleSynonym":{"word":"retinal","text":"El examen retinal reveló una lesión."}});
set("es","boquituerto",{"definition":"Que tiene la boca torcida hacia un lado.","synonyms":["con la boca torcida"],"example":{"word":"boquituerto","text":"El personaje boquituerto aparecía en la caricatura."},"exampleSynonym":{"word":"con la boca torcida","text":"El personaje con la boca torcida aparecía en la caricatura."}});
set("en","credit",{"definition":"Related to borrowing money or providing loans.","synonyms":["credit-related"],"example":{"word":"credit","text":"The company offers credit services to small firms."},"exampleSynonym":{"word":"credit-related","text":"The company offers credit-related services to small firms."}});
set("en","stamp",{"definition":"Mark an object by pressing a tool onto it or printing.","synonyms":["imprint"],"example":{"word":"stamp","text":"They stamp the date on every page."},"exampleSynonym":{"word":"imprint","text":"They imprint the date on every page."}});
split("es","tratador",[{"id":"tratador","word":"tratador","definition":"Persona que negocia o comercia con algo.","synonym":"comerciante","marker":"tratador","example":"El tratador acordó el precio de las ovejas con el comprador.","exampleSynonymText":"El comerciante acordó el precio de las ovejas con el comprador."},{"id":"b15-tratador-animals","word":"tratador","definition":"Persona encargada de cuidar o preparar animales.","synonym":"cuidador de animales","marker":"tratador","example":"El tratador bañó al caballo antes de la carrera.","exampleSynonymText":"El cuidador de animales bañó al caballo antes de la carrera."}]);
})();

(()=>{const dictionaries=globalThis.DICCIONARIOS;const set=(lang,id,fields)=>{const row=dictionaries[lang].find(x=>x.id===id);if(!row)throw Error('Missing source entry '+lang+'/'+id);Object.assign(row,fields);};const split=(lang,baseId,cards)=>{const d=dictionaries[lang],i=d.findIndex(x=>x.id===baseId);if(i<0)throw Error('Missing split source '+lang+'/'+baseId);const base={...d[i]};d.splice(i,1);for(const c of cards){if(d.some(x=>x.id===c.id))throw Error('Duplicate split card '+c.id);const row={...base,id:c.id,word:(c.word||base.word),definition:c.definition,synonyms:[c.synonym],example:{word:c.marker,text:c.example},exampleSynonym:{word:c.synonym,text:c.exampleSynonymText}};delete row.translation;d.push(row);}};
set("es","apologico",{"definition":"Que defiende o elogia a una persona o una idea.","synonyms":["apologético"],"example":{"word":"apológico","text":"El texto apológico defendía la obra del autor."},"exampleSynonym":{"word":"apologético","text":"El texto apologético defendía la obra del autor."}});
set("es","antiamericano",{"definition":"Contrario a Estados Unidos o a su influencia.","synonyms":["antinorteamericano"],"example":{"word":"antiamericano","text":"El grupo antiamericano criticó las políticas del Gobierno estadounidense."},"exampleSynonym":{"word":"antinorteamericano","text":"El grupo antinorteamericano criticó las políticas del Gobierno estadounidense."}});
set("es","bacara",{"definition":"Juego de cartas cuyo objetivo es sumar nueve puntos.","synonyms":["baccarat"],"example":{"word":"bacará","text":"El bacará se juega con varias cartas sobre la mesa."},"exampleSynonym":{"word":"baccarat","text":"El baccarat se juega con varias cartas sobre la mesa."}});
set("es","resortera",{"definition":"Armazón con una goma que sirve para lanzar piedras pequeñas.","synonyms":["honda"],"example":{"word":"resortera","text":"La niña usó la resortera para lanzar una piedra."},"exampleSynonym":{"word":"honda","text":"La niña usó la honda para lanzar una piedra."}});
set("es","vertebral",{"definition":"Relacionado con las vértebras o la columna vertebral.","synonyms":["espinal"],"example":{"word":"vertebral","text":"La lesión vertebral requirió atención médica."},"exampleSynonym":{"word":"espinal","text":"La lesión espinal requirió atención médica."}});
set("es","ulcerativo",{"definition":"Que causa úlceras o se caracteriza por ellas.","synonyms":["ulceroso"],"example":{"word":"ulcerativo","text":"El médico detectó un proceso ulcerativo en el estómago."},"exampleSynonym":{"word":"ulceroso","text":"El médico detectó un proceso ulceroso en el estómago."}});
set("es","tonelero",{"definition":"Persona que fabrica o repara toneles.","synonyms":["fabricante de toneles"],"example":{"word":"tonelero","text":"El tonelero reparó el barril viejo."},"exampleSynonym":{"word":"fabricante de toneles","text":"El fabricante de toneles reparó el barril viejo."}});
set("es","bargueno",{"definition":"Mueble antiguo con cajones y compartimentos pequeños.","synonyms":["vargueño"],"example":{"word":"bargueño","text":"El bargueño antiguo guardaba documentos familiares."},"exampleSynonym":{"word":"vargueño","text":"El vargueño antiguo guardaba documentos familiares."}});
set("en","congratulations",{"definition":"Words that show happiness about someone's success or good news.","synonyms":["good wishes"],"example":{"word":"congratulations","text":"The team sent congratulations after the win."},"exampleSynonym":{"word":"good wishes","text":"The team sent good wishes after the win."}});
set("en","scorer-2",{"definition":"A person who scores a goal or earns points in a game.","synonyms":["goal scorer"],"example":{"word":"Scorer","text":"“Scorer” earned the winning point."},"exampleSynonym":{"word":"goal scorer","text":"“goal scorer” earned the winning point."}});
set("en","grasshopper-3",{"definition":"An insect with long back legs that let it jump.","synonyms":["hopper"],"example":{"word":"grasshopper","text":"A grasshopper jumped from the path into the grass."},"exampleSynonym":{"word":"hopper","text":"A hopper jumped from the path into the grass."}});
set("en","blue-eyed-2",{"definition":"Having eyes that are blue in color.","synonyms":["people with blue eyes"],"example":{"word":"Blue-eyed","text":"The phrase “Blue-eyed” describes people with blue eyes."},"exampleSynonym":{"word":"people with blue eyes","text":"The phrase “people with blue eyes” describes people with blue eyes."}});
set("en","shameless-2",{"definition":"Showing no shame about doing something wrong.","synonyms":["brazen"],"example":{"word":"Shameless","text":"“Shameless” describes someone who feels no shame about lying."},"exampleSynonym":{"word":"brazen","text":"“brazen” describes someone who feels no shame about lying."}});
set("es","lodera",{"definition":"Pieza flexible detrás de una rueda que evita salpicaduras.","synonyms":["guardabarros"],"example":{"word":"lodera","text":"La pieza llamada lodera evita las salpicaduras del camino."},"exampleSynonym":{"word":"guardabarros","text":"La pieza llamada guardabarros evita las salpicaduras del camino."}});
split("es","inglete",[{"id":"inglete-angle","definition":"Corte en ángulo de 45 grados que permite unir piezas.","synonym":"corte a 45 grados","example":"El carpintero marcó un inglete en la moldura.","exampleSynonymText":"El carpintero marcó un corte a 45 grados en la moldura.","marker":"inglete"},{"id":"inglete-joint","definition":"Unión de dos piezas cortadas en ángulo para que encajen.","synonym":"ensamble a 45 grados","example":"El inglete unió dos molduras en la esquina.","exampleSynonymText":"El ensamble a 45 grados unió dos molduras en la esquina.","marker":"inglete"}]);
set("es","tupitina",{"definition":"Hartazgo por comer o beber demasiado.","synonyms":["hartura"],"example":{"word":"tupitina","text":"Después de la fiesta, acabaron con una tupitina de dulces."},"exampleSynonym":{"word":"hartura","text":"Después de la fiesta, acabaron con una hartura de dulces."}});
set("en","miraculously-2",{"definition":"In a way that seems impossible or extremely unlikely.","synonyms":["against all odds"],"example":{"word":"miraculously","text":"The hikers survived miraculously after the storm."},"exampleSynonym":{"word":"against all odds","text":"The hikers survived against all odds after the storm."}});
set("en","infect-4",{"definition":"To spread germs to a person, animal, or place.","synonyms":["contaminate"],"example":{"word":"infect","text":"Bacteria can infect a water supply if pipes are damaged."},"exampleSynonym":{"word":"contaminate","text":"Bacteria can contaminate a water supply if pipes are damaged."}});
set("en","snowfall",{"definition":"Snow that falls during a period, or the amount that falls.","synonyms":["Snow"],"example":{"word":"Snowfall","text":"Snowfall blocked the road overnight."},"exampleSynonym":{"word":"Snow","text":"Snow blocked the road overnight."}});
})();

(()=>{const dictionaries=globalThis.DICCIONARIOS;const set=(lang,id,fields)=>{const row=dictionaries[lang].find(x=>x.id===id);if(!row)throw Error('Missing source entry '+lang+'/'+id);Object.assign(row,fields);};const split=(lang,baseId,cards)=>{const d=dictionaries[lang],i=d.findIndex(x=>x.id===baseId);if(i<0)throw Error('Missing split source '+lang+'/'+baseId);const base={...d[i]};d.splice(i,1);for(const c of cards){if(d.some(x=>x.id===c.id))throw Error('Duplicate split card '+c.id);const row={...base,id:c.id,word:(c.word||base.word),definition:c.definition,synonyms:[c.synonym],example:{word:c.marker,text:c.example},exampleSynonym:{word:c.synonym,text:c.exampleSynonymText}};delete row.translation;d.push(row);}};
set("es","cartamo",{"definition":"Planta de flores anaranjadas cuyas semillas producen un aceite comestible.","synonyms":["alazor"],"example":{"word":"cártamo","text":"El cártamo se cultiva por sus semillas y su aceite."},"exampleSynonym":{"word":"alazor","text":"El alazor se cultiva por sus semillas y su aceite."}});
set("es","conventiculo",{"definition":"Reunión secreta de personas que tratan un asunto de forma oculta.","synonyms":["reunión clandestina"],"example":{"word":"conventículo","text":"El encuentro, llamado conventículo, quedó en secreto."},"exampleSynonym":{"word":"reunión clandestina","text":"El encuentro, llamado reunión clandestina, quedó en secreto."}});
set("es","volatinero",{"definition":"Artista que hace acrobacias, a menudo sobre una cuerda.","synonyms":["acróbata"],"example":{"word":"volatinero","text":"El volatinero cruzó la cuerda ante el público."},"exampleSynonym":{"word":"acróbata","text":"El acróbata cruzó la cuerda ante el público."}});
set("es","acolhua",{"definition":"Persona perteneciente al pueblo acolhua del centro de México.","synonyms":["miembro del pueblo acolhua"],"example":{"word":"acolhua","text":"El acolhua participó en la asamblea de Texcoco."},"exampleSynonym":{"word":"miembro del pueblo acolhua","text":"El miembro del pueblo acolhua participó en la asamblea de Texcoco."}});
split("es","condensar",[{"id":"condensar-gas-to-liquid","definition":"Hacer que un gas pase a estado líquido al enfriarlo o comprimirlo.","synonym":"licuar","example":"El sistema puede condensar el vapor antes de liberarlo.","exampleSynonymText":"El sistema puede licuar el vapor antes de liberarlo.","marker":"condensar"},{"id":"condensar-summarize","definition":"Reducir un texto o una explicación a sus ideas principales.","synonym":"resumir","example":"La editora tuvo que condensar el informe en una página.","exampleSynonymText":"La editora tuvo que resumir el informe en una página.","marker":"condensar"}]);
set("es","coadjutor",{"definition":"Persona que ayuda a otra en su cargo o tarea.","synonyms":["ayudante"],"example":{"word":"coadjutor","text":"El coadjutor apoyó al sacerdote en la parroquia."},"exampleSynonym":{"word":"ayudante","text":"El ayudante apoyó al sacerdote en la parroquia."}});
set("es","delictivo",{"definition":"Relacionado con un delito o con una conducta ilegal.","synonyms":["criminal"],"example":{"word":"delictivo","text":"El hecho delictivo alarmó a los vecinos."},"exampleSynonym":{"word":"criminal","text":"El hecho criminal alarmó a los vecinos."}});
split("en","seriously-2",[{"id":"seriously-not-joking","definition":"In a serious way, without joking or pretending.","synonym":"earnestly","example":"“Seriously” describes an earnest answer to the question.","exampleSynonymText":"“earnestly” describes an earnest answer to the question.","marker":"Seriously"},{"id":"seriously-disbelief","definition":"Used to show surprise or doubt about what someone said.","synonym":"Really","example":"“Seriously?” she asked when she heard the price.","exampleSynonymText":"“Really?” she asked when she heard the price.","marker":"Seriously"}]);
set("en","manufacturing-2",{"definition":"The process of making products, often in factories or workshops.","synonyms":["Production"],"example":{"word":"Manufacturing","text":"Manufacturing provides many jobs in the region."},"exampleSynonym":{"word":"Production","text":"Production provides many jobs in the region."}});
set("en","stealthily",{"definition":"Quietly and carefully so that others do not see or hear you.","synonyms":["secretly"],"example":{"word":"stealthily","text":"The fox moved stealthily through the garden."},"exampleSynonym":{"word":"secretly","text":"The fox moved secretly through the garden."}});
set("en","liar-9",{"definition":"A person who tells lies to deceive other people.","synonyms":["deceiver"],"example":{"word":"liar","text":"The liar admitted that he had invented the story."},"exampleSynonym":{"word":"deceiver","text":"The deceiver admitted that he had invented the story."}});
set("en","oil-tanker",{"definition":"A large ship that carries oil from one place to another.","synonyms":["oil ship"],"example":{"word":"Oil tanker","text":"“Oil tanker” names a large ship that carries fuel."},"exampleSynonym":{"word":"oil ship","text":"“oil ship” names a large ship that carries fuel."}});
})();

(()=>{const dictionaries=globalThis.DICCIONARIOS;const set=(lang,id,fields)=>{const row=dictionaries[lang].find(x=>x.id===id);if(!row)throw Error('Missing source entry '+lang+'/'+id);Object.assign(row,fields);};const split=(lang,baseId,cards)=>{const d=dictionaries[lang],i=d.findIndex(x=>x.id===baseId);if(i<0)throw Error('Missing split source '+lang+'/'+baseId);const base={...d[i]};d.splice(i,1);for(const c of cards){if(d.some(x=>x.id===c.id))throw Error('Duplicate split card '+c.id);const row={...base,id:c.id,word:(c.word||base.word),definition:c.definition,synonyms:[c.synonym],example:{word:c.marker,text:c.example},exampleSynonym:{word:c.synonym,text:c.exampleSynonymText}};delete row.translation;d.push(row);}};
set("es","definido",{"definition":"Que está claro y tiene límites o características precisas.","synonyms":["preciso"],"example":{"word":"definido","text":"El contrato tiene un plazo definido."},"exampleSynonym":{"word":"preciso","text":"El contrato tiene un plazo preciso."}});
set("es","clavicembalo",{"definition":"Instrumento antiguo de teclado parecido al piano.","synonyms":["clavecín"],"example":{"word":"clavicémbalo","text":"El clavicémbalo acompañó a los cantantes en el concierto."},"exampleSynonym":{"word":"clavecín","text":"El clavecín acompañó a los cantantes en el concierto."}});
set("es","conspirativo",{"definition":"Relacionado con una conspiración o con quienes conspiran.","synonyms":["conspiratorio"],"example":{"word":"conspirativo","text":"La novela tiene un tono conspirativo."},"exampleSynonym":{"word":"conspiratorio","text":"La novela tiene un tono conspiratorio."}});
split("es","confeccionar",[{"id":"confeccionar-sew-garment","definition":"Hacer una prenda cortando y cosiendo tela.","synonym":"coser","example":"La modista quiso confeccionar un vestido para la fiesta.","exampleSynonymText":"La modista quiso coser un vestido para la fiesta.","marker":"confeccionar"},{"id":"confeccionar-prepare-document","definition":"Preparar algo, como una lista, un informe o un plan.","synonym":"elaborar","example":"El equipo decidió confeccionar la lista de invitados.","exampleSynonymText":"El equipo decidió elaborar la lista de invitados.","marker":"confeccionar"}]);
split("es","vilorta",[{"id":"vilorta-flexible-tie","definition":"Lazo flexible de mimbre, paja u otro material.","synonym":"atadura de mimbre","example":"Sujetó las ramas con una vilorta.","exampleSynonymText":"Sujetó las ramas con una atadura de mimbre.","marker":"vilorta"},{"id":"vilorta-climbing-plant","definition":"Planta trepadora de tallos delgados y flexibles.","synonym":"planta trepadora","example":"La vilorta creció alrededor del muro.","exampleSynonymText":"La planta trepadora creció alrededor del muro.","marker":"vilorta"}]);
set("es","ventanillo",{"definition":"Ventana pequeña o abertura en una puerta o pared.","synonyms":["ventanilla"],"example":{"word":"ventanillo","text":"La abertura llamada ventanillo deja pasar la luz."},"exampleSynonym":{"word":"ventanilla","text":"La abertura llamada ventanilla deja pasar la luz."}});
set("es","apunear",{"definition":"Golpear a alguien repetidamente con los puños.","synonyms":["apuñetear"],"example":{"word":"apuñear","text":"El hombre intentó apuñear la puerta con rabia."},"exampleSynonym":{"word":"apuñetear","text":"El hombre intentó apuñetear la puerta con rabia."}});
set("en","spinning-top-4",{"definition":"A small toy that spins around a pointed end.","synonyms":["top"],"example":{"word":"spinning top","text":"The child spun the spinning top across the table."},"exampleSynonym":{"word":"top","text":"The child spun the top across the table."}});
set("en","support-7",{"definition":"Help or encouragement given to someone.","synonyms":["help"],"example":{"word":"Support","text":"“Support” means help during a difficult time."},"exampleSynonym":{"word":"help","text":"“help” means help during a difficult time."}});
set("es","cornea",{"definition":"Parte transparente del ojo que cubre el iris y la pupila.","synonyms":["parte transparente del ojo"],"example":{"word":"córnea","text":"La córnea protege la parte delantera del ojo."},"exampleSynonym":{"word":"parte transparente del ojo","text":"La parte transparente del ojo protege la parte delantera del ojo."}});
split("es","cuadrilitero",[{"id":"cuadrilitero-polygon","definition":"Figura geométrica cerrada que tiene cuatro lados.","synonym":"polígono de cuatro lados","example":"El cuadrilítero ocupa casi toda la hoja.","exampleSynonymText":"El polígono de cuatro lados ocupa casi toda la hoja.","marker":"cuadrilítero"},{"id":"cuadrilitero-boxing-ring","definition":"Espacio donde se celebran combates de boxeo.","synonym":"ring de boxeo","example":"El cuadrilítero quedó vacío tras el combate.","exampleSynonymText":"El ring de boxeo quedó vacío tras el combate.","marker":"cuadrilítero"}]);
split("es","cartelera",[{"id":"cartelera-notice-board","definition":"Panel donde se colocan anuncios, avisos o información.","synonym":"pizarra de anuncios","example":"La cartelera de la escuela quedó llena de avisos.","exampleSynonymText":"La pizarra de anuncios de la escuela quedó llena de avisos.","marker":"cartelera"},{"id":"cartelera-program","definition":"Lista de películas, obras u otros espectáculos disponibles.","synonym":"programación","example":"La cartelera del cine cambia cada semana.","exampleSynonymText":"La programación del cine cambia cada semana.","marker":"cartelera"}]);
set("es","demagogico",{"definition":"Que busca apoyo con promesas fáciles o manipulaciones.","synonyms":["populista"],"example":{"word":"demagógico","text":"El discurso demagógico prometió soluciones simples."},"exampleSynonym":{"word":"populista","text":"El discurso populista prometió soluciones simples."}});
set("es","garguero",{"definition":"Parte de la garganta por donde pasa el aire.","synonyms":["garganta"],"example":{"word":"garguero","text":"La zona se conoce como garguero."},"exampleSynonym":{"word":"garganta","text":"La zona se conoce como garganta."}});
set("es","asperjar",{"definition":"Rociar un líquido en forma de pequeñas gotas.","synonyms":["rociar"],"example":{"word":"asperjar","text":"El jardinero decidió asperjar las hojas con agua."},"exampleSynonym":{"word":"rociar","text":"El jardinero decidió rociar las hojas con agua."}});
set("es","colmenilla",{"definition":"Seta comestible con un sombrero lleno de huecos.","synonyms":["morilla"],"example":{"word":"colmenilla","text":"La cocinera añadió colmenilla al guiso."},"exampleSynonym":{"word":"morilla","text":"La cocinera añadió morilla al guiso."}});
set("es","botonadura",{"definition":"Conjunto de botones que lleva una prenda de vestir.","synonyms":["abotonadura"],"example":{"word":"botonadura","text":"La botonadura de la chaqueta era dorada."},"exampleSynonym":{"word":"abotonadura","text":"La abotonadura de la chaqueta era dorada."}});
set("es","ciclonico",{"definition":"Relacionado con un ciclón o con vientos muy fuertes.","synonyms":["ciclonal"],"example":{"word":"ciclónico","text":"El viento ciclónico dañó varias casas."},"exampleSynonym":{"word":"ciclonal","text":"El viento ciclonal dañó varias casas."}});
})();

(()=>{const row=globalThis.DICCIONARIOS.en.find(x=>x.id==='improbability-2');if(!row)throw Error('Missing source entry en/improbability-2');Object.assign(row,{"definition":"The quality of being unlikely to happen.","synonyms":["unlikelihood"],"example":{"word":"Improbability","text":"The “Improbability” of the result surprised them."},"exampleSynonym":{"word":"unlikelihood","text":"The “unlikelihood” of the result surprised them."}});})();

(()=>{const dictionaries=globalThis.DICCIONARIOS;const set=(lang,id,fields)=>{const row=dictionaries[lang].find(x=>x.id===id);if(!row)throw Error('Missing source entry '+lang+'/'+id);Object.assign(row,fields);};const split=(lang,baseId,cards)=>{const d=dictionaries[lang],i=d.findIndex(x=>x.id===baseId);if(i<0)throw Error('Missing split source '+lang+'/'+baseId);const base={...d[i]};d.splice(i,1);for(const c of cards){if(d.some(x=>x.id===c.id))throw Error('Duplicate split card '+c.id);const row={...base,id:c.id,word:(c.word||base.word),definition:c.definition,synonyms:[c.synonym],example:{word:(c.marker||base.word),text:c.example},exampleSynonym:{word:c.synonym,text:c.exampleSynonymText}};delete row.translation;d.push(row);}};
split("es","fulgurante",[{"id":"fulgurante-bright","definition":"Que brilla con una luz intensa y breve.","synonym":"brillante","example":"Una luz fulgurante iluminó la sala.","exampleSynonymText":"Una luz brillante iluminó la sala."},{"id":"fulgurante-sudden-success","definition":"Que ocurre muy rápido y causa una gran impresión.","synonym":"meteórico","example":"El ascenso del equipo fue fulgurante.","exampleSynonymText":"El ascenso del equipo fue meteórico."}]);
set("es","sillar",{"definition":"Piedra grande y labrada que se usa para construir muros.","synonyms":["bloque de piedra labrada"],"example":{"word":"sillar","text":"Los albañiles colocaron el sillar en la pared."},"exampleSynonym":{"word":"bloque de piedra labrada","text":"Los albañiles colocaron el bloque de piedra labrada en la pared."}});
set("en","indigenous-2",{"definition":"Native to a particular place or originating there.","synonyms":["native"],"example":{"word":"indigenous","text":"These indigenous plants grow naturally in the area."},"exampleSynonym":{"word":"native","text":"These native plants grow naturally in the area."}});
set("en","roof-5",{"definition":"A flat roof that people can go on or use.","synonyms":["terrace"],"example":{"word":"Roof","text":"“Roof” here means a flat place people can use."},"exampleSynonym":{"word":"terrace","text":"“terrace” here means a flat place people can use."}});
set("en","grumpy-3",{"definition":"Easily annoyed, especially about small problems.","synonyms":["irritable"],"example":{"word":"Grumpy","text":"“Grumpy” describes someone who gets annoyed easily."},"exampleSynonym":{"word":"irritable","text":"“irritable” describes someone who gets annoyed easily."}});
set("en","state-2",{"definition":"Connected with a state or its government.","synonyms":["Governmental"],"example":{"word":"State","text":"“State” describes something connected with a country's government."},"exampleSynonym":{"word":"Governmental","text":"“Governmental” describes something connected with a country's government."}});
set("en","skinny-7",{"definition":"Very thin, sometimes in a way that may sound negative.","synonyms":["thin"],"example":{"word":"Skinny","text":"“Skinny” can describe a person or animal that is very thin."},"exampleSynonym":{"word":"thin","text":"“thin” can describe a person or animal that is very thin."}});
set("en","charm-4",{"definition":"A quality that makes someone or something pleasant and attractive.","synonyms":["appeal"],"example":{"word":"Charm","text":"“Charm” gives the old house a warm feeling."},"exampleSynonym":{"word":"appeal","text":"“appeal” gives the old house a warm feeling."}});
set("en","need-3",{"definition":"To require something because it is necessary.","synonyms":["require"],"example":{"word":"need","text":"Plants need water to grow."},"exampleSynonym":{"word":"require","text":"Plants require water to grow."}});
set("en","exceed-3",{"definition":"To be greater than a number, amount, or limit.","synonyms":["surpass"],"example":{"word":"exceed","text":"Sales exceed last year's total."},"exampleSynonym":{"word":"surpass","text":"Sales surpass last year's total."}});
set("en","sericulture-2",{"definition":"The raising of silkworms to produce silk.","synonyms":["Silk farming"],"example":{"word":"Sericulture","text":"Sericulture provides work in places that raise silkworms."},"exampleSynonym":{"word":"Silk farming","text":"Silk farming provides work in places that raise silkworms."}});
})();

(()=>{const dictionaries=globalThis.DICCIONARIOS;const set=(lang,id,fields)=>{const row=dictionaries[lang].find(x=>x.id===id);if(!row)throw Error('Missing source entry '+lang+'/'+id);Object.assign(row,fields);};const split=(lang,baseId,cards)=>{const d=dictionaries[lang],i=d.findIndex(x=>x.id===baseId);if(i<0)throw Error('Missing split source '+lang+'/'+baseId);const base={...d[i]};d.splice(i,1);for(const c of cards){if(d.some(x=>x.id===c.id))throw Error('Duplicate split card '+c.id);const row={...base,id:c.id,word:(c.word||base.word),definition:c.definition,synonyms:[c.synonym],example:{word:(c.marker||base.word),text:c.example},exampleSynonym:{word:c.synonym,text:c.exampleSynonymText}};delete row.translation;d.push(row);}};
split("es","sobrecoger",[{"id":"sobrecoger-frighten","definition":"Causar miedo o alarma de repente.","synonym":"asustar","example":"El ruido logró sobrecoger a los niños.","exampleSynonymText":"El ruido logró asustar a los niños."},{"id":"sobrecoger-impress","definition":"Causar una impresión muy intensa o sorprender.","synonym":"impresionar","example":"La noticia puede sobrecoger al público.","exampleSynonymText":"La noticia puede impresionar al público."}]);
set("es","sorna",{"definition":"Ironía expresada con lentitud y un tono malicioso.","synonyms":["sarcasmo"],"example":{"word":"sorna","text":"Respondió con sorna a la propuesta."},"exampleSynonym":{"word":"sarcasmo","text":"Respondió con sarcasmo a la propuesta."}});
split("es","tahona",[{"id":"tahona-animal-powered-mill","definition":"Molino de harina movido por animales.","synonym":"molino de harina","example":"El término «tahona» nombraba un molino movido por animales.","exampleSynonymText":"El término «molino de harina» nombraba un molino movido por animales."},{"id":"tahona-bakery","definition":"Establecimiento donde se hace y vende pan.","synonym":"panadería","example":"La tahona abre antes del amanecer.","exampleSynonymText":"La panadería abre antes del amanecer."}]);
set("es","tapiar",{"definition":"Cerrar un espacio levantando una pared de ladrillos.","synonyms":["tabicar"],"example":{"word":"tapiar","text":"Decidieron tapiar la ventana después del robo."},"exampleSynonym":{"word":"tabicar","text":"Decidieron tabicar la ventana después del robo."}});
set("es","tapujo",{"definition":"Tela o prenda usada para cubrirse la cara.","synonyms":["embozo"],"example":{"word":"tapujo","text":"Se cubrió el rostro con un tapujo."},"exampleSynonym":{"word":"embozo","text":"Se cubrió el rostro con un embozo."}});
set("es","temeridad",{"definition":"Conducta muy arriesgada que puede causar daño.","synonyms":["imprudencia"],"example":{"word":"temeridad","text":"Conducir tan rápido fue una temeridad."},"exampleSynonym":{"word":"imprudencia","text":"Conducir tan rápido fue una imprudencia."}});
split("es","transcurrir",[{"id":"transcurrir-time-pass","definition":"Pasar el tiempo mientras algo dura.","synonym":"pasar","example":"El tiempo puede transcurrir muy despacio.","exampleSynonymText":"El tiempo puede pasar muy despacio."},{"id":"transcurrir-event-unfold","definition":"Desarrollarse un hecho o acontecimiento a lo largo del tiempo.","synonym":"desarrollarse","example":"El evento puede transcurrir sin incidentes.","exampleSynonymText":"El evento puede desarrollarse sin incidentes."}]);
set("es","trapezoidal",{"definition":"Que tiene forma de trapezoide.","synonyms":["con forma de trapezoide"],"example":{"word":"trapezoidal","text":"La mesa trapezoidal ocupaba el centro del salón."},"exampleSynonym":{"word":"con forma de trapezoide","text":"La mesa con forma de trapezoide ocupaba el centro del salón."}});
set("en","sprout-4",{"definition":"A new plant stem or leaf that is starting to grow.","synonyms":["shoot"],"example":{"word":"Sprout","text":"The word “Sprout” can refer to a new plant shoot."},"exampleSynonym":{"word":"shoot","text":"The word “shoot” can refer to a new plant shoot."}});
set("en","copy-8",{"definition":"A printed or digital version of an original.","synonyms":["duplicate"],"example":{"word":"Copy","text":"“Copy” means a version of an original."},"exampleSynonym":{"word":"duplicate","text":"“duplicate” means a version of an original."}});
set("en","remedy-3",{"definition":"To fix a problem or make it better.","synonyms":["fix"],"example":{"word":"Remedy","text":"To “Remedy” a problem means to fix it."},"exampleSynonym":{"word":"fix","text":"To “fix” a problem means to fix it."}});
})();

(()=>{const dictionaries=globalThis.DICCIONARIOS;const set=(lang,id,fields)=>{const row=dictionaries[lang].find(x=>x.id===id);if(!row)throw Error('Missing source entry '+lang+'/'+id);Object.assign(row,fields);};
set("es","treceavo",{"definition":"Cada una de las trece partes iguales de un todo.","synonyms":["treceava parte"],"example":{"word":"treceavo","text":"«treceavo» puede nombrar una de las trece partes iguales."},"exampleSynonym":{"word":"treceava parte","text":"«treceava parte» puede nombrar una de las trece partes iguales."}});
set("es","ubicuo",{"definition":"Que parece estar presente en muchos lugares al mismo tiempo.","synonyms":["omnipresente"],"example":{"word":"ubicuo","text":"El término ubicuo describe algo que parece estar en muchos lugares."},"exampleSynonym":{"word":"omnipresente","text":"El término omnipresente describe algo que parece estar en muchos lugares."}});
set("es","yare",{"definition":"Jugo tóxico de yuca amarga que se elimina antes de comerla.","synonyms":["jugo venenoso de yuca"],"example":{"word":"yare","text":"El yare debe extraerse de la yuca amarga antes de cocinarla."},"exampleSynonym":{"word":"jugo venenoso de yuca","text":"El jugo venenoso de yuca debe extraerse de la yuca amarga antes de cocinarla."}});
set("en","lardon",{"definition":"A small strip of bacon used to add flavor to food.","synonyms":["bacon strip"],"example":{"word":"Lardon","text":"“Lardon” is a word for a small strip of bacon."},"exampleSynonym":{"word":"bacon strip","text":"“bacon strip” is a word for a small strip of bacon."}});
})();

(()=>{const dictionaries=globalThis.DICCIONARIOS;const set=(lang,id,fields)=>{const row=dictionaries[lang].find(x=>x.id===id);if(!row)throw Error('Missing source entry '+lang+'/'+id);Object.assign(row,fields);};const split=(lang,baseId,cards)=>{const d=dictionaries[lang],i=d.findIndex(x=>x.id===baseId);if(i<0)throw Error('Missing split source '+lang+'/'+baseId);const base={...d[i]};d.splice(i,1);for(const c of cards){if(d.some(x=>x.id===c.id))throw Error('Duplicate split card '+c.id);const row={...base,id:c.id,word:(c.word||base.word),definition:c.definition,synonyms:[c.synonym],example:{word:(c.marker||base.word),text:c.example},exampleSynonym:{word:c.synonym,text:c.exampleSynonymText}};delete row.translation;d.push(row);}};
set("es","zaranda",{"definition":"Malla que separa partículas según su tamaño.","synonyms":["criba"],"example":{"word":"zaranda","text":"La zaranda separó la harina de las piedras."},"exampleSynonym":{"word":"criba","text":"La criba separó la harina de las piedras."}});
split("es","acierto",[{"id":"acierto-correct-result","definition":"Resultado correcto de una respuesta, una elección o una acción.","synonym":"respuesta correcta","example":"Su acierto sorprendió al jurado.","exampleSynonymText":"Su respuesta correcta sorprendió al jurado."},{"id":"acierto-good-judgment","definition":"Capacidad para elegir bien o actuar con buen juicio.","synonym":"buen juicio","example":"Mostró acierto al elegir el momento adecuado.","exampleSynonymText":"Mostró buen juicio al elegir el momento adecuado."}]);
set("es","alcanzado",{"definition":"Que tiene deudas o muy poco dinero disponible.","synonyms":["endeudado"],"example":{"word":"alcanzado","text":"El comerciante alcanzado pidió un préstamo."},"exampleSynonym":{"word":"endeudado","text":"El comerciante endeudado pidió un préstamo."}});
split("es","boquilla",[{"id":"boquilla-wind-instrument","definition":"Pieza de un instrumento de viento que se coloca en los labios.","synonym":"embocadura","example":"La boquilla del clarinete se rompió antes del concierto.","exampleSynonymText":"La embocadura del clarinete se rompió antes del concierto."},{"id":"boquilla-smoking-pipe","definition":"Pieza de una pipa o cigarrillo que se lleva a la boca.","synonym":"pieza del cigarrillo","example":"La expresión «boquilla» nombra la pieza del cigarrillo que se lleva a la boca.","exampleSynonymText":"La expresión «pieza del cigarrillo» nombra la pieza del cigarrillo que se lleva a la boca."}]);
set("es","brevedad",{"definition":"Poca duración o poca extensión de algo.","synonyms":["concisión"],"example":{"word":"brevedad","text":"La brevedad del discurso mantuvo la atención."},"exampleSynonym":{"word":"concisión","text":"La concisión del discurso mantuvo la atención."}});
split("en","speak",[{"id":"speak-talk","definition":"To use words or have a conversation with someone.","synonym":"talk","example":"The team needs to speak with the manager.","exampleSynonymText":"The team needs to talk with the manager."},{"id":"speak-jargon","definition":"A special style of language used by a group or industry.","synonym":"jargon","example":"Corporate speak can confuse new employees.","exampleSynonymText":"Corporate jargon can confuse new employees."}]);
set("en","hydria-2",{"definition":"An ancient Greek jar used to carry or store water.","synonyms":["water jar"],"example":{"word":"hydria","text":"An ancient hydria held water for the household."},"exampleSynonym":{"word":"water jar","text":"An ancient water jar held water for the household."}});
set("en","spark-6",{"definition":"A tiny burning piece that flies off a fire.","synonyms":["ember"],"example":{"word":"spark","text":"That spark landed on the wooden floor."},"exampleSynonym":{"word":"ember","text":"That ember landed on the wooden floor."}});
set("en","steer-2",{"definition":"A young male cow that has been castrated, usually for meat.","synonyms":["bullock"],"example":{"word":"steer","text":"The steer grazed in the field."},"exampleSynonym":{"word":"bullock","text":"The bullock grazed in the field."}});
set("en","death-policy",{"definition":"A contract that pays money after the insured person dies.","synonyms":["life insurance policy"],"example":{"word":"Death policy","text":"“Death policy” means a contract that pays money after someone dies."},"exampleSynonym":{"word":"life insurance policy","text":"“life insurance policy” means a contract that pays money after someone dies."}});
set("en","payment-gateway",{"definition":"A service that sends online payments between a buyer and a seller.","synonyms":["online payment processor"],"example":{"word":"Payment gateway","text":"The Payment gateway approved the purchase."},"exampleSynonym":{"word":"online payment processor","text":"The online payment processor approved the purchase."}});
})();

(()=>{const dictionaries=globalThis.DICCIONARIOS;const set=(lang,id,fields)=>{const row=dictionaries[lang].find(x=>x.id===id);if(!row)throw Error('Missing source entry '+lang+'/'+id);Object.assign(row,fields);};const split=(lang,baseId,cards)=>{const d=dictionaries[lang],i=d.findIndex(x=>x.id===baseId);if(i<0)throw Error('Missing split source '+lang+'/'+baseId);const base={...d[i]};d.splice(i,1);for(const c of cards){if(d.some(x=>x.id===c.id))throw Error('Duplicate split card '+c.id);const row={...base,id:c.id,word:(c.word||base.word),definition:c.definition,synonyms:[c.synonym],example:{word:(c.marker||base.word),text:c.example},exampleSynonym:{word:c.synonym,text:c.exampleSynonymText}};delete row.translation;d.push(row);}};
set("es","clero",{"definition":"Conjunto de sacerdotes y otros ministros de una iglesia.","synonyms":["conjunto de sacerdotes"],"example":{"word":"clero","text":"El clero asistió a la ceremonia de apertura."},"exampleSynonym":{"word":"conjunto de sacerdotes","text":"El conjunto de sacerdotes asistió a la ceremonia de apertura."}});
set("es","cucaracha",{"definition":"Insecto de cuerpo plano que suele vivir en lugares cálidos y húmedos.","synonyms":["barata"],"example":{"word":"cucaracha","text":"La cucaracha se escondió bajo el mueble."},"exampleSynonym":{"word":"barata","text":"La barata se escondió bajo el mueble."}});
set("es","delator",{"definition":"Persona que acusa a otra o revela algo secreto sobre ella.","synonyms":["soplón"],"example":{"word":"delator","text":"El delator contó lo que había visto."},"exampleSynonym":{"word":"soplón","text":"El soplón contó lo que había visto."}});
set("es","franqueza",{"definition":"Cualidad de decir con claridad lo que se piensa o siente.","synonyms":["sinceridad"],"example":{"word":"franqueza","text":"Habló con franqueza ante el grupo."},"exampleSynonym":{"word":"sinceridad","text":"Habló con sinceridad ante el grupo."}});
split("es","sino",[{"id":"sino-corrective-conjunction","definition":"Introduce una idea que corrige o sustituye una negación anterior.","synonym":"más bien","example":"No pidió dinero, sino tiempo.","exampleSynonymText":"No pidió dinero, más bien tiempo."},{"id":"sino-destiny","definition":"Destino o suerte que le toca vivir a alguien.","synonym":"destino","example":"Su sino parecía estar lejos de casa.","exampleSynonymText":"Su destino parecía estar lejos de casa."}]);
set("es","soplon",{"definition":"Persona que revela secretos o acusa a otra ante alguien.","synonyms":["delator"],"example":{"word":"soplón","text":"El soplón avisó a la policía sobre el robo."},"exampleSynonym":{"word":"delator","text":"El delator avisó a la policía sobre el robo."}});
set("es","superioridad",{"definition":"Ventaja o posición más alta respecto a otras personas o cosas.","synonyms":["ventaja clara"],"example":{"word":"superioridad","text":"El equipo mostró superioridad durante el partido."},"exampleSynonym":{"word":"ventaja clara","text":"El equipo mostró ventaja clara durante el partido."}});
set("es","valeroso",{"definition":"Que actúa con valentía ante un peligro o una dificultad.","synonyms":["valiente"],"example":{"word":"valeroso","text":"El valeroso rescatista entró en la casa en llamas."},"exampleSynonym":{"word":"valiente","text":"El valiente rescatista entró en la casa en llamas."}});
set("en","climb",{"definition":"To move upward, often using your hands and feet.","synonyms":["ascend"],"example":{"word":"Climb","text":"“Climb” means to move upward using your hands and feet."},"exampleSynonym":{"word":"ascend","text":"“ascend” means to move upward using your hands and feet."}});
set("en","monetize",{"definition":"To earn money from something, especially a service or product.","synonyms":["make money from"],"example":{"word":"Monetize","text":"“Monetize” means to earn money from something."},"exampleSynonym":{"word":"make money from","text":"“make money from” means to earn money from something."}});
set("en","gendarmerie",{"definition":"A police force with military duties, especially in rural areas.","synonyms":["Military police"],"example":{"word":"Gendarmerie","text":"Gendarmerie forces patrolled the border at night."},"exampleSynonym":{"word":"Military police","text":"Military police forces patrolled the border at night."}});
split("en","reverend",[{"id":"reverend-minister-title","definition":"A title used before the name of a Christian minister.","synonym":"minister","example":"The Reverend led the service on Sunday.","exampleSynonymText":"The minister led the service on Sunday."},{"id":"reverend-respected","definition":"Worthy of great respect.","synonym":"respected","example":"“Reverend” is an old word meaning worthy of respect.","exampleSynonymText":"“respected” is an old word meaning worthy of respect."}]);
set("en","chambray",{"definition":"A light cotton fabric woven with colored threads.","synonyms":["light cotton fabric"],"example":{"word":"chambray","text":"This chambray is soft and lightweight."},"exampleSynonym":{"word":"light cotton fabric","text":"This light cotton fabric is soft and lightweight."}});
set("en","conjecturable",{"definition":"Possible to guess or infer from the facts available.","synonyms":["inferable"],"example":{"word":"conjecturable","text":"The outcome was conjecturable from the clues."},"exampleSynonym":{"word":"inferable","text":"The outcome was inferable from the clues."}});
})();

(()=>{const dictionaries=globalThis.DICCIONARIOS;const set=(lang,id,fields)=>{const row=dictionaries[lang].find(x=>x.id===id);if(!row)throw Error('Missing source entry '+lang+'/'+id);Object.assign(row,fields);};const split=(lang,baseId,cards)=>{const d=dictionaries[lang],i=d.findIndex(x=>x.id===baseId);if(i<0)throw Error('Missing split source '+lang+'/'+baseId);const base={...d[i]};d.splice(i,1);for(const c of cards){if(d.some(x=>x.id===c.id))throw Error('Duplicate split card '+c.id);const row={...base,id:c.id,word:(c.word||base.word),definition:c.definition,synonyms:[c.synonym],example:{word:(c.marker||base.word),text:c.example},exampleSynonym:{word:c.synonym,text:c.exampleSynonymText}};delete row.translation;d.push(row);}};
split("es","volador",[{"id":"volador-able-to-fly","definition":"Capaz de volar o desplazarse por el aire.","synonym":"que vuela","example":"El insecto volador llegó hasta la ventana.","exampleSynonymText":"El insecto que vuela llegó hasta la ventana."},{"id":"volador-firework","definition":"Artefacto pirotécnico que sube al encenderse.","synonym":"cohete","example":"El volador iluminó el cielo sobre la plaza.","exampleSynonymText":"El cohete iluminó el cielo sobre la plaza."}]);
set("es","atesorar",{"definition":"Guardar algo valioso con cuidado o en gran cantidad.","synonyms":["acumular"],"example":{"word":"atesorar","text":"La familia consiguió atesorar recuerdos de sus viajes."},"exampleSynonym":{"word":"acumular","text":"La familia consiguió acumular recuerdos de sus viajes."}});
set("es","branquial",{"definition":"Relacionado con las branquias o con la respiración mediante ellas.","synonyms":["por las branquias"],"example":{"word":"branquial","text":"Los peces tienen respiración branquial."},"exampleSynonym":{"word":"por las branquias","text":"Los peces tienen respiración por las branquias."}});
set("en","sorry",{"definition":"Feeling regret or sadness about something.","synonyms":["regretful"],"example":{"word":"Sorry","text":"“Sorry” can mean feeling regret about an action."},"exampleSynonym":{"word":"regretful","text":"“regretful” can mean feeling regret about an action."}});
set("en","merciful",{"definition":"Showing kindness by forgiving or not punishing someone.","synonyms":["compassionate"],"example":{"word":"Merciful","text":"“Merciful” describes someone who forgives others."},"exampleSynonym":{"word":"compassionate","text":"“compassionate” describes someone who forgives others."}});
set("en","sexless",{"definition":"Lacking physical traits that distinguish male and female.","synonyms":["without sexual characteristics"],"example":{"word":"sexless","text":"The young animal was sexless at that stage."},"exampleSynonym":{"word":"without sexual characteristics","text":"The young animal was without sexual characteristics at that stage."}});
set("en","generational",{"definition":"Related to differences or relationships between generations.","synonyms":["Intergenerational"],"example":{"word":"Generational","text":"Generational conflict can affect families."},"exampleSynonym":{"word":"Intergenerational","text":"Intergenerational conflict can affect families."}});
set("en","delude",{"definition":"To make someone believe something that is not true.","synonyms":["deceive"],"example":{"word":"Delude","text":"“Delude” means to make someone believe something false."},"exampleSynonym":{"word":"deceive","text":"“deceive” means to make someone believe something false."}});
set("en","sacredness",{"definition":"The quality of being holy or worthy of respect.","synonyms":["holiness"],"example":{"word":"Sacredness","text":"“Sacredness” refers to the holy quality of a place or object."},"exampleSynonym":{"word":"holiness","text":"“holiness” refers to the holy quality of a place or object."}});
})();

(()=>{const dictionaries=globalThis.DICCIONARIOS;const set=(lang,id,fields)=>{const row=dictionaries[lang].find(x=>x.id===id);if(!row)throw Error('Missing source entry '+lang+'/'+id);Object.assign(row,fields);};
set("es","chirleria",{"definition":"Charla repetida, a menudo sobre asuntos de otras personas.","synonyms":["habladuría"],"example":{"word":"chirlería","text":"La chirlería del barrio se extendió durante toda la tarde."},"exampleSynonym":{"word":"habladuría","text":"La habladuría del barrio se extendió durante toda la tarde."}});
set("es","criptograma",{"definition":"Mensaje escrito con signos que ocultan su significado.","synonyms":["mensaje cifrado"],"example":{"word":"criptograma","text":"El detective descifró el criptograma en pocas horas."},"exampleSynonym":{"word":"mensaje cifrado","text":"El detective descifró el mensaje cifrado en pocas horas."}});
set("es","deslizable",{"definition":"Que puede moverse deslizándose sobre una superficie.","synonyms":["corredizo"],"example":{"word":"deslizable","text":"El panel deslizable se atascó al abrirlo."},"exampleSynonym":{"word":"corredizo","text":"El panel corredizo se atascó al abrirlo."}});
set("en","non-flammable",{"definition":"Not able to catch fire easily.","synonyms":["not flammable"],"example":{"word":"Non-flammable","text":"“Non-flammable” means not able to catch fire easily."},"exampleSynonym":{"word":"not flammable","text":"“not flammable” means not able to catch fire easily."}});
set("en","nothing",{"definition":"A thing that has little or no importance.","synonyms":["trifle"],"example":{"word":"Nothing","text":"“Nothing” can mean a thing of little importance."},"exampleSynonym":{"word":"trifle","text":"“trifle” can mean a thing of little importance."}});
})();

(()=>{const dictionaries=globalThis.DICCIONARIOS;const set=(lang,id,fields)=>{const row=dictionaries[lang].find(x=>x.id===id);if(!row)throw Error('Missing source entry '+lang+'/'+id);Object.assign(row,fields);};const split=(lang,baseId,cards)=>{const d=dictionaries[lang],i=d.findIndex(x=>x.id===baseId);if(i<0)throw Error('Missing split source '+lang+'/'+baseId);const base={...d[i]};d.splice(i,1);for(const c of cards){if(d.some(x=>x.id===c.id))throw Error('Duplicate split card '+c.id);const row={...base,id:c.id,word:(c.word||base.word),definition:c.definition,synonyms:[c.synonym],example:{word:(c.marker||base.word),text:c.example},exampleSynonym:{word:c.synonym,text:c.exampleSynonymText}};delete row.translation;d.push(row);}};
set("es","retozadura",{"definition":"Juego alegre con saltos y movimientos inquietos.","synonyms":["retozo"],"example":{"word":"retozadura","text":"Los cachorros mostraron su retozadura en el patio."},"exampleSynonym":{"word":"retozo","text":"Los cachorros mostraron su retozo en el patio."}});
set("es","sobretiro",{"definition":"Impresión separada de un texto publicado dentro de una obra mayor.","synonyms":["separata"],"example":{"word":"sobretiro","text":"El editor llamó sobretiro a la impresión separada."},"exampleSynonym":{"word":"separata","text":"El editor llamó separata a la impresión separada."}});
set("es","tardomedieval",{"definition":"Perteneciente a la última parte de la Edad Media.","synonyms":["bajomedieval"],"example":{"word":"tardomedieval","text":"El castillo conserva elementos tardomedievales."},"exampleSynonym":{"word":"bajomedieval","text":"El castillo conserva elementos bajomedievales."}});
set("es","vocalismo",{"definition":"Conjunto de vocales que usa una lengua.","synonyms":["sistema vocálico"],"example":{"word":"vocalismo","text":"El vocalismo del español tiene cinco sonidos principales."},"exampleSynonym":{"word":"sistema vocálico","text":"El sistema vocálico del español tiene cinco sonidos principales."}});
set("en","shade",{"definition":"Add darker areas to a drawing or painting.","synonyms":["Add shading to"],"example":{"word":"Shade","text":"Shade the dark areas of the drawing."},"exampleSynonym":{"word":"Add shading to","text":"Add shading to the dark areas of the drawing."}});
set("en","reheal",{"definition":"Heal again after an injury or wound opens.","synonyms":["Heal again"],"example":{"word":"Reheal","text":"Reheal after a wound opens."},"exampleSynonym":{"word":"Heal again","text":"Heal again after a wound opens."}});
set("en","mowable",{"definition":"Able to be cut with a lawn mower.","synonyms":["Cuttable by a mower"],"example":{"word":"Mowable","text":"Mowable describes grass that a mower can cut."},"exampleSynonym":{"word":"Cuttable by a mower","text":"Cuttable by a mower describes grass that a mower can cut."}});
set("en","crackly",{"definition":"Making many small, sharp sounds.","synonyms":["Crackling"],"example":{"word":"Crackly","text":"Crackly sounds came from the fire."},"exampleSynonym":{"word":"Crackling","text":"Crackling sounds came from the fire."}});
set("en","thematic",{"definition":"Related to the main subject or idea of something.","synonyms":["Theme-based"],"example":{"word":"Thematic","text":"Thematic displays group objects around one idea."},"exampleSynonym":{"word":"Theme-based","text":"Theme-based displays group objects around one idea."}});
set("en","salmon-farm",{"definition":"A place where salmon are raised for sale.","synonyms":["Fish farm"],"example":{"word":"Salmon farm","text":"Salmon farm supplies local restaurants with fish."},"exampleSynonym":{"word":"Fish farm","text":"Fish farm supplies local restaurants with fish."}});
set("en","reprimand-2",{"definition":"A formal expression of disapproval for wrongdoing.","synonyms":["Rebuke"],"example":{"word":"Reprimand","text":"Reprimand followed his repeated safety violations."},"exampleSynonym":{"word":"Rebuke","text":"Rebuke followed his repeated safety violations."}});
})();

(()=>{const dictionaries=globalThis.DICCIONARIOS;const set=(lang,id,fields)=>{const row=dictionaries[lang].find(x=>x.id===id);if(!row)throw Error('Missing source entry '+lang+'/'+id);Object.assign(row,fields);};
set("es","comprimible",{"definition":"Que puede apretarse para ocupar menos espacio.","synonyms":["aplastable"],"example":{"word":"comprimible","text":"La espuma comprimible cabe en una caja pequeña."},"exampleSynonym":{"word":"aplastable","text":"La espuma aplastable cabe en una caja pequeña."}});
set("en","investigation-2",{"definition":"The process of trying to find out what happened.","synonyms":["Inquiry"],"example":{"word":"Investigation","text":"Investigation began after the alarm sounded."},"exampleSynonym":{"word":"Inquiry","text":"Inquiry began after the alarm sounded."}});
set("en","laborer-3",{"definition":"A person who does physical work.","synonyms":["Worker"],"example":{"word":"Laborer","text":"Laborer is a term for a person who does physical work."},"exampleSynonym":{"word":"Worker","text":"Worker is a term for a person who does physical work."}});
set("en","contractor-3",{"definition":"A person or company hired to do a job.","synonyms":["Builder"],"example":{"word":"Contractor","text":"Contractor is the person hired to repair the kitchen."},"exampleSynonym":{"word":"Builder","text":"Builder is the person hired to repair the kitchen."}});
set("en","lock-3",{"definition":"Fasten something so it cannot be opened easily.","synonyms":["secure"],"example":{"word":"lock","text":"Please lock the gate before you leave."},"exampleSynonym":{"word":"secure","text":"Please secure the gate before you leave."}});
set("en","craving-2",{"definition":"Wanting something very much.","synonyms":["Wanting"],"example":{"word":"Craving","text":"Craving a quiet evening, she turned off her phone."},"exampleSynonym":{"word":"Wanting","text":"Wanting a quiet evening, she turned off her phone."}});
set("en","chipping-4",{"definition":"Removing small pieces from a surface.","synonyms":["flaking"],"example":{"word":"chipping","text":"Paint chipping exposed the wood beneath."},"exampleSynonym":{"word":"flaking","text":"Paint flaking exposed the wood beneath."}});
})();

(()=>{const dictionaries=globalThis.DICCIONARIOS;const set=(lang,id,fields)=>{const row=dictionaries[lang].find(x=>x.id===id);if(!row)throw Error('Missing source entry '+lang+'/'+id);Object.assign(row,fields);};
set("es","crocanti",{"definition":"Mezcla crujiente de caramelo y frutos secos.","synonyms":["praliné crujiente"],"example":{"word":"crocanti","text":"El helado llevaba crocanti de almendra por encima."},"exampleSynonym":{"word":"praliné crujiente","text":"El helado llevaba praliné crujiente de almendra por encima."}});
set("es","socalzar",{"definition":"Poner algo debajo para sostenerlo o afirmarlo.","synonyms":["apuntalar"],"example":{"word":"socalzar","text":"Tuvieron que socalzar la mesa con un trozo de madera."},"exampleSynonym":{"word":"apuntalar","text":"Tuvieron que apuntalar la mesa con un trozo de madera."}});
set("es","tarma",{"definition":"Leña muy fina, formada por astillas o ramas pequeñas.","synonyms":["leña menuda"],"example":{"word":"tarma","text":"La tarma se secó junto a la chimenea."},"exampleSynonym":{"word":"leña menuda","text":"La leña menuda se secó junto a la chimenea."}});
set("en","slap-4",{"definition":"A hit made with an open hand.","synonyms":["smack"],"example":{"word":"slap","text":"She gave the table a slap to get their attention."},"exampleSynonym":{"word":"smack","text":"She gave the table a smack to get their attention."}});
set("en","squawk-2",{"definition":"A loud, harsh cry made by a bird.","synonyms":["Screech"],"example":{"word":"Squawk","text":"Squawk is a loud, harsh cry made by a bird."},"exampleSynonym":{"word":"Screech","text":"Screech is a loud, harsh cry made by a bird."}});
set("en","extendable-2",{"definition":"Able to be made longer or larger.","synonyms":["Expandable"],"example":{"word":"Extendable","text":"Extendable means able to be made longer or larger."},"exampleSynonym":{"word":"Expandable","text":"Expandable means able to be made longer or larger."}});
set("en","solidarity-2",{"definition":"Support people show by standing together.","synonyms":["Unity"],"example":{"word":"Solidarity","text":"Solidarity means people stand together and support one another."},"exampleSynonym":{"word":"Unity","text":"Unity means people stand together and support one another."}});
set("en","milanese-2",{"definition":"A thin, breaded cutlet that is fried or baked.","synonyms":["schnitzel"],"example":{"word":"Milanese","text":"The restaurant served Milanese with lemon and salad."},"exampleSynonym":{"word":"schnitzel","text":"The restaurant served schnitzel with lemon and salad."}});
set("en","songbook-2",{"definition":"A book containing songs and their words or music.","synonyms":["Song collection"],"example":{"word":"Songbook","text":"Songbook holds songs and their words or music."},"exampleSynonym":{"word":"Song collection","text":"Song collection holds songs and their words or music."}});
})();

(()=>{const dictionaries=globalThis.DICCIONARIOS;const set=(lang,id,fields)=>{const row=dictionaries[lang].find(x=>x.id===id);if(!row)throw Error('Missing source entry '+lang+'/'+id);Object.assign(row,fields);};const split=(lang,baseId,cards)=>{const d=dictionaries[lang],i=d.findIndex(x=>x.id===baseId);if(i<0)throw Error('Missing split source '+lang+'/'+baseId);const base={...d[i]};d.splice(i,1);for(const c of cards){if(d.some(x=>x.id===c.id))throw Error('Duplicate split card '+c.id);const row={...base,id:c.id,word:(c.word||base.word),definition:c.definition,synonyms:[c.synonym],example:{word:(c.marker||base.word),text:c.example},exampleSynonym:{word:c.synonym,text:c.exampleSynonymText}};delete row.translation;d.push(row);}};
split("es","chamarra",[{"id":"chamarra-chaqueta","definition":"Prenda de abrigo que cubre el tronco.","synonym":"chaqueta","example":"Compró una chamarra para el invierno.","exampleSynonymText":"Compró una chaqueta para el invierno."},{"id":"chamarra-tela-gruesa","definition":"Tela basta y gruesa usada para hacer sacos o cubrir el suelo.","synonym":"tela gruesa","example":"La chamarra servía para cubrir el suelo.","exampleSynonymText":"La tela gruesa servía para cubrir el suelo."}]);
set("es","confesor",{"definition":"Sacerdote que escucha la confesión de una persona.","synonyms":["sacerdote"],"example":{"word":"confesor","text":"El confesor escuchó al hombre en privado."},"exampleSynonym":{"word":"sacerdote","text":"El sacerdote escuchó al hombre en privado."}});
set("es","latifundismo",{"definition":"Sistema en que pocas personas poseen grandes fincas.","synonyms":["acaparamiento de tierras"],"example":{"word":"latifundismo","text":"El latifundismo dejó a muchos campesinos sin terreno propio."},"exampleSynonym":{"word":"acaparamiento de tierras","text":"El acaparamiento de tierras dejó a muchos campesinos sin terreno propio."}});
set("es","convicto",{"definition":"Persona declarada culpable de un delito.","synonyms":["condenado"],"example":{"word":"convicto","text":"El convicto cumplió su condena en prisión."},"exampleSynonym":{"word":"condenado","text":"El condenado cumplió su condena en prisión."}});
set("es","anglofobo",{"definition":"Que siente rechazo hacia lo inglés o los angloparlantes.","synonyms":["antiinglés"],"example":{"word":"anglófobo","text":"El grupo anglófobo rechazó toda influencia británica."},"exampleSynonym":{"word":"antiinglés","text":"El grupo antiinglés rechazó toda influencia británica."}});
split("es","posgraduado",[{"id":"posgraduado-adjective","definition":"Relacionado con estudios que se cursan después de un grado.","synonym":"de posgrado","example":"La universidad abrió un curso posgraduado de lingüística.","exampleSynonymText":"La universidad abrió un curso de posgrado de lingüística."},{"id":"posgraduado-student","definition":"Persona que cursa estudios después de obtener un grado.","synonym":"estudiante de posgrado","example":"El posgraduado presentó su investigación al comité.","exampleSynonymText":"El estudiante de posgrado presentó su investigación al comité."}]);
split("es","resinero",[{"id":"resinero-person","definition":"Persona que extrae resina de los árboles.","synonym":"resinador","example":"El resinero trabajó en el pinar toda la mañana.","exampleSynonymText":"El resinador trabajó en el pinar toda la mañana."},{"id":"resinero-relational","definition":"Relacionado con la extracción de resina.","synonym":"de extracción de resina","example":"El trabajo resinero sostiene a varias familias.","exampleSynonymText":"El trabajo de extracción de resina sostiene a varias familias."}]);
set("es","sismorresistente",{"definition":"Diseñado para resistir los daños de un terremoto.","synonyms":["antisísmico"],"example":{"word":"sismorresistente","text":"El edificio sismorresistente soportó el temblor."},"exampleSynonym":{"word":"antisísmico","text":"El edificio antisísmico soportó el temblor."}});
set("en","funnel-2",{"definition":"Move something through a narrow opening.","synonyms":["Channel"],"example":{"word":"Funnel","text":"Funnel the dry rice into a jar."},"exampleSynonym":{"word":"Channel","text":"Channel the dry rice into a jar."}});
split("en","hug-4",[{"id":"hug-noun-embrace","definition":"An act of holding someone close with your arms.","synonym":"warm embrace","example":"She gave her friend a hug after the long trip.","exampleSynonymText":"She gave her friend a warm embrace after the long trip."},{"id":"hug-verb-embrace","definition":"Hold someone close with your arms.","synonym":"embrace","example":"It is kind to hug your sister when she arrives.","exampleSynonymText":"It is kind to embrace your sister when she arrives."}]);
set("en","irrepressible-3",{"definition":"Impossible to control or hold back.","synonyms":["Uncontrollable"],"example":{"word":"Irrepressible","text":"Irrepressible laughter filled the room."},"exampleSynonym":{"word":"Uncontrollable","text":"Uncontrollable laughter filled the room."}});
set("en","judiciary-4",{"definition":"The courts and judges of a country.","synonyms":["Court system"],"example":{"word":"Judiciary","text":"Judiciary refers to the courts and judges of a country."},"exampleSynonym":{"word":"Court system","text":"Court system refers to the courts and judges of a country."}});
set("en","speaker-3",{"definition":"A person who gives a talk to a group.","synonyms":["Presenter"],"example":{"word":"Speaker","text":"Speaker gave a talk at the conference."},"exampleSynonym":{"word":"Presenter","text":"Presenter gave a talk at the conference."}});
split("en","gesture-5",[{"id":"gesture-movement","definition":"A movement of the hands, arms, or head that expresses an idea.","synonym":"Signal","example":"Gesture can mean a movement of the hands or head.","exampleSynonymText":"Signal can mean a movement of the hands or head."},{"id":"gesture-symbolic-act","definition":"An action that shows a feeling or intention.","synonym":"Symbolic act","example":"Gesture can also mean an action that shows goodwill.","exampleSynonymText":"Symbolic act can also mean an action that shows goodwill."}]);
})();

(()=>{const dictionaries=globalThis.DICCIONARIOS;const set=(lang,id,fields)=>{const row=dictionaries[lang].find(x=>x.id===id);if(!row)throw Error('Missing source entry '+lang+'/'+id);Object.assign(row,fields);};const split=(lang,baseId,cards)=>{const d=dictionaries[lang],i=d.findIndex(x=>x.id===baseId);if(i<0)throw Error('Missing split source '+lang+'/'+baseId);const base={...d[i]};d.splice(i,1);for(const c of cards){if(d.some(x=>x.id===c.id))throw Error('Duplicate split card '+c.id);const row={...base,id:c.id,word:(c.word||base.word),definition:c.definition,synonyms:[c.synonym],example:{word:(c.marker||base.word),text:c.example},exampleSynonym:{word:c.synonym,text:c.exampleSynonymText}};delete row.translation;d.push(row);}};
set("es","teleindicador",{"definition":"Pantalla que muestra información para que el público la consulte.","synonyms":["monitor"],"example":{"word":"teleindicador","text":"El teleindicador anunció el retraso del tren."},"exampleSynonym":{"word":"monitor","text":"El monitor anunció el retraso del tren."}});
set("es","canceleria",{"definition":"Conjunto de barrotes que forma una reja o un cancel.","synonyms":["reja"],"example":{"word":"cancelería","text":"La cancelería de la ventana dejaba pasar la luz."},"exampleSynonym":{"word":"reja","text":"La reja de la ventana dejaba pasar la luz."}});
set("es","cazolero",{"definition":"Relacionado con la cazuela o la comida hecha en ella.","synonyms":["de cazuela"],"example":{"word":"cazolero","text":"Prepararon un guiso cazolero para la cena."},"exampleSynonym":{"word":"de cazuela","text":"Prepararon un guiso de cazuela para la cena."}});
set("en","countryman-4",{"definition":"A person from the same country as someone else.","synonyms":["Compatriot"],"example":{"word":"Countryman","text":"Countryman is another word for a person from the same country."},"exampleSynonym":{"word":"Compatriot","text":"Compatriot is another word for a person from the same country."}});
set("en","southern-2",{"definition":"From or related to the south.","synonyms":["from the south"],"example":{"word":"Southern","text":"The word “Southern” means from the south."},"exampleSynonym":{"word":"from the south","text":"The word “from the south” means from the south."}});
split("en","spreader-2",[{"id":"spreader-person-disseminator","definition":"A person who passes information or something else to others.","synonym":"Disseminator","example":"Spreader can describe a person who passes information to others.","exampleSynonymText":"Disseminator can describe a person who passes information to others."},{"id":"spreader-tool","definition":"A tool or machine used to spread material over an area.","synonym":"Distributing machine","example":"Spreader can also mean a machine that spreads material over an area.","exampleSynonymText":"Distributing machine can also mean a machine that spreads material over an area."}]);
set("en","muddy-12",{"definition":"Covered with mud.","synonyms":["mud-covered"],"example":{"word":"muddy","text":"His muddy boots left marks on the floor."},"exampleSynonym":{"word":"mud-covered","text":"His mud-covered boots left marks on the floor."}});
set("en","consensual",{"definition":"Agreed to by the people involved.","synonyms":["Agreed upon"],"example":{"word":"Consensual","text":"“Consensual” describes an agreement made by everyone involved."},"exampleSynonym":{"word":"Agreed upon","text":"“Agreed upon” describes an agreement made by everyone involved."}});
set("en","coagulable",{"definition":"Able to change from a liquid into a thick mass.","synonyms":["able to clot"],"example":{"word":"Coagulable","text":"“Coagulable” describes blood that can form a clot."},"exampleSynonym":{"word":"able to clot","text":"“able to clot” describes blood that can form a clot."}});
})();

(()=>{const dictionaries=globalThis.DICCIONARIOS;const set=(lang,id,fields)=>{const row=dictionaries[lang].find(x=>x.id===id);if(!row)throw Error('Missing source entry '+lang+'/'+id);Object.assign(row,fields);};const split=(lang,baseId,cards)=>{const d=dictionaries[lang],i=d.findIndex(x=>x.id===baseId);if(i<0)throw Error('Missing split source '+lang+'/'+baseId);const base={...d[i]};d.splice(i,1);for(const c of cards){if(d.some(x=>x.id===c.id))throw Error('Duplicate split card '+c.id);const row={...base,id:c.id,word:(c.word||base.word),definition:c.definition,synonyms:[c.synonym],example:{word:(c.marker||base.word),text:c.example},exampleSynonym:{word:c.synonym,text:c.exampleSynonymText}};delete row.translation;d.push(row);}};
split("es","vara",[{"id":"vara-branch","definition":"Rama larga y delgada de un árbol.","synonym":"rama larga","example":"Cortó una vara para apartar las ramas.","exampleSynonymText":"Cortó una rama larga para apartar las ramas."},{"id":"vara-pole","definition":"Palo largo que sirve para medir, sostener o golpear.","synonym":"pértiga","example":"La vara sirvió para medir la tela.","exampleSynonymText":"La pértiga sirvió para medir la tela."},{"id":"vara-unit","definition":"Antigua unidad de longitud cuyo valor cambia según el lugar.","synonym":"unidad antigua de longitud","example":"La vara equivalía a cierta longitud.","exampleSynonymText":"La unidad antigua de longitud equivalía a cierta longitud."}]);
split("es","tronio",[{"id":"tronio-ostentacion","definition":"Ostentación llamativa en la forma de vivir o presentarse.","synonym":"boato","example":"Entró en la sala con mucho tronío.","exampleSynonymText":"Entró en la sala con mucho boato."},{"id":"tronio-gallardia","definition":"Aire de importancia, seguridad o gallardía.","synonym":"gallardía","example":"El caballo avanzó con tronío por la plaza.","exampleSynonymText":"El caballo avanzó con gallardía por la plaza."}]);
set("es","tonsilar",{"definition":"Relacionado con las amígdalas de la garganta.","synonyms":["amigdalar"],"example":{"word":"tonsilar","text":"La infección tonsilar le causó dolor al tragar."},"exampleSynonym":{"word":"amigdalar","text":"La infección amigdalar le causó dolor al tragar."}});
})();

(()=>{const dictionaries=globalThis.DICCIONARIOS;const set=(lang,id,fields)=>{const row=dictionaries[lang].find(x=>x.id===id);if(!row)throw Error('Missing source entry '+lang+'/'+id);Object.assign(row,fields);};const split=(lang,baseId,cards)=>{const d=dictionaries[lang],i=d.findIndex(x=>x.id===baseId);if(i<0)throw Error('Missing split source '+lang+'/'+baseId);const base={...d[i]};d.splice(i,1);for(const c of cards){if(d.some(x=>x.id===c.id))throw Error('Duplicate split card '+c.id);const row={...base,id:c.id,word:(c.word||base.word),definition:c.definition,synonyms:[c.synonym],example:{word:(c.marker||base.word),text:c.example},exampleSynonym:{word:c.synonym,text:c.exampleSynonymText}};delete row.translation;d.push(row);}};
set("es","contertuliano",{"definition":"Persona que participa habitualmente en una tertulia.","synonyms":["contertulio"],"example":{"word":"contertuliano","text":"El contertuliano defendió su postura en el programa."},"exampleSynonym":{"word":"contertulio","text":"El contertulio defendió su postura en el programa."}});
split("es","tayacan",[{"id":"tayacan-ox-guide","definition":"Persona que guía una yunta de bueyes.","synonym":"boyero","example":"El tayacán condujo la yunta por el camino.","exampleSynonymText":"El boyero condujo la yunta por el camino."},{"id":"tayacan-leader","definition":"Persona que orienta o dirige a otras.","synonym":"guía","example":"El tayacán ayudó al grupo a organizarse.","exampleSynonymText":"El guía ayudó al grupo a organizarse."}]);
set("es","tayo",{"definition":"Golpe dado con un objeto que no corta.","synonyms":["golpe"],"example":{"word":"tayo","text":"El tayo en la puerta despertó a todos."},"exampleSynonym":{"word":"golpe","text":"El golpe en la puerta despertó a todos."}});
split("en","seminal",[{"id":"seminal-literal","definition":"Related to semen.","synonym":"Reproductive","example":"Seminal fluid was examined in the lab.","exampleSynonymText":"Reproductive fluid was examined in the lab."},{"id":"seminal-influential","definition":"Having a strong influence on later ideas or events.","synonym":"Influential","example":"Seminal work can change a field.","exampleSynonymText":"Influential work can change a field."}]);
set("en","tabular",{"definition":"Arranged or shown in a table.","synonyms":["Table-form"],"example":{"word":"Tabular","text":"Tabular data appears in rows and columns."},"exampleSynonym":{"word":"Table-form","text":"Table-form data appears in rows and columns."}});
set("en","serial-2",{"definition":"Arranged or happening in a series.","synonyms":["Sequential"],"example":{"word":"Serial","text":"Serial numbers appear on each page."},"exampleSynonym":{"word":"Sequential","text":"Sequential numbers appear on each page."}});
set("en","lagoon-6",{"definition":"Shallow water separated from the sea by sand or rocks.","synonyms":["coastal pool"],"example":{"word":"lagoon","text":"The lagoon stayed calm behind the reef."},"exampleSynonym":{"word":"coastal pool","text":"The coastal pool stayed calm behind the reef."}});
set("en","rodeo",{"definition":"A show where riders compete to control horses or cattle.","synonyms":["cowboy competition"],"example":{"word":"rodeo","text":"The rodeo drew riders from across the state."},"exampleSynonym":{"word":"cowboy competition","text":"The cowboy competition drew riders from across the state."}});
split("en","intelligence-3",[{"id":"intelligence-mental-ability","definition":"The ability to learn, understand, and solve problems.","synonym":"intellect","example":"Her intelligence helped her solve the puzzle.","exampleSynonymText":"Her intellect helped her solve the puzzle."},{"id":"intelligence-useful-information","definition":"Information about an enemy or situation.","synonym":"information","example":"The officers gathered intelligence before the mission.","exampleSynonymText":"The officers gathered information before the mission."},{"id":"intelligence-agency","definition":"An organization that gathers secret information for a government.","synonym":"Information-gathering","example":"The intelligence unit warned the government about the threat.","exampleSynonymText":"The Information-gathering unit warned the government about the threat."}]);
})();

(()=>{const dictionaries=globalThis.DICCIONARIOS;const set=(lang,id,fields)=>{const row=dictionaries[lang].find(x=>x.id===id);if(!row)throw Error('Missing source entry '+lang+'/'+id);Object.assign(row,fields);};const split=(lang,baseId,cards)=>{const d=dictionaries[lang],i=d.findIndex(x=>x.id===baseId);if(i<0)throw Error('Missing split source '+lang+'/'+baseId);const base={...d[i]};d.splice(i,1);for(const c of cards){if(d.some(x=>x.id===c.id))throw Error('Duplicate split card '+c.id);const row={...base,id:c.id,word:(c.word||base.word),definition:c.definition,synonyms:[c.synonym],example:{word:(c.marker||base.word),text:c.example},exampleSynonym:{word:c.synonym,text:c.exampleSynonymText}};delete row.translation;d.push(row);}};
set("es","bioclimatico",{"definition":"Relacionado con el clima y los seres vivos.","synonyms":["relativo al clima y la vida"],"example":{"word":"bioclimático","text":"El diseño bioclimático aprovecha el sol y el viento."},"exampleSynonym":{"word":"relativo al clima y la vida","text":"El diseño relativo al clima y la vida aprovecha el sol y el viento."}});
set("es","confiador",{"definition":"Persona que garantiza una deuda junto con otra.","synonyms":["avalista"],"example":{"word":"confiador","text":"El confiador respondió por la deuda de su socio."},"exampleSynonym":{"word":"avalista","text":"El avalista respondió por la deuda de su socio."}});
split("en","safety-chain",[{"id":"safety-chain-door","definition":"A short chain that lets a door open only partway.","synonym":"Door chain","example":"Safety chain kept the front door from opening wide.","exampleSynonymText":"Door chain kept the front door from opening wide."},{"id":"safety-chain-trailer","definition":"A backup chain that keeps a trailer attached if its hitch fails.","synonym":"Backup chain","example":"Safety chain held the trailer when the hitch broke.","exampleSynonymText":"Backup chain held the trailer when the hitch broke."}]);
set("en","geostrategy",{"definition":"A plan shaped by how geography affects political power.","synonyms":["Geopolitical strategy"],"example":{"word":"Geostrategy","text":"Geostrategy shaped the country’s plans for its ports."},"exampleSynonym":{"word":"Geopolitical strategy","text":"Geopolitical strategy shaped the country’s plans for its ports."}});
set("en","corner-protector",{"definition":"A soft cover placed on a furniture corner to prevent injury.","synonyms":["Corner guard"],"example":{"word":"Corner protector","text":"Corner protector softened the sharp table edge."},"exampleSynonym":{"word":"Corner guard","text":"Corner guard softened the sharp table edge."}});
set("en","tenancy",{"definition":"The time or terms for which someone rents a property.","synonyms":["Rental period"],"example":{"word":"Tenancy","text":"Tenancy can last for a year or longer."},"exampleSynonym":{"word":"Rental period","text":"Rental period can last for a year or longer."}});
set("en","monastic",{"definition":"Related to monks or life in a monastery.","synonyms":["Monk-like"],"example":{"word":"Monastic","text":"Monastic life follows a strict daily routine."},"exampleSynonym":{"word":"Monk-like","text":"Monk-like life follows a strict daily routine."}});
})();
