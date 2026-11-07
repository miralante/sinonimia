(()=>{const u={
  magnetofon:{definition:'Coloquial: magnetófono, aparato que graba y reproduce sonido en cinta magnética.',synonyms:['magnetófono','grabadora de cinta']},
  magnetohidrodinamica:{definition:'Parte de la física que estudia cómo se mueven los líquidos y gases que conducen electricidad dentro de campos magnéticos.',synonyms:['magnetohidrodinámica','MHD']},
  magnetomotriz:{definition:'Se dice de la fuerza que crea un campo magnético mediante una corriente eléctrica.',synonyms:['fuerza magnetomotriz','fmm'],translation:{en:'round2472-magnetomotive'}},
  magnetopausa:{definition:'Borde de la región magnética de un planeta. Allí llegan partículas que vienen del Sol.',synonyms:['frontera de la magnetosfera','límite magnetosférico'],translation:{en:'round2472-magnetopause'}},
  magnetorresistencia:{definition:'Cambio en la dificultad que ofrece un material al paso de la corriente eléctrica cuando hay un campo magnético.',synonyms:['efecto magnetorresistivo','variación magnetorresistiva'],translation:{en:'round2472-magnetoresistance'}},
  magnetosfera:{definition:'Región alrededor de un planeta donde su campo magnético controla las partículas con carga eléctrica.',synonyms:['envoltura magnética','región magnetosférica'],translation:{en:'round2472-magnetosphere'}},
  magnetostatica:{definition:'Parte de la física que estudia los campos magnéticos que no cambian con el tiempo.',synonyms:['magnetostática','estudio de campos magnéticos estáticos']},
  magnetoscopio:{definition:'Aparato que graba y reproduce imágenes y sonido en cinta magnética; en física, instrumento que detecta la presencia de campos magnéticos.',synonyms:['videograbadora','VTR','detector de campo magnético (sentido físico)']},
  magnesico:{definition:'Químico: perteneciente o relativo al magnesio; dicho de un compuesto, que contiene magnesio.',synonyms:['de magnesio','relativo al magnesio']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r)Object.assign(r,p);}})();

;(() => {
  const row = DICCIONARIOS.es.find(entry => entry.id === "magnoliaceo");
  if (!row) throw new Error("Missing magnoliaceo");
  row.definition = "Que pertenece a la familia de plantas que incluye las magnolias.";
  row.translation = { en: "round2473-magnoliaceous" };
})();
