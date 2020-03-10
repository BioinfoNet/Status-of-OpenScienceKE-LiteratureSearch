// Add some new jQuery selectors
$.extend($.expr[':'], {
  /*
   * Perform a case insensitve search on an elements content
   * Return matching results
   */
  'i-contains': function (elem, i, match, array) {
    return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || '').toLowerCase()) >= 0;
  },
  /*
   * Perform a case insensitve search on an elements content
   * Return NON matching results
   */
  'i-does-not-contain': function (elem, i, match, array) {
    return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || '').toLowerCase()) === -1;
  }
});