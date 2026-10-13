(()=>{const ids=new Set(['estadunidense','estadounidense','estacte']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 estabilidad:{synonyms:['firmeza','solidez','equilibrio','permanencia']},
 estabilizante:{definition:'Que sirve para estabilizar algo o mantenerlo estable.',synonyms:['estabilizador','regulador','fijador']},
 estabilizar:{definition:'Hacer que algo se mantenga estable o alcance estabilidad.',synonyms:['afianzar','asentar','consolidar','regular']},
 establear:{definition:'Acostumbrar al ganado, especialmente a las reses, a permanecer en el establo.',synonyms:['acostumbrar al establo','estabular']},
 establir:{definition:'Antiguo. Establecer o fundar algo.',synonyms:['establecer','fundar','instituir']},
 estabular:{definition:'Mantener o criar ganado dentro de establos.',synonyms:['guardar en el establo','alojar en establos']},
 estache:{definition:'Tela fina.',synonyms:['tejido fino','tela ligera']},
 estacional:{definition:'Que se repite o varía según las estaciones del año.',synonyms:['periódico','cíclico','propio de una estación']},
 estacionalidad:{definition:'Variación que se repite con regularidad en determinadas épocas del año.',synonyms:['variación estacional','ciclo anual','periodicidad anual']},
 estacon:{definition:'Aumentativo poco usado de estaca.',synonyms:['estaca grande','poste']},
 estadal:{definition:'Antigua medida de longitud, equivalente por lo común a cuatro varas; su valor variaba según el lugar.',synonyms:['medida de longitud','cuatro varas']},
 estadero:{definition:'Colombia. Establecimiento situado junto a una carretera donde se sirven comidas y bebidas y, a menudo, se ofrece alojamiento.',synonyms:['parador','restaurante de carretera','posada']},
 estadia:{definition:'Acción y efecto de estar o permanecer en un lugar durante cierto tiempo.',synonyms:['permanencia','estancia','residencia temporal']},
 estadidad:{definition:'Condición o aspiración de un territorio a constituirse en estado federado, especialmente en el contexto de Puerto Rico y Estados Unidos.',synonyms:['condición de estado','statehood']},
 estadigrafo:{definition:'Persona especializada en estadística; estadístico.',synonyms:['estadístico','especialista en estadística']},
 estadillo:{definition:'Relación o estado, generalmente presentado en forma de tabla, con datos o cifras.',synonyms:['cuadro','tabla','relación de datos']},
 estadistico:{definition:'Perteneciente o relativo a la estadística; también, persona que trabaja en esta disciplina.',synonyms:['relativo a la estadística','estadígrafo']},
 estadojo:{definition:'Cantabria. Estaca del carro.',synonyms:['estaca de carro','estadono']},
 estadono:{definition:'Asturias, rural. Estaca del carro.',synonyms:['estaca de carro','estadojo']},
 estafa:{definition:'Engaño realizado con ánimo de lucro que induce a otra persona a efectuar un acto de disposición en perjuicio propio o ajeno.',synonyms:['fraude','timo','engaño']}
};for(const [id,p] of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(!r)throw Error('Missing es/'+id);Object.assign(r,p);delete r.translation;}})();
