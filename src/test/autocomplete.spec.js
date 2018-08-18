/* global describe, it */
const expect = require('expect.js');
const routes = require('../api-teacher.js');

describe('Autocomplete route', () => {
  it('should return no matches', async () => {
    const args = { query: { keyword: 'Zambia' } };

    const actual = (await routes.autocompleteHandler(args)).items[0];
    const expected = 'No matches found';

    expect(expected).to.be(actual);
  });

  it('should return all countries', async () => {
    const args = { query: { keyword: '' } };

    const results = await routes.autocompleteHandler(args);
    let actual = results.items[0];
    let expected = 'Afghanistan';
    expect(expected).to.be(actual);

    actual = results.items.length;
    expected = 36;
    expect(expected).to.be(actual);
  });

  it('should return some countries', async () => {
    const args = { query: { keyword: 'Cana' } };

    const actual = (await routes.autocompleteHandler(args)).items[0];
    const expected = 'Canada';

    expect(expected).to.be(actual);
  });
});
