function appendNewsHeadline({ link, title, description }) {
  $('#news').append(`<li><a href="${link}">${title}</a><p>${description}</p></li>`);
}

function displayNewsHeadline(index, item) {
  const title = $(item).children('title').text();
  const link = $(item).children('link').text();
  const description = $(item).children('description').text();
  appendNewsHeadline({ link, title, description });
}

function displayNewsHeadlines(response) {
  $('#news').empty(); // shortcut for .html('');
  $(response).find('item').each(displayNewsHeadline);
}

function getRssNews() {
  // Who is the RSS provider?
  const providerUrl = $(this).val();

  if (providerUrl === '') { // when missing provider address hide news content
    $('#news').empty();
    return;
  }

  $.ajax({
    url: '/api/rss',
    data: {
      url: providerUrl, // jQuery will generate query string as ?url=*
    },
    success: displayNewsHeadlines,
  });
}

function manyProviders() {
  $('#providers').change(getRssNews);
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    manyProviders,
  };
}
