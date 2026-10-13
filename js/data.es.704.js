(()=>{const u={
  mistico:{definition:'Embarcación costera mediterránea de dos o tres palos, con velas latinas; también, relativo al misticismo o a una experiencia de unión con lo divino.',synonyms:['embarcación mediterránea','espiritual','contemplativo']},
  mistion:{definition:'Acción de mezclar o unir sustancias; mezcla.',synonyms:['mezcla','combinación']},
  mistol:{synonyms:['árbol frutal americano','Sarcomphalus mistol']},
  mistral:{definition:'Viento frío, seco y generalmente fuerte del noroeste que sopla en el valle del Ródano y regiones vecinas del sur de Francia.',synonyms:['viento del noroeste','viento mistral']},
  misturero:{definition:'Persona que mezcla o prepara misturas; voz rara y de uso regional.',synonyms:['mezclador','preparador de misturas']},
  misumalpa:{definition:'Familia de lenguas indígenas de Centroamérica que comprende, entre otras, el miskito, el sumo y el matagalpa.',synonyms:['familia lingüística misumalpa']},
  mita:{definition:'Sistema de trabajo por turnos y obligatorio empleado en el Imperio inca y adaptado después por la administración colonial española.',synonyms:['trabajo por turnos','servicio obligatorio']},
  mitan:{definition:'Holandilla: tela ligera de algodón, semejante a una holanda fina.',synonyms:['holandilla','tela ligera de algodón']},
  mitografia:{definition:'Estudio o exposición de los mitos; también, representación gráfica de un mito.',synonyms:['estudio de los mitos','exposición mitológica']},
  mitocondria:{synonyms:['orgánulo celular','orgánulo energético']},
  mitote:{definition:'En varios países de América, alboroto, fiesta ruidosa o pendencia; también, danza ritual de algunos pueblos indígenas de México.',synonyms:['alboroto','jaleo','danza ritual']},
  mitotero:{definition:'En México, persona aficionada al mitote, a las diversiones o a provocar alborotos y pendencias.',synonyms:['bullanguero','pendenciero','amigo de diversiones']},
  mitraismo:{definition:'Religión mistérica de origen iranio, centrada en el culto al dios Mitra y difundida en el Imperio romano.',synonyms:['culto a Mitra','religión mitraica']},
  mitrar:{definition:'Poner o conferir la mitra a un obispo; nombrar obispo.',synonyms:['consagrar obispo','conferir la mitra']},
  mitridatismo:{definition:'Inmunidad adquirida frente a un veneno mediante la administración progresiva de dosis pequeñas.',synonyms:['inmunidad a los venenos','tolerancia progresiva']},
  mitridato:{definition:'Antiguo antídoto compuesto de varios ingredientes, al que se atribuían propiedades contra venenos.',synonyms:['antídoto compuesto','triaca']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}const ids=new Set(['misturero','mitulo']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
