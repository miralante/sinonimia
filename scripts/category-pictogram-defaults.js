// Deliberate per-`situacion` fallback pictogram — see "Category fallback
// when no pictogram exists" in doc/en/technical.md (doc/es/tecnico.md).
// Used when a word has no non-schematic ARASAAC pictogram at all, confirmed
// against both buscar-pictograma.js's ARASAAC-direct path and OpenSymbols
// itself (not merely "the term I tried didn't match"). Assigning the
// category's honest generic icon here beats leaving the entry on whatever
// unrelated image the ingest pipeline happened to have on hand, which is
// how earlier batches ended up pointing at things like a cathedral or a
// Christmas log for finance/legal terms.
module.exports = {
  tramites: { id: 21802, alt: "Documento" },
  salud: { id: 2467, alt: "Médico, doctor" },
  "vida-diaria": { id: 8717, alt: "Vida" },
  finanzas: { id: 4630, alt: "Dinero" },
  vivienda: { id: 2317, alt: "Casa" },
  trabajo: { id: 11457, alt: "Mercado laboral, empleo" },
  legal: { id: 11291, alt: "Juez, magistrado" },
  tecnologia: { id: 11459, alt: "Tecnología" },
  seguridad: { id: 12260, alt: "Protección, seguridad" },
  educacion: { id: 8098, alt: "Educación, formación" },
};
