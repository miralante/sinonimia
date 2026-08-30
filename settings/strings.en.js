/* ============================================================
   Sinonimia — Settings texts (EN)
   Parity with strings.es.js (enforced by scripts/check.js).
   ============================================================ */
(function () {
  'use strict';

  App.i18n.register({
    title: '⚙️ Sinonimia — Settings',
    routeNotice: 'Settings page. It does not appear in the app menu: you get here by typing this address.',
    intro: 'Here you can clear what is saved in this browser. Aimed at whoever manages the device (family, teachers), not at the person using the dictionary.',

    stateTitle: 'Current state of this browser',
    currentLanguage: 'Current language: {lang}',
    languageNameEs: 'Spanish',
    languageNameEn: 'English',
    mySentencesCount: "Sentences written by the person: {n}",
    learnedWordsCount: 'Words marked as learned: {n}',
    scoreTotal: 'Total correct answers in the game: {n}',

    personalDataTitle: "Clear the person's data",
    personalDataIntro: "Clears the sentences written by the person, the text size and the high-contrast mode.",
    personalDataKeeps: 'Kept',
    btnResetPersonal: "Clear my personal data",
    confirmResetPersonal: 'Tap again to confirm',
    feedbackResetPersonalDone: 'Done. Your sentences and reading preferences have been cleared.',

    wipeTitle: 'Clear everything',
    wipeIntro: 'Clears every key under sinonimia-: own sentences, learned words, game stars, language, text size and contrast. Equivalent to opening the dictionary for the first time.',
    btnResetAll: 'Clear everything saved',
    confirmResetAll: 'Tap again to confirm',
    feedbackResetAllDone: 'Done. Everything saved in this browser has been cleared.',

    footer: 'Nothing leaves this browser. There is no account, no server, no cloud backup.'
  });
})();
