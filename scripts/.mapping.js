// Cross-language `traduccion` map.
//
// Format per ES entry:
//   "<es.id>": "<en.id>"                   // single equivalent
//   "<es.id>": ["<en.id>", "<en.id>", ...] // multiple equivalents
//
// `app.js` shows one link per equivalent (rendered in declaration order).
// When the EN equivalent is a real homograph (e.g. "Pension"), the
// multiple EN ids let the user pick the one that matches their meaning.
//
// Entries that already resolve to a single other-language entry by the
// shared-ARASAAC-pictogram rule are NOT listed here — they keep working
// without needing an explicit translation. Only entries whose pictogram
// isn't unique in one of the languages (so the pictogram-only rule can't
// pick a match) are listed.
//
// Conflicts: an EN id may be referenced by several ES ids when several
// Spanish concepts genuinely collapse into one English word (e.g. ES
// "despido" and ES "indemnización" both map to EN "severance pay"). In
// the reverse direction (one ES to several EN), see the homograph cases
// like "Pensión" above.
//
// Adding a new language: add a new column to each row (e.g. a "fr" key
// next to "en"). The shape per ES id is the same.
const TRADUCCIONES = {
  // ----- Tramites -----
  requerimiento: "notice",
  incurso: "fine",
  interponer: "police-report",
  comparecer: "court-appearance",
  notificacion: "notice",
  resolucion: "appeal-higher",
  instancia: "apply-for",
  compulsar: "certified-copy",
  apostilla: "apostille",
  fehaciente: "sign-name",
  usufructo: "usufruct",
  litigio: "lawsuit",

  // ----- Salud -----
  // The entries below share their id with the EN entry, AND their
  // pictogram isn't unique on one of the sides (so the shared-pictogram
  // auto-link wouldn't pick them). Explicit `traduccion` is required.
  edema: "edema",
  dermatitis: "dermatitis",
  anemia: "anemia",
  transfusion: "transfusion",
  cianosis: "cyanosis",
  eritema: "erythema",
  // luxacion: no equivalent EN ("dislocation" not in dictionary). Left
  // without a link intentionally — a future EN entry can add the link.
  asintomatico: "asthenia",
  cronico: "chronic",
  antibiotico: "antibiotic",
  antiinflamatorio: "anti-inflammatory",
  escayola: "cast",
  "cefalea-tensional": "tension-headache",
  gripe: "flu",
  "gripe-a": "flu-a",
  cabeza: "head",
  ojo: "eye",
  alergia: "allergy",
  glaucoma: "glaucoma-en",
  esguince: "sprain",
  colesterol: "cholesterol-en",
  "enfermedad-cronica": "chronic-illness",

  // ----- Finanzas -----
  embargo: "garnishment",
  aval: "guarantor",
  interes: "interest",
  domiciliar: "direct-debit",
  saldo: "balance",
  plazo: "deadline",
  amortizacion: ["loan-money", "severance-pay"],
  "descubierto-bancario": "overdraft",
  impago: "unpaid",
  hipoteca: "mortgage",
  fianza: "deposit",
  ibi: "property-tax",
  nomina: "payslip",
  contrato: "contract",
  indemnizacion: "severance-pay",
  jornada: "working-hours",
  despido: "redundancy",
  curriculum: "resume",
  reclamacion: "complaint",
  caducidad: "overdue",
  turno: "queue",
  "franja-horaria": "time-window",
  justificante: "payment-receipt",
  incidencia: "complaint",
  "pension-economica": ["pension-payment", "retirement-work"],
  "pension-alojamiento": "pension-guesthouse",
  "pension-alimenticia": "alimony",

  // ----- Vivienda -----
  suministro: "utilities",
  alquiler: "lease",
  arrendador: "landlord",
  inquilino: "tenant",
  "nota-simple": "land-registry-note",
  tasacion: "appraisal",
  "vicios-ocultos": "latent-defects",
  "gastos-comunidad": "hoa-fees",
  "comunidad-propietarios": "homeowners-association",
  // comunidad-vecinos: collapsed into "homeowners-association" (the same
  // concept from the renter's perspective). Both ES entries can share it.
  "comunidad-vecinos": "homeowners-association",
  itp: "transfer-tax",
  "cedula-habitabilidad": "deed",
  "contrato-alquiler": "rental-contract",
  "recibo-alquiler": "rent-receipt",
  piso: "flat",
  casa: "house",
  "factura-luz": "electricity-bill",
  seguro: "insurance",
  "tarjeta-credito": "credit-card",
  deuda: "debt",
  ahorro: "savings",
  inversion: "investment",
  iban: "iban-en",
  "banca-online": "online-banking",
  fraude: "fraud",
  estafa: "scam",

  // ----- Vida diaria -----
  dni: "id-card",
  cola: "queue",
  recibo: "payment-receipt",
  garantia: "warranty-cover",
  vale: "voucher-ticket",
  tarjeta: "bank-card",
  recado: "errand",
  venta: "sale-deal",

  // ----- Trabajo / Tramites (shared pictogram clusters) -----
  prestamo: "loan-money",
  credito: "credit-money",
  transferencia: "money-transfer",
  banco: "bank-place",
  sucursal: "bank-branch",
  "cuenta-corriente": "current-account",
  "cuenta-ahorros": "savings-account",
  "tarjeta-debito": "debit-card",
  ingreso: "income-money",
  solicitar: "apply-for",
  solicitud: "application-form",
  oficina: "office-building",
  ventanilla: "counter-window",
  sello: "stamp-paper",
  sellar: "stamp-document",
  "acuse-recibo": "proof-of-receipt",
  volante: "slip-paper",
  "certificado-empadronamiento": "proof-of-address",
  formulario: "form-blank",
  firmar: "sign-name",
  expediente: "case-file",
  archivo: "archive-store",
  documento: "document-paper",
  sueldo: "wage-pay",
  salario: "salary-pay",
  empresa: "company-business",
  "horario-laboral": "work-schedule",
  "horas-extra": "overtime-hours",
  prestacion: "state-benefit",
  jubilacion: "retirement-work",
  "carta-presentacion": "cover-letter",
  plantilla: "staff-workers",
  "seguridad-social": "national-insurance",
  "reclamacion-laboral": "grievance",
  sindicato: "union",
  "salario-minimo": "wage-pay",
  ascenso: "promotion",
  reunion: "meeting",
  aumento: "raise",
  preaviso: "notice-period",
  convenio: "collective-agreement",
  registro: "registry",
  tasa: "fee",
  modelo: "official-form",
  certificado: "certificate",
  digitalizar: "digitise",
  telematico: "online-procedure",
  "firma-digital": "digital-signature",
  "plazo-admin": "admin-deadline",
  declaracion: "declaration",
  impuesto: "tax",
  cif: "tax-id",
  // cl@ve and nif share their id with the EN entry, AND their
  // pictogram isn't unique on one of the sides (so the shared-pictogram
  // auto-link wouldn't pick them). Explicit `traduccion` is required.
  "cl@ve": "cl@ve",
  nif: "nif",
  "dni-electronico": "electronic-id",
  justificar: "justify",
  "recurso-alzada": "appeal-higher",
  "copia-compulsada": "certified-companion",
  "entrevista-trabajo": "job-interview",
  "contrato-indefinido": "permanent-contract",
  "jornada-parcial": "part-time",
  "paga-extra": "extra-pay",
  "fin-contrato": "end-of-contract",
  "periodo-prueba": "probation-period",
  "jubilacion-anticipada": "early-retirement",
  "renovar-contrato": "renew-contract",
  "despido-improcedente": "unfair-dismissal",
  "despido-procedente": "fair-dismissal",
  excedencia: "leave-of-absence",
  "cambio-turno": "shift-change",

  // ----- Conceptos solo en ES (sin equivalente EN en este momento) -----
  // formacion (training), turno-noche (night-shift) y
  // contrato-formacion tienen equivalente razonable en EN; los añadimos:
  formacion: "training",
  "turno-noche": "night-shift",
  // contrato-formacion no tiene equivalente claro (ES-specific contract
  // type) — queda sin enlace hasta que se cree una entrada EN.

  // ----- Tramites additions (LP19 / other entries with clear EN equivalents) -----
  tramite: "procedure",
  procedimiento: "procedure", // same EN — array would be more correct but
                              // the schema accepts duplicate targets across
                              // entries, so two ES->one EN is fine.
  "plazo-caducidad": "overdue",
  "sello-oficial": "stamp-document",
  "pago-tasa": "fee",
  "cola-digital": "queue",
  sancion: "sanction",
  recurrir: "appeal",
  personarse: "appear",

  // ----- Legal -----
  consentimiento: "consent",
  "poder-notarial": "power-of-attorney",
  "responsabilidad-civil": "civil-liability",
  "responsabilidad-penal": "criminal-liability",
  apelacion: "appeal",
  denuncia: "police-report",
  "fianza-juridica": "bail",
  multa: "fine",
  juicio: "trial",
  recurso: "legal-remedy",
  acusado: "defendant",
  testigo: "witness",
  pena: "punishment",
  carcel: "jail-en",
  deudor: "debtor",
  acreedor: "creditor",
  sospechoso: "suspect",
  antecedentes: "criminal-record",
  "derecho-defensa": "right-to-defence",
  juez: "judge",
  notario: "notary",
  acta: "minutes",
  "auto-judicial": "court-order",
  prueba: "evidence",
  testimonio: "testimony",
  "declaracion-jurada": "sworn-statement",
  conciliacion: "conciliation",
  apoderado: "representative",
  tribunal: "court",
  suelo: "floor",
  cobrar: "collect",
  clausula: "clause",
  moroso: "defaulter",
  avalista: "guarantor",
  retirar: "withdraw",
  "tarjeta-coordenadas": "coord-card",
  beneficiario: "beneficiary",
  "seguro-coche": "car-insurance",
  declarar: "file-taxes",
  recaudar: "collect-taxes",
  // ----- Legal homographs (extra entries that share their pictogram
  // with another legal concept, so the auto-link can't pick them) -----
  veredicto: "verdict",
  querella: ["police-report", "appeal"], // best 1-to-N in EN
  "demanda-judicial": "lawsuit",
  prescripcion: "overdue",
  "codigo-penal": "criminal-liability",
  "demanda-archivada": "archive-store",
  demandante: "plaintiff",
  "codigo-sms": "sms-code",

  // ----- Tutela / menores -----
  tutela: "guardianship",
  curatela: "conservatorship",
  custodia: "custody",

  // ----- Tecnología y vida digital (entradas nuevas) -----
  // `contrasena` (27691) y `correo-electronico` (5432) comparten pictograma
  // con otras entradas sin relación, así que el fallback por pictograma
  // no las enlazaría con su equivalente en inglés sin un `traduccion`
  // explícito. `sede-electronica` y `certificado-digital` ya existían en
  // el diccionario con mejores definiciones y ya tenían su mapping.
  contrasena: "password",
  "correo-electronico": "email",
  // `wifi` y `nube` tienen pictogramas únicos por ahora, pero declaramos
  // el mapping explícito para que no dependa de un fallback frágil si en
  // el futuro se reusan los pictogramas con otras entradas.
  wifi: "wifi",
  nube: "cloud",
};

if (typeof module !== "undefined") module.exports = TRADUCCIONES;