(()=>{const u={
  lisera:{definition:'En Murcia, caña gruesa que se coloca transversalmente para sujetar las cañas de un cañizo.',synonyms:['caña transversal','travesaño']},
  lisergico:{definition:'Relacionado con el ácido lisérgico o con sus efectos alucinógenos.',synonyms:['psicodélico','alucinógeno (según el contexto)']},
  lisimaquia:{definition:'Planta herbácea del género Lysimachia, de la familia de las primuláceas; varias especies se conocen como lisimaquia amarilla.',synonyms:['Lysimachia','lisimaquia amarilla']},
  lislique:{definition:'En El Salvador, persona flaca.',synonyms:['flaco','delgado']},
  lisonjeramente:{definition:'Con lisonja o adulación.',synonyms:['aduladoramente','con adulación']},
  listar:{definition:'Hacer una lista o incluir algo o a alguien en ella; también, guarnecer con listas.',synonyms:['enumerar','incluir en una lista','guarnecer con listas']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}
const ids=new Set(['lisol','listeado']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
