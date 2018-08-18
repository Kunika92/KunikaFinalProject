const wreck = require('wreck');

const credentials = require('../credentials.json');

const flickrJpgPath = (flickrResponse) => {
  const paths = flickrResponse.photos.photo.map((photo) => {
    const {
      farm,
      id,
      secret,
      server,
    } = photo;

    return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
  });

  return paths;
};

exports.flickrJpgPath = flickrJpgPath;
exports.plugin = {
  name: 'api-student',
  version: '1.4.0',
  register: (server) => {
    server.route({
      method: 'GET',
      path: '/api/student',
      handler: () => ({ hello: 'student' }),
    });

    server.route({
      method: 'GET',
      path: '/api/finalProject',
      handler: async (request) => {
        let address = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${credentials.flickr.api_key}&format=json&nojsoncallback=1&lat=49.282705&lon=-123.115358&radius=1`;
        let transform = flickrJpgPath;

        if (request.query.lat && request.query.lon) {
          // keyword search with geo results
          address = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${credentials.flickr.api_key}&format=json&nojsoncallback=1&lat=${request.query.lat}&lon=${request.query.lon}&radius=2`;
          transform = flickrJpgPath;
        }

        try {
          const { payload } = await wreck.get(address);
          return { paths: transform(JSON.parse(payload)) };
        } catch (error) {
          return { error: error.message };
        }
      },
    });
  },
};
