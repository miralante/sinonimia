(()=>{const u={
 expendedor:{definition:'Que expende o vende productos; dicho de una persona, máquina o establecimiento, que los suministra a cambio de pago.',synonyms:['vendedor','dispensador','distribuidor']},
 experimentado:{definition:'Que tiene experiencia o práctica en una actividad; también, participio de experimentar.',synonyms:['experto','avezado','experimentado']},
 experticia:{definition:'Conocimiento o habilidad adquiridos por experiencia y práctica en una materia; variante de expertiz.',synonyms:['experiencia especializada','pericia','expertiz']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(!r)throw Error('Missing es/'+id);Object.assign(r,p);delete r.translation;}})();
