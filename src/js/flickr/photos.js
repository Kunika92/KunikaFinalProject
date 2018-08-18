/* global fetch */
async function getFlickrGeoPublicPhotos() {
  // fetch('/api/flickr')
  //   .then(response => response.json())
  //   .then((payload) => {
  //     console.log('Success');
  //     console.log(payload);
  //   });

  const response = await fetch('/api/flickr');
  const payload = await response.json();
  const html = [];
  for (let i = 0; i < payload.paths.length; i += 1) {
    const element = payload.paths[i];
    html.push(`<img src="${element}">`);
  }
  $('body').append(html.join(''));
}

function getFlickrPublicPhotos() {
  $.ajax({
    url: 'https://api.flickr.com/services/feeds/photos_public.gne?tags=stanley+park&format=json&jsoncallback=getFlickrData',
    jsonpCallback: 'getFlickrData',
    dataType: 'jsonp', // JSON with Padding. Whereas padding is the function name that Flickr is wrapping JSON in
    success: (response) => {
      console.log(response);
      const html = [];
      response.items.forEach((item) => {
        html.push(`<img src="${item.media.m}">`);
      });
      $('body').append(html.join(''));
    },
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    getFlickrPublicPhotos,
    getFlickrGeoPublicPhotos,
  };
}
