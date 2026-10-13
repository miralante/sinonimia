(()=>{const u={
  letrilla:{definition:'Composición poética breve, a menudo de versos de arte menor, que suele incluir un estribillo repetido.',synonyms:['poema breve','composición con estribillo']},
  leudante:{definition:'Sustancia, como la levadura o un impulsor químico, que hace fermentar o aumentar de volumen una masa.',synonyms:['agente leudante','levadura química']},
  leuco:{definition:'Apósito adhesivo pequeño que lleva una gasa, a veces impregnada de medicamento, y se coloca sobre heridas menores.',synonyms:['apósito adhesivo','curita','tirita']},
  leucopenia:{definition:'Disminución anormal del número de leucocitos en la sangre.',synonyms:['recuento bajo de glóbulos blancos']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}
const ids=new Set(['letura']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
