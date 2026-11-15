/* Repair literal variants for checker-confirmed examples using their inflected form or a clearer sentence. */
(() => {
  const fixes = [
    ["es", "embargado", "exampleSynonym", "dominado por una emoción", "Dominado por la tristeza, el propietario recibió la notificación.", "dominado por una emoción", "Dominado por una emoción, el propietario recibió la notificación."],
    ["es", "algodonero", "example", "algodonero", "La cooperativa algodonera reunió a los productores de la región.", "algodonero", "El algodonero reunió a los productores de la región."],
    ["es", "algodonero", "exampleSynonym", "relativo al algodón", "La cooperativa, relacionada con el cultivo de algodón, reunió a los productores.", "cultivador de algodón", "El cultivador de algodón reunió a los productores de la región."],
    ["es", "arrogador", "exampleSynonym", "que se atribuye", "Quien se atribuye facultades ajenas fue reprendido por el comité.", "que se atribuye", "El miembro que se atribuye facultades ajenas fue reprendido por el comité."],
    ["es", "asentar", "exampleSynonym", "registrar", "El secretario registró el acuerdo en el acta y luego ayudó a asentar la mesa sobre el suelo irregular.", "registró", "El secretario registró el acuerdo en el acta."],
    ["es", "asobarcar", "exampleSynonym", "llevar bajo el brazo", "En el relato, el muchacho tuvo que llevar el paquete bajo el brazo para abrir la puerta.", "llevar bajo el brazo", "En el relato, el muchacho tuvo que llevar bajo el brazo el paquete para abrir la puerta."],
    ["es", "atapuzar", "example", "atapuzar", "El vendedor atapuzó la caja con frutas y ya no pudo cerrarla.", "atapuzó", "El vendedor atapuzó la caja con frutas y ya no pudo cerrarla."],
    ["es", "atapuzar", "exampleSynonym", "atiborrar", "El vendedor atiborró la caja con frutas y ya no pudo cerrarla.", "atiborró", "El vendedor atiborró la caja con frutas y ya no pudo cerrarla."],
    ["es", "atraillar", "example", "atraillar", "El cazador atrailló a los perros antes de entrar en el monte.", "atrailló", "El cazador atrailló a los perros antes de entrar en el monte."],
    ["es", "atraillar", "exampleSynonym", "atar", "El cazador ató a los perros con la traílla antes de entrar en el monte.", "ató", "El cazador ató a los perros con la traílla antes de entrar en el monte."],
    ["es", "atrasar", "example", "atrasar", "La avería atrasó la salida del tren.", "atrasó", "La avería atrasó la salida del tren."],
    ["es", "atrasar", "exampleSynonym", "demorar", "La avería demoró la salida del tren.", "demoró", "La avería demoró la salida del tren."],
    ["es", "atrever", "example", "atrever", "Por fin se atrevió a pedir ayuda.", "atrevió", "Por fin se atrevió a pedir ayuda."],
    ["es", "atrever", "exampleSynonym", "osar", "Por fin osó pedir ayuda.", "osó", "Por fin osó pedir ayuda."],
    ["es", "atribular", "example", "atribular", "La incertidumbre atribulaba a la familia.", "atribulaba", "La incertidumbre atribulaba a la familia."],
    ["es", "atribular", "exampleSynonym", "afligir", "La incertidumbre afligía a la familia.", "afligía", "La incertidumbre afligía a la familia."],
    ["es", "atrochar", "exampleSynonym", "atajar", "Para evitar la carretera, tomaron un atajo por el monte.", "atajaron", "Para evitar la carretera, atajaron por el monte."],
    ["es", "atronar", "example", "atronar", "El estruendo de los truenos atronó toda la casa.", "atronó", "El estruendo de los truenos atronó toda la casa."],
    ["es", "atronar", "exampleSynonym", "ensordecer", "El estruendo de los truenos ensordeció a todos en la casa.", "ensordeció", "El estruendo de los truenos ensordeció a todos en la casa."],
    ["es", "aturdir", "example", "aturdir", "La noticia lo aturdió durante unos segundos.", "aturdió", "La noticia lo aturdió durante unos segundos."],
    ["es", "aturdir", "exampleSynonym", "desconcertar", "La noticia lo desconcertó durante unos segundos.", "desconcertó", "La noticia lo desconcertó durante unos segundos."],
    ["es", "aturullar", "example", "aturullar", "La interrupción lo aturulló y perdió el hilo de la explicación.", "aturulló", "La interrupción lo aturulló y perdió el hilo de la explicación."],
    ["es", "aturullar", "exampleSynonym", "desconcertar", "La interrupción lo desconcertó y perdió el hilo de la explicación.", "desconcertó", "La interrupción lo desconcertó y perdió el hilo de la explicación."],
    ["es", "atusar", "example", "atusar", "Se atusó el cabello con un peine húmedo antes de salir.", "atusó", "Se atusó el cabello con un peine húmedo antes de salir."],
    ["es", "atusar", "exampleSynonym", "peinar", "Se peinó el cabello con un peine húmedo antes de salir.", "peinó", "Se peinó el cabello con un peine húmedo antes de salir."],
  ];

  fixes.forEach(([language, id, field, oldWord, oldText, newWord, newText]) => {
    const entries = globalThis.DICCIONARIOS && globalThis.DICCIONARIOS[language];
    const matches = entries ? entries.filter((entry) => entry.id === id) : [];
    if (matches.length !== 1) throw new Error(`example rewrite: expected one ${language}/${id}, found ${matches.length}`);
    const value = matches[0][field];
    if (!value) throw new Error("example rewrite: missing field " + language + "/" + id + "/" + field);
    value.word = newWord;
    value.text = newText;
  });
})();

