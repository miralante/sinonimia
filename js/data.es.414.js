(()=>{const u={
 espadin:{definition:'Espada corta, estrecha y ligera; también, espada de hoja fina usada en esgrima.',synonyms:['espada corta','espada ligera','arma de esgrima']},
 espadon:{definition:'Espada grande y de hoja ancha. En sentido figurado y coloquial, persona de elevada jerarquía militar o, por extensión, de otra jerarquía.',synonyms:['espada grande','militar de alto rango (figurado)','personaje de elevada jerarquía']},
 espagirico:{definition:'Relativo a la espagiria, práctica alquímica que combina operaciones de separación y recomposición de sustancias.',synonyms:['relativo a la espagiria','alquímico']},
 espagirica:{definition:'Femenino de espagírico; relativo a la espagiria, práctica alquímica que combina operaciones de separación y recomposición de sustancias.',synonyms:['relativa a la espagiria','alquímica']},
 espadrapo:{definition:'Variante gráfica desusada de esparadrapo: tira de tela o material adhesivo que se usa para sujetar apósitos.',synonyms:['esparadrapo','cinta adhesiva médica']},
 espaldilla:{definition:'Diminutivo de espalda; también, pieza de carne correspondiente a la parte superior de la pata delantera de algunos animales.',synonyms:['espalda pequeña','paletilla (carne, según el animal)']},
 espaldudo:{synonyms:['ancho de espaldas','de espalda ancha','corpulento']},
 espanolada:{definition:'Obra artística o espectáculo que presenta de forma exagerada o estereotipada rasgos considerados españoles.',synonyms:['españolada','representación estereotipada de España']},
 espanoleria:{definition:'Cualidad o actitud de quien hace alarde de lo español o lo representa de forma afectada; también, rasgo o manifestación considerada típicamente española.',synonyms:['españolismo','afectación de lo español','rasgo español']},
 espanolidad:{synonyms:['carácter español','condición de español','identidad española']}
};for(const [id,p] of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(!r)throw Error('Missing es/'+id);Object.assign(r,p);delete r.translation;}})();
