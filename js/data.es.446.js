(()=>{const ids=new Set(['euscalduna','eusquerico']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 eutanasia:{definition:'Acción u omisión que, de forma deliberada, causa la muerte de una persona para poner fin a un sufrimiento grave e irreversible, generalmente a petición de la propia persona.',synonyms:['muerte asistida','acción para poner fin al sufrimiento']},
 eutiquianismo:{definition:'Doctrina cristológica atribuida a Eutiques, que sostiene que en Cristo la naturaleza humana queda absorbida por la divina.',synonyms:['doctrina de Eutiques','monofisismo eutiquiano']},
 eutiquiano:{definition:'Perteneciente o relativo a Eutiques o al eutiquianismo; también, partidario de esta doctrina.',synonyms:['relativo a Eutiques','partidario del eutiquianismo']},
 eutropelia:{definition:'Variante histórica de eutrapelia; virtud o disposición para usar moderadamente las diversiones y las bromas.',synonyms:['eutrapelia','diversión moderada']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(!r)throw Error('Missing es/'+id);Object.assign(r,p);delete r.translation;}})();
