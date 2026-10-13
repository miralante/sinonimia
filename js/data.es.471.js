(()=>{const u={
 extender:{definition:'Hacer que algo ocupe más espacio, longitud o duración; desplegarlo o prolongarlo; también, aplicar algo a más casos o personas.',synonyms:['ampliar','prolongar','desplegar','aplicar']},
 extenuante:{definition:'Que causa gran cansancio o agotamiento.',synonyms:['agotador','fatigoso','extenuativo']},
 extenuar:{definition:'Debilitar o agotar física o mentalmente.',synonyms:['debilitar','agotar','fatigar']},
 extenuativo:{definition:'Que causa cansancio o agotamiento.',synonyms:['extenuante','agotador','fatigoso']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(!r)throw Error('Missing es/'+id);Object.assign(r,p);delete r.translation;}})();
