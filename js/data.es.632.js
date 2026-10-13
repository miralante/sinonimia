(()=>{const u={
  levantador:{definition:'Que levanta o sirve para levantar algo; como sustantivo, persona o dispositivo que lo eleva.',synonyms:['alzador','elevador','levantador']},
  levirato:{definition:'Costumbre por la cual, al morir un hombre sin descendencia, su hermano u otro pariente masculino se casa con la viuda para asegurar descendencia y continuidad familiar.',synonyms:['matrimonio levirático']},
  levedad:{definition:'Cualidad de lo que tiene poco peso o poca importancia; ligereza.',synonyms:['ligereza','poca importancia']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}
const ids=new Set(['levantisco','levidad']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
