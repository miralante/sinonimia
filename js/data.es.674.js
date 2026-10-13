(()=>{const u={
  lumaquela:{definition:'Roca caliza sedimentaria formada principalmente por conchas de moluscos o braquiópodos, o por fragmentos de estas; pulida, se utiliza como piedra ornamental.',synonyms:['caliza conchífera','coquina','mármol lumaquela']},
  lulismo:{definition:'Doctrina o sistema filosófico de Ramón Llull; en algunos países, movimiento político asociado a Luiz Inácio Lula da Silva.',synonyms:['filosofía luliana','movimiento lulista (en política brasileña)']},
  luciferal:{definition:'Soberbio o maligno; relativo a Lucifer.',synonyms:['soberbio','maligno','luciferino']},
  lucifero:{definition:'Que da o despide luz.',synonyms:['luminoso','resplandeciente']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}
const ids=new Set(['lugdunense','lugues','lucemburgues','lumbo','luismo']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
