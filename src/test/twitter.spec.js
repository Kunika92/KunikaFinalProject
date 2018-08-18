/* global describe, it */
const expect = require('expect.js');

const response = require('./fixtures/user_timeline.json'); // Twitter service cached response
const { twitterTweets } = require('../js/twitter/filter');
const { formatTwitterDate } = require('../js/twitter/date.js');

describe('Twitter', () => {
  it('should be full length', () => {
    expect(response.length).to.be(20);
  });

  describe('filter', () => {
    it('should return "date" property', () => {
      expect(twitterTweets(response, { rawDate: true })[0].date)
        .to.be('Wed Jul 04 14:43:00 +0000 2018');

      expect(twitterTweets(response, { rawDate: true })[1].date)
        .to.be('Wed Jul 04 01:24:04 +0000 2018');
    });

    it('should return "text" property', () => {
      expect(twitterTweets(response)[0].text).to.contain('Remember that Acting');
      expect(twitterTweets(response)[1].text).to.contain('GEEK ALERT');
    });
  });

  describe('formatTwitterDate', () => {
    const feb1 = new Date('2017-02-01 10:00:00');
    const timeZoneOffset = feb1.toString().match(/([-+][0-9]+)\s/)[1];

    it('calculates up to weeks', () => {
      expect(formatTwitterDate(`Web Feb 01 10:00:00 ${timeZoneOffset} 2017`, feb1))
        .to.be('just now');

      expect(formatTwitterDate(`Web Feb 01 9:59:00 ${timeZoneOffset} 2017`, feb1))
        .to.be('1 minute ago');

      expect(formatTwitterDate(`Web Feb 01 9:50:00 ${timeZoneOffset} 2017`, feb1))
        .to.be('10 minutes ago');

      expect(formatTwitterDate(`Web Feb 01 9:00:00 ${timeZoneOffset} 2017`, feb1))
        .to.be('1 hour ago');

      expect(formatTwitterDate(`Web Feb 01 0:00:00 ${timeZoneOffset} 2017`, feb1))
        .to.be('10 hours ago');

      expect(formatTwitterDate(`Tue Jan 31 10:00:00 ${timeZoneOffset} 2017`, feb1))
        .to.be('Yesterday');

      expect(formatTwitterDate(`Mon Jan 30 10:00:00 ${timeZoneOffset} 2017`, feb1))
        .to.be('2 days ago');

      expect(formatTwitterDate(`Wed Jan 25 10:00:00 ${timeZoneOffset} 2017`, feb1))
        .to.be('1 week ago');

      expect(formatTwitterDate(`Wed Jan 18 10:00:00 ${timeZoneOffset} 2017`, feb1))
        .to.be('2 weeks ago');

      expect(formatTwitterDate(`Wed Jan 04 10:00:00 ${timeZoneOffset} 2017`, feb1))
        .to.be('4 weeks ago');
    });

    it('calculates weeks to months', () => {
      expect(formatTwitterDate(`Wed Dec 07 10:00:00 ${timeZoneOffset} 2016`, feb1))
        .to.be('2 months ago');

      expect(formatTwitterDate(`Wed Oct 05 10:00:00 ${timeZoneOffset} 2016`, feb1))
        .to.be('4 months ago');

      expect(formatTwitterDate(`Wed May 04 10:00:00 ${timeZoneOffset} 2016`, feb1))
        .to.be('10 months ago');

      expect(formatTwitterDate(`Wed Feb 03 10:00:00 ${timeZoneOffset} 2016`, feb1))
        .to.be('13 months ago');
    });
  });
});
