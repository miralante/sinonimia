/* Literal example fixes for Spanish entries flagged by check.js. */
(() => {
  const changes = {
    "round2618-fajar-wrap": { example: { word: "fajó" }, exampleSynonym: { word: "ciñó" } },
    "round2618-fajear-wrap": { exampleSynonym: { word: "envolvieron la caja con una faja" } },
    "round2627-falsificar-information": { exampleSynonym: { text: "El informe acusó a la empresa de falsear datos." } },
    "round2664-fiar-credit": { exampleSynonym: { word: "vender el pan a crédito" } },
    "round2674-filial-child": { exampleSynonym: { word: "relativa a los hijos", text: "La escuela organizó una reunión relativa a los hijos de las familias." } },
    "round2676-filmography-study": { exampleSynonym: { text: "El artículo incluye un estudio cinematográfico sobre el cine mudo." } },
    "round2681-finiquitar-conclude": { example: { word: "finiquitó" }, exampleSynonym: { word: "concluyó" } },
    "round2687-fisura-tissue": { exampleSynonym: { text: "La prueba mostró una hendidura en un tejido óseo." } },
    "round2692-flatulento-padece": { exampleSynonym: { word: "tenía gases" } },
    "round2695-flemon-body": { exampleSynonym: { text: "La infección le causó una inflamación aguda del tejido de la mano." } },
    "round2695-fletador-cargo": { exampleSynonym: { text: "El encargado, responsable de entregar la carga, llegó al puerto." } },
    "round2695-fletamento-accion": { exampleSynonym: { text: "El alquiler de barco quedó confirmado por correo." } },
    "round2697-flexor-muscle": { exampleSynonym: { text: "Ese músculo que dobla una articulación se activa al flexionar el codo." } },
    "round2700-floripondio-ornament": { exampleSynonym: { text: "Llevaba un adorno recargado en el sombrero." } },
    "round2701-fluidez-speaking": { exampleSynonym: { text: "La niña demuestra soltura al hablar delante de la clase." } },
    "round2702-fluir-ideas": { example: { word: "fluyeron" }, exampleSynonym: { word: "desarrollaron con facilidad" } },
    "round2716-formular-mathematical": { exampleSynonym: { text: "El profesor pidió plantear una fórmula con una ecuación." } },
    "round2718-foro-land-contract": { exampleSynonym: { text: "El archivo conserva el contrato de cesión de aquellas tierras." } },
    "round2718-forrarse-rich": { example: { word: "forró" }, exampleSynonym: { word: "enriqueció" } },
    "round2718-forrarse-eat": { example: { word: "forraron" }, exampleSynonym: { word: "atiborraron" } },
    "round2719-fortalecer-moral": { example: { word: "fortaleció" }, exampleSynonym: { word: "dio confianza" } },
    "round2720-forzar-sexual-assault": { example: { word: "fuerza sexualmente" }, exampleSynonym: { word: "viola" } },
    "round2720-forzoso-circumstance": { exampleSynonym: { text: "El avión, obligado por las circunstancias, tuvo que aterrizar por una avería inesperada." } },
    "round2722-fosilizar-figurative": { example: { word: "fosilizó" }, exampleSynonym: { word: "anquilosó" } },
    "round2734-franquear-confide": { example: { word: "franqueó" }, exampleSynonym: { word: "le contó a su hermana lo que sentía" } },
    "round2735-franquicia-insurance": { exampleSynonym: { text: "El seguro fijaba la parte a cargo del cliente por esos daños." } },
    "round2737-frecuencia-wave": { exampleSynonym: { text: "El técnico midió los ciclos por segundo de la señal." } },
    "round2740-frenada-capacidad": { exampleSynonym: { text: "El coche tiene buena capacidad de frenado." } },
    "round2742-frescura-landscape": { exampleSynonym: { text: "El jardín es agradable y su verdor refresca el paisaje." } },
    "round2757-fulminar-kill-lightning": { example: { word: "fulminó" }, exampleSynonym: { word: "alcanzado por un rayo" } },
  };
  for (const [id, fields] of Object.entries(changes)) {
    const matches = (globalThis.DICCIONARIOS.es || []).filter((entry) => entry.id === id);
    if (matches.length !== 1) throw new Error(`v5240 expected one es/${id}, got ${matches.length}`);
    for (const [field, values] of Object.entries(fields)) {
      if (field === "synonyms" || field === "definition") matches[0][field] = values;
      else {
        if (!matches[0][field]) throw new Error(`v5240 missing ${field} on es/${id}`);
        Object.assign(matches[0][field], values);
      }
    }
  }
})();
