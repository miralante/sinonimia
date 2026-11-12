/* Literal example fixes for Spanish entries flagged by check.js. */
(() => {
  const changes = {
    araceo: { example: { word: "arácea" } },
    archivologo: { example: { word: "archivóloga" } },
    aroideo: { example: { word: "aroidea" }, exampleSynonym: { word: "arácea" } },
    arrimadizo: { exampleSynonym: { text: "Instalaron un banco que se puede arrimar a la pared en el corredor." } },
    arrobeno: { exampleSynonym: { text: "El antiguo recipiente que puede contener una arroba se usaba para medir productos." } },
    arrocado: { example: { word: "arrocada" } },
    arrosquetado: { example: { word: "arrosquetada" }, exampleSynonym: { word: "de color canela", text: "El sol le dejó la piel de color canela después de la caminata." } },
    arundineo: { example: { word: "arundínea" }, exampleSynonym: { word: "propia de las cañas" } },
    asacristanado: { exampleSynonym: { text: "Su aspecto era semejante a un sacristán y contrastaba con la ropa informal de los demás." } },
    asbestino: { exampleSynonym: { text: "El informe describía el material relativo al asbesto encontrado en el edificio." } },
    asenoritado: { example: { word: "aseñoritada" }, exampleSynonym: { word: "imitaba los modales del señorito", text: "Su actitud imitaba los modales del señorito y contrastaba con su origen humilde." } },
    asiriologo: { example: { word: "asirióloga" } },
    asismico: { example: { word: "asísmica" } },
    asuardado: { example: { word: "asuardada" }, exampleSynonym: { word: "juardosa" } },
    asuntivo: { example: { word: "asuntiva" }, exampleSynonym: { word: "relativa a la asunción" } },
    atabardillado: { example: { word: "atabardilladas" }, exampleSynonym: { word: "semejantes al tabardillo", text: "El tratado antiguo describe unas tercianas semejantes al tabardillo." } },
    atafetanado: { example: { word: "atafetanada" }, exampleSynonym: { word: "parecida al tafetán", text: "El estandarte tenía una tela parecida al tafetán y era ligera." } },
    atajador: { exampleSynonym: { text: "El guía chileno, que ataja con la recua, conocía bien el sendero." } },
    ataudado: { exampleSynonym: { text: "La caja de madera, con forma de ataúd, era antigua." } },
    atenorado: { example: { word: "atenorada" }, exampleSynonym: { word: "semejante a la del tenor" } },
    aterosclerotico: { exampleSynonym: { word: "relativos a la aterosclerosis", text: "El estudio analizó los cambios relativos a la aterosclerosis en las arterias." } },
    atochero: { exampleSynonym: { text: "El vendedor o porteador de atocha llevaba la carga hasta los lugares donde se usaba." } },
    atoleria: { exampleSynonym: { text: "Compraron atole caliente en un puesto de atole del mercado." } },
    atopico: { example: { word: "atópica" }, exampleSynonym: { word: "relativa a la atopia", text: "El dermatólogo diagnosticó una dermatitis relativa a la atopia." } },
    atraidorado: { example: { word: "atraidorada" }, exampleSynonym: { word: "traicionera" } },
    dioscoreaceo: { exampleSynonym: { word: "relativa a las Dioscoreáceas", text: "El ñame procede de una planta relativa a las Dioscoreáceas." } },
    dipetalo: { example: { word: "dipétala" } },
    dipsaceo: { example: { word: "dipsácea" }, exampleSynonym: { word: "dipsacácea" } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.es || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5231 expected one es/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5231 missing ${field} on es/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
