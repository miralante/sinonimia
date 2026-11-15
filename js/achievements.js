/*
 * achievements.js — Sinonimia achievements ("logros"): catalog, storage
 * and badge grid.
 *
 * Shared by index.html (js/app.js unlocks them at the natural progress
 * events) and about-app/index.html (the "About the app" page, linked
 * from the main footer right before "Settings", which shows them).
 *
 * Storage: one localStorage key, `sinonimia-logros`, holding
 * { <achievement id>: <unlock timestamp in ms> }. It shares the
 * `sinonimia-` prefix, so the settings page's "Clear my data" button
 * (config/config.js) wipes it together with the rest of the progress.
 *
 * Achievements are never taken away (SPEC.md: progress only grows).
 * Most of them are derived from data the app already saves
 * (syncFromStorage), so people who used Sinonimia before this file
 * existed get credit the first time either page loads.
 *
 * Texts come from js/i18n.js (`translate`): achievement<Name>,
 * achievement<Name>Desc, achievementLocked, achievementUnlockedAt.
 */
var SINONIMIA_ACHIEVEMENTS = (function () {
  var STORAGE_KEY = "sinonimia-logros";

  var LIST = [
    { id: "firstWord",  icon: "📖", key: "achievementFirstWord" },
    { id: "tenWords",   icon: "🌟", key: "achievementTenWords" },
    { id: "firstStar",  icon: "⭐", key: "achievementFirstStar" },
    { id: "streak3",    icon: "🔥", key: "achievementStreak3" },
    { id: "allTopics",  icon: "🎓", key: "achievementAllTopics" },
    { id: "mySentence", icon: "✍️", key: "achievementMySentence" }
  ];

  // --- Storage helpers (private-mode browsers throw on localStorage) ---
  function readJson(key, fallback) {
    try {
      var value = JSON.parse(localStorage.getItem(key) || "null");
      return value == null ? fallback : value;
    } catch (e) {
      return fallback;
    }
  }

  function keysWithPrefix(prefix) {
    var out = [];
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && k.indexOf(prefix) === 0) out.push(k);
      }
    } catch (e) {
      // Storage unavailable: nothing to derive.
    }
    return out;
  }

  /** Unlocked achievements as { id: timestamp }. */
  function unlocked() {
    var data = readJson(STORAGE_KEY, {});
    return data && typeof data === "object" && !Array.isArray(data) ? data : {};
  }

  /** Unlocks `id` once. Returns true only the first time. */
  function achieve(id) {
    var data = unlocked();
    if (data[id]) return false;
    data[id] = Date.now();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      return false;
    }
    return true;
  }

  // Sums a per-language list key (e.g. sinonimia-aprendidas-es + -en).
  function countListItems(prefix) {
    return keysWithPrefix(prefix).reduce(function (total, key) {
      var list = readJson(key, []);
      return total + (Array.isArray(list) ? list.length : 0);
    }, 0);
  }

  // Sums a per-language number key (e.g. sinonimia-juego-aciertos-es + -en).
  function countNumbers(prefix) {
    return keysWithPrefix(prefix).reduce(function (total, key) {
      var raw = 0;
      try { raw = parseInt(localStorage.getItem(key), 10); } catch (e) { raw = 0; }
      return total + (isNaN(raw) ? 0 : raw);
    }, 0);
  }

  /**
   * Unlocks every achievement that can be derived from saved progress,
   * in any language. `allTopics` needs the dictionary and `streak3`
   * needs live game answers, so js/app.js handles those two.
   */
  function syncFromStorage() {
    var words = countListItems("sinonimia-aprendidas-");
    if (words >= 1) achieve("firstWord");
    if (words >= 10) achieve("tenWords");
    if (countNumbers("sinonimia-juego-aciertos-") >= 1) achieve("firstStar");
    if (countListItems("sinonimia-sentences-estrellas-") >= 1) achieve("mySentence");
  }

  /** Draws one badge per achievement inside `container` (a <ul>). */
  function render(container, language) {
    if (!container) return;
    var done = unlocked();
    container.innerHTML = "";
    LIST.forEach(function (a) {
      var isUnlocked = !!done[a.id];
      var item = document.createElement("li");
      item.className = "achievement-badge " + (isUnlocked ? "unlocked" : "locked");

      var icon = document.createElement("span");
      icon.className = "achievement-badge-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = a.icon;

      var name = document.createElement("span");
      name.className = "achievement-badge-name";
      name.textContent = translate(language, a.key);

      var desc = document.createElement("span");
      desc.className = "achievement-badge-desc";
      desc.textContent = translate(language, a.key + "Desc");

      var status = document.createElement("span");
      status.className = "achievement-badge-status";
      status.textContent = isUnlocked
        ? translate(language, "achievementUnlockedAt", {
            date: new Date(done[a.id]).toLocaleDateString(translate(language, "htmlLang"))
          })
        : translate(language, "achievementLocked");

      item.appendChild(icon);
      item.appendChild(name);
      item.appendChild(desc);
      item.appendChild(status);
      container.appendChild(item);
    });
  }

  return {
    list: LIST,
    unlocked: unlocked,
    achieve: achieve,
    syncFromStorage: syncFromStorage,
    render: render
  };
})();
