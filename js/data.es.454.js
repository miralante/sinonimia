(()=>{const u={
 excandecer:{definition:'Enardecer o irritar intensamente; causar cólera o enfado.',synonyms:['encolerizar','irritar','enfurecer']},
 excipiente:{definition:'Sustancia inactiva que sirve de vehículo o soporte para el principio activo de un medicamento.',synonyms:['vehículo farmacéutico','sustancia auxiliar']},
 excitante:{definition:'Que excita, estimula o produce una reacción intensa; también, sustancia que estimula el sistema nervioso.',synonyms:['estimulante','incitante']},
 exclaustrar:{definition:'Hacer que una persona religiosa salga del claustro o de la vida conventual; también, permitirle salir de ella.',synonyms:['sacar del claustro','secularizar (en ciertos contextos)']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(!r)throw Error('Missing es/'+id);Object.assign(r,p);delete r.translation;}})();
