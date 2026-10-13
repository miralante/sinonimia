(()=>{const u={
  losar:{definition:'Cubrir un suelo con losas.',synonyms:['enlosar','pavimentar con losas']},
  lozanear:{definition:'Ostentar o mostrar lozanía; obrar con vigor y gallardía.',synonyms:['florecer','mostrar vigor','rejuvenecer']},
  lotificadora:{definition:'En Honduras y Nicaragua, empresa que urbaniza terrenos y los divide en lotes para venderlos.',synonyms:['empresa urbanizadora','empresa parceladora']},
  lotificar:{definition:'Dividir un terreno en lotes; variante regional de lotear.',synonyms:['lotear','parcelar']},
  lotizar:{definition:'Dividir un terreno en lotes; variante regional de lotear.',synonyms:['lotear','parcelar']},
  lotin:{definition:'En El Salvador, boleto de lotería instantánea que se raspa para descubrir si obtuvo premio.',synonyms:['raspadita','billete de lotería instantánea']},
  lotofago:{definition:'Dicho de una persona: que se alimenta de lotos; en la mitología griega, miembro de un pueblo que comía el fruto del loto.',synonyms:['comedor de loto','lotófago']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}
const ids=new Set(['loriguillo']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
