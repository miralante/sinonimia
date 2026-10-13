(()=>{const u={
 exegesis:{word:'Exégesis',definition:'Interpretación crítica y explicación de un texto, especialmente de uno religioso, jurídico o literario.',synonyms:['interpretación','explicación textual']},
 exencion:{definition:'Liberación de una persona o cosa de una carga, obligación, pago o deber.',synonyms:['dispensa','exoneración','liberación']},
 exentamente:{definition:'Con exención o de manera exenta; libremente, sin quedar sujeto a una obligación.',synonyms:['libremente','sin obligación']},
 exequatur:{word:'Execuátur',definition:'Autorización que permite ejecutar en un país una sentencia dictada en otro; también, autorización oficial para que un cónsul ejerza sus funciones.',synonyms:['homologación de sentencia extranjera','autorización consular']},
 exergo:{definition:'En una moneda o medalla, espacio situado debajo del diseño principal, a menudo separado por una línea y reservado para una fecha, inscripción u otro dato.',synonyms:['campo inferior de la moneda','espacio de inscripción']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(!r)throw Error('Missing es/'+id);Object.assign(r,p);delete r.translation;}})();
