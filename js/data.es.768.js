(()=>{const u={
  nodatil:{definition:'Dicho de una juntura o articulación: que forma un nudo o presenta una unión nodosa.',synonyms:['nodoso','articulado']},
  nocturnidad:{definition:'Cualidad o condición de nocturno; también, en el ámbito laboral, recargo o complemento por trabajar durante la noche.',synonyms:['carácter nocturno','trabajo nocturno']},
  noesis:{definition:'En filosofía, acto de conocer o aprehender intelectualmente, especialmente como actividad del pensamiento.',synonyms:['acto intelectivo','intelección']},
  noquear:{definition:'En boxeo y otros deportes de combate, dejar fuera de combate al adversario, generalmente al hacerle perder el conocimiento.',synonyms:['dejar fuera de combate','dejar KO']},
  noosfera:{definition:'Esfera del pensamiento humano que, según la teoría de Vladímir Vernadski, se forma por la interacción de la humanidad con la biosfera.',synonyms:['esfera del pensamiento humano','esfera noética']},
  nomografia:{definition:'Rama de las matemáticas que representa gráficamente relaciones entre variables mediante nomogramas.',synonyms:['nomografía matemática','estudio de los nomogramas']},
  noval:{definition:'Dicho de un terreno: que se cultiva por primera vez.',synonyms:['recién roturado','de nuevo cultivo']},
  novillero:{definition:'Persona que lidia novillos; también, dicho de una persona, aficionada a los novillos o a las novilladas.',synonyms:['torero de novillos','lidiador de novillos']},
  noviciado:{definition:'Período de formación y prueba que precede a la profesión religiosa; también, casa o comunidad donde se realiza.',synonyms:['período de formación religiosa','casa de novicios']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}const ids=new Set(['norteamericano','norteafricano','novohispano','novomejicano']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
