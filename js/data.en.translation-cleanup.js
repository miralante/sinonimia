/* Resolve stale cross-language links after the editorial sense splits. */
(() => {
  const fixes = [
    ["es", "encestador", "en", "scorer", "scorer-player-who-scores"],
    ["es", "encomiar", "en", "commend", "commend-praise"],
    ["es", "improbabilidad", "en", "improbability", "improbability-quality-unlikelihood"],
    ["es", "jugueteo", "en", "romp", "romp-noun-play"],
    ["es", "masoneria", "en", "freemasonry-2", "freemasonry-organization"],
    ["es", "metamorfico", "en", "metamorphic", "metamorphic-rock"],
    ["es", "monocromatico", "en", "monochrome", "monochrome-picture-one-color"],
    ["es", "nevazon", "en", "snowfall", "snowfall-one-fall-of-snow"],
    ["es", "salinidad", "en", "salinity", ["salinity-soil-and-substance-salt-content", "salinity-seawater-salt-level"]],
    ["es", "sanguina", "en", "sanguine", null],
    ["es", "soslayar", "en", "sidestep", null],
    ["es", "tartanero", "en", "tartan", null],
    ["es", "resbalon", "en", "slip-6", "slip-small-slide"],
    ["es", "reverendo", "en", "reverend", "reverend-respected"],
    ["es", "salpicadura", "en", "splash-8", "splash-noun"],
    ["es", "sedante", "en", "sedative-3", "sedative-calming-medicine"],
    ["es", "sinverguenza", "en", "shameless", "shameless-person-no-shame"],
    ["es", "sorbo", "en", "sip-3", "sip-noun-small-drink"],
    ["es", "superintendente", "en", "superintendent", "superintendent-department-head"],
    ["es", "territorial", "en", "territorial", ["territorial-land-ownership", "territorial-animal-area"]],
    ["es", "guadanar", "en", "scythe-3", "scythe-cut-grass-or-grain"],
    ["es", "tosquedad", "en", "coarseness-2", "coarseness-texture"],
    ["es", "astillazo", "en", "splinter-2", "splinter-shard"],
    ["es", "desvainadura", "en", "shelling-2", "shelling-remove-shells"],
    ["es", "modosidad", "en", "modesty-2", "modesty-reserve"],
    ["es", "oliscar", "en", "sniff-2", "sniff-smell"],
    ["es", "romanzar", "en", "romance", null],
    ["es", "soberanear", "en", "sovereign-3", "sovereign-ruler"],
    ["es", "avalentar", "en", "endorse-6", "endorse-support-publicly"],
    ["es", "convicio", "en", "conviction-2", null],
    ["es", "jetazo", "en", "jet-2", null],
    ["es", "poyar", "en", "support-6", "support-hold-up"],
    ["es", "telequinesia", "en", "telekinesis", "telekinesis-mental-ability"],
    ["es", "traslumbrar", "en", "shine-7", "shine-glow"],
    ["es", "andadera", "en", "walker-5", "walker-support-frame"],
    ["es", "esparcidor", "en", "spreader-2", "spreader-person-disseminator"],
    ["es", "retenedor", "en", "retainer", "retainer-dental-device"],
    ["es", "zafireo", "en", "sapphire-2", "sapphire-precious-blue-gem"],

    ["en", "fulgurant", "es", "fulgurante", "fulgurante-bright"],
    ["en", "temporality", "es", "temporalidad", "temporalidad-transience"],
    ["en", "elapse", "es", "transcurrir", "transcurrir-time-pass"],
    ["en", "actuate", "es", "accionar", "accionar-mechanism"],
    ["en", "amphictyony", "es", "anfictionia", "round5096-anfictionia-league"],
    ["en", "holiness", "es", "santidad", "santidad-holiness"],
    ["en", "but", "es", "sino", "sino-corrective-conjunction"],
    ["en", "bottle-rack", "es", "botillero", null],
    ["en", "vote-2", "es", "voto", "voto-ballot"],
    ["en", "rod-2", "es", "vara", "vara-branch"],
    ["en", "baby-bottle-2", "es", "mamadera", "mamadera-breast-pump"],
    ["en", "holder-2", "es", "sostenedor", "sostenedor-objeto"],
    ["en", "subscriber-2", "es", "suscriptor", "suscriptor-paying-member"],
    ["en", "dejected-2", "es", "abatido", "abatido-downcast"],
    ["en", "gallant-2", "es", "galante", "galante-courteous-person"],
    ["en", "flattering-4", "es", "lisonjero", "lisonjero-comment"],
    ["en", "nozzle-5", "es", "boquilla", "boquilla-wind-instrument"],
    ["en", "yoke-3", "es", "yugo", "yugo-animal-harness"],
    ["en", "make-up-3", "es", "confeccionar", null],
    ["en", "viewer-3", "es", "visor", "round5096-visor-weapon"],
    ["en", "spread-8", "es", "untada", "untada-spread-layer"],
    ["en", "dissatisfied-6", "es", "descontentadizo", "descontentadizo-easily-displeased"],
    ["en", "empty-6", "es", "vacuo", "vacuo-empty-or-insubstantial"],
    ["en", "spanking-10", "es", "zurrar", "zurrar-beat"],
    ["en", "tahona", "es", "tahona", "tahona-animal-powered-mill"],
    ["en", "delicatessen", "es", "delicatessen", "delicatessen-shop"],
    ["en", "hopper-2", "es", "tramoya", null],
    ["en", "clarified-2", "es", "clarinada", "clarinada-clarion-call"],
  ];

  fixes.forEach(([language, id, targetLanguage, oldId, replacement]) => {
    const entries = globalThis.DICCIONARIOS && globalThis.DICCIONARIOS[language];
    const matches = entries ? entries.filter((entry) => entry.id === id) : [];
    if (matches.length !== 1) throw new Error(`translation cleanup: expected one ${language}/${id}, found ${matches.length}`);
    const entry = matches[0];
    const raw = entry.translation && entry.translation[targetLanguage];
    const current = Array.isArray(raw) ? raw : raw ? [raw] : [];
    if (!current.includes(oldId)) throw new Error(`translation cleanup: stale link ${language}/${id} -> ${targetLanguage}/${oldId}`);
    const next = current.filter((target) => target !== oldId);
    if (replacement) next.push(...(Array.isArray(replacement) ? replacement : [replacement]));
    const unique = Array.from(new Set(next));
    if (unique.length === 0) {
      delete entry.translation[targetLanguage];
      if (Object.keys(entry.translation).length === 0) delete entry.translation;
    } else {
      entry.translation = entry.translation || {};
      entry.translation[targetLanguage] = unique.length === 1 ? unique[0] : unique;
    }
  });
})();
