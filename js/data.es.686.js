(()=>{const u={
  magullada:{definition:'Dicho de una persona, animal o parte del cuerpo: que ha sufrido una contusión o magulladura.',synonyms:['contusionada','amoratada (si hay equimosis)']},
  majaderear:{definition:'En varios países de América, molestar o causar disgustos a alguien; también, hacer o decir majaderías o insistir con terquedad.',synonyms:['molestar','fastidiar','insistir con terquedad']},
  maitinada:{definition:'Antiguamente: música o serenata que se ejecutaba de madrugada; también, en algunos usos regionales, las primeras horas del día.',synonyms:['serenata matutina','madrugada']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}
const ids=new Set(['maido']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
