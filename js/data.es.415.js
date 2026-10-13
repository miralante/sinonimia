(()=>{const ids=new Set(['esparciata','esparajismo']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 espanolismo:{definition:'Palabra, expresión o rasgo propio del español hablado en España; también, apego o defensa de lo español.',synonyms:['giro peninsular','uso propio del español de España','españolismo (sentimiento)']},
 espanolizar:{definition:'Adoptar o hacer que se adopten la lengua, las costumbres o los rasgos culturales de España.',synonyms:['castellanizar (según el contexto)','adoptar costumbres españolas']},
 espantacaiman:{synonyms:['aguaitacaimán','vigilante de caimanes (regional)']},
 espantadizo:{definition:'Que se asusta o espanta con facilidad.',synonyms:['asustadizo','temeroso','medroso']},
 espantador:{definition:'Que espanta o ahuyenta; dicho de una cosa, que causa rechazo o repulsión.',synonyms:['ahuyentador','repelente','atemorizador']},
 espantajo:{definition:'Objeto o figura colocada en un lugar para asustar o ahuyentar, especialmente a los pájaros; también, persona ridícula o despreciable.',synonyms:['espantapájaros','figura para ahuyentar','persona ridícula']},
 espantagustos:{synonyms:['aguafiestas','persona que amarga la diversión','desabrido']},
 espantamoscas:{synonyms:['matamoscas','ahuyentamoscas','espantador de moscas']},
 espantanublados:{definition:'Nube que presenta claros por los que aparece el sol.',synonyms:['nublado con claros','cielo parcialmente nublado']},
 espantavillanos:{definition:'Adorno o alhaja muy vistosa y llamativa, pero de escaso valor.',synonyms:['baratija vistosa','adorno llamativo','atarantapayos']},
 esparadrapo:{synonyms:['cinta adhesiva médica','tela emplástica','esparadrapo adhesivo']},
 esparavel:{synonyms:['atarraya','red de lanzar','red de pesca circular']},
 esparceta:{synonyms:['pipirigallo','soja silvestre (Onobrychis, según la especie)']},
 esparcir:{synonyms:['dispersar','extender','difundir','diseminar']},
 esparragador:{synonyms:['cultivador de espárragos','espárraguero']},
 esparragal:{synonyms:['campo de espárragos','esparragar']},
 esparragar:{synonyms:['cultivar espárragos','recolectar espárragos']},
 esparragon:{definition:'Tejido de seda con un cordoncillo más grueso y fuerte que el de la tercianela.',synonyms:['tejido de seda acanalado','tejido con cordoncillo']}
};for(const [id,p] of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(!r)throw Error('Missing es/'+id);Object.assign(r,p);delete r.translation;}})();
