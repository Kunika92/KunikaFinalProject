const utils = {
  print: (message, ...params) => {
    console.log(message); // eslint-disable-line no-console
    if (params) {
      params.forEach(param => console.log(param)); // eslint-disable-line no-console
    }
  },
};

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = utils;
}
