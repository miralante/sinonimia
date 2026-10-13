(()=>{const u={
  lingotera:{definition:'Molde metálico o de arena refractaria donde se vierte el material fundido para que se solidifique con forma de lingote.',synonyms:['molde de lingotes','molde de fundición']},
  liniero:{definition:'En Chile, Nicaragua y Cuba, persona especializada en instalar redes eléctricas o de telecomunicaciones; en fútbol americano, jugador de la línea de ataque o defensa.',synonyms:['instalador de líneas','jugador de línea']},
  linotipia:{definition:'Procedimiento de composición tipográfica en el que una máquina funde y compone líneas enteras de texto; también, máquina usada para ello.',synonyms:['composición mecánica','linotipo']},
  linternon:{definition:'Aumentativo de linterna; linterna grande.',synonyms:['linterna grande']},
  lipemania:{definition:'Melancolía o estado de tristeza profunda, término médico antiguo.',synonyms:['melancolía','tristeza profunda']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}
const ids=new Set(['linuezo','liones','linjavera','lipis']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
