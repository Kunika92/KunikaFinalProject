// todo needs a polyfill or transpile build step
const { formatTwitterDate: getTwitterDate } = require('./date');

// Imperative programming paradigm
const twitterTweets = (response, options = {}) => { // response is the user timeline
  const tweets = [];
  const formatDate = (createdAtDate) => {
    if (options.rawDate) {
      return createdAtDate;
    }

    return getTwitterDate(createdAtDate);
  };

  response.forEach((tweet) => {
    tweets.push({
      date: formatDate(tweet.created_at),
      text: tweet.text,
    });
  });

  return tweets;
};

// Declarative programming paradigm
// tweet = { created_at, comments, text, users }
// returning { text }
// const twitterTweets = response => response.map(tweet => ({
//   date: tweet.created_at,
//   text: tweet.text,
// }));

// todo avoid require in browser code
function getTwitterTweetsWithDate() {
  $.ajax({
    url: '/api/twitter',
    success: (response) => {
      const html = [];
      response.forEach((tweet) => {
        html.push(`<li><strong>${tweet.date}</strong> ${tweet.text}</li>`);
      });
      $('#tweets').append(html.join(''));
    },
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    twitterTweets,
    getTwitterTweetsWithDate,
  };
}
