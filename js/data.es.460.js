(()=>{const u={
 exida:{definition:'Salida o lugar por donde se sale; voz antigua, relacionada con el verbo exir.',synonyms:['salida','vía de salida']},
 exigir:{definition:'Pedir o reclamar algo con autoridad o derecho; también, reclamar el pago o la entrega de algo debido.',synonyms:['reclamar','requerir','demandar','cobrar']},
 exiliar:{definition:'Expulsar a alguien de su país o lugar de residencia, generalmente por motivos políticos; también, obligarlo a vivir lejos de allí.',synonyms:['desterrar','deportar','condenar al exilio']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(!r)throw Error('Missing es/'+id);Object.assign(r,p);delete r.translation;}})();
