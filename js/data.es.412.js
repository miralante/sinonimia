(()=>{const ids=new Set(['esmeraldeno']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 esmena:{definition:'Antiguo. Rebaja o disminución de una cantidad o de algo debido.',synonyms:['rebaja','disminución','descuento']},
 esmerejon:{definition:'Ave rapaz diurna pequeña de la familia de los halcones (Falco columbarius), de alas puntiagudas y vuelo rápido.',synonyms:['halcón merlín','merlín'],example:{word:'esmerejón',text:'El esmerejón cazaba aves pequeñas durante su vuelo migratorio.'},exampleSynonym:{word:'halcón merlín',text:'El halcón merlín cazaba aves pequeñas durante su vuelo migratorio.'}},
 esmerar:{definition:'Pulir o limpiar algo; también, poner gran cuidado y atención al hacer algo.',synonyms:['pulir','limpiar','esforzarse','esmerarse']},
 esmorecer:{definition:'Perder las fuerzas o el aliento por cansancio extremo, agotamiento o desmayo.',synonyms:['desfallecer','debilitarse','desmayarse']},
 esnob:{definition:'Dicho de una persona: que imita con afectación las maneras, gustos o ideas que considera propios de una clase social elevada o distinguidos.',synonyms:['presumido','afectado','snob']},
 esmedregal:{synonyms:['cobia','pejepalo','bonito negro'],example:{word:'esmedregal',text:'El esmedregal es un pez marino del golfo de México.'},exampleSynonym:{word:'cobia',text:'La cobia es un pez marino del golfo de México.'}}
};for(const [id,p] of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(!r)throw Error('Missing es/'+id);Object.assign(r,p);delete r.translation;}})();
