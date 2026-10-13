(()=>{const u={
 espabiladeras:{definition:'Tijeras o utensilios para cortar el pabilo o la mecha de una vela, un candil u otra luz artificial y avivar así la llama.',synonyms:['despabiladeras','despavesaderas','tenacillas para mechas']},
 esoterico:{synonyms:['oculto','reservado','misterioso','hermético']},
 espachurrar:{synonyms:['despachurrar','aplastar','estrujar']},
 espaciador:{definition:'Que sirve para mantener o establecer un espacio entre dos cosas; también, pieza que las mantiene separadas.',synonyms:['separador','distanciador','pieza de separación']},
 espaciosamente:{definition:'Con holgura o amplitud; también, con lentitud y sin prisa.',synonyms:['holgadamente','ampliamente','lentamente']},
 espaciosidad:{synonyms:['amplitud','anchura','holgura']},
 espacioso:{definition:'Amplio y con mucho espacio disponible.',synonyms:['amplio','holgado','desahogado']},
 esoterismo:{synonyms:['doctrina esotérica','conocimiento oculto','carácter esotérico']},
 esopico:{synonyms:['relativo a Esopo','fabulístico','de estilo fabulístico']},
 esotro:{definition:'Antiguo. Ese otro; se usaba para señalar o referirse a otra persona o cosa.',synonyms:['ese otro','aquel otro']},
 espadador:{definition:'Persona que espadaba lino o cáñamo, es decir, que quebrantaba sus tallos para separar la fibra; también puede designar el instrumento empleado en esa labor.',synonyms:['trabajador del lino','trabajador del cáñamo','operario de espadar']},
 espadachin:{synonyms:['espadista','diestro con la espada','esgrimidor']},
 espadillazo:{definition:'Golpe dado con una espadilla.',synonyms:['golpe de espadilla','espadillada']}
};for(const [id,p] of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(!r)throw Error('Missing es/'+id);Object.assign(r,p);delete r.translation;}})();
