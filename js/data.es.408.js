(()=>{const ids=new Set(['escullador']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 escullon:{synonyms:['resbalón','deslizamiento','caída por resbalón'],example:{word:'escullón',text:'Dio un escullón al cruzar el camino embarrado.'},exampleSynonym:{word:'resbalón',text:'Dio un resbalón al cruzar el camino embarrado.'}},
 esculpidor:{definition:'Antiguamente, hombre que se dedicaba a esculpir o tallar figuras y relieves.',synonyms:['escultor','tallista','grabador'],example:{word:'esculpidor',text:'El esculpidor trabajó la piedra durante semanas.'},exampleSynonym:{word:'escultor',text:'El escultor trabajó la piedra durante semanas.'}},
 esculpidura:{definition:'Antiguamente, grabado o labor de esculpir sobre una superficie.',synonyms:['grabado','talla','relieve esculpido']},
 esculpir:{synonyms:['tallar','labrar','grabar en relieve'],example:{word:'esculpir',text:'La artista decidió esculpir la figura en mármol.'},exampleSynonym:{word:'tallar',text:'La artista decidió tallar la figura en mármol.'}},
 escuna:{definition:'Embarcación de vela con dos o más mástiles, en la que el palo de proa suele ser menor que el principal.',synonyms:['goleta','velero de dos palos','schooner']},
 escupidor:{definition:'Que escupe o tiene el hábito de escupir; también, recipiente o aparato que sirve para escupir en él o expulsar saliva.',synonyms:['escupiente','expectorador','escupidera (recipiente, según el uso)']},
 escupina:{word:'Escupiña',definition:'Molusco bivalvo marino comestible, de concha robusta y redondeada; el nombre se aplica a distintas especies, como Venus verrucosa.',synonyms:['escupiña grabada','almeja Venus verrucosa','molusco bivalvo']},
 escupitina:{synonyms:['escupidura','saliva escupida','flema expulsada']},
 escupitinajo:{synonyms:['escupidura','escupitajo','saliva expulsada']},
 escureta:{definition:'En algunos usos locales, peine o herramienta de cardar; el término también se documenta en áreas de habla catalana para distintas herramientas de limpieza o trabajo.',synonyms:['peine de cardar','carda','herramienta local de limpieza']},
 escurana:{synonyms:['oscuridad','oscurana','tiniebla'],example:{word:'escurana',text:'La escurana cubrió el sendero antes de que llegaran al refugio.'},exampleSynonym:{word:'oscuridad',text:'La oscuridad cubrió el sendero antes de que llegaran al refugio.'}},
 escurar:{definition:'Quitar el agua o la humedad de algo; escurrir o secar, según el uso regional.',synonyms:['escurrir','secar','quitar la humedad']},
 escurcar:{definition:'En El Salvador y Nicaragua, registrar o buscar algo; variante regional de esculcar.',synonyms:['registrar','rebuscar','esculcar']},
 escurecer:{definition:'Antiguamente o en uso regional, anochecer u oscurecer.',synonyms:['oscurecer','anochecer','hacerse de noche']},
 escuridad:{synonyms:['oscuridad','tiniebla','falta de luz']},
 escuro:{synonyms:['oscuro','tenebroso','falto de luz']},
 escurribanda:{definition:'Coloquial: escapatoria o acción de evadirse; también, zurra, flujo o corrimiento de un líquido y, en uso poco frecuente, diarrea.',synonyms:['escapatoria','evasión','zurribanda (paliza)','flujo','diarrea (poco usado)'],example:{word:'escurribanda',text:'Encontró una escurribanda y salió de la reunión sin que lo vieran.'},exampleSynonym:{word:'escapatoria',text:'Encontró una escapatoria y salió de la reunión sin que lo vieran.'}}
};for(const [id,p] of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(!r)throw Error('Missing es/'+id);Object.assign(r,p);delete r.translation;}})();
