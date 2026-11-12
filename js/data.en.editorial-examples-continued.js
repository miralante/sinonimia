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
  const split=(lang,baseId,cards)=>{const d=dictionaries[lang],i=d.findIndex(x=>x.id===baseId);if(i<0)throw Error("Missing split source "+lang+"/"+baseId);const base={...d[i]};d.splice(i,1);for(const c of cards){if(d.some(x=>x.id===c.id))throw Error("Duplicate split card "+c.id);const row={...base,id:c.id,word:c.word,definition:c.definition,synonyms:[c.synonym],example:{word:c.marker,text:c.example},exampleSynonym:{word:c.synonym,text:c.exampleSynonymText}};delete row.translation;d.push(row);}};
set("es","socarron",{"definition":"Que se burla de alguien con disimulo y humor.","synonyms":["irónico"],"example":{"word":"socarrón","text":"El socarrón respondió con una sonrisa irónica."},"exampleSynonym":{"word":"irónico","text":"El irónico respondió con una sonrisa irónica."}});
set("en","tamale",{"definition":"A Mexican dish of cornmeal dough wrapped around a filling and steamed.","synonyms":["cornmeal parcel"],"example":{"word":"tamale","text":"We ordered a tamale for lunch."},"exampleSynonym":{"word":"cornmeal parcel","text":"We ordered a cornmeal parcel for lunch."}});
set("en","catechist",{"definition":"Person who teaches people the beliefs and practices of a religion.","synonyms":["religious teacher"],"example":{"word":"catechist","text":"The catechist prepared the children for baptism."},"exampleSynonym":{"word":"religious teacher","text":"The religious teacher prepared the children for baptism."}});
split("es","glasear",[{"id":"glasear","word":"glasear","definition":"Cubrir un pastel con una capa de almíbar o azúcar glas.","synonym":"cubrir con glaseado","marker":"glasear","example":"Antes de servirlo, es necesario glasear el pastel.","exampleSynonymText":"Antes de servirlo, es necesario cubrir con glaseado el pastel."},{"id":"b15-glasear-food-shine","word":"glasear","definition":"Hacer que un alimento brille usando distintos medios.","synonym":"dar brillo a","marker":"glasear","example":"Es fácil glasear la carne con su jugo.","exampleSynonymText":"Es fácil dar brillo a la carne con su jugo."},{"id":"b15-glasear-material-surface","word":"glasear","definition":"Dar brillo a una superficie, por ejemplo, de papel o tela.","synonym":"dar brillo a","marker":"glasear","example":"Se puede glasear una superficie de papel para mejorar su acabado.","exampleSynonymText":"Se puede dar brillo a una superficie de papel para mejorar su acabado."}]);
split("es","sondar",[{"id":"sondar","word":"sondar","definition":"Introducir una sonda en el cuerpo de alguien, por ejemplo, para alimentarlo.","synonym":"introducirle una sonda","marker":"sondar","example":"El médico decidió sondar al paciente para alimentarlo.","exampleSynonymText":"El médico decidió introducirle una sonda al paciente para alimentarlo."},{"id":"b15-sondar-water-depth","word":"sondar","definition":"Medir la profundidad del agua con una sonda.","synonym":"medir la profundidad de","marker":"sondar","example":"El barco debe sondar la laguna antes de entrar.","exampleSynonymText":"El barco debe medir la profundidad de la laguna antes de entrar."},{"id":"b15-sondar-ground","word":"sondar","definition":"Examinar el terreno para buscar agua o saber qué hay debajo.","synonym":"explorar","marker":"sondar","example":"Es necesario sondar la zona antes de perforar.","exampleSynonymText":"Es necesario explorar la zona antes de perforar."},{"id":"b15-sondar-opinion","word":"sondar","definition":"Preguntar o investigar para saber qué piensa alguien.","synonym":"averiguar","marker":"sondar","example":"La periodista quiso sondar la opinión del alcalde.","exampleSynonymText":"La periodista quiso averiguar la opinión del alcalde."}]);
split("en","revert",[{"id":"revert","word":"revert","definition":"Return to an earlier state, system, or way of behaving.","synonym":"go back","marker":"revert","example":"Some phones revert to their factory settings after an update.","exampleSynonymText":"Some phones go back to their factory settings after an update."},{"id":"b15-revert-topic","word":"revert","definition":"Start talking or thinking about an earlier subject again.","synonym":"return","marker":"revert","example":"The speaker may revert to the earlier topic.","exampleSynonymText":"The speaker may return to the earlier topic."},{"id":"b15-revert-language","word":"revert","definition":"Start using a language you used before.","synonym":"return","marker":"revert","example":"The speaker may revert to her first language during the interview.","exampleSynonymText":"The speaker may return to her first language during the interview."},{"id":"b15-revert-property","word":"revert","definition":"Become the property of an earlier owner again.","synonym":"pass back","marker":"revert","example":"The property will revert to its former owner when the lease ends.","exampleSynonymText":"The property will pass back to its former owner when the lease ends."}]);
})();

(()=>{const d=globalThis.DICCIONARIOS.es;const z=d.find(x=>x.id==='zumbon');if(!z)throw Error('Missing source entry es/zumbon');Object.assign(z,{"definition":"Persona que suele burlarse de otros o gastar bromas.","synonyms":["burlón"],"example":{"word":"zumbón","text":"El zumbón hizo reír a sus amigos con sus bromas."},"exampleSynonym":{"word":"burlón","text":"El burlón hizo reír a sus amigos con sus bromas."}});const i=d.findIndex(x=>x.id==='voragine');if(i<0)throw Error('Missing split source es/voragine');const base={...d[i]};d.splice(i,1);for(const c of [{"id":"voragine","word":"vorágine","definition":"Remolino fuerte que forma el agua de un río, lago o mar.","synonym":"corriente giratoria","marker":"vorágine","example":"La vorágine arrastró la pequeña barca.","exampleSynonymText":"La corriente giratoria arrastró la pequeña barca."},{"id":"b15-voragine-emotion","word":"vorágine","definition":"Pasión intensa o mezcla de sentimientos muy fuertes.","synonym":"mezcla intensa","marker":"vorágine","example":"La vorágine de emociones le impidió pensar con claridad.","exampleSynonymText":"La mezcla intensa de emociones le impidió pensar con claridad."},{"id":"b15-voragine-crowd","word":"vorágine","definition":"Aglomeración confusa de personas o cosas que se mueven.","synonym":"aglomeración confusa","marker":"vorágine","example":"El tráfico formó una vorágine de coches y peatones.","exampleSynonymText":"El tráfico formó una aglomeración confusa de coches y peatones."}]){if(d.some(x=>x.id===c.id))throw Error('Duplicate split card '+c.id);const row={...base,id:c.id,word:c.word,definition:c.definition,synonyms:[c.synonym],example:{word:c.marker,text:c.example},exampleSynonym:{word:c.synonym,text:c.exampleSynonymText}};delete row.translation;d.push(row);}})();

(()=>{const dictionaries=globalThis.DICCIONARIOS;const set=(lang,id,fields)=>{const row=dictionaries[lang].find(x=>x.id===id);if(!row)throw Error('Missing source entry '+lang+'/'+id);Object.assign(row,fields);};const split=(lang,baseId,cards)=>{const d=dictionaries[lang],i=d.findIndex(x=>x.id===baseId);if(i<0)throw Error('Missing split source '+lang+'/'+baseId);const base={...d[i]};d.splice(i,1);for(const c of cards){if(d.some(x=>x.id===c.id))throw Error('Duplicate split card '+c.id);const row={...base,id:c.id,word:c.word,definition:c.definition,synonyms:[c.synonym],example:{word:c.marker,text:c.example},exampleSynonym:{word:c.synonym,text:c.exampleSynonymText}};delete row.translation;d.push(row);}};
set("es","andas",{"definition":"Plataforma con varas que varias personas llevan para transportar una imagen.","synonyms":["plataformas portátiles"],"example":{"word":"andas","text":"Los costaleros llevaron andas por las calles."},"exampleSynonym":{"word":"plataformas portátiles","text":"Los costaleros llevaron plataformas portátiles por las calles."}});
set("es","centurion",{"definition":"Jefe de un grupo de soldados del ejército romano.","synonyms":["oficial romano"],"example":{"word":"centurión","text":"El centurión reunió a sus soldados antes de la marcha."},"exampleSynonym":{"word":"oficial romano","text":"El oficial romano reunió a sus soldados antes de la marcha."}});
split("es","comprometer",[{"id":"comprometer","word":"comprometer","definition":"Poner a alguien o algo en riesgo al involucrarlo en una acción.","synonym":"poner en riesgo","marker":"comprometer","example":"La maniobra puede comprometer la seguridad del puente.","exampleSynonymText":"La maniobra puede poner en riesgo la seguridad del puente."},{"id":"b15-comprometer-obligation","word":"comprometer","definition":"Hacer que alguien sea responsable de una obligación o tarea.","synonym":"obligar","marker":"comprometer","example":"El contrato puede comprometer a las dos empresas.","exampleSynonymText":"El contrato puede obligar a las dos empresas."},{"id":"b15-comprometer-promise","word":"comprometer","definition":"Asumir una obligación o prometer hacer algo.","synonym":"obligar","marker":"comprometer","example":"Ambos deben comprometerse a cumplir el acuerdo.","exampleSynonymText":"Ambos deben obligarse a cumplir el acuerdo."},{"id":"b15-comprometer-arbitration","word":"comprometer","definition":"Confiar a un árbitro la decisión de una disputa.","synonym":"someter a arbitraje","marker":"comprometer","example":"Las partes pueden comprometer la disputa.","exampleSynonymText":"Las partes pueden someter a arbitraje la disputa."}]);
split("es","descompuesto",[{"id":"descompuesto","word":"descompuesto","definition":"Que se comporta sin modestia, respeto o educación.","synonym":"descortés","marker":"descompuesto","example":"Fue descompuesto con los invitados.","exampleSynonymText":"Fue descortés con los invitados."},{"id":"b15-descompuesto-drunk","word":"descompuesto","definition":"Que ha bebido demasiado alcohol.","synonym":"borracho","marker":"descompuesto","example":"El hombre llegó descompuesto a casa.","exampleSynonymText":"El hombre llegó borracho a casa."},{"id":"b15-descompuesto-in-heat","word":"descompuesto","definition":"Dicho de una hembra de mamífero: que está en celo.","synonym":"en celo","marker":"descompuesto","example":"El registro dice «descompuesto» para indicar que la vaca está en celo.","exampleSynonymText":"El registro dice «en celo» para indicar que la vaca está en celo."}]);
split("es","desdicha",[{"id":"desdicha","word":"desdicha","definition":"Suerte muy mala o hecho que causa mucho sufrimiento.","synonym":"desgracia","marker":"desdicha","example":"La desdicha golpeó a la familia tras la inundación.","exampleSynonymText":"La desgracia golpeó a la familia tras la inundación."},{"id":"b15-desdicha-poverty","word":"desdicha","definition":"Pobreza extrema, con falta de recursos para vivir.","synonym":"miseria","marker":"desdicha","example":"La familia vivía en la desdicha.","exampleSynonymText":"La familia vivía en la miseria."}]);
split("es","gamuza",[{"id":"gamuza","word":"gamuza","definition":"Antílope de montaña, parecido a una cabra, que vive en Europa.","synonym":"camuza","marker":"gamuza","example":"La gamuza vive en los Alpes y los Pirineos.","exampleSynonymText":"La camuza vive en los Alpes y los Pirineos."},{"id":"b15-gamuza-leather","word":"gamuza","definition":"Piel curtida y suave, de tacto parecido al terciopelo.","synonym":"ante","marker":"gamuza","example":"Los guantes de gamuza son suaves.","exampleSynonymText":"Los guantes de ante son suaves."},{"id":"b15-gamuza-fabric","word":"gamuza","definition":"Tejido de lana que se parece a la piel de la gamuza.","synonym":"tejido de lana parecido al ante","marker":"gamuza","example":"La tienda vende gamuza para fabricar abrigos.","exampleSynonymText":"La tienda vende tejido de lana parecido al ante para fabricar abrigos."},{"id":"b15-gamuza-cleaning-cloth","word":"gamuza","definition":"Paño suave que se usa para limpiar o sacar brillo.","synonym":"bayeta","marker":"gamuza","example":"Limpió el polvo con una gamuza.","exampleSynonymText":"Limpió el polvo con una bayeta."}]);
split("es","requerir",[{"id":"requerir","word":"requerir","definition":"Necesitar algo para poder hacer o conseguir otra cosa.","synonym":"necesitar","marker":"requerir","example":"La operación puede requerir más tiempo.","exampleSynonymText":"La operación puede necesitar más tiempo."},{"id":"b15-requerir-formal-notice","word":"requerir","definition":"Avisar con autoridad que alguien debe cumplir una obligación.","synonym":"notificar formalmente","marker":"requerir","example":"El juez decidió requerir al testigo para que declare.","exampleSynonymText":"El juez decidió notificar formalmente al testigo para que declare."}]);
})();

(()=>{const dictionaries=globalThis.DICCIONARIOS;const set=(lang,id,fields)=>{const row=dictionaries[lang].find(x=>x.id===id);if(!row)throw Error('Missing source entry '+lang+'/'+id);Object.assign(row,fields);};const split=(lang,baseId,cards)=>{const d=dictionaries[lang],i=d.findIndex(x=>x.id===baseId);if(i<0)throw Error('Missing split source '+lang+'/'+baseId);const base={...d[i]};d.splice(i,1);for(const c of cards){if(d.some(x=>x.id===c.id))throw Error('Duplicate split card '+c.id);const row={...base,id:c.id,word:c.word,definition:c.definition,synonyms:[c.synonym],example:{word:c.marker,text:c.example},exampleSynonym:{word:c.synonym,text:c.exampleSynonymText}};delete row.translation;d.push(row);}};
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

(()=>{const dictionaries=globalThis.DICCIONARIOS;const set=(lang,id,fields)=>{const row=dictionaries[lang].find(x=>x.id===id);if(!row)throw Error('Missing source entry '+lang+'/'+id);Object.assign(row,fields);};const split=(lang,baseId,cards)=>{const d=dictionaries[lang],i=d.findIndex(x=>x.id===baseId);if(i<0)throw Error('Missing split source '+lang+'/'+baseId);const base={...d[i]};d.splice(i,1);for(const c of cards){if(d.some(x=>x.id===c.id))throw Error('Duplicate split card '+c.id);const row={...base,id:c.id,word:c.word,definition:c.definition,synonyms:[c.synonym],example:{word:c.marker,text:c.example},exampleSynonym:{word:c.synonym,text:c.exampleSynonymText}};delete row.translation;d.push(row);}};
set("es","consignador",{"definition":"Persona que entrega mercancías a otra para que las venda o transporte.","synonyms":["expedidor"],"example":{"word":"consignador","text":"El consignador envió la carga al puerto."},"exampleSynonym":{"word":"expedidor","text":"El expedidor envió la carga al puerto."}});
set("en","inventor-2",{"definition":"A person who creates a new device, method, or process.","synonyms":["creator"],"example":{"word":"inventor","text":"The inventor patented a new battery."},"exampleSynonym":{"word":"creator","text":"The creator patented a new battery."}});
set("en","celsius",{"definition":"Swedish astronomer after whom the Celsius temperature scale is named.","synonyms":["Anders Celsius"],"example":{"word":"Celsius","text":"Celsius proposed a temperature scale in 1742."},"exampleSynonym":{"word":"Anders Celsius","text":"Anders Celsius proposed a temperature scale in 1742."}});
split("en","strangler",[{"id":"strangler","word":"strangler","definition":"A person who kills by squeezing someone’s neck.","synonym":"killer","marker":"strangler","example":"Police arrested the strangler after months of investigation.","exampleSynonymText":"Police arrested the killer after months of investigation."},{"id":"b15-strangler-plant","word":"strangler","definition":"A plant that grows around a tree and may eventually kill it.","synonym":"strangler fig","marker":"strangler","example":"A strangler grew around the old tree.","exampleSynonymText":"A strangler fig grew around the old tree."}]);
})();

(()=>{const dictionaries=globalThis.DICCIONARIOS;const set=(lang,id,fields)=>{const row=dictionaries[lang].find(x=>x.id===id);if(!row)throw Error('Missing source entry '+lang+'/'+id);Object.assign(row,fields);};const split=(lang,baseId,cards)=>{const d=dictionaries[lang],i=d.findIndex(x=>x.id===baseId);if(i<0)throw Error('Missing split source '+lang+'/'+baseId);const base={...d[i]};d.splice(i,1);for(const c of cards){if(d.some(x=>x.id===c.id))throw Error('Duplicate split card '+c.id);const row={...base,id:c.id,word:c.word,definition:c.definition,synonyms:[c.synonym],example:{word:c.marker,text:c.example},exampleSynonym:{word:c.synonym,text:c.exampleSynonymText}};delete row.translation;d.push(row);}};
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

(()=>{const dictionaries=globalThis.DICCIONARIOS;const set=(lang,id,fields)=>{const row=dictionaries[lang].find(x=>x.id===id);if(!row)throw Error('Missing source entry '+lang+'/'+id);Object.assign(row,fields);};const split=(lang,baseId,cards)=>{const d=dictionaries[lang],i=d.findIndex(x=>x.id===baseId);if(i<0)throw Error('Missing split source '+lang+'/'+baseId);const base={...d[i]};d.splice(i,1);for(const c of cards){if(d.some(x=>x.id===c.id))throw Error('Duplicate split card '+c.id);const row={...base,id:c.id,word:c.word,definition:c.definition,synonyms:[c.synonym],example:{word:c.marker,text:c.example},exampleSynonym:{word:c.synonym,text:c.exampleSynonymText}};delete row.translation;d.push(row);}};
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

(()=>{const dictionaries=globalThis.DICCIONARIOS;const set=(lang,id,fields)=>{const row=dictionaries[lang].find(x=>x.id===id);if(!row)throw Error('Missing source entry '+lang+'/'+id);Object.assign(row,fields);};const split=(lang,baseId,cards)=>{const d=dictionaries[lang],i=d.findIndex(x=>x.id===baseId);if(i<0)throw Error('Missing split source '+lang+'/'+baseId);const base={...d[i]};d.splice(i,1);for(const c of cards){if(d.some(x=>x.id===c.id))throw Error('Duplicate split card '+c.id);const row={...base,id:c.id,word:c.word,definition:c.definition,synonyms:[c.synonym],example:{word:c.marker,text:c.example},exampleSynonym:{word:c.synonym,text:c.exampleSynonymText}};delete row.translation;d.push(row);}};
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

(()=>{const dictionaries=globalThis.DICCIONARIOS;const set=(lang,id,fields)=>{const row=dictionaries[lang].find(x=>x.id===id);if(!row)throw Error('Missing source entry '+lang+'/'+id);Object.assign(row,fields);};const split=(lang,baseId,cards)=>{const d=dictionaries[lang],i=d.findIndex(x=>x.id===baseId);if(i<0)throw Error('Missing split source '+lang+'/'+baseId);const base={...d[i]};d.splice(i,1);for(const c of cards){if(d.some(x=>x.id===c.id))throw Error('Duplicate split card '+c.id);const row={...base,id:c.id,word:c.word,definition:c.definition,synonyms:[c.synonym],example:{word:c.marker,text:c.example},exampleSynonym:{word:c.synonym,text:c.exampleSynonymText}};delete row.translation;d.push(row);}};
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
