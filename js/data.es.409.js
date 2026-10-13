(()=>{const u={
 escurridura:{synonyms:['escurrimiento','drenaje','acción de escurrir'],example:{word:'escurridura',text:'La escurridura del paño dejó un pequeño charco en el fregadero.'},exampleSynonym:{word:'escurrimiento',text:'El escurrimiento del paño dejó un pequeño charco en el fregadero.'}},
 escurrilidad:{definition:'Cualidad de escurril; carácter zafio, grosero o indecoroso.',synonyms:['grosería','indecencia','vulgaridad','bufonería']},
 escurrir:{definition:'Hacer que un líquido salga o se separe de algo; dejarlo escurrir; también, apurar o extraer lo que queda de un líquido en un recipiente.',synonyms:['drenar','escurrir el líquido','apurar','colar'],example:{word:'escurrir',text:'Deja escurrir las verduras antes de servirlas.'},exampleSynonym:{word:'drenar',text:'Deja drenar el agua de las verduras antes de servirlas.'}},
 escusa:{definition:'Nombre femenino: cesta con tapa (escusabaraja); ventaja o derecho que algunas personas disfrutan por pacto o costumbre, especialmente el derecho de pastoreo; también, ocultamiento o disimulo en usos antiguos.',synonyms:['escusabaraja','beneficio pactado','derecho de pastoreo','ocultamiento (antiguo)']},
 escusabaraja:{definition:'Cesta de mimbre u otro material, provista de tapa y usada para guardar o transportar cosas.',synonyms:['cesta con tapa','canasta de mimbre','cesto cubierto']},
 escusado:{definition:'Reservado, exceptuado o separado de una obligación; también, dicho de un lugar, destinado a uso privado.',synonyms:['reservado','exceptuado','privado']},
 escusano:{definition:'Oculto o encubierto; dicho de algo que no está a la vista.',synonyms:['escondido','encubierto','secreto']},
 escusar:{definition:'Antiguamente o en uso regional, esconder o encubrir; también, librar o dispensar de una obligación.',synonyms:['esconder','encubrir','dispensar','excusar']},
 escuso:{definition:'Usado en las locuciones «a escuso» y «en escuso»: con disimulo o cautela.',synonyms:['a escondidas','con disimulo','furtivamente']},
 escuson:{synonyms:['escudo pequeño','sobrescudo','escudete'],example:{word:'escusón',text:'El escusón ocupaba el centro del escudo heráldico.'},exampleSynonym:{word:'escudo pequeño',text:'El escudo pequeño ocupaba el centro del blasón.'}},
 esdrujulismo:{synonyms:['cualidad de esdrújulo','carácter esdrújulo','acentuación esdrújula']},
 esdrujulizar:{definition:'Dar acentuación esdrújula a una palabra o voz.',synonyms:['hacer esdrújula','acentuar en la antepenúltima sílaba']},
 esenio:{definition:'Dicho de una persona: miembro de un antiguo grupo judío, activo aproximadamente entre los siglos II a. C. y I d. C.; también, relativo a ese grupo.',synonyms:['miembro de los esenios','relativo a los esenios','esenio']}
};for(const [id,p] of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(!r)throw Error('Missing es/'+id);Object.assign(r,p);delete r.translation;}})();
