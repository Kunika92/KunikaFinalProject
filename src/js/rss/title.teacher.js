function parseRss(response) {
  // Treat XML elements the same as HTML elements
  // Scan through the XML elements for either the copyright or author's title value
  // Todo output author's name to console
  const title = $(response).find('channel > title').text();
  $('body').append(title);
}

function getLocalRss() {
  $.ajax({
    url: '/jquery/rss/cbc.xml',
    success: parseRss,
  });
}

function getRemoteRss() {
  $.ajax({
    url: '/api/rss',
    success: parseRss,
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    getLocalRss,
    getRemoteRss,
  };
}
