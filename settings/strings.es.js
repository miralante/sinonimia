/* ============================================================
   Sinonimia — Textos de Ajustes (ES)
   Archivo específico del idioma. Se carga condicionalmente
   desde index.html según App.i18n.locale().
   ============================================================ */
(function () {
  'use strict';

  App.i18n.register({
    title: '⚙️ Sinonimia — Ajustes',
    routeNotice: 'Página de ajustes. No aparece en el menú de la aplicación: solo se llega escribiendo esta dirección.',
    intro: 'Aquí se puede borrar lo guardado en este navegador. Pensada para quien gestiona el dispositivo (familia, profesorado), no para la persona usuaria.',

    stateTitle: 'Estado actual de este navegador',
    currentLanguage: 'Idioma actual: {lang}',
    languageNameEs: 'Español',
    languageNameEn: 'English',
    mySentencesCount: 'Frases escritas por la persona: {n}',
    learnedWordsCount: 'Palabras marcadas como aprendidas: {n}',
    scoreTotal: 'Aciertos totales en el juego: {n}',

    personalDataTitle: 'Borrar los datos de la persona',
    personalDataIntro: 'Borra las frases escritas por la persona, el tamaño del texto y el modo contraste.',
    personalDataKeeps: 'Se conservan',
    btnResetPersonal: 'Borrar mis datos personales',
    confirmResetPersonal: 'Toca otra vez para confirmar',
    feedbackResetPersonalDone: 'Hecho. Se han borrado las frases propias y los ajustes de lectura.',

    wipeTitle: 'Borrar todo',
    wipeIntro: 'Borra todas las claves bajo sinonimia-: frases propias, palabras aprendidas, estrellas del juego, idioma, tamaño de texto y contraste. Equivale a abrir el diccionario por primera vez.',
    btnResetAll: 'Borrar todo lo guardado',
    confirmResetAll: 'Toca otra vez para confirmar',
    feedbackResetAllDone: 'Hecho. Se ha borrado todo lo guardado en este navegador.',

    footer: 'Nada sale de este navegador. No hay cuenta, ni servidor, ni copia de seguridad en la nube.'
  });
})();
