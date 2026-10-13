(()=>{const u={
  malmeter:{definition:'Indisponer o enemistar a una persona con otra, generalmente hablando mal de una de ellas.',synonyms:['enemistar','indisponer','poner mal a alguien con otra persona']},
  maltear:{definition:'Someter un cereal, especialmente cebada, a germinación controlada y secado para obtener malta.',synonyms:['maltear cereales','preparar malta']},
  malpais:{definition:'Terreno abrupto y pedregoso, generalmente formado por coladas de lava solidificada.',synonyms:['campo de lava','terreno volcánico escabroso']},
  malnutrido:{definition:'Que padece malnutrición, por aporte insuficiente, excesivo o desequilibrado de energía o nutrientes.',synonyms:['mal alimentado','desnutrido (cuando hay déficit)']},
  malojal:{definition:'En Venezuela, terreno plantado de malojo, planta forrajera.',synonyms:['plantación de malojo','campo de malojo']},
  malojero:{definition:'En Cuba, persona que vende maloja, especialmente como alimento para animales.',synonyms:['vendedor de maloja']},
  malpigiaceo:{synonyms:['perteneciente a las malpigiáceas','malpighiáceo']},
  malqueda:{definition:'En el uso coloquial, persona que no cumple sus compromisos o promesas.',synonyms:['incumplidor','informal (en sus compromisos)']},
  malqueriente:{definition:'Que siente aversión o mala voluntad hacia alguien; también, persona que la siente.',synonyms:['hostil','malqueredor','enemigo (según el contexto)']},
  mancebia:{definition:'Casa o establecimiento donde se ejerce la prostitución.',synonyms:['prostíbulo','burdel','casa de prostitución']},
  mancerina:{definition:'Salvilla con un soporte central para sostener una jícara, especialmente una taza de chocolate.',synonyms:['salvilla para jícara','soporte para taza de chocolate']},
  mandril:{definition:'Primate africano de la familia de los cercopitécidos, de rostro muy colorido; su nombre científico es Mandrillus sphinx.',synonyms:['mandril (primate)','Mandrillus sphinx']},
  mandriladora:{definition:'Máquina herramienta que ensancha o acaba con precisión orificios mediante una barra de mandrinar; también, herramienta para esa operación.',synonyms:['máquina de mandrinar','mandrinadora']},
  manejabilidad:{definition:'Cualidad de aquello que puede manejarse, controlarse o utilizarse con facilidad.',synonyms:['facilidad de manejo','maniobrabilidad','docilidad (según el contexto)']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}const ids=new Set(['managuense','manal']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
