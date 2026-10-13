(()=>{const u={
  montepiado:{definition:'Dicho de una persona: que recibe un préstamo o una ayuda económica de un montepío.',synonyms:['beneficiario de un montepío','pensionista']},
  montepio:{definition:'Institución o fondo común creado para proporcionar pensiones, socorro o préstamos a sus miembros o familiares.',synonyms:['mutualidad','fondo de previsión','caja de ayuda']},
  montereria:{definition:'Arte o actividad de cazar animales de monte, especialmente mediante montería.',synonyms:['caza mayor','montería']},
  monterero:{definition:'Persona que participa en una montería o se dedica a la caza mayor.',synonyms:['montero','cazador de montería']},
  monteria:{definition:'Caza mayor de animales silvestres en el monte, especialmente jabalíes y venados.',synonyms:['caza mayor','cacería']},
  monterilla:{definition:'Montera pequeña; diminutivo de «montera».',synonyms:['montera pequeña','gorra']},
  montero:{definition:'Persona que busca, persigue o caza animales en el monte; también, guarda de monte.',synonyms:['cazador','guardamonte']},
  montesa:{definition:'Perteneciente o relativo a los montes o a la montaña.',synonyms:['montañés','serrano','agreste']},
  montesino:{definition:'Propio de los montes o criado en ellos; agreste y, aplicado a personas, huraño.',synonyms:['montaraz','agreste','huraño']},
  montina:{definition:'Monte o terreno elevado; variante regional de «montiña».',synonyms:['monte','montaña']},
  monto:{definition:'Suma o cantidad total resultante de una operación o de la acumulación de varias partidas.',synonyms:['total','cuantía','suma']},
  montonal:{definition:'En varios países de América, cantidad muy grande o montón de cosas.',synonyms:['montón','gran cantidad','montonada']},
  montonero:{definition:'Persona que antiguamente anotaba en las eras las cosechas de cada labrador para calcular el diezmo correspondiente.',synonyms:['anotador de cosechas','encargado de la era']},
  montoso:{definition:'Montuoso: abundante en montes o cubierto de ellos; variante rara.',synonyms:['montuoso','boscoso']},
  montuno:{definition:'Perteneciente o relativo al monte; también, rústico o campesino.',synonyms:['montés','rústico','campesino']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}const ids=new Set(['montereno','montesco','montilla','montillano','montubio']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
