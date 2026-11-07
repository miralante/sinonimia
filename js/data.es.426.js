(()=>{const ids=new Set(['esquil']);DICCIONARIOS.es=DICCIONARIOS.es.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 
 
 esquifazon:{definition:'Náutica, antiguo. Conjunto de remos y remeros con que se equipa una embarcación.',synonyms:['dotación de remos','conjunto de remeros','esquifazón']},
 esquijama:{definition:'Pijama cerrado y ceñido al cuerpo, generalmente de punto y usado en invierno; acrónimo de esquí y pijama.',synonyms:['pijama ceñido','pijama de invierno','skijama']},
 esquilada:{synonyms:['cencerrada','burla con cencerros','toque de esquilas']},
 esquilador:{definition:'Persona, generalmente un hombre, que corta el pelo o la lana de animales.',synonyms:['esquiladora','trasquilador','esquilador de ovejas']},
 esquiladora:{definition:'Mujer que esquila animales; también, máquina usada para cortar lana o pelo.',synonyms:['esquilador','máquina de esquilar','cortadora de lana']},
 esquilar:{definition:'Cortar el pelo o la lana de un animal, especialmente de una oveja.',synonyms:['trasquilar','recortar el vellón','esquilar']},
 esquileo:{synonyms:['esquila','corte de lana','trasquila']},
 esquilero:{definition:'Red en forma de saco, a menudo con un aro, usada para pescar camarones o esquilas.',synonyms:['camaronera','red de camarones','esguilero']},
 esquilimoso:{definition:'Afectado o excesivamente delicado.',synonyms:['remilgado','quisquilloso','afectado']},
 esquilon:{definition:'Esquila o campana grande.',synonyms:['campana grande','esquila grande']},
 esquimo:{definition:'Conjunto o total de los productos obtenidos de una explotación agrícola o ganadera.',synonyms:['producción de la hacienda','rendimiento agropecuario','esquilmo']},
 esquinado:{definition:'Que tiene esquina o ángulo; también, que está dispuesto formando una esquina.',synonyms:['angular','con esquina','esquinero']},
 esquinadura:{definition:'Cualidad o condición de algo que tiene esquinas.',synonyms:['carácter angular','presencia de esquinas']},
 esquinal:{definition:'Regional o técnico. Piedra, pieza o saliente dispuesto en una esquina; también, esquina irregular, según el uso local.',synonyms:['pieza de esquina','esquinero','saliente angular']},
 esquinar:{synonyms:['formar una esquina','hacer esquina','angular']},
 esquinazo:{definition:'Esquina o ángulo saliente de una construcción; en la locución “dar esquinazo”, evitar a alguien o dejarlo esperando.',synonyms:['esquina','ángulo saliente','dejar plantado (en la locución)']},
 esquinco:{definition:'Nombre de ciertos lagartos escamosos de cuerpo alargado y patas pequeñas o reducidas, pertenecientes a la familia Scincidae.',synonyms:['eslizón','lagarto escíncido','skink']}
};for(const [id,p] of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(r){Object.assign(r,p);if(r)if(r)delete r.translation;}}})();
