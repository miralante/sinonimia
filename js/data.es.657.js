(()=>{const u={
  litraceo:{definition:'Perteneciente a la familia de las litráceas, plantas con flores que incluye, entre otras, a la salicaria.',synonyms:['litráceo','de la familia de las litráceas']},
  livianamente:{definition:'De manera ligera o superficial; también, con poca seriedad o cuidado.',synonyms:['ligeramente','superficialmente','frívolamente']},
  livor:{definition:'Color amoratado o negruzco de la piel, especialmente el que aparece en un hematoma.',synonyms:['lividez','amoratamiento']},
  lizo:{definition:'En un telar, cada uno de los hilos o mallas que levantan y bajan los hilos de la urdimbre para formar el tejido.',synonyms:['lizos del telar','heddle']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}
const ids=new Set(['litrarieo']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
