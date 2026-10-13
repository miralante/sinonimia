(()=>{const u={
  monomando:{synonyms:['grifo de mando único','grifo monomando']},
  monomania:{definition:'Preocupación u obsesión persistente por una sola idea o asunto; término histórico de la psiquiatría, hoy no usado como diagnóstico.',synonyms:['obsesión','idea fija']},
  monomaniaco:{definition:'Relativo a la monomanía; dicho antiguamente de quien presentaba una obsesión centrada en una idea.',synonyms:['obsesivo','monomaníaco']},
  monomaniatico:{definition:'Que muestra una preocupación obsesiva por un tema o idea; uso no diagnóstico.',synonyms:['obsesivo','monomaníaco']},
  monomaquia:{definition:'Duelo o combate singular entre dos personas.',synonyms:['duelo','combate singular']},
  monometalismo:{definition:'Sistema monetario basado en un solo metal como referencia o patrón.',synonyms:['patrón monetario único','sistema monometálico']},
  monomotor:{synonyms:['de un solo motor','avión monomotor']},
  mononucleosis:{definition:'Enfermedad infecciosa, generalmente causada por el virus de Epstein-Barr, que puede producir fiebre, dolor de garganta y aumento de los ganglios linfáticos.',synonyms:['mononucleosis infecciosa','enfermedad del beso']},
  monoparental:{synonyms:['de un solo progenitor','familia monoparental']},
  monopetalo:{definition:'Dicho de una corola: formada por un solo pétalo o por pétalos soldados entre sí.',synonyms:['gamopétalo','de pétalos soldados']},
  monoplano:{definition:'Avión con un solo par de alas dispuestas en un mismo plano.',synonyms:['avión monoplano']},
  monoplaza:{synonyms:['de una sola plaza','vehículo monoplaza']},
  monopolistico:{definition:'Perteneciente o relativo al monopolio o a quien lo ejerce.',synonyms:['monopolista','de monopolio']},
  monopolizador:{definition:'Que monopoliza o acapara algo; también, persona o entidad que lo hace.',synonyms:['acaparador','monopolista']},
  monopolizar:{definition:'Reservar o acaparar en exclusiva una actividad, recurso, producto o mercado.',synonyms:['acaparar','controlar en exclusiva']},
  monoptongar:{definition:'Convertir un diptongo en un solo sonido vocálico o monoptongo.',synonyms:['reducir a monoptongo','monoptongación']},
  monoptongo:{definition:'Vocal o sonido vocálico simple que resulta de la reducción de un diptongo.',synonyms:['vocal simple','monoftongo']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}const ids=new Set(['monon','monona','monopastos']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
