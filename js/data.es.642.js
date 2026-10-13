(()=>{const u={
  licoroso:{definition:'Dicho de un vino: de cuerpo y graduación alcohólica relativamente altos, a menudo dulce y parecido a un licor.',synonyms:['vino generoso','vino licoroso']},
  lidioso:{definition:'Dicho de una persona: difícil de tratar, molesta o propensa a causar discusiones.',synonyms:['conflictivo','molesto','quisquilloso']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}})();
