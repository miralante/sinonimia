(()=>{const ids=new Set(['expectable']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 expectativa:{definition:'Posibilidad o esperanza de que algo ocurra; también, previsión razonable sobre lo que puede suceder.',synonyms:['esperanza','previsión','posibilidad']},
 expediente:{definition:'Conjunto ordenado de documentos y actuaciones relativos a un asunto, trámite, persona o procedimiento; también, el archivo que los contiene.',synonyms:['archivo','dossier','registro del procedimiento']},
 expedir:{definition:'Extender o emitir un documento oficial; despachar un asunto o enviar una mercancía, según el contexto.',synonyms:['emitir','despachar','enviar']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(!r)throw Error('Missing es/'+id);Object.assign(r,p);delete r.translation;}})();
