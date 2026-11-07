(function (global) {
  "use strict";

  function createSearchTools(options) {
    var sortedCache = { source: null, language: null, list: null };

    function searchKeys(entry) {
      if (!entry._k) {
        entry._k = {
          word: options.normalize(entry.word),
          rest: options.normalize(entry.definition + " | " + entry.synonyms.join(" | "))
        };
      }
      return entry._k;
    }

    function matchesSearch(entry, normalizedQuery) {
      if (!normalizedQuery) return true;
      var keys = searchKeys(entry);
      return keys.word.indexOf(normalizedQuery) !== -1 ||
        keys.rest.indexOf(normalizedQuery) !== -1;
    }

    function matchesExactSearch(entry, normalizedQuery) {
      if (searchKeys(entry).word === normalizedQuery) return true;
      return entry.synonyms.some(function (synonym) {
        return options.normalize(synonym) === normalizedQuery;
      });
    }

    function exactSearchSynonym(entry, normalizedQuery) {
      if (!normalizedQuery) return "";
      for (var i = 0; i < entry.synonyms.length; i += 1) {
        if (options.normalize(entry.synonyms[i]) === normalizedQuery) return entry.synonyms[i];
      }
      return "";
    }

    function displayedSearchSynonym(entry, normalizedQuery) {
      if (options.getEntryByName().has(normalizedQuery)) return "";
      var synonymMatches = options.getEntryBySynonym().get(normalizedQuery) || [];
      if (synonymMatches.length !== 1 || synonymMatches[0].id !== entry.id) return "";
      var synonym = exactSearchSynonym(entry, normalizedQuery);
      var language = options.getLanguage();
      return synonym ? synonym.charAt(0).toLocaleUpperCase(language) + synonym.slice(1) : "";
    }

    function alphabeticalEntries() {
      var entries = options.getEntries();
      var language = options.getLanguage();
      if (sortedCache.source !== entries || sortedCache.language !== language) {
        var collator = new Intl.Collator(language);
        sortedCache.source = entries;
        sortedCache.language = language;
        sortedCache.list = entries.slice().sort(function (a, b) {
          return collator.compare(a.word, b.word);
        });
      }
      return sortedCache.list;
    }

    function filteredEntries() {
      var state = options.getState();
      var query = options.normalize(options.getSearchValue() || "");
      var scopedEntries = alphabeticalEntries().filter(function (entry) {
        if (state.topic !== "todos" && entry.situacion !== state.topic) return false;
        if (state.letter && searchKeys(entry).word.charAt(0) !== state.letter) return false;
        return true;
      });
      if (!query) return scopedEntries;
      var exactMatches = scopedEntries.filter(function (entry) {
        return matchesExactSearch(entry, query);
      });
      return exactMatches.length ? exactMatches : scopedEntries.filter(function (entry) {
        return matchesSearch(entry, query);
      });
    }

    function availableLetters() {
      var letters = {};
      options.getEntries().forEach(function (entry) {
        letters[options.normalize(entry.word).charAt(0)] = true;
      });
      return letters;
    }

    return {
      alphabeticalEntries: alphabeticalEntries,
      availableLetters: availableLetters,
      displayedSearchSynonym: displayedSearchSynonym,
      filteredEntries: filteredEntries,
      searchKeys: searchKeys,
    };
  }

  global.SinonimiaSearch = { create: createSearchTools };
})(window);
