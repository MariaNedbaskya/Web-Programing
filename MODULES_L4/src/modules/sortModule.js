function sortStringsIgnoringSpaces(array) {
    return array.slice().sort((a, b) => {
      const aWithoutSpaces = a.replace(/\s+/g, '');
      const bWithoutSpaces = b.replace(/\s+/g, '');
      return aWithoutSpaces.localeCompare(bWithoutSpaces);
    });
  }
  
  module.exports = { sortStringsIgnoringSpaces };