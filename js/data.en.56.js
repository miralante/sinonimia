/* Reviewed English dictionary updates for batch 2020. */
(()=>{
  const updates={
    
    
    inhabitant:{definition:"A person or animal that lives in a particular place.",synonyms:["resident","dweller","occupant"],example:{word:"inhabitant",text:"Each inhabitant of the island received a notice about the ferry schedule."},exampleSynonym:{word:"resident",text:"Each resident of the island received a notice about the ferry schedule."}},
    
    
    axe:{definition:"A hand tool with a heavy bladed head attached to a handle, used for chopping or splitting; as a verb, to cut or remove something, especially from a plan or budget.",synonyms:["ax","hatchet","chopper"],example:{word:"axe",text:"He used an axe to split the logs, then decided to axe the damaged shelves from the plan."},exampleSynonym:{word:"hatchet",text:"He used a hatchet to split the logs, then decided to axe the damaged shelves from the plan."}},
    hammock:{definition:"A suspended bed or couch, usually made of canvas or netting and hung from supports at each end.",synonyms:["suspended bed","hanging bed"],example:{word:"hammock",text:"She stretched out in a hammock between two trees."},exampleSynonym:{word:"suspended bed",text:"She stretched out in a suspended bed between two trees."}},
    "rocking-chair":{definition:"A chair mounted on curved supports so that it can rock gently back and forth.",synonyms:["rocker","rocking chair"],example:{word:"rocking chair",text:"Grandfather read the newspaper in his rocking chair."},exampleSynonym:{word:"rocker",text:"Grandfather read the newspaper in his rocker."}},
    hunger:{definition:"A physical need or desire for food; also, a strong desire for something. As a verb, to feel hunger or long for something.",synonyms:["appetite","craving","longing","yearning"],example:{word:"hunger",text:"After the hike, her hunger was intense, and she hungered for a hot meal."},exampleSynonym:{word:"appetite",text:"After the hike, her appetite was intense, and she hungered for a hot meal."}},
    hungry:{definition:"Feeling or showing a need or desire for food; also, having a strong desire for something.",synonyms:["famished","starving","peckish","eager"],example:{word:"hungry",text:"The hungry hikers stopped for lunch, eager to eat."},exampleSynonym:{word:"famished",text:"The famished hikers stopped for lunch, eager to eat."}}
  };
  for(const[id,fields]of Object.entries(updates)){const row=DICCIONARIOS.en.find(e=>e.id===id);if(row){Object.assign(row,fields);delete row.translation;}}
})();
