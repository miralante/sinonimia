(()=>{const u={
  lerdo:{definition:'Lento o torpe al moverse o actuar; dicho de una persona, también de poca agudeza o comprensión.',synonyms:['tardo','torpe','poco despierto']},
  leprocomio:{definition:'Establecimiento destinado antiguamente al aislamiento o tratamiento de personas con lepra.',synonyms:['leprosario','lazareto']},
  lero:{definition:'En El Salvador, conversación larga e insustancial; se usa especialmente en la expresión «lero, lero».',synonyms:['charla insípida']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}
const ids=new Set(['lercha','lerdera','lerdon','lerense','lesbio','lesbiano']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
