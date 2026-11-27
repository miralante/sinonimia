/*
 * locale-picker-config.js — window.LocalePickerConfig, read by
 * js/locale-picker.js on load. Must run before that script.
 *
 * Kept as an external file (not inline) so the CSP `script-src 'self'`
 * allows it. Language changes are applied in place by the hook registered
 * in js/app.js (window.LocalePicker.onChange).
 */
window.LocalePickerConfig = {
  /* The language selector lives INSIDE the gear drawer, as its first row,
     and the gear stays alone in the header. */
  languageInDrawer: true,
  storageKey: 'sinonimia-idioma',
  storagePrefix: 'sinonimia-',
  /* UI strings are inline in js/i18n.js: skip HEAD discovery. */
  path: null,
  requiredLocales: ['es', 'en'],
  defaultLocale: 'en'
};
