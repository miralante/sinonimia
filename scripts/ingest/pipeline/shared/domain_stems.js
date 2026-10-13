'use strict';
/*
 * scripts/ingest/pipeline/shared/domain_stems.js
 *
 * Domain-indicative word stems per Sinonimia category (AIVD), one set
 * per language. Hand-picked from bureaucratic/medical/legal/financial/
 * tech vocabulary families, biased toward precision (specific roots)
 * over recall. Shared by general_pool_domain_stems.js (stem-matches
 * candidates_<lang>.txt, the output of es-candidates.js/en-candidates-kaikki-cefrlex.js)
 * and cefrlex_candidates.js (stem-matches CEFRLex B1-C1 words) — both
 * used to carry their own copy of this exact data ("kept in sync by hand"
 * per a since-removed comment); extracted here so there is one copy to
 * update, not two to remember to update together.
 */

const STEMS_ES = {
  salud: ['patolog', 'sindrom', 'diagnos', 'terapeut', 'quirurg', 'clinic', 'farmac', 'cronic', 'cardiolog', 'oncolog', 'neurolog', 'psiquiatr', 'anestesi', 'protesis', 'biopsi', 'vacun', 'infeccios', 'rehabilit', 'fisioterap', 'pediatr', 'geriatr', 'ginecolog', 'urolog', 'dermatolog', 'reumatolog', 'hematolog', 'endocrin', 'metabol', 'antibiotic', 'sintoma', 'recidiv', 'remision', 'ambulator'],
  legal: ['juridic', 'jurisdicc', 'litigi', 'demand', 'denunci', 'sentenci', 'recurs', 'apelac', 'notari', 'testamen', 'herenci', 'fideicomis', 'usufruct', 'tutela', 'custodi', 'embarg', 'ejecuci', 'prescripc', 'caduc', 'notific', 'emplaz', 'comparec', 'peritaj', 'testimoni', 'alegat', 'arbitraj', 'mediaci', 'conciliaci', 'indult'],
  finanzas: ['hipotec', 'credit', 'deudor', 'acreedor', 'moros', 'embarg', 'amortiz', 'avales', 'fianz', 'impuest', 'tribut', 'fiscal', 'irpf', 'recaud', 'patrimoni', 'plusvali', 'dividend', 'accionista', 'inversion', 'ahorr', 'presupuest', 'solvenci', 'insolvenc', 'bancarrot', 'concurs'],
  vivienda: ['arrend', 'alquiler', 'inquilin', 'desahuci', 'empadron', 'catastr', 'comunidad-vecin', 'suministr', 'copropied', 'servidumbr', 'urbaniz', 'condomini', 'hipotecari', 'tasacion'],
  trabajo: ['nomina', 'contrat-laboral', 'despid', 'indemniz', 'conveni-colectiv', 'sindic', 'cotizac', 'seguridad-social', 'baja-laboral', 'excedenci', 'jornada-laboral', 'autonom', 'finiquit', 'desemple'],
  tecnologia: ['contrasen', 'servidor', 'navegador', 'descarg', 'actualiz', 'aplicac', 'dispositiv', 'conectiv', 'usuari', 'antivirus', 'ciberseg', 'phishing', 'malware'],
  seguridad: ['evacua', 'emergenci', 'riesg', 'primeros-auxili', 'alarma', 'incendi', 'simulacr', 'proteccion-civil', 'maltrat', 'violenci-domestic'],
  educacion: ['matricul', 'beca', 'asignatur', 'titulac', 'universitari', 'expedient-academic', 'curricul', 'tutori-academic', 'convalidac', 'homolog'],
  tramites: ['resoluc', 'expedient', 'solicitud', 'instanci', 'certificad', 'notific', 'padron', 'registr', 'tramit', 'burocrat', 'organismo-public', 'administrac-public'],
};

const STEMS_EN = {
  salud: ['patholog', 'syndrome', 'diagnos', 'therapeu', 'surgic', 'clinic', 'pharmac', 'chronic', 'cardiolog', 'oncolog', 'neurolog', 'psychiatr', 'anesthe', 'prosthe', 'biopsy', 'vaccin', 'infectious', 'rehabilitat', 'physiotherap', 'pediatr', 'geriatr', 'gynecolog', 'urolog', 'dermatolog', 'rheumatolog', 'hematolog', 'endocrin', 'metabol', 'antibiot', 'symptom', 'relapse', 'remission', 'ambulatory'],
  legal: ['jurisdic', 'litigat', 'lawsuit', 'plaintiff', 'defendant', 'verdict', 'appeal', 'notar', 'testament', 'inherit', 'custody', 'garnish', 'foreclos', 'prescript', 'subpoena', 'affidavit', 'testimon', 'arbitrat', 'mediation', 'indict', 'probate', 'deposition'],
  finanzas: ['mortgag', 'credit', 'debtor', 'creditor', 'delinquen', 'foreclos', 'amortiz', 'collateral', 'surety', 'levy', 'revenue', 'dividend', 'shareholder', 'investment', 'savings', 'budget', 'solvenc', 'insolven', 'bankrupt'],
  vivienda: ['tenanc', 'lease', 'tenant', 'eviction', 'zoning', 'cadastr', 'condomini', 'utilit', 'easement', 'landlord', 'appraisal', 'homeowner'],
  trabajo: ['payroll', 'severance', 'collective-bargain', 'union', 'contribution', 'sick-leave', 'sabbatical', 'shift-work', 'self-employ', 'unemployment-benefit'],
  tecnologia: ['password', 'router', 'browser', 'download', 'update', 'applicat', 'device', 'connectiv', 'malware', 'phishing', 'antivirus', 'cybersecur'],
  seguridad: ['evacuat', 'emergenc', 'prevention', 'first-aid', 'alarm', 'fire-safety', 'drill', 'domestic-violence', 'abuse-report'],
  educacion: ['enroll', 'scholarship', 'curricul', 'degree-', 'transcript', 'tuition', 'accreditat'],
  tramites: ['resolution', 'application', 'affidavit', 'certificat', 'notif', 'registr', 'bureaucra', 'public-agency', 'permit'],
};

function matchStems(word, stemMap) {
  const hits = [];
  for (const [cat, stems] of Object.entries(stemMap)) {
    for (const stem of stems) {
      if (word.includes(stem.replace(/-/g, ''))) { hits.push(cat); break; }
    }
  }
  return hits;
}

module.exports = { STEMS_ES, STEMS_EN, matchStems };
