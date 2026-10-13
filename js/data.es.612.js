(()=>{const u={
  laparoscopio:{definition:'Instrumento óptico que se introduce en el abdomen para examinarlo durante una laparoscopia.',synonyms:['endoscopio abdominal']},
  lanzador:{definition:'Persona o dispositivo que lanza, arroja o pone algo en movimiento.',synonyms:['arrojador','dispositivo de lanzamiento']},
  laudemio:{definition:'En el régimen señorial, derecho que percibía el señor cuando se transmitía una finca enfitéutica.',synonyms:['derecho de transmisión']},
  latania:{definition:'Palmera del género Latania, propia de las islas Mascareñas.',synonyms:['latania']},
  landre:{definition:'Tumor o bulto que se forma en una glándula, especialmente en los ganglios.',synonyms:['bubón','tumor glandular']},
  latirismo:{definition:'Intoxicación causada por el consumo prolongado de ciertas semillas del género Lathyrus, que puede producir parálisis.',synonyms:['intoxicación por latirismo']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}
const ids=new Set(['lapita','latvio','languedociano','lareno','latinoamericano','largomira']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
