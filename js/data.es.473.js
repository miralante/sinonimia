(()=>{const u={
 extorsion:{definition:'Acción de obtener dinero, bienes o una conducta mediante violencia, intimidación o amenazas.',synonyms:['chantaje','coacción','amenaza']},
 extorsionador:{definition:'Persona que obtiene dinero, bienes o una conducta mediante violencia, intimidación o amenazas.',synonyms:['chantajista','extorsionista']},
 extracto:{definition:'Resumen o pasaje tomado de una obra; también, documento que detalla los movimientos de una cuenta bancaria durante un período.',synonyms:['resumen','fragmento','estado de cuenta']},
 extradir:{definition:'Entregar un Estado a una persona reclamada por otro Estado para que sea juzgada o cumpla una pena, de acuerdo con el procedimiento legal aplicable.',synonyms:['extraditar','entregar a otro Estado']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(!r)throw Error('Missing es/'+id);Object.assign(r,p);delete r.translation;}})();
