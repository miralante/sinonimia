(()=>{const u={
  loquetera:{definition:'Coloquial, en Venezuela: acceso o ataque de locura.',synonyms:['ataque de locura','arrebato','locura']},
  lorear:{definition:'Verbo intransitivo, vulgar, en Chile: vigilar para advertir del peligro durante una actividad delictiva.',synonyms:['vigilar','hacer de campana','avisar del peligro']},
  lorero:{definition:'En Nicaragua, lugar donde abundan las loras; coloquialmente, mujer muy habladora.',synonyms:['lugar con muchas loras','mujer charlatana']},
 lorcha:{definition:'Embarcación ligera china, menor que un junco, movida a vela y remo y usada en el cabotaje.',synonyms:['embarcación china','barca de vela y remo']},
 lorigado:{definition:'Que está cubierto o protegido con loriga, una armadura de mallas o láminas.',synonyms:['acorazado','cubierto de loriga']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}
const ids=new Set(['loretano']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
