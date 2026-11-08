// Hash-router apps: redirect to index.html, which restores the user's
// language from localStorage or navigator.language. Using index.html
// instead of ./ avoids a loop on hosts that serve 404.html for any missing
// path.
(function () {
  "use strict";
  var saved = localStorage.getItem("currentLanguage");
  var lang = saved || navigator.language || "es";
  if (!saved && lang.startsWith("en")) lang = "en";
  else if (!saved) lang = "es";
  window.location.replace("/index.html#/" + lang + "/");
})();
