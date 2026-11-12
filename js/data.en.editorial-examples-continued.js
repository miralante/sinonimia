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
})();
