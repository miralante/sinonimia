(()=>{const u={
 exterminar:{definition:'Destruir o eliminar por completo algo, especialmente una población, especie o grupo.',synonyms:['aniquilar','erradicar','eliminar']},
 extinguidor:{definition:'Aparato o sustancia que sirve para apagar o controlar un fuego.',synonyms:['extintor','apagafuegos']},
 extintor:{definition:'Aparato portátil que contiene un agente destinado a apagar o controlar un incendio.',synonyms:['extinguidor','apagafuegos']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(!r)throw Error('Missing es/'+id);Object.assign(r,p);delete r.translation;}})();
