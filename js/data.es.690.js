(()=>{const u={
  maleable:{definition:'Dicho de un material, especialmente un metal: que puede batirse y extenderse en láminas sin romperse.',synonyms:['dúctil (en ciertos contextos)','laminable','maleable']},
  malear:{definition:'Hacer que alguien se vuelva malo o se corrompa; también, deteriorar o pervertir algo.',synonyms:['corromper','pervertir','envilecer']},
  maleador:{definition:'Desusado: maleante, persona que vive al margen de la ley o se dedica a actividades delictivas.',synonyms:['maleante','delincuente']},
  maleolar:{definition:'Anatómico: perteneciente o relativo al maléolo, cada una de las prominencias óseas de los lados del tobillo.',synonyms:['relativo al maléolo','del tobillo']},
  maleton:{definition:'Aumentativo de maleta: maleta grande.',synonyms:['maleta grande','equipaje voluminoso']},
  malabarismo:{definition:'Arte o habilidad de mantener en movimiento y controlar varios objetos lanzándolos y recogiéndolos.',synonyms:['juegos malabares','malabares']},
  malacate:{definition:'En algunas regiones, torno o cabrestante usado para elevar agua, minerales u otras cargas; también, huso para hilar.',synonyms:['torno','cabrestante','huso (sentido textil)']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}
const ids=new Set(['maletia']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
