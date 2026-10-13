(()=>{const u={
  lencero:{definition:'Persona que vende o comercia con telas y ropa blanca; en algunos usos, vendedor de medias o calcetería.',synonyms:['vendedor de lencería','calcetero']},
  lene:{definition:'Suave, blando o apacible; uso poético o poco frecuente.',synonyms:['suave','blando']},
  lenguaraz:{definition:'Que habla mucho o con demasiada soltura; también, que se expresa con facilidad.',synonyms:['locuaz','deslenguado','hablador']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}
const ids=new Set(['lenca','leneas','lenguaza']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
