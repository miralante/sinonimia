(()=>{const u={
  'transport-ship':{definition:'A ship designed to carry cargo, troops, vehicles, or other supplies.',synonyms:['transport vessel','cargo ship']},
  transshipment:{definition:'The transfer of cargo from one ship, vehicle, or mode of transport to another during a journey.',synonyms:['transloading','cargo transfer']},
  transubstantiate:{definition:'In Christian theology, to change the substance of the bread and wine of the Eucharist into the body and blood of Christ, while the outward appearances remain.',synonyms:['change in substance (theological)']},
  transubstantial:{definition:'Relating to or involving transubstantiation, the theological doctrine of a change in substance.',synonyms:['transubstantiated']},
  transsexual:{definition:'A dated term for a transgender person, sometimes used by people who describe their gender transition in terms of changing sex. In current general usage, “transgender” is usually preferred.',synonyms:['transgender (preferred current term)']},
  transsexuality:{definition:'A dated term for transgender identity or the condition of being transsexual; current usage generally prefers “transgender identity.”',synonyms:['transgender identity (current usage)']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['transport-2','transportation-2','transpose-2','transpositive-2','transsexualism','transsumptively','transtiberine','transudently','transuder','transvenate']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
