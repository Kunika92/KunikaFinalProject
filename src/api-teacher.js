const https = require('https');
const http = require('http');
const Twit = require('twit');
const wreck = require('wreck');

const credentials = require('../credentials.json');
const { twitterTweets } = require('./js/twitter/filter');

const logger = (...messages) => console.log(messages, new Date()); // eslint-disable-line no-console

const autocompleteHandler = ({ query: { keyword = '' } }) => {
  const DELAY = 1500; // 1.5 sec
  const places = [];

  places.push('Afghanistan');
  places.push('Albania');
  places.push('Algeria');
  places.push('American Samoa');
  places.push('Antarctica');
  places.push('Argentina');
  places.push('Armenia');
  places.push('Aruba');
  places.push('Australia');
  places.push('Austria');
  places.push('Bahamas');
  places.push('Bangladesh');
  places.push('Barbados');
  places.push('Belarus');
  places.push('Belgium');
  places.push('Belize');
  places.push('Bermuda');
  places.push('Bolivia');
  places.push('Brazil');
  places.push('Bulgaria');
  places.push('Cambodia');
  places.push('Cameroon');
  places.push('Canada');
  places.push('Cayman Islands');
  places.push('Chad');
  places.push('Chile');
  places.push('China');
  places.push('Colombia');
  places.push('Congo');
  places.push('Cook Islands');
  places.push('Costa Rica');
  places.push('Côte d\'Ivoire');
  places.push('Croatia');
  places.push('Cuba');
  places.push('Cyprus');
  places.push('Czech Republic');

  const items = places.filter(place => place.toLowerCase().includes(keyword.toLowerCase()));

  if (items.length === 0) {
    items.push('No matches found');
  }

  // I promise to return the value when setTimeout resolves with the answer
  return new Promise(resolve => setTimeout(resolve, DELAY, { items }));
};

exports.autocompleteHandler = autocompleteHandler;

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

const flickrGeoResults = (flickrResponse) => {
  const jpgs = flickrJpgPath(flickrResponse);

  return flickrResponse.photos.photo.map((photo, index) => {
    const {
      accuracy,
      latitude,
      longitude,
    } = photo;

    return {
      accuracy,
      latitude,
      longitude,
      path: jpgs[index],
    };
  });
};

exports.plugin = {
  name: 'api',
  version: '1.3.0',
  register: (server) => {
    server.route({
      method: 'GET',
      path: '/api/twitter',
      handler: () => new Promise((resolve) => {
        const twit = new Twit({
          consumer_key: credentials.twitter.consumer_key,
          consumer_secret: credentials.twitter.consumer_secret,
          access_token: credentials.twitter.access_token,
          access_token_secret: credentials.twitter.access_token_secret,
          timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
          strictSSL: true, // optional - requires SSL certificates to be valid.
        });

        const params = { screen_name: 'vanarts' };
        const GENERIC_TWITTER_ERROR = 'VanArts Twitter Timeline is unavailable';

        try {
          twit.get('statuses/user_timeline', params, (error, response) => {
            if (error) { // server error
              logger(
                'Twitter API server error',
                JSON.stringify(params),
                JSON.stringify(error.statusCode),
                JSON.stringify(response),
              );

              // change the error from developer to user facing message
              resolve({ message: GENERIC_TWITTER_ERROR });
              return;
            }

            resolve(twitterTweets(response));
          });
        } catch (error) { // syntax error
          logger('Internal error before Twitter API', JSON.stringify(error));

          resolve({ message: GENERIC_TWITTER_ERROR });
        }
      }),
    });

    server.route({
      method: 'GET',
      path: '/api/flickr',
      handler: async (request) => {
        // default query type is = vanarts 1km radius

        let address = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${credentials.flickr.api_key}&format=json&nojsoncallback=1&lat=49.282705&lon=-123.115358&radius=1`;
        let transform = flickrJpgPath;

        if (request.query.lat && request.query.lon) {
          // keyword search with geo results
          address = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${credentials.flickr.api_key}&format=json&nojsoncallback=1&lat=${request.query.lat}&lon=${request.query.lon}&radius=1`;
          transform = flickrJpgPath;
        }

        if (request.query.keyword) {
          // keyword search with geo results
          address = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${credentials.flickr.api_key}&format=json&nojsoncallback=1&tags=${request.query.keyword}&has_geo=1&extras=geo`;
          transform = flickrGeoResults;
        }

        try {
          const { payload } = await wreck.get(address);
          return { paths: transform(JSON.parse(payload)) };
        } catch (error) {
          return { error: error.message };
        }
      },
    });

    server.route({
      method: 'GET',
      path: '/api/autocomplete',
      handler: autocompleteHandler,
    });

    server.route({
      method: 'GET',
      path: '/api/slow-fruit',
      handler: () => {
        const DELAY = 2 * 1000; // 2 sec
        const OUT = {
          apple: 'green',
          banana: 'gold',
          cherry: 'red',
          durian: 'blue',
          eggplant: 'purple',
        };

        return new Promise(resolve => setTimeout(resolve, DELAY, OUT));
      },
    });

    server.route({
      method: 'GET',
      path: '/api/fruit',
      handler: (request, reply) => {
        // Browser web address http://localhost:3000/api/fruit?format=json
        // output blank, xml, json
        console.log(request.query.format); // eslint-disable-line no-console
        // PHP is echo($_GET['format']) // outputs blank, xml, json

        if (request.query.format === 'xml') {
          return reply
            .response('<fruits><fruit name="apple">green</fruit><fruit name="banana">yellow</fruit><fruit name="cherry">red</fruit></fruits>')
            .type('application/xml');
        }

        return {
          apple: 'green',
          banana: 'yellow',
          cherry: 'red',
        };
      },
    });

    server.route({
      method: 'GET',
      path: '/api/rss',
      handler: (request, reply) => new Promise((resolve, reject) => {
        const url = request.query.url || 'http://www.cbc.ca/cmlink/rss-canada';
        const isSSL = (url.substring(0, 5) === 'https');
        const httpRequest = (isSSL) ? https : http;

        httpRequest.get(url, (response) => {
          let body = '';

          if (response.statusCode === 200) {
            // Continuously update stream with data
            response.on('data', (data) => {
              body += data;
            });
            response.on('end', () => {
              resolve(reply.response(body).type('application/xml'));
            });
          } else {
            reject(new URIError(`Service call failed with HTTP status code: ${response.statusCode}`));
          }
        }).on('error', (e) => {
          reject(new URIError(`Service call failed due to error: ${e.message}`));
        });
      }),
    });
  },
};
