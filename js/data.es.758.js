(()=>{const u={
  narizona:{definition:'Femenino de «narizón»: que tiene la nariz grande o prominente.',synonyms:['narigona','nariguda']},
  nasalizar:{definition:'Pronunciar un sonido del habla dejando salir el aire por la nariz, cuando normalmente saldría solo por la boca.',synonyms:['nasalizar un sonido','dar nasalidad']},
  nateron:{definition:'Requesón o cuajada obtenida de los residuos que quedan al hacer queso.',synonyms:['requesón','cuajada']},
  natral:{definition:'En Chile, terreno poblado de natris.',synonyms:['matorral de natri']},
  natri:{definition:'En Chile, arbusto conocido también como natre.',synonyms:['natre']},
  naturalizar:{definition:'Adaptar algo para que parezca propio de un lugar o se incorpore a él; dicho de una persona, adquirir la nacionalidad de un país distinto del de nacimiento.',synonyms:['adaptar','aclimatar','nacionalizarse']},
  naucher:{definition:'Persona que dirige la navegación de una embarcación; piloto o patrón de nave.',synonyms:['piloto de barco','patrón de nave']},
  naumaquia:{definition:'Combate naval que, como espectáculo, se representaba entre los antiguos romanos en un estanque o lago.',synonyms:['combate naval escenificado','espectáculo naval romano']},
  navaja:{definition:'Cuchillo cuya hoja puede plegarse dentro del mango; también, molusco bivalvo marino de concha larga y estrecha.',synonyms:['cuchillo plegable','molusco bivalvo']},
  navacero:{definition:'Persona que forma y cultiva navazos, huertos situados en terrenos arenosos próximos al mar.',synonyms:['cultivador de navazos','hortelano']},
  navajeo:{definition:'Acción y efecto de navajear; golpe o serie de golpes dados con una navaja, también en sentido figurado.',synonyms:['navajazo','navajada','ataque con navaja']},
  navarca:{definition:'En la antigua Grecia, jefe o comandante de una armada; en la antigua Roma, comandante de un buque.',synonyms:['comandante naval','almirante antiguo']},
  navazo:{definition:'Huerto arenoso de las costas gaditanas, donde se cultivan hortalizas aprovechando la humedad del subsuelo.',synonyms:['huerto arenoso','huerto litoral']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}const ids=new Set(['navajo','navarrisco']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
